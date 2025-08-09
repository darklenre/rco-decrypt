# Modern RCO Script Analysis

## Functions Found:

### `step1(input)`
- Extracts substring from position 15 to 33, then appends from position 56 onward
- Part of the decryption chain

### `step2(input)` 
- Removes last 11 characters, then appends the last 2 characters
- Prepares data for base64 decoding

### `beau(array, serverUrl)`
- Processes an array of encrypted URLs
- Applies character replacements: `pw_.g28x` → `b`, `d2pr.x_27` → `h`
- Handles both `=s0` and `=s1600` variants
- Uses `step1()` and `step2()` for decryption
- Reconstructs URLs with `https://2.bp.blogspot.com/`

### `baeu(singleUrl, serverUrl)`
- Same logic as `beau()` but for single URL instead of array

## Missing Piece:
The script contains decryption logic but no encrypted data to process.
Need to find where `beau()` or `baeu()` is called with actual encrypted URLs.

## Search Patterns:
1. `beau([...])` or `baeu('...')`  - Function calls with data
2. `var lstImages = [...]` - Common variable name
3. `data-src="encrypted"` - HTML attributes
4. Network requests loading encrypted data