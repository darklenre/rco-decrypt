import { fileURLToPath } from 'url';
import fs from "fs";
import path from "path";

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "sampleScriptText.js");
const _encryptedString = fs.readFileSync(filePath, "utf-8");
const _useServer2 = false;

// Code Start
const pageLinks = new Array();

funniRegex(/var\s+(_[^\s=]+mvn)\s*(?:=\s*[^;]+)?\s*;/);
funniRegex(/var\s+(_[^\s=]+mxn)\s*(?:=\s*[^;]+)?\s*;/);
funniRegex(/var\s+(_[^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, true);

function funniRegex(reg, all = false) {
  if (all) {
    const varMatches = [..._encryptedString.matchAll(reg)];

    varMatches.forEach(match => {
      funniRegexReal(new RegExp(`var\\s+(${match[1]})\\s*=\\s*new\\s+Array\\(\\)\\s*;`));
    });
  } else {
    funniRegexReal(reg);
  }
}

function funniRegexReal(reg) {
  const varRegex = reg;
  const varMatch = _encryptedString.match(varRegex);
  
  if (varMatch) {
    // Capture ".push(" appends
    const varMatchClean = varMatch[1].substring(0, 8);
    const pagesListRegex = new RegExp(`(\\b${varMatchClean}\\s*\\.push\\(\\s*['"])([^'"]+)(['"]\\s*\\))`,'g');

    //const pagesListRegex = new RegExp(`(${varMatch[1]})\\s*=\\s*['"](.*?)['"]\\s*;?`, 'gs');
    const matches = [..._encryptedString.matchAll(pagesListRegex)];

    matches.forEach((match, index) => {
        //if (index > 0 && match[2]) {
        //if (match[2]) {
        if (match[2] && match[2].indexOf("https://2.bp.blogspot.com/") === -1) {

          pageLinks.push(decryptLink(match[2]));
        }
    });
  }
}

function atob(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = String(input).replace(/=+$/, '');
    if (str.length % 4 === 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    let output = '';
    for (let bc = 0, bs, buffer, i = 0; (buffer = str.charAt(i++)); ~buffer &&
        (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? (output += String.fromCharCode(255 & bs >> (-2 * bc & 6))) : 0) {
        buffer = chars.indexOf(buffer);
    }
    return output;
}

function decryptLink(encryptedString) {
  // First encryption
  let result = encryptedString
    .replace(/\w{5}__\w{3}__/g, "g")
    .replace(/\w{2}__\w{6}_/g, "a")
    .replace(/b/g, "pw_.g28x")
    .replace(/h/g, "d2pr.x_27")
    .replace(/pw_.g28x/g, "b")
    .replace(/d2pr.x_27/g, "h");

  // Second encryption
  if (!result.startsWith("https")) {
    const queryIndex = result.indexOf("?");
    const firstStringSubS = result.substring(queryIndex);
    const isS0 = result.includes("=s0?");
    const splitIndex = isS0
      ? result.indexOf("=s0?")
      : result.indexOf("=s1600?");

    // Extract main part
    let mainPart = result.substring(0, splitIndex);

    // Step 1
    mainPart = mainPart.substring(15, 33) + mainPart.substring(50);

    // Step 2
    const len = mainPart.length;
    mainPart =
      mainPart.substring(0, len - 11) + mainPart[len - 2] + mainPart[len - 1];

    // Base64 decode and URL decode
    const decodedBytes = atob(mainPart);
    let decodedStr = decodeURIComponent(decodedBytes);

    // Reconstruct string
    decodedStr = decodedStr.substring(0, 13) + decodedStr.substring(17);
    decodedStr =
      decodedStr.substring(0, decodedStr.length - 2) +
      (isS0 ? "=s0" : "=s1600");

    const domain = !_useServer2 ? "https://2.bp.blogspot.com" : "https://img1.whatsnew247.net/pic";

    result = `${domain}/${decodedStr}${firstStringSubS}${_useServer2 ? "&t=10" : ""}`;
  }

  return result;
}

var fuckedLinks = [
  "https://2.bp.blogspot.com/pw/AP1GczP6zCVVfdmN6OoVnm7CLvEfmHMUawyEwJWouX9C6SHwsiuYfLkUr9FsM6Zo34qNzPKeQeahBx9ckBZJQckiJmX1UwKD7uh900yz5rKyG4zT2rfIrqFviEJIev1Pg_pGRuSG57rIH6BDwGCTmiE4MjA",
];

function getCleanedLinks() {
  return pageLinks.filter(item => fuckedLinks.indexOf(item.split("=")[0]) === -1);
}

//JSON.stringify(pageLinks);
JSON.stringify(getCleanedLinks());
// Code End

console.log("Count: " + getCleanedLinks().length);

getCleanedLinks().forEach((it, index) => {
  console.log(`Page ${index + 1}: ${it}`)
});

//console.log("Jason: " + JSON.stringify(getCleanedLinks()));