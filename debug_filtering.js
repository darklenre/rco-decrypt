// Debug the filtering logic to understand why pages are being filtered out
import { readFileSync } from 'fs';

// Read our current script
const sampleScript = readFileSync('sampleScriptText.js', 'utf-8');

// Simulate some test URLs to see how filtering works
const testUrls = [
    // Valid unique URLs
    "https://2.bp.blogspot.com/page1=s1600?param=1",
    "https://2.bp.blogspot.com/page2=s1600?param=2", 
    "https://2.bp.blogspot.com/page3=s1600?param=3",
    
    // Duplicate (should be filtered)
    "https://2.bp.blogspot.com/page1=s1600?param=1",
    
    // Same base URL, different params (should be filtered as duplicate)
    "https://2.bp.blogspot.com/page1=s1600?param=different",
    
    // Invalid URL (should be filtered)
    "not-a-url",
    
    // Blocked URL (should be filtered)
    "https://2.bp.blogspot.com/pw/AP1GczP6zCVVfdmN6OoVnm7CLvEfmHMUawyEwJWouX9C6SHwsiuYfLkUr9FsM6Zo34qNzPKeQeahBx9ckBZJQckiJmX1UwKD7uh900yz5rKyG4zT2rfIrqFviEJIev1Pg_pGRuSG57rIH6BDwGCTmiE4MjA",
];

