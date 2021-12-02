async function main(){
    // Get Contract File
    const contract = await hre.ethers.getContractFactory('EpicNFT');
    // Deploy contract on local network
    const contractDeploy = await contract.deploy();

    // Wait deploy finish
    await contractDeploy.deployed();

    // Show deploy address
    console.log("Deployed: ", contractDeploy.address)
}

try{
    main()
}catch(error){
    console.log(error);
}