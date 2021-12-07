import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import epicNFT from './artifacts/src/contracts/EpicNFT.sol/EpicNFT.json'
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss'

export default function App(){
  const [currentAccount, setCurrentAccount] = useState("");
  const CONTRACT_ADDRESS = "0xc4aefcCA2D9BCd9d40B6E49fA3F3f5b585816D16";
  
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

  async function mintNFT(){
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS,epicNFT.abi, signer);
  
        let nftTxn = await connectedContract.makeNFT();
        
        toast.info("Mining...please wait.")

        await nftTxn.wait();
        
      } else {
        toast.warning("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
    checkIfWalletIsConnected();

    const { ethereum } = window;

    if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS,epicNFT.abi, signer);
        
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          toast.info(from + "\n" + tokenId.toNumber())
          toast.info(
            <a href={`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}>`}>
              View NFT on OpenSea
            </a>
          )
        });
    }

    
  }, [])

  useEffect(() => {
    
    const {ethereum} = window

    async function checkNetwork(){
      let chainId = await ethereum.request({ method: 'eth_chainId' });

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4"; 
      if (chainId !== rinkebyChainId) {
        toast.warning("You are not connected to the Rinkeby Test Network!");
      }
    }

    checkNetwork()

  }, [])

  return (
    <div className="app">
      <div className="container">
        <div className="mint-area">
          <h1>MY NFT COLLECTION</h1>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {
          currentAccount && 
            <button 
            onClick={mintNFT} 
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
