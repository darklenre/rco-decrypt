import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { minify_sync } from "terser";

const dirPath = path.dirname(fileURLToPath(import.meta.url));
const startMarker = "// Code Start";
const endMarker = "// Code End";

// Default params since no .env
const shouldVerify = false;
const shouldObfuscate = false;
const fileName = "test_output.json";

function getJavaScript(file) {
    const filePath = path.join(dirPath, file);
    console.log(`Reading file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`File does not exist: ${filePath}`);
        return null;
    }
    
    const data = fs.readFileSync(filePath, "utf-8");
    const dataIndices = [data.indexOf(startMarker), data.indexOf(endMarker)];

    console.log(`Markers found at: ${dataIndices[0]}, ${dataIndices[1]}`);

    if (dataIndices[0] !== -1 && dataIndices[1] !== -1) {
        const extracted = data.substring(dataIndices[0] + startMarker.length, dataIndices[1]).trim();
        console.log(`Extracted ${extracted.length} characters`);
        return extracted;
    } else {
        console.log("Markers not found properly");
        return null;
    }
}

function getFinalJavaScript(js) {
    if (!js) {
        console.log("No JavaScript to process");
        return null;
    }

    console.log("Minifying JavaScript...");
    try {
        const result = minify_sync(js, {compress: {defaults: false}});
        console.log(`Minified successfully: ${result.code.length} characters`);
        return result.code;
    } catch (error) {
        console.error("Minification failed:", error.message);
        return null;
    }
}

console.log("=== Processing rcoDecrypt.js ===");
const decryptEval = getJavaScript("rcoDecrypt.js");
const finalDecrypt = getFinalJavaScript(decryptEval);

console.log("=== Processing rcoPostDecrypt.js ===");
const postDecryptEval = getJavaScript("rcoPostDecrypt.js");
const finalPostDecrypt = getFinalJavaScript(postDecryptEval);

console.log("=== Creating JSON ===");
const jsonData = {
    imageDecryptEval: finalDecrypt,
    postDecryptEval: finalPostDecrypt,
    shouldVerifyLinks: shouldVerify
};

console.log("JSON keys:", Object.keys(jsonData));
console.log("imageDecryptEval present:", !!jsonData.imageDecryptEval);
console.log("postDecryptEval present:", !!jsonData.postDecryptEval);

const jsonString = JSON.stringify(jsonData, null, 2);
console.log("Final JSON length:", jsonString.length);

// Save to test file
fs.writeFileSync(path.join(dirPath, fileName), jsonString, "utf-8");
console.log(`Saved to: ${fileName}`);