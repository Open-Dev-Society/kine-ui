import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "../registry.json");
const PUBLIC_R_PATH = path.join(__dirname, "../public/r");
const STYLES_PATH = path.join(PUBLIC_R_PATH, "styles/default");

// Ensure directories exist
if (!fs.existsSync(PUBLIC_R_PATH)) {
    fs.mkdirSync(PUBLIC_R_PATH, { recursive: true });
}
if (!fs.existsSync(STYLES_PATH)) {
    fs.mkdirSync(STYLES_PATH, { recursive: true });
}

// Read main registry
const registryData = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));

async function buildRegistry() {
    console.log("Building Kine UI component registry...");

    for (const item of registryData.items) {
        console.log(`Processing ${item.name}...`);

        const filesWithContent = [];

        for (const fileDoc of item.files) {
            const filePath = path.join(__dirname, "..", fileDoc.path);

            if (!fs.existsSync(filePath)) {
                console.error(`Warning: File not found: ${filePath}`);
                continue;
            }

            const content = fs.readFileSync(filePath, "utf-8");

            // Re-write internal imports so they work when a user installs them via Shadcn CLI
            // In shadcn, standard files are dumped in @/components. But our users might put it in @/components/kine
            // We'll leave imports as-is assuming they use standard paths or the CLI resolves it.
            // If they are local specific like `./KineProvider`, standard shadcn CLI replaces them based on registry dependencies.

            // Extract whether this is a core file or a gesture file
            // path.dirname(fileDoc.path) gets us 'src/registry/core' or 'src/registry/gestures'
            const folderName = path.basename(path.dirname(fileDoc.path));

            filesWithContent.push({
                path: path.basename(fileDoc.path), // Just the filename for the payload
                content,
                type: fileDoc.type,
                target: `components/kine/${folderName}/${path.basename(fileDoc.path)}` // Preserve 'core' or 'gestures' nesting
            });
        }

        const payload = {
            name: item.name,
            type: item.type,
            dependencies: item.dependencies || [],
            registryDependencies: item.registryDependencies || [],
            files: filesWithContent,
        };

        const outputPath = path.join(STYLES_PATH, `${item.name}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));

        console.log(`✓ Wrote ${outputPath}`);
    }

    console.log("Registry build complete!");
}

buildRegistry().catch(console.error);
