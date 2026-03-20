"use client"

import { useEffect, useState } from "react"
import { voteOnChain, getVotes } from "./contract"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function Home() {
  const [wallet, setWallet] = useState("")
  const [vote1, setVote1] = useState(0)
  const [vote2, setVote2] = useState(0)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [txHash, setTxHash] = useState("")

  const connectWallet = async () => {
    if (typeof window === "undefined") return

    const freighter = await import("@stellar/freighter-api")

    const res = await freighter.requestAccess()

    if (res.error) {
      alert("Freighter wallet not installed")
      return
    }

    setWallet(res.address)
    sessionStorage.setItem("wallet", res.address)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("wallet")
      if (saved) setWallet(saved)
    }
  }, [])

  const loadVotes = async () => {
    try {
      const v1 = await getVotes(1)
      const v2 = await getVotes(2)
      setVote1(v1)
      setVote2(v2)
    } catch (e) {
      console.error("Error loading votes", e)
    }
  }

  const vote = async (proposal: number) => {
    if (!wallet) {
      alert("Connect wallet first")
      return
    }

    try {
      setLoading(true)
      setTxHash("")
      setMessage("Submitting vote to blockchain...")

      const hash = await voteOnChain(wallet, proposal)

      setTxHash(hash)
      setMessage("✅ Vote is successful!")

      if (typeof window !== "undefined") {
        confetti({
          particleCount: 200,
          spread: 120,
          colors: ['#9333ea', '#ec4899', '#3b82f6']
        })
      }

      setTimeout(async () => {
        await loadVotes()
        setLoading(false)
        setTimeout(() => {
          setMessage("")
          setTxHash("")
        }, 6000)
      }, 3000)

    } catch (e) {
      setMessage("❌ Transaction failed")
      setLoading(false)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  useEffect(() => {
    loadVotes()

    const interval = setInterval(() => {
      loadVotes()
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const total = vote1 + vote2
  const p1 = total ? (vote1 / total) * 100 : 0
  const p2 = total ? (vote2 / total) * 100 : 0

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4 sm:p-8 font-sans">

      {/* HEADER */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl flex justify-between items-center py-6 backdrop-blur-md bg-white/5 rounded-2xl px-8 border border-white/10 shadow-lg mb-12"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 animate-glow flex items-center justify-center font-bold text-xl">S</div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Stellar Voting
          </h1>
        </div>

        {!wallet ? (
          <button
            onClick={connectWallet}
            className="bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 px-6 py-2.5 rounded-xl font-medium shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-200 text-sm font-medium">
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </div>
        )}
      </motion.div>

      {/* VOTING CARD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-xl relative animate-float"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-20 rounded-[3rem] -z-10"></div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">

          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 relative z-10">
            Active Proposal
          </h2>

          <div className="relative z-10 h-16 w-full mb-4">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center rounded-xl border backdrop-blur-md"
                >
                  <span className="font-semibold">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
            <button disabled={loading} onClick={() => vote(1)} className="flex-1 px-6 py-4 bg-green-500/20 rounded-2xl">
              Vote Option 1
            </button>

            <button disabled={loading} onClick={() => vote(2)} className="flex-1 px-6 py-4 bg-orange-500/20 rounded-2xl">
              Vote Option 2
            </button>
          </div>

          <div className="text-center">
            <p>Option 1: {vote1}</p>
            <p>Option 2: {vote2}</p>
          </div>

          {/* 👉 HISTORY LINK (added safely) */}
          <div className="text-center mt-6">
            <Link href="/history" className="text-purple-300 underline">
              View History
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  )
}