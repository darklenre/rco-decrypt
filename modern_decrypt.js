// Modern RCO URL Decryption Tool
// Based on the functions found in the RCO script

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
    // Apply character replacements
    let url = encryptedUrl.replace(/pw_.g28x/g, 'b').replace(/d2pr.x_27/g, 'h');
    
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
        url = 'https://2.bp.blogspot.com/' + processedUrl;
    }
    
    // Apply server URL replacement if provided
    if (serverUrl && serverUrl !== '' && url.indexOf('ip=') > 0) {
        url = url.replace('https://2.bp.blogspot.com', serverUrl);
    }
    
    return url;
}

// Test with the URL you found
const encryptedUrl = 'https://2.bp.blogspot.com/53CKGVI904nm2r0sSBCXwDxcVvVeT_xqJfD2QcHZdlAjsSNv1K0rAaCvkv4wXtfQr_uzhYPXAZyRVO9amlWN89WvL1M2y5KwAD_PiiOo04LEgqoMIaPwTKlUL07hkrzu-eqNt8ZFVA=s0';

console.log('Original URL:', encryptedUrl);
console.log('Decrypted URL:', baeu(encryptedUrl));