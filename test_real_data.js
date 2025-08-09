// Test with real RCO encrypted data
import { readFileSync } from 'fs';

// Modern RCO decryption functions (extracted from your script)
function step1(input) {
    return input.substring(15, 15 + 18) + input.substring(15 + 18 + 17);
}

function step2(input) {
    return input.substring(0, input.length - 11) + input[input.length - 2] + input[input.length - 1];
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

function baeu(encryptedUrl, serverUrl = null) {
    // Apply character replacements first
    let url = encryptedUrl.replace(/pw_.g28x/g, 'b').replace(/d2pr.x_27/g, 'h');
    
    // Only process if it doesn't start with https (meaning it's encrypted)
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
        url = 'https://2.bp.blogspot.com/' + processedUrl;
    }
    
    return url;
}

function fyrJqauwg8c(z, l) {
    // Replace the token with 'd'
    l = l.replace(/In__kQUZoc_/g, 'd');
    // Apply character replacements
    l = l.replace(/b/g, 'pw_.g28x');
    l = l.replace(/h/g, 'd2pr.x_27');
    return baeu(l, '');
}

// Test data extracted from the HTML - first few encrypted strings
const encryptedStrings = [
    'NhTUIn__kQUZoc_VN1L0In__kQUZoc_N1TENTNDS0In__kQUZoc_WSTkwNG5tMjMpnjjM5Sw3SVS2TYFRDbnNyMHNTQkNYIn__kQUZoc_0R4Y1Z2VmVUX3hxSmZEMlFjSFpkbEFqc1NOIn__kQUZoc_jFLMHJBYUN2a3Y0In__kQUZoc_1h0ZlFyX3V6aFlQWEFaeVJWTzlhbWxXTjg5V3ZMMU0yeTVLIn__kQUZoc_0FEX1BpaU9vMDRMRWIn__kQUZoc_xb01JYVB3VEtsVUwwN2hrcnp1LWVxTnQ4WkZWQTIn__kQUZoc_OkqNbyFDBC=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA',
    
    'pQi1lFRhnCMZIn__kQUZoc_3ZQzRCNDhIY1FkU1JZQVcZlF4FIn__kQUZoc_NUZ2UN1JDaNCUlFKaFEwZFZZY2In__kQUZoc_mbkM1anJJRUNlN2NiOUpGIn__kQUZoc_3Z4In__kQUZoc_DlrbVcyX3E4ZUI1eG45In__kQUZoc_DBYVk56M0laIn__kQUZoc_UIn__kQUZoc_6RVJhWkRyT1FBNGROV1R1In__kQUZoc_0t1LXNxR3In__kQUZoc_hM1In__kQUZoc_nSWRHLXVhZ3pDWjZxaEhwS1M5VFJvcGFHeW92aDJueE9jNUw2TWFwNTU4In__kQUZoc_2Rk42XZbwDhk=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA',
    
    'aIn__kQUZoc_cFDUNTV1wFVSnZnlUVWwwY0tVMnN1UDR1UCUsVMUFUBUonztJUczU0aTVHZUIn__kQUZoc_OUUpRZEIn__kQUZoc_Sb3FfM1ozT2owUjBFRFIn__kQUZoc_aMm9sNlBCSW1rNUE2Y3ZrTEZwUjAzUWxBIn__kQUZoc_zNYeWQxRy1TTnpRa3NBNUI4Q0hYS2F1bXIn__kQUZoc_UR2xabzRyUEZCWDBtVVhkSm9tS2h2TGR3eWlacm9vZERkU21mY01kbGgtQVhyIn__kQUZoc_2Mw3UENpWOll=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA'
];

console.log('=== Testing Modern RCO Decryption ===\n');

// Test each encrypted string
encryptedStrings.forEach((encrypted, index) => {
    console.log(`Page ${index + 1}:`);
    console.log('Encrypted:', encrypted.substring(0, 80) + '...');
    
    try {
        const decrypted = fyrJqauwg8c(3, encrypted);
        console.log('Decrypted:', decrypted);
        console.log();
    } catch (error) {
        console.log('Error:', error.message);
        console.log();
    }
});

console.log('=== POC Complete ===');