export async function connectWallet(): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Window not available")
  }

  const freighter = await import("@stellar/freighter-api")

  const connected = await freighter.isConnected()

  if (!connected) {
    throw new Error("Freighter wallet not installed")
  }

  await freighter.requestAccess()

  const result = await freighter.getAddress()

  if (typeof result === "string") {
    return result
  }

  if (result?.address) {
    return result.address
  }

  throw new Error("Unable to get wallet address")
}
