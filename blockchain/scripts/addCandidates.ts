import { network } from "hardhat";

async function main() {
  // Membuat koneksi ke network lokal menggunakan sintaks Hardhat 3
  const { ethers } = await network.create();

  // Alamat kontrak Voting-mu yang sedang berjalan
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  console.log(`Menghubungkan ke kontrak di: ${contractAddress}...`);

  // Mengambil instrumen kontrak
  const voting = await ethers.getContractAt("Voting", contractAddress);

  console.log("\nMemasukkan para legenda ke dalam kotak suara...");

  // Menambahkan kandidat satu per satu
  let tx = await voting.addCandidate("Cristiano Ronaldo");
  await tx.wait(); // Tunggu hingga transaksi selesai dicatat di blockchain
  console.log("✅ Cristiano Ronaldo berhasil ditambahkan!");

  tx = await voting.addCandidate("Lionel Messi");
  await tx.wait();
  console.log("✅ Lionel Messi berhasil ditambahkan!");

  tx = await voting.addCandidate("Neymar JR");
  await tx.wait();
  console.log("✅ Neymar JR berhasil ditambahkan!");

  console.log("\n🎉 Selesai! Silakan cek website dApp Anda.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});