import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, {useEffect, useState} from "react";
import { ethers } from "ethers"
import myEpicNFTJson from './utils/MyEpicNFT.json';

// Constants
const TWITTER_HANDLE = 'prashantnigam_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const contractAddress = "0x85C95a1c400E8Ff8e86e91436EECE55235f82AB5";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletConnected = async () => {
    const {ethereum} = window;
    if(!ethereum) {
      console.log("Make Sure you have metamask installed")
    } else {
      console.log("We have ethereum object", ethereum);
    }
    const accounts = await ethereum.request({method : 'eth_accounts'});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
      setUpEventListener();      
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if(!ethereum) {
        alert("Install Metamask");
        return;
      }

      const accounts = await ethereum.request({method : "eth_requestAccounts"});
      console.log("Connected ", accounts[0]);
      setCurrentAccount(accounts[0]);

      setUpEventListener();
    } catch (error) {
      console.log(error)
    }
  }

  const askContractToMintNFT = async () => {
    try {
      const {ethereum} = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(contractAddress, myEpicNFTJson.abi, signer);

        console.log("Going to pop wallet now to pay gas");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("nft mining...please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
      } else {
        console.log("Metamask not installed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setUpEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(contractAddress, myEpicNFTJson.abi, signer);
        
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`);
        });
        console.log("Setup event listener!")
      } else {
        console.log("Metamask not installed");
      }

    } catch (error) {
      console.log(error);
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletConnected();
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
            currentAccount === "" ? (renderNotConnectedContainer()) : 
              (<button onClick={askContractToMintNFT} className="cta-button connect-wallet-button">Mint NFT</button>)
          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
