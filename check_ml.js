const _ml = ["a","H","R","0","c","H","M","6","L","y","8","y","M","X","d","p","e","i","5","j","b","2","0","v","Y","3","M","v","M","j","A","y","N","T","A","4","M","D","k","y","M","D","M","2","L","m","p","z","P","3","Y","9","M","T","E","w","N","D","Z","m","M","W","V","l","Z","G","Y","w","Y","W","U","3","O","W","E","x","M","T","c","w","Y","m","Y","4","Y","z","Q","2","O","T","A","3","N","z","M","m","X","3","Q","9"];

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

console.log("Decoded URL:", atob(_ml.join('')));