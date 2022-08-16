import { Gashawk } from "@corpus-ventures/gashawk-sdk";
import { ethers, Signer, Wallet } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { HelloGashawk, HelloGashawk__factory } from "../typechain";

const PROVIDER_URL = process.env.PROVIDER_URL || "";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "Your private key";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const signer = new Wallet(PRIVATE_KEY, ethers.getDefaultProvider());
    //Creating a new instace of the Gashawk SDK using the signer to log in
    const gashawk = await Gashawk.fromSigner(signer, PROVIDER_URL);
    const gashawkSigner = gashawk.getSinger();

    const helloGashawkFactory = (await hre.ethers.getContractFactory(
        "HelloGashawk",
        gashawkSigner
    )) as HelloGashawk__factory;

    const tx = await gashawkSigner.sendTransaction({
        ...helloGashawkFactory.getDeployTransaction(),
        customData: {
            //Instead of submitting your transaction gashawk can just simulate it for testing purposes
            simulate: true,
        },
    });

    await gashawk.wait(tx);
};
export default func;
