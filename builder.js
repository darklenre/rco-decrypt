import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { minify_sync } from "terser";

const dirPath = path.dirname(fileURLToPath(import.meta.url));

// Markers
const startMarker = "// Code Start";
const endMarker = "// Code End";

// Params
const decryptEval = getJavaScript("rcoDecrypt.js");
const postDecryptEval = getJavaScript("rcoPostDecrypt.js");
const shouldVerify = false;
const shouldObfuscate = false;
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
        return minify_sync(js, {compress: {directivess: false}}).code;
    }

    // Logic for obfuscation
    return null;
}

const jsonData = {
    imageDecryptEval: getFinalJavaScript(decryptEval),
    postDecryptEval: getFinalJavaScript(postDecryptEval),
    shouldVerifyLinks: shouldVerify
}

// Save to file
fs.writeFileSync(path.join(dirPath, fileName), JSON.stringify(jsonData, null, 2), "utf-8");
console.log("Done");