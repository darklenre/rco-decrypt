// Test script to simulate Mihon RCO extension execution
import { readFileSync } from 'fs';
import path from 'path';

const outputJson = JSON.parse(readFileSync('output.json', 'utf-8'));

// Simulate the encrypted script content (this would come from RCO webpage)
const sampleScriptContent = readFileSync('sampleScriptText.js', 'utf-8').trim();

// Simulate server selection (false = blogspot, true = img1.whatsnew247.net)
const useSecondServer = false;

// This is exactly what Mihon does - construct the evaluation string
const evalString = `let _encryptedString = ${JSON.stringify(sampleScriptContent)};let _useServer2 = ${useSecondServer};${outputJson.imageDecryptEval}`;

console.log("=== Mihon Simulation Test ===");
console.log("_encryptedString length:", sampleScriptContent.length);
console.log("_useServer2:", useSecondServer);
console.log("imageDecryptEval length:", outputJson.imageDecryptEval.length);
console.log("");

// Add trimIndent function for compatibility
String.prototype.trimIndent = function() {
    return this.trim();
};

console.log("=== Executing Evaluation String ===");
console.log("First 200 chars of eval:", evalString.substring(0, 200));
console.log("Last 100 chars of eval:", evalString.substring(evalString.length - 100));
console.log("");

try {
    // Execute the evaluation string (simulating QuickJS)
    const result = eval(evalString);
    
    console.log("=== Execution Result ===");
    console.log("Result type:", typeof result);
    console.log("Result:", result);
    
    if (typeof result === 'string') {
        try {
            const parsed = JSON.parse(result);
            console.log("Parsed array length:", parsed.length);
            console.log("First 3 URLs:", parsed.slice(0, 3));
        } catch (parseError) {
            console.error("Failed to parse result as JSON:", parseError.message);
        }
    }
    
} catch (error) {
    console.error("=== Execution Error ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    
    // Check for syntax issues
    console.log("\n=== Debugging ===");
    const lines = evalString.split('\n');
    console.log("Total lines:", lines.length);
    
    // Check for common syntax issues
    const problematicLines = lines.filter((line, index) => {
        // Look for potential issues
        return line.includes('const ') && line.includes('const ') ||
               line.includes('let ') && line.includes('let ') ||
               line.includes('function ') && line.includes('function ');
    });
    
    if (problematicLines.length > 0) {
        console.log("Potentially problematic lines:", problematicLines);
    }
}