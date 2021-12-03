require('@nomiclabs/hardhat-waffle'); 
module.exports = { 
  solidity: '0.8.0', 
  networks: { 
    rinkeby: { 
      url: process.env.ALCHEMY_URL, 
      accounts: [process.env.RINKEBY_PRIVATE_KEY], 
    }, 
  },
  paths: { 
    sources: "./src/contracts", 
    tests: "./src/test", 
    cache: "./src/cache", 
    artifacts: "./src/artifacts" 
  },
};