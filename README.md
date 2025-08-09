A Node.js script that generates the configuration needed for RCO (Readcomiconline) extension to work.

## Getting Started
Clone the repository:
   ```bash
   git clone https://github.com/darklenre/rco-decrypt.git
   ```

Install dependencies:
   ```bash
   npm install
   ```

#### Testing and Building
   Test the image parsing logic:
   ```bash
   npm run test
   ```
*Testing for post decryption is not implemented yet as there is currently no need for that feature.*

   Generate the JSON:
   ```bash
   npm run gen
   ```

## Configuration

The script can be configured with these environment variables (configure in `.env`):

```ini
# .env.sample
shouldVerify=false
shouldObfuscate=false
fileName="output.json"
```

For more advanced configuration, see `builder.js` params. 

## Script Structure

Key files in this project:

**rcoDecrypt.js**  
Handles page list parsing from Readcomiconline. Must "return":
```js
JSON.stringify(parsedPageArray)
```

**rcoPostDecrypt.js** (optional)  
Processes the page list array. Must also "return":
```js
JSON.stringify(parsedPageArray)
```

**sampleScriptText.js**  
Example HTML/script content from RCO for testing `rcoDecrypt.js`