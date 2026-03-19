# Stellar Voting Mini dApp

## Overview

This project is a **mini decentralized voting application** built using the Stellar Soroban smart contract platform.

The application allows users to connect their wallet and vote for proposals. Each vote is recorded on the Stellar blockchain, ensuring transparency and immutability.

This project demonstrates a complete **end-to-end decentralized application (dApp)** including:

- Smart contract interaction
- Wallet authentication
- Frontend dashboard
- Live voting results

---

## Features

- Connect wallet using Freighter
- Vote on blockchain proposals
- Live vote result updates
- Leader detection
- Simple and responsive dashboard UI

---

## Smart Contract

This application uses a Soroban smart contract deployed on the Stellar Testnet.

Contract ID:

CB7MCRTWKYBKFW6S763YCBMJHZNGPYZCIBQ3C2OJBKWIMSKBCRU5RJMW

You can view the contract on the Stellar Explorer:

https://stellar.expert/explorer/testnet/contract/CB7MCRTWKYBKFW6S763YCBMJHZNGPYZCIBQ3C2OJBKWIMSKBCRU5RJMW

## Smart Contract Integration

The frontend is connected with the Stellar Soroban smart contract.

### Key Integration Files

- `app/contract.ts` → Handles blockchain interaction
- `app/page.tsx` → Frontend UI + calls contract functions

### Example Flow

1. User connects wallet using Freighter
2. User clicks vote button
3. Frontend calls `voteOnChain()` function
4. Transaction is signed using wallet
5. Transaction is sent to Stellar Testnet
6. Vote is recorded on blockchain
7. UI updates live results

### Important Code Snippet

const hash = await voteOnChain(wallet, proposal).

## Tech Stack

- Next.js
- TypeScript
- Stellar Soroban
- Freighter Wallet
- Tailwind CSS

---

## Demo Video

The demo video shows the full functionality of the dApp including wallet connection and voting.

Video file is included in this repository.

---

## UI Screenshots

### Dashboard

![Dashboard](<img width="1919" height="888" alt="Screenshot 2026-03-18 141852" src="https://github.com/user-attachments/assets/e23cefba-a027-4986-9733-41d0ee041b8a" />
)

### Wallet Connection

![Wallet](<img width="1905" height="947" alt="walletconnection png" src="https://github.com/user-attachments/assets/e490085c-90d3-4fd7-af37-a9acc711c534" />)

### Voting

![Result](<img width="1915" height="880" alt="voting png" src="https://github.com/user-attachments/assets/985b7e14-eab7-44e2-a70e-a72c891057f2" />)

### Transaction verification

![verification](<img width="1913" height="899" alt="transactionVerification png" src="https://github.com/user-attachments/assets/4ea69cf4-aee1-4458-a34c-83aa8705b765" />)

### Result

![Result](<img width="1919" height="892" alt="result png" src="https://github.com/user-attachments/assets/075c0f72-f1e8-4129-8308-372bde5575d5" />)

## Tests

The project includes basic unit tests to verify voting logic.

Example test output:

```
PASS tests/voting.test.ts
✓ Proposal 1 vote calculation
✓ Proposal comparison
✓ Total vote calculation
```

---

## Installation

Install dependencies:

```
npm install
```

Run the project:

```
npm run dev
```

---

## Smart Contract

This project interacts with a **Soroban smart contract deployed on the Stellar Testnet**.

The smart contract stores vote counts for proposals and allows users to submit votes through blockchain transactions.

---

## Project Structure

```
stellar-voting-dapp
│
├── app
│   ├── page.tsx
│   ├── contract.ts
│
├── tests
│   └── voting.test.ts
│
├── README.md
└── package.json
```

---

## Future Improvements

Possible improvements for this project:

- Multiple proposals
- Voting history
- DAO governance system
- Analytics dashboard

---

## 🚀 Deployment

### 🌐 Live Application
🔗 https://frontend-mauve-three-40.vercel.app  

### 📦 GitHub Repository
🔗 https://github.com/Chaitanya6006/New-voting-Dapp  

---

## ✅ Deployment Verification

- ✔️ Production URL generated successfully  
- ✔️ Deployment completed via Vercel CLI  
- ✔️ Live site accessible  

**Production URL:**  
https://frontend-htzm75h0t-chaitanya6006s-projects.vercel.app  

**Alias URL:**  
https://frontend-mauve-three-40.vercel.app  

## Author

Chaitanya

Blockchain Student | Stellar Soroban Developer
