
async function main(){
    // Get Contract File
    const contractFactory = await hre.ethers.getContractFactory('EpicNFT');
    // Deploy contract on local network
    const contract = await contractFactory.deploy();

    // Wait deploy finish
    await contract.deployed();

    // Show deploy address
    console.log("Deployed: ", contract.address)

    // Test NFT Minting
    // call NFT Minter function
    let txn = await contract.makeNFT()

    // Wait finish
    await txn.wait()
}

try{
    main()
}catch(error){
    console.log(error);
}