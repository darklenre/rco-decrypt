import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { minify_sync } from "terser";

const dirPath = path.dirname(fileURLToPath(import.meta.url));
const startMarker = "// Code Start";
const endMarker = "// Code End";

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
    
    try {
        const result = minify_sync(js, {compress: {defaults: false}});
        console.log("Minification successful, code length:", result.code.length);
        return result.code;
    } catch (error) {
        console.error("Minification error:", error.message);
        return null;
    }
}

const decryptEval = getJavaScript("rcoDecrypt.js");
const minified = getFinalJavaScript(decryptEval);

console.log("Original length:", decryptEval?.length || 0);
console.log("Minified length:", minified?.length || 0);

const jsonData = {
    imageDecryptEval: minified,
    postDecryptEval: null,
    shouldVerifyLinks: false
};

console.log("JSON structure:", Object.keys(jsonData));
console.log("Final JSON length:", JSON.stringify(jsonData).length);