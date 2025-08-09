// Let's see what patterns exist in the RCO script
import fs from 'fs';

const script = fs.readFileSync('sampleScriptText.js', 'utf-8');

console.log("Script length:", script.length);
console.log("Contains 'new Array':", script.includes('new Array'));
console.log("Contains '.push(':", script.includes('.push('));
console.log("Contains 'var ':", script.includes('var '));
console.log("Contains step1:", script.includes('step1'));
console.log("Contains step2:", script.includes('step2'));
console.log("Contains beau:", script.includes('beau'));

// Look for variable declarations
const varMatches = script.match(/var\s+[^\s=]+\s*=\s*[^;]+;/g);
console.log("Variable declarations found:", varMatches?.length || 0);

// Look for function calls that might contain encrypted URLs
const functionCallMatches = script.match(/\w+\([^)]*['"][^'"]{20,}['"][^)]*\)/g);
console.log("Function calls with long strings:", functionCallMatches?.length || 0);