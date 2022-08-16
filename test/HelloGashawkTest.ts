import { expect } from "chai";
import { BigNumber, Signer } from "ethers";
import { ethers } from "hardhat";

import { HelloGashawk, HelloGashawk__factory } from "../typechain";

describe("Hello Gashawk", function () {
    let accounts: Signer[];
    let helloGashawkContract: HelloGashawk;

    beforeEach(async function () {
        accounts = await ethers.getSigners();

        const helloGashawkFactory = (await ethers.getContractFactory(
            "HelloGashawk",
            accounts[0]
        )) as HelloGashawk__factory;
        helloGashawkContract = await helloGashawkFactory.deploy();
    });

    it("Number should increment", async function () {
        const initialNumber = await helloGashawkContract.number();
        expect(initialNumber).to.equal(BigNumber.from(0));
        await helloGashawkContract.increment();

        const currentNumber = await helloGashawkContract.number();
        expect(currentNumber).to.equal(BigNumber.from(1));
    });
});
