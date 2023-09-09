const fs = require('fs');
const { ethers } = require('hardhat');
async function main() {
  const [deployer, user1] = await ethers.getSigners();
  // We get the contract factory to deploy
  console.log("Deploying contracts with the account", deployer.address);
  const DecentratwitterFactory = await ethers.getContractFactory("Decentratwitter");
  // Deploy contract
  const decentratwitter = await DecentratwitterFactory.deploy();
  console.log("Decentrattwitter Address", await decentratwitter.getAddress());
  // Save contract address file in project
  const contractsDir = __dirname + "/../src/contractsData";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/decentratwitter-address.json`,
    JSON.stringify({ address: decentratwitter.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync("Decentratwitter");

  fs.writeFileSync(
    contractsDir + `/decentratwitter.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  console.log("Decentratwitter deployed to:", decentratwitter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3