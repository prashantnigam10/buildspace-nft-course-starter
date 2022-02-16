const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("NFT Contract deployed to address ", nftContract.address);

    let txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
    console.log("#1 NFT minted");

    txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
    console.log("#2 NFT minted");        
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();