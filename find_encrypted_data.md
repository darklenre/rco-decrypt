# Finding Encrypted Data in Modern RCO

## What You Found in Network Tab

The URL `https://2.bp.blogspot.com/53CKGVI904nm2r0sSBCXwDxcVvVeT_xqJfD2QcHZdlAjsSNv1K0rAaCvkv4wXtfQr_uzhYPXAZyRVO9amlWN89WvL1M2y5KwAD_PiiOo04LEgqoMIaPwTKlUL07hkrzu-eqNt8ZFVA=s0` is **already decrypted**.

## What to Look For

The encrypted data would be **raw strings** that get passed to the `beau()` function, like:

```javascript
// Raw encrypted strings (what we need):
"53CKGVI904nm2r0sSBCXwDxcVvVeT_xqJfD2QcHZdlAjsSNv1K0rAaCvkv4wXtfQr_uzhYPXAZyRVO9amlWN89WvL1M2y5KwAD_PiiOo04LEgqoMIaPwTKlUL07hkrzu-eqNt8ZFVA=s0"

// Or function calls:
beau(["encrypted1", "encrypted2", "encrypted3"]);
```

## Search the Comic Page HTML For:

1. **Script tags with arrays:**
   ```html
   <script>
   var lstImages = ["encrypted1", "encrypted2", ...];
   </script>
   ```

2. **Function calls with data:**
   ```javascript
   beau(someArray);
   baeu("encrypted_string");
   ```

3. **Data attributes:**
   ```html
   <img data-src="encrypted_string">
   ```

4. **JSON responses** in Network tab containing arrays of encrypted strings

## Modern RCO Process:
1. JavaScript loads encrypted strings
2. Calls `beau()` function with encrypted array
3. `beau()` applies decryption and outputs clean URLs
4. Browser loads the clean image URLs (what you saw in Network tab)

The clean URLs you found prove the decryption is working - you just need to find where the raw encrypted data originates.