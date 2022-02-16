require('dotenv').config()
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  networks : {
    rinkeby : {
      url : "https://eth-rinkeby.alchemyapi.io/v2/3eetaDL9EwcbAP5VtWGTX3De7HEU_I5G" ,
      accounts : [process.env.TEST_RINKEBY_ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan : {
    apiKey : process.env.ETHERSCAN_API_KEY
  }
};

//NFT Contract deployed to address  0x85C95a1c400E8Ff8e86e91436EECE55235f82AB5