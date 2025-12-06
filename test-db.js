const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Simple parser for .env.local since we can't assume dotenv is installed
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) return {};
        const content = fs.readFileSync(envPath, 'utf8');
        const env = {};
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                // Remove quotes if present
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        return {};
    }
}

const env = loadEnv();
const uri = env.MONGODB_URI;

console.log("---------------------------------------------------");
console.log("MONGODB CONNECTION TEST");
console.log("---------------------------------------------------");

if (!uri) {
    console.error("❌ ERROR: MONGODB_URI not found in .env.local");
    process.exit(1);
}

// Mask password for display
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`Target: ${maskedUri}`);

console.log("Attempting to connect...");

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB successfully!");
        console.log("The issue is likely not with the database connection string or IP.");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ FAILED: Could not connect.");
        console.error(`Error name: ${err.name}`);
        console.error(`Message: ${err.message}`);

        console.log("\nPossible solutions:");
        console.log("1. IP WHITELIST: Go to MongoDB Atlas > Security > Network Access and click 'Add Current IP Address'.");
        console.log("2. PASSWORD CHARS: If your password has symbols like @, :, ?, etc., they must be URL encoded.");
        console.log("   (e.g., replace '@' with '%40')");
        process.exit(1);
    });
