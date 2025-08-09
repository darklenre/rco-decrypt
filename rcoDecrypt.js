import { fileURLToPath } from 'url';
import fs from "fs";
import path from "path";

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "sampleScriptText.js");
const _encryptedString = fs.readFileSync(filePath, "utf-8");
// Code Start
const _useServer2 = false;
const pageLinks = new Array();
const urlPattern = /^https?:\/\/(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+\b(?:[\/a-z0-9-._~:?#@!$&'()*+,;=%]*)$/i;
const reverseOrder = false;

// Regex Strings
const replaceSymbol = "{{0}}";
const newArrayRegexLookup = "var\\s+({{0}})\\s*=\\s*new\\s+Array\\(\\)\\s*;";
const equalsRegexLookup = "var\\s+({{0}})\\s*=\\s*''\\s*;";

const pageNewArrayRegex = "(\\b{{0}}\\s*\\.push\\(\\s*['\"])([^'\"]+)(['\"]\\s*\\))";
const pageEqualsRegex = "({{0}})\\s*=\\s*['\"](.*?)['\"]\\s*;?";
const pagePushRegex = "([a-zA-Z0-9]+)\\({{0}},\\s*'([^']+)'\\);";
const pagePushRegexTriParam = "([a-zA-Z0-9]+)\\({{0}},\\s*'[^']*',\\s*'([^']+)'\\);";
const pagePushRegexTriParamSecondShuffle = "([a-zA-Z0-9]+)\\(*'[^']*',\\s{{0}},\\s*'([^']+)'\\);";
const pagePushRegexWeirdParamShuffle = "([^\\s(]+)\\([^,]+,[^,]+,\\s*{{0}},\\s*'([^']+)'";
const pagePushRegexWeirdParamShuffle2 = "([^\\s(]+)\\([^,]+,[^,]+,\\s*{{0}},[^,]+,\\s*'([^']+)'";
const pagePushRegexWeirdParamShuffle3 = "([^\\s(]+)\\(\\s*['\"].*?['\"]\\s*,\\s*['\"].*?['\"]\\s*,\\s*{{0}},\\s*['\"].*?['\"],\\s*['\"].*?['\"],\\s*'(.*?)'";
const pagePushRegexWeirdParamShuffle4 = "([^\\s(]+)\\(\\s*{{0}}\\s*,\\s*['\"]*.*?['\"]*\\s*,\\s*['\"](.*?)['\"]";

// Check if this is modern RCO format (contains fyrJqauwg8c function)
if (_encryptedString.includes('fyrJqauwg8c')) {
  parseModernRCOFormat();
} else {
  // Legacy format parsing
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*''\s*;/g, equalsRegexLookup, pageEqualsRegex);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pageNewArrayRegex);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegex);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegexTriParam);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegexTriParamSecondShuffle);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegexWeirdParamShuffle);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegexWeirdParamShuffle2);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegexWeirdParamShuffle3);
  funniRegexReborn(/var\s+([^\s=]+)\s*=\s+new\s+Array\(\)\s*;/g, newArrayRegexLookup, pagePushRegexWeirdParamShuffle4);
}

// Funni memories
//funniRegex(/var\s+(_[^\s=]+mvn)\s*(?:=\s*[^;]+)?\s*;/);
//funniRegex(/var\s+(_[^\s=]+mxn)\s*(?:=\s*[^;]+)?\s*;/);
//funniRegex(/var\s+(_(?!.*mxn)[a-zA-Z0-9]+)\s*=\s*'rcoz'\s*;/);
//funniRegex(/var\s+(_(\w{7})+)\s*=\s*'rcoz'\s*;/);
//funniRegex(/var\s+(_(\w{7})+)\s*=\s*'rcox'\s*;/);
//funniRegex(/var\s+(_[^\s=]+)\s*=\s*''\s*;/g, true, true);
//funniRegex(/var\s+(c_[^\s=]+)\s*(?:=\s*[^;]+)?\s*;/g, true);
//funniRegex(/var\s+(_[^\s=]+)\s*=\s*new\s+Array\(\)\s*;/g, true);

function funniRegexReborn(reg, lookup, page) {
  const varMatches = [..._encryptedString.matchAll(reg)];

  varMatches.forEach(match => {
    funniRegexAntiStupidlyBlatantAdsReborn(new RegExp(toSophisticatedRegexString(match[1], lookup)), page);
  });
}

function funniRegexAntiStupidlyBlatantAdsReborn(lookupRegex, page) {
  const varMatch = _encryptedString.match(lookupRegex);

  if (!varMatch) {
    return;
  }

  const pagesListRegex = new RegExp(toSophisticatedRegexString(varMatch[1], page), "g");
  const matches = [..._encryptedString.matchAll(pagesListRegex)];

  const array = matches.map(match => match[2]);
  const num = findTheGoat(array);

  matches.forEach((match) => {
    if (match[2]) {
      pageLinks.push(decryptLink(match[2], num));
    }
  });
}

function findTheGoat(array) {
  if (array.length === 0) return 0;

  const potentialGoat = array[0];

  let zeGoat = 0;
  for (let i = 0; i < potentialGoat.length; i++) {
    const char = potentialGoat[i];

    if (array.every(str => str[i] === char)) {
      zeGoat++;
      
      if (zeGoat >= 5 && potentialGoat.slice(zeGoat - 5, zeGoat) === "https") {
        return zeGoat - 5;
      }
    } else {
      break;
    }
  }

  return zeGoat;
}

