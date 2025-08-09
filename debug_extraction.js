// Debug the extraction process to see what's happening
import { readFileSync } from 'fs';

const testScript = `
// Test script with multiple pages
var _n58IyuW = new Array();
var htp = '';

htp = 'page1In__kQUZoc_data1=s1600?param=1';
_n58IyuW.push(htp);

htp = 'page2In__kQUZoc_data2=s1600?param=2';  
_n58IyuW.push(htp);

htp = 'page3In__kQUZoc_data3=s1600?param=3';
_n58IyuW.push(htp);

// Duplicate that should be filtered
htp = 'page1In__kQUZoc_data1=s1600?differentParam=4';
_n58IyuW.push(htp);

htp = 'page4In__kQUZoc_data4=s1600?param=5';
_n58IyuW.push(htp);

function fyrJqauwg8c(z, l) {
    l = l.replace(/In__kQUZoc_/g, 'd');
    return 'https://2.bp.blogspot.com/' + l;
}
`;

console.log("=== Debug Extraction Process ===");

// Step 1: Check if modern format is detected
console.log("1. Modern format detection:");
console.log("   Contains 'fyrJqauwg8c':", testScript.includes('fyrJqauwg8c'));

// Step 2: Check push pattern matching
console.log("\n2. Push pattern matching:");
const pushMatches = [...testScript.matchAll(/_n58IyuW\.push\(htp\)/g)];
console.log("   Push operations found:", pushMatches.length);

// Step 3: Check htp assignment matching  
console.log("\n3. HTP assignment matching:");
const htpMatches = [...testScript.matchAll(/htp\s*=\s*'([^']+)'/g)];
console.log("   HTP assignments found:", htpMatches.length);
htpMatches.forEach((match, i) => {
    console.log(`   ${i+1}. "${match[1]}"`);
    console.log(`      Contains token: ${match[1].includes('In__kQUZoc_')}`);
});

// Step 4: Test decryption function
console.log("\n4. Testing decryption:");
function modernDecryptLink(encryptedUrl) {
    let url = encryptedUrl.replace(/In__kQUZoc_/g, 'd');
    return 'https://2.bp.blogspot.com/' + url;
}

htpMatches.forEach((match, i) => {
    if (match[1].includes('In__kQUZoc_')) {
        const decrypted = modernDecryptLink(match[1]);
        console.log(`   ${i+1}. ${decrypted}`);
    }
});

// Step 5: Test with our actual output.json
console.log("\n5. Testing with actual output.json:");
const outputJson = JSON.parse(readFileSync('output.json', 'utf-8'));
const evalString = `let _encryptedString = ${JSON.stringify(testScript)};let _useServer2 = false;${outputJson.imageDecryptEval}`;

try {
    const result = eval(evalString);
    console.log("   Result type:", typeof result);
    
    if (typeof result === 'string') {
        const parsed = JSON.parse(result);
        console.log("   Pages extracted:", parsed.length);
        console.log("   URLs:", parsed);
        
        // Check for duplicates
        const baseUrls = parsed.map(url => url.split('?')[0]);
        const uniqueBaseUrls = new Set(baseUrls);
        console.log("   Unique base URLs:", uniqueBaseUrls.size);
        
        if (uniqueBaseUrls.size < parsed.length) {
            console.log("   ⚠️  Duplicates found in result!");
        }
    }
    
} catch (error) {
    console.error("   Error:", error.message);
}

console.log("\n=== Checking Real Sample Data ===");
const realScript = readFileSync('sampleScriptText.js', 'utf-8');
console.log("Real script htp matches:", [...realScript.matchAll(/htp\s*=\s*'([^']+)'/g)].length);
console.log("Real script push matches:", [...realScript.matchAll(/_n58IyuW\.push\(htp\)/g)].length);