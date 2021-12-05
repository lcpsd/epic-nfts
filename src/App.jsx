import React, { useEffect, useState } from "react";

export default function App(){
  const [currentAccount, setCurrentAccount] = useState("");
  
  async function checkIfWalletIsConnected(){
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;

    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

    } else {
      console.log("No authorized account found")
    }
  }

  async function connectWallet(){
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {
          currentAccount && 
            <button 
            onClick={null} 
            className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          }

          {
          !currentAccount && 
            <button 
            onClick={connectWallet} 
            className="cta-button connect-wallet-button">
              Connect Wallet
            </button>
          }
        </div>
      </div>
    </div>
  );
};
