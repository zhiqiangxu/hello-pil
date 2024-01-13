const { FGL, starkSetup, starkGen, starkVerify } = require("pil-stark");
const { newConstantPolsArray, newCommitPolsArray, compile, verifyPil } = require("pilcom");
const path = require("path");
// Files
const pilFile = path.join(__dirname, "mfibonacci.pil");
const input = require("./mfib.input.json");
const mFibExecutor = require("./executor_mfibonacci");
const starkStruct = require("./mfib.starkstruct.json");

async function generateAndVerifyPilStark() {
    // Generate constants (preprocessed)
    console.log("start ...");
    const pil = await compile(FGL, pilFile);
    console.log("newConstantPolsArray ...");
    const constPols = newConstantPolsArray(pil);
    console.log("newCommitPolsArray ...");
    const cmPols = newCommitPolsArray(pil);
    console.log("buildConstants ...");
    await mFibExecutor.buildConstants(constPols.mFibonacci);
    console.log("execute ...");
    const executionResult = await mFibExecutor.execute(cmPols.mFibonacci, input);
    console.log(executionResult);


    console.log("verifyPil ...");
    // Generate trace
    const evaluationPilResult = await verifyPil(FGL, pil, cmPols, constPols);
    if (evaluationPilResult.length != 0) {
        console.log("Abort: the execution trace generated does not satisfy the PIL description!");
        for (let i = 0; i < evaluationPilResult.length; i++) {
            console.log(pilVerificationResult[i]);
        } return;
    } else {
        console.log("Continue: execution trace matches the PIL!");
    }

    console.log("starkSetup ...");
    // Setup for the stark
    const setup = await starkSetup(constPols, pil, starkStruct);

    console.log("starkGen ...");
    // Generate the stark
    const proverResult = await starkGen(cmPols, constPols, setup.constTree, setup.starkInfo);

    console.log("starkVerify ...");
    // Verify the stark
    const verifierResult = await starkVerify(proverResult.proof, proverResult.publics, setup.constRoot, setup.starkInfo);
    if (verifierResult === true) {
        console.log("VALID proof!");
    } else { console.log("INVALID proof!"); }


}
generateAndVerifyPilStark();