function toSophisticatedRegexString(varSymbol, regexString) {
  return regexString.replace(replaceSymbol, varSymbol);
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

function parseModernRCOFormat() {
  // Extract encrypted URLs from modern format _n58IyuW.push(htp) pattern
  const pushMatches = [..._encryptedString.matchAll(/_n58IyuW\.push\(htp\)/g)];
  
  if (pushMatches.length > 0) {
    // Find all htp assignments before push operations
    const htpMatches = [..._encryptedString.matchAll(/htp\s*=\s*'([^']+)'/g)];
    
    htpMatches.forEach(match => {
      const encryptedUrl = match[1];
      if (encryptedUrl && encryptedUrl.includes('In__kQUZoc_')) {
        try {
          const decryptedUrl = modernDecryptLink(encryptedUrl);
          if (decryptedUrl) {
            pageLinks.push(decryptedUrl);
          }
        } catch (error) {
          console.error('Error decrypting URL:', error.message);
        }
      }
    });
  }
}

function step1(input) {
  return input.substring(15, 15 + 18) + input.substring(15 + 18 + 17);
}

function step2(input) {
  return input.substring(0, input.length - 11) + input[input.length - 2] + input[input.length - 1];
}

function modernDecryptLink(encryptedUrl) {
  // Apply token replacement first
  let url = encryptedUrl.replace(/In__kQUZoc_/g, 'd');
  
  // Apply character replacements
  url = url.replace(/b/g, 'pw_.g28x').replace(/h/g, 'd2pr.x_27');
  url = url.replace(/pw_.g28x/g, 'b').replace(/d2pr.x_27/g, 'h');
  
  // Only process if it doesn't start with https (encrypted)
  if (url.indexOf('https') !== 0) {
    let processedUrl = url;
    let queryString = processedUrl.substring(processedUrl.indexOf('?'));
    
    // Handle =s0? or =s1600? variants
    if (processedUrl.indexOf('=s0?') > 0) {
      processedUrl = processedUrl.substring(0, processedUrl.indexOf('=s0?'));
    } else {
      processedUrl = processedUrl.substring(0, processedUrl.indexOf('=s1600?'));
    }
    
    // Apply step1 and step2 transformations
    processedUrl = step1(processedUrl);
    processedUrl = step2(processedUrl);
    
    // Decode
    processedUrl = decodeURIComponent(escape(atob(processedUrl)));
    
    // Reconstruct
    processedUrl = processedUrl.substring(0, 13) + processedUrl.substring(17);
    
    // Add appropriate suffix
    if (url.indexOf('=s0') > 0) {
      processedUrl = processedUrl.substring(0, processedUrl.length - 2) + '=s0';
    } else {
      processedUrl = processedUrl.substring(0, processedUrl.length - 2) + '=s1600';
    }
    
    // Add query string back
    processedUrl = processedUrl + queryString;
    
    // Reconstruct full URL
    const domain = !_useServer2 ? "https://2.bp.blogspot.com" : "https://img1.whatsnew247.net/pic";
    url = `${domain}/${processedUrl}${_useServer2 ? "&t=10" : ""}`;
  }
  
  return url;
}

function decryptLink(encryptedString, subStrAt = 0) {
  // First encryption
  let result = encryptedString
    //.replace(/\w{5}__\w{3}__/g, "g")
    //.replace(/\w{2}__\w{6}_/g, "a")
    .replace(/\w{2}__\w{6}_/g, "d")
    .replace(/b/g, "pw_.g28x")
    .replace(/h/g, "d2pr.x_27")
    .replace(/pw_.g28x/g, "b")
    .replace(/d2pr.x_27/g, "h");

  if (subStrAt != 0) {
    result = result.substr(subStrAt, result.length - subStrAt);
  }

  if (result.endsWith("=s0") || result.endsWith("=s1600")) {
    result = result.replace("https://2.bp.blogspot.com/", "") + "?";
  }

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
    if (!item) {
      return false;
    }

    const cleanLink = item.split("?")[0].split("=")[0];
    const isUnique = pageLinks.findIndex(link => link.split("?")[0].split("=")[0] === cleanLink) === index;
    const isNotBlocked = fuckedLinks.indexOf(cleanLink) === -1;
    const matchesPattern = urlPattern.test(cleanLink);
    
    return isUnique && isNotBlocked && matchesPattern;
  });

  return reverseOrder ? cleanLinks.reverse() : cleanLinks;
}

//JSON.stringify(pageLinks);
JSON.stringify(getCleanedLinks());
// Code End

console.log("Count: " + getCleanedLinks().length);

getCleanedLinks().forEach((it, index) => {
  console.log(`Page ${index + 1}: ${it}`)
});

//console.log("test area");
//console.log(decryptLink("-yDnVZDDnEKg/Vk2UbS2x-yI/AAAAAAAAU0o/k0GEC_c2SQ0/s0-Ic42/RCO001.jpg"));
//console.log("Jason: " + JSON.stringify(getCleanedLinks()));