import { Gashawk } from "@corpus-ventures/gashawk-sdk";
import { BigNumber, ethers, Wallet } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { HelloGashawk__factory } from "../typechain";

const PROVIDER_URL = process.env.PROVIDER_URL || "";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "Your private key";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    //For this example we just go with an random wallet
    const PRIVATE_KEY = Wallet.createRandom().privateKey;
    //Use you privateKey and a create an ethers wallet object
    const signer = new Wallet(PRIVATE_KEY, ethers.getDefaultProvider());
    //Creating a new instace of the Gashawk SDK using the signer to log in
    const gashawk = await Gashawk.fromSigner(signer, PROVIDER_URL);
    //Use the gashawkSigner to sign transactions and send them to gashawk.
    const gashawkSigner = gashawk.getSigner();
    //ethers ContractFactory can be used to compile the smart contract code and create the deploy transaction
    const helloGashawkFactory = (await hre.ethers.getContractFactory(
        "HelloGashawk"
    )) as HelloGashawk__factory;

  /*   //Use the gashawk signer to send the deploy transaction to gashawk
    const contractDeployTx = await gashawkSigner.sendTransaction({
        ...helloGashawkFactory.getDeployTransaction(),
        gasLimit: BigNumber.from(150000),
        customData: {
            //Instead of submitting your transaction gashawk can just simulate it for testing purposes
            simulate: true,
        },
    }); */

    await gashawkSigner.sendTransaction({
        to: "0x09c3d8547020a044c4879cD0546D448D362124Ae",
        value: ethers.utils.parseEther("1.23"),
        gasLimit: BigNumber.from(21000),
        customData: {
            simulate: true,
        },
    });
    //If you want to watch the status of your transaction you can use the wait method. Another option is to visit beta.gashawk.io
    //await gashawk.wait(contractDeployTx);
};
export default func;
