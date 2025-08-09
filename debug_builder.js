import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const dirPath = path.dirname(fileURLToPath(import.meta.url));
const startMarker = "// Code Start";
const endMarker = "// Code End";

function getJavaScript(file) {
    const filePath = path.join(dirPath, file);
    const data = fs.readFileSync(filePath, "utf-8");
    const dataIndices = [data.indexOf(startMarker), data.indexOf(endMarker)];

    console.log(`File: ${file}`);
    console.log(`Start marker at: ${dataIndices[0]}`);
    console.log(`End marker at: ${dataIndices[1]}`);

    if (dataIndices[0] !== -1 && dataIndices[1] !== -1) {
        const extracted = data.substring(dataIndices[0] + startMarker.length, dataIndices[1]).trim();
        console.log(`Extracted code length: ${extracted.length}`);
        console.log(`First 200 chars: ${extracted.substring(0, 200)}`);
        return extracted;
    } else {
        console.log("Markers not found");
        return null;
    }
}

const decryptEval = getJavaScript("rcoDecrypt.js");
console.log("DecryptEval result:", decryptEval ? "Found code" : "No code");