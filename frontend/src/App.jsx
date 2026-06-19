import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config/contract';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  
  // State baru sebagai "pelatuk" untuk merefresh data
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Connect ke MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask tidak terdeteksi! Silakan install MetaMask.');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const votingContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setAccount(accounts[0]);
      setContract(votingContract);

      // Cek apakah user adalah owner
      const owner = await votingContract.owner();
      setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());

    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Vote untuk kandidat
  const voteForCandidate = async (candidateId) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.vote(candidateId);
      await tx.wait();

      alert('Vote berhasil!');
      // Tarik pelatuk untuk merefresh data di useEffect
      setRefreshTrigger(prev => prev + 1); 
    } catch (error) {
      console.error('Error voting:', error);
      alert('Gagal vote: ' + (error.reason || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Toggle status voting (owner only)
  const toggleVoting = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.setVotingStatus(!votingOpen);
      await tx.wait();

      // Tarik pelatuk untuk merefresh data di useEffect
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error toggling voting:', error);
      alert('Gagal mengubah status voting');
    } finally {
      setLoading(false);
    }
  };

  // SEMUA LOGIKA AMBIL DATA PINDAH KE SINI
  useEffect(() => {
    const fetchData = async () => {
      if (!contract || !account) return;

      try {
        // Get semua kandidat
        const allCandidates = await contract.getAllCandidates();
        const formattedCandidates = allCandidates.map(c => ({
          id: Number(c.id),
          name: c.name,
          voteCount: Number(c.voteCount)
        }));
        setCandidates(formattedCandidates);

        // Cek status voting
        const isOpen = await contract.votingOpen();
        setVotingOpen(isOpen);

        // Cek apakah user sudah vote
        const voted = await contract.checkIfVoted(account);
        setHasVoted(voted);

        // Get total votes
        const total = await contract.getTotalVotes();
        setTotalVotes(Number(total));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [contract, account, refreshTrigger]); // Akan jalan saat contract/account terhubung, ATAU saat refreshTrigger diubah

  // Listen untuk perubahan account di MetaMask
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setContract(null);
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <header>
        <h1>🏆 World Cup 2026: The Ultimate GOAT</h1>
        <p>Voting Terdesentralisasi: Siapakah yang paling layak mengangkat trofi?</p>
      </header>

      <main>
        {!account ? (
          <div className="connect-section">
            <p>Hubungkan dompet kripto Anda untuk memberikan suara permanen di blockchain.</p>
            <button onClick={connectWallet} className="btn-primary">
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div className="voting-section">
            <div className="info-box">
              <p><strong>Voter ID:</strong> {account.slice(0, 6)}...{account.slice(-4)}</p>
              <p><strong>Status Kotak Suara:</strong> {votingOpen ? '🟢 DIBUKA' : '🔴 DITUTUP'}</p>
              <p><strong>Total Suara Masuk:</strong> {totalVotes}</p>
              {hasVoted && <p className="voted-badge">✓ Suara Anda telah terkunci di Blockchain</p>}
            </div>

            {isOwner && (
              <div className="admin-panel">
                <h3>FIFA Admin Panel (Owner)</h3>
                <button
                  onClick={toggleVoting}
                  disabled={loading}
                  className={votingOpen ? 'btn-danger' : 'btn-success'}
                >
                  {votingOpen ? 'Tutup Kotak Suara' : 'Buka Kotak Suara'}
                </button>
              </div>
            )}

            <h2>The GOAT</h2>

            {loading ? (
              <p>Memproses transaksi di jaringan...</p>
            ) : (
              <div className="candidates-grid">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="candidate-card">
                    <h3>{candidate.name}</h3>
                    <p className="vote-count">{candidate.voteCount} Votes</p>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: totalVotes > 0
                            ? `${(candidate.voteCount / totalVotes) * 100}%`
                            : '0%'
                        }}
                      />
                    </div>
                    <button
                      onClick={() => voteForCandidate(candidate.id)}
                      disabled={hasVoted || !votingOpen || loading}
                      className="btn-vote"
                    >
                      {hasVoted ? 'Sudah Memilih' : 'Berikan Suara'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer>
        <p>Final Project - Teknologi Blockchain | World Cup 2026 Edition</p>
      </footer>
    </div>
  );
}

export default App;