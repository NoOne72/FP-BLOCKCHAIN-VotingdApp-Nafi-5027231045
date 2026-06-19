# 🏆 World Cup 2026: The Ultimate GOAT Voting dApp

## Deskripsi
Aplikasi pemungutan suara (voting) terdesentralisasi berbasis blockchain untuk menentukan *Greatest of All Time* (GOAT) pada World Cup 2026 antara Cristiano Ronaldo, Lionel Messi, dan Neymar JR. Aplikasi ini memanfaatkan *smart contract* Solidity untuk memastikan setiap suara yang masuk bersifat transparan, aman (*anti-fraud*), dan permanen (*immutable*) di dalam jaringan blockchain.

## Anggota Kelompok 8
| Nama | NRP | Kontribusi |
|------|-----|------------|
| Muhammad Nafi Firdaus | 5027231045 | Fullstack (Smart Contract & Frontend UI) |

## Tech Stack
- **Frontend:** React + Vite
- **Smart Contract:** Solidity + Hardhat (v3)
- **Web3 Library:** ethers.js (v6)
- **Wallet:** MetaMask

## Fitur
- [x] Connect Wallet MetaMask untuk Autentikasi
- [x] Menampilkan daftar kandidat GOAT secara real-time (Read)
- [x] Menampilkan kalkulasi total suara dan status kotak suara (Read)
- [x] Memberikan suara (voting) satu kali per alamat dompet (Write)
- [x] Membuka dan menutup sesi pemungutan suara secara eksklusif oleh Admin/Owner (Write)

## Cara Menjalankan

### Prerequisites
- Node.js v18+
- MetaMask browser extension
- Git

### 1. Clone Repository

```

git clone https://github.com/NoOne72/FP-BLOCKCHAIN-VotingdApp-Nafi-5027231045.git
cd voting-dapp

```

### 2. Install Dependencies

```

# Root folder (untuk konfigurasi general)

npm install

# Masuk ke folder blockchain & install

cd blockchain
npm install

# Kembali ke root, masuk ke frontend & install

cd ../frontend
npm install

```

### 3. Jalankan Local Blockchain
Buka terminal dan jalankan:

```

cd blockchain
npx hardhat node

```

### 4. Deploy Smart Contract & Input Kandidat
Buka **terminal baru**, lalu jalankan:

```

cd blockchain

# Deploy contract ke local blockchain

npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost

# Jalankan script otomatisasi untuk memasukkan 3 kandidat GOAT

npx hardhat run scripts/addCandidates.ts --network localhost

```

### 5. Update Contract Address
- Copy address dari output deploy (contoh: 0x5FbDB2315678afecb367f032d93F642f64180aa3)
- Buka dan paste alamat tersebut ke file konfigurasi frontend: frontend/src/config/contract.js

### 6. Import Account ke MetaMask
- Copy *private key* dari terminal Hardhat node (Account #0 untuk Admin, Account #1 dst untuk Voter).
- Import akun tersebut ke ekstensi MetaMask.
- Pastikan network di MetaMask diubah ke **Localhost 8545** (Chain ID: 31337).

### 7. Jalankan Frontend
Buka **terminal baru**, lalu jalankan:

```

cd frontend
npm run dev

```

### 8. Buka Browser
Akses aplikasi melalui peramban pada tautan: 

```

http://localhost:5173

```

## Contract Address
- **Local:** 0x5FbDB2315678afecb367f032d93F642f64180aa3

## Demo
Menyusul

## Screenshot
<img width="1267" height="656" alt="image" src="https://github.com/user-attachments/assets/8890e679-65b6-4a4c-bd0b-41dcb14a4dc8" />


```
