import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, {useEffect, useState} from "react";

// Constants
const TWITTER_HANDLE = 'prashantnigam_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

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
    } catch (error) {
      console.log(error)
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
              (<button onClick={null} className="cta-button connect-wallet-button">Mint NFT</button>)
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
