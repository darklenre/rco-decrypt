import { fileURLToPath } from 'url';
import fs from "fs";
import path from "path";

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "sampleScriptText.js");
const _encryptedString = fs.readFileSync(filePath, "utf-8");
const _useServer2 = false;

// Code Start
const pageLinks = new Array();
const urlPattern = /^https?:\/\/(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+\b(?:[\/a-z0-9-._~:?#@!$&'()*+,;=%]*)$/i;
const reverseOrder = false;

//funniRegex(/var\s+(_[^\s=]+mvn)\s*(?:=\s*[^;]+)?\s*;/);
//funniRegex(/var\s+(_[^\s=]+mxn)\s*(?:=\s*[^;]+)?\s*;/);
//funniRegex(/var\s+(_(?!.*mxn)[a-zA-Z0-9]+)\s*=\s*'rcoz'\s*;/);
//funniRegex(/var\s+(_(\w{7})+)\s*=\s*'rcoz'\s*;/);
//funniRegex(/var\s+(_(\w{7})+)\s*=\s*'rcox'\s*;/);
funniRegex(/var\s+(_[^\s=]+)\s*=\s*''\s*;/g, true, true);
//funniRegex(/var\s+(c_[^\s=]+)\s*(?:=\s*[^;]+)?\s*;/g, true);
funniRegex(/var\s+(_[^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, true);

function funniRegex(reg, all = false, doAltCheck = false) {
  if (all) {
    const varMatches = [..._encryptedString.matchAll(reg)];

    varMatches.forEach(match => {
      if (!doAltCheck) {
        funniRegexRealest(new RegExp(`var\\s+(${match[1]})\\s*=\\s*new\\s+Array\\(\\)\\s*;`), true);
      }
      else {
        funniRegexRealest(new RegExp(`var\\s+(${match[1]})\\s*=\\s*''\\s*;`))
      }
    });
  } else {
    funniRegexRealest(reg);
  }
}

function funniRegexRealest(reg, captureNewArray = false) {
  const varRegex = reg;
  const varMatch = _encryptedString.match(varRegex);
  
  if (varMatch) {
    // Capture ".push(" appends
    //const varMatchClean = varMatch[1].substring(0, 8);
    //const varMatchClean = varMatch[1].substring(1, 9);
    let pagesListRegex;

    if (captureNewArray) {
      pagesListRegex = new RegExp(`(\\b${varMatch[1]}\\s*\\.push\\(\\s*['"])([^'"]+)(['"]\\s*\\))`,'g');
    }
    else {
      // Capture " = "
      pagesListRegex = new RegExp(`(${varMatch[1]})\\s*=\\s*['"](.*?)['"]\\s*;?`, 'gs');
    }

    const matches = [..._encryptedString.matchAll(pagesListRegex)];

    matches.forEach((match, index) => {
        //if (index > 0 && match[2]) {
        if (match[2]) {
        //if (match[2] && match[2].indexOf("https://2.bp.blogspot.com/") === -1) {

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
    //.replace(/\w{5}__\w{3}__/g, "g")
    .replace(/\w{2}__\w{6}_/g, "e")
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

const fuckedLinks = [
  "https://2.bp.blogspot.com/pw/AP1GczP6zCVVfdmN6OoVnm7CLvEfmHMUawyEwJWouX9C6SHwsiuYfLkUr9FsM6Zo34qNzPKeQeahBx9ckBZJQckiJmX1UwKD7uh900yz5rKyG4zT2rfIrqFviEJIev1Pg_pGRuSG57rIH6BDwGCTmiE4MjA",
  "https://2.bp.blogspot.com/pw/AP1GczP48thKMga7cud0tjtHtYqsvZzhYY0HyAxVzM3O1D6tkLbi0fT9NDZFFFH69hNnoGsnqJSEIh4mmpEoU1BJSfNXIz1f5aLXl41RM9os7ePn7ipbrYbIuqiQxAV0hhJZrNLl7FmauwLQ01paCrP6KAE",
  "https://2.bp.blogspot.com/pw/AP1GczNXprTMfAP2AHFFWvCbKq6qReXrqSohz87KeBjV0nh6XoLsE1NpzL7Rp9llxoY208IPARiIDON_TO6dZB0ZMNeB8J7xzUzbS9h6To7aGpOZshFofw-wFQ0KJ3y3wolSwzLrduZZ_0w8_6gGuTEB-98",
  "https://2.bp.blogspot.com/pw/AP1GczMVY_zWeag2n981CRX7jaZ73Sr0NtidtJhnvJ3-Rmh2fIo-PoQRI0ZksQEbpTjDHgBeNYbQ2hQodsY-Dv0FXUhiU_mus5z5L5lMVAH82kXYqOd2IEw",
  "https://2.bp.blogspot.com/pw/AP1GczOKY-6EDGVvlQGB2wj0xxB5JgcyiujFJC3CHgwqBOLIidwmoP6DLiMpX__Fw6MMPvLezN6soeV0A8pKSHUrC4rxZyO5vov40g1g4ipZdkFlzUouAFA",
  "https://2.bp.blogspot.com/pw/AP1GczO8AETT3k19nhJwxHm0sHCSy0tXyhSOYxnq3EUrmlvgY5yPqDaxcd1XZ7reQKH-lKgpGK4o3sW_9Yu6feqii79riXN3Ghi8Xs1S5Z4wi-aeHrq5PzOX"
];

function getCleanedLinks() {
  const cleanLinks = pageLinks.filter((item, index) => {
    const cleanLink = item.split("?")[0].split("=")[0]

    return pageLinks.indexOf(item) === index && fuckedLinks.indexOf(cleanLink) === -1 && urlPattern.test(cleanLink);
    //return true;
  });

  if (reverseOrder) {
    return cleanLinks.reverse();
  }
  
  return cleanLinks;
}

//JSON.stringify(pageLinks);
JSON.stringify(getCleanedLinks());
// Code End

console.log("Count: " + getCleanedLinks().length);

getCleanedLinks().forEach((it, index) => {
  console.log(`Page ${index + 1}: ${it}`)
});

//console.log("Jason: " + JSON.stringify(getCleanedLinks()));