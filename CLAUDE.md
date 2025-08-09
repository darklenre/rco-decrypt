# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js utility that generates configuration for RCO (Readcomiconline) extensions by extracting and decrypting image URLs from comic pages. The tool parses obfuscated JavaScript from comic sites and outputs clean JSON configuration.

## Key Commands

```bash
# Install dependencies
npm install

# Test the image parsing logic (runs rcoDecrypt.js with sample data)
npm run test

# Generate the final JSON configuration
npm run gen
```

## Architecture

### Core Components

**rcoDecrypt.js** - Main decryption logic that:
- Reads sample script text from `sampleScriptText.js`
- Uses multiple regex patterns to identify encrypted page arrays
- Applies decryption algorithms to extract clean image URLs
- Filters duplicates and blocked URLs
- Returns JSON array of clean URLs

**builder.js** - Configuration generator that:
- Extracts JavaScript code between `// Code Start` and `// Code End` markers
- Minifies or obfuscates the extracted code based on environment settings
- Combines decryption logic into JSON configuration format
- Outputs final configuration to specified file

**rcoPostDecrypt.js** - Optional post-processing module (currently empty)

### Code Extraction System

The builder uses marker-based extraction:
- Code marked with `// Code Start` and `// Code End` is extracted
- Extracted code is processed (minified/obfuscated) based on environment variables
- Final configuration includes both decrypt and post-decrypt logic

### Environment Configuration

Configure via `.env` file:
```ini
shouldVerify=false          # Enable link verification
shouldObfuscate=false       # Apply code obfuscation
fileName="output.json"      # Output filename
```

## Development Notes

- The `rcoDecrypt.js` file contains the core parsing logic and should return `JSON.stringify(parsedPageArray)`
- Test data should be placed in `sampleScriptText.js` for testing purposes
- The decryption handles multiple obfuscation patterns used by comic sites
- Post-processing is optional and currently unused but architecture supports it

## RCO Script Format Evolution

### Legacy Format (Supported by current tool)
- Direct variable declarations: `var _abc = new Array();`
- Push operations: `_abc.push('encrypted_url');`
- Embedded encrypted URLs in script variables

### Modern Format (Requires adaptation)
- Decryption functions: `beau()`, `baeu()`, `step1()`, `step2()`
- Separated logic from data - functions exist but encrypted URLs loaded separately
- Character replacements: `pw_.g28x` → `b`, `d2pr.x_27` → `h`
- Two-step decryption: substring manipulation then base64 decode
- Need to find where decryption functions are called with actual encrypted data

### Finding Modern RCO Data
Look for additional script tags containing:
1. Function calls: `beau([...])` or `baeu('...')`
2. Variable arrays: `var lstImages = [...]`
3. HTML data attributes: `data-src="encrypted"`
4. Network requests loading encrypted JSON data