const urlPattern = /^https?:\/\/(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+\b(?:[\/a-z0-9-._~:?#@!$&'()*+,;=%]*)$/i;
const reverseOrder = false;

const fuckedLinks = [
    "https://2.bp.blogspot.com/pw/AP1GczP6zCVVfdmN6OoVnm7CLvEfmHMUawyEwJWouX9C6SHwsiuYfLkUr9FsM6Zo34qNzPKeQeahBx9ckBZJQckiJmX1UwKD7uh900yz5rKyG4zT2rfIrqFviEJIev1Pg_pGRuSG57rIH6BDwGCTmiE4MjA",
    "https://2.bp.blogspot.com/pw/AP1GczP48thKMga7cud0tjtHtYqsvZzhYY0HyAxVzM3O1D6tkLbi0fT9NDZFFFH69hNnoGsnqJSEIh4mmpEoU1BJSfNXIz1f5aLXl41RM9os7ePn7ipbrYbIuqiQxAV0hhJZrNLl7FmauwLQ01paCrP6KAE",
    "https://2.bp.blogspot.com/pw/AP1GczNXprTMfAP2AHFFWvCbKq6qReXrqSohz87KeBjV0nh6XoLsE1NpzL7Rp9llxoY208IPARiIDON_TO6dZB0ZMNeB8J7xzUzbS9h6To7aGpOZshFofw-wFQ0KJ3y3wolSwzLrduZZ_0w8_6gGuTEB-98",
    "https://2.bp.blogspot.com/pw/AP1GczMVY_zWeag2n981CRX7jaZ73Sr0NtidtJhnvJ3-Rmh2fIo-PoQRI0ZksQEbpTjDHgBeNYbQ2hQodsY-Dv0FXUhiU_mus5z5L5lMVAH82kXYqOd2IEw",
    "https://2.bp.blogspot.com/pw/AP1GczOKY-6EDGVvlQGB2wj0xxB5JgcyiujFJC3CHgwqBOLIidwmoP6DLiMpX__Fw6MMPvLezN6soeV0A8pKSHUrC4rxZyO5vov40g1g4ipZdkFlzUouAFA",
    "https://2.bp.blogspot.com/pw/AP1GczO8AETT3k19nhJwxHm0sHCSy0tXyhSOYxnq3EUrmlvgY5yPqDaxcd1XZ7reQKH-lKgpGK4o3sW_9Yu6feqii79riXN3Ghi8Xs1S5Z4wi-aeHrq5PzOX"
];

function debugFilter(pageLinks) {
    console.log("=== Debug Filtering Logic ===");
    console.log("Input URLs:", pageLinks.length);
    
    const filterResults = [];
    
    const cleanLinks = pageLinks.filter((item, index) => {
        const result = {
            index,
            url: item,
            passed: true,
            reasons: []
        };
        
        if (!item) {
            result.passed = false;
            result.reasons.push("URL is null/undefined");
            filterResults.push(result);
            return false;
        }

        const cleanLink = item.split("?")[0].split("=")[0];
        result.cleanLink = cleanLink;
        
        const isUnique = pageLinks.findIndex(link => link.split("?")[0].split("=")[0] === cleanLink) === index;
        const isNotBlocked = fuckedLinks.indexOf(cleanLink) === -1;
        const matchesPattern = urlPattern.test(cleanLink);
        
        if (!isUnique) {
            result.passed = false;
            result.reasons.push("Not unique (duplicate)");
        }
        
        if (!isNotBlocked) {
            result.passed = false;
            result.reasons.push("URL is in blocked list");
        }
        
        if (!matchesPattern) {
            result.passed = false;
            result.reasons.push("URL doesn't match pattern");
        }
        
        filterResults.push(result);
        return isUnique && isNotBlocked && matchesPattern;
    });
    
    console.log("\n=== Filter Results ===");
    filterResults.forEach(result => {
        console.log(`[${result.index}] ${result.passed ? "✅" : "❌"} ${result.url?.substring(0, 60)}...`);
        if (result.cleanLink) console.log(`     Clean: ${result.cleanLink}`);
        if (result.reasons.length > 0) console.log(`     Reasons: ${result.reasons.join(", ")}`);
        console.log("");
    });
    
    console.log(`\n=== Summary ===`);
    console.log(`Total input: ${pageLinks.length}`);
    console.log(`Passed filter: ${cleanLinks.length}`);
    console.log(`Filtered out: ${pageLinks.length - cleanLinks.length}`);
    
    return cleanLinks;
}

console.log("Testing with sample URLs:");
debugFilter(testUrls);

// Test with real decrypted URLs from our current sample
console.log("\n\n=== Testing with Real Sample Data ===");

// Extract the decrypted URLs from our test
const realUrls = [
    "https://2.bp.blogspot.com/53CKGVI904nm2r0sSBCXwDxcVvVeT_xqJfD2QcHZdlAjsSNv1K0rAaCvkv4wXtfQr_uzhYPXAZyRVO9amlWN89WvL1M2y5KwAD_PiiOo04LEgqoMIaPwTKlUL07hkrzu-eqNt8ZFVA=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA",
    "https://2.bp.blogspot.com/C4B48HcQdSRYAJhQ0dVYcgfnC5jrIECe7cb9JFwvxt9kmW2_q8eB5xn9t0XVNz3IZuGzERaZDrOQA4dNWTuwKu-sqGwa3WgIdG-uagzCZ6qhHpKS9TRopaGyovh2nxOc5L6Map558w=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA",
    "https://2.bp.blogspot.com/fyTUl0cKU2suP4i5GeGNQJQdGRoq_3Z3Oj0R0EDWZ2ol6PBImk5A6cvkLFpR03QlAw3Xyd1G-SNzQksA5B8CHXKaumwTGlZo4rPFBX0mUXdJomKhvLdwyiZroodDdSmfcMdlh-AXrw=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA",
    "https://2.bp.blogspot.com/1irez1PQqIG6w8y2NzlCj8H1Y7zZJLhzpGjGu72m2g3wV5SD74JLHNQNuglhzOwGkdihAaXwBERqiPMLLJ4rAnjvMSgkdoHuJlM1nW9UwZX8jbsa6ZnrDu68FFUDS9h5cd3vGN_xow=s1600?rhlupa=MTg1LjguMTk4LjEyOC44LzkvMjAyNSAxMDozNjoyMCBBTS0wLXIwLXM=&rnvuka=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxNDEuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xNDEuMA"
];

debugFilter(realUrls);