import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { minify_sync } from "terser";
import JavaScriptObfuscator from 'javascript-obfuscator';

const dirPath = path.dirname(fileURLToPath(import.meta.url));

// Markers
const startMarker = "// Code Start";
const endMarker = "// Code End";

// Params
const decryptEval = getJavaScript("rcoDecrypt.js");
const postDecryptEval = getJavaScript("rcoPostDecrypt.js");
const shouldVerify = false;
const shouldObfuscate = true;
const fileName = "output.json";

function getJavaScript(file) {
    const filePath = path.join(dirPath, file);
    const data = fs.readFileSync(filePath, "utf-8");
    const dataIndices = [data.indexOf(startMarker), data.indexOf(endMarker)];

    if (dataIndices[0] !== -1 && dataIndices[1] !== -1) {
        return data.substring(dataIndices[0] + startMarker.length, dataIndices[1]).trim();
    } else {
        return null;
    }
}

function getFinalJavaScript(js) {
    if (!js) {
        return null;
    }

    if (!shouldObfuscate) {
        return minify_sync(js, {compress: {defaults: false}}).code;
    }

    // Logic for obfuscation, So scuffed
    const obfuscationResult = JavaScriptObfuscator.obfuscate(js, {
        target: "node",
        compact: true,
        simplify: true,
        renameProperties: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 1,
        stringArray: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 4,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersChainedCalls: true,
        splitStrings: true,
        splitStringsChunkLength: 3,
        stringArrayThreshold: 0.75,
        stringArrayIndexShift: true
    });

    return obfuscationResult.getObfuscatedCode();
}

const jsonData = {
    imageDecryptEval: getFinalJavaScript(decryptEval),
    postDecryptEval: getFinalJavaScript(postDecryptEval),
    shouldVerifyLinks: shouldVerify
}

// Save to file
fs.writeFileSync(path.join(dirPath, fileName), JSON.stringify(jsonData, null, 2), "utf-8");
console.log("Done");