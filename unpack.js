import fs from 'fs';

// Read the packed script
const packedScript = fs.readFileSync('sampleScriptText.js', 'utf-8');

// Replace eval with console.log to see the unpacked code instead of executing it
const unpackScript = packedScript.replace(/^eval\(/, 'console.log(');

// Execute to unpack
eval(unpackScript);