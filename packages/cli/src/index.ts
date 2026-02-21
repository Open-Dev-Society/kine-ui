#!/usr/bin/env node

import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import ora from "ora";
import fetch from "node-fetch";
import { execSync } from "child_process";

// Kine UI public registry URL
const REGISTRY_URL = "https://kine-ui.vercel.app/r/styles/default";

const program = new Command();

program
    .name("kine-ui")
    .description("Add spatial computing gestures to your React applications.")
    .version("1.0.0");

program
    .command("init")
    .description("Initialize Kine UI in your Next.js project")
    .action(async () => {
        console.log(chalk.bold.blue("Welcome to Kine UI!"));
        console.log("Let's configure your spatial computing environment.\n");

        const response = await prompts([
            {
                type: "text",
                name: "componentsDir",
                message: "Where would you like to install spatial components?",
                initial: "components/kine",
            }
        ]);

        if (!response.componentsDir) {
            console.log(chalk.yellow("Initialization cancelled."));
            process.exit(0);
        }

        const spinner = ora("Installing core dependencies (framer-motion, @mediapipe/tasks-vision)...").start();

        try {
            execSync("npm install framer-motion @mediapipe/tasks-vision", { stdio: "ignore" });
            spinner.succeed("Core dependencies installed.");
        } catch (error) {
            spinner.fail("Failed to install dependencies.");
            process.exit(1);
        }

        // Save a config file so `add` knows where to put things
        const configPath = path.join(process.cwd(), "kine-ui.json");
        fs.writeJSONSync(configPath, { componentsDir: response.componentsDir }, { spaces: 2 });

        console.log(chalk.green("\n✓ Successfully initialized Kine UI and created kine-ui.json"));
        console.log(chalk.gray("To start building, try adding the global provider and a gesture:\n"));
        console.log(chalk.cyan("  npx kine-ui add kine-provider"));
        console.log(chalk.cyan("  npx kine-ui add air-cursor"));
    });

program
    .command("add")
    .description("Add a Kine UI gesture component")
    .argument("<component>", "the component to add (e.g. 'air-cursor', 'swipe-area', 'kine-provider')")
    .action(async (component) => {
        let config;
        try {
            config = fs.readJSONSync(path.join(process.cwd(), "kine-ui.json"));
        } catch (e) {
            console.log(chalk.red("kine-ui.json not found. Please run `npx kine-ui init` first."));
            process.exit(1);
        }

        const spinner = ora(`Fetching ${component} from registry...`).start();

        try {
            // Note: In production this would point to standard registry endpoints
            // For now, it will look at the public/r/styles/default output
            const res = await fetch(`${REGISTRY_URL}/${component}.json`);

            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error(`Component '${component}' not found in registry.`);
                }
                throw new Error(`Failed to fetch component. Status: ${res.status}`);
            }

            interface RegistryItem {
                dependencies?: string[];
                files: { target: string; content: string }[];
            }

            const item = await res.json() as RegistryItem;
            spinner.text = `Installing ${component}...`;

            // Install specific dependencies if the component asks for them
            if (item.dependencies && item.dependencies.length > 0) {
                const deps = item.dependencies.join(" ");
                spinner.text = `Installing additional dependencies: ${deps}...`;
                execSync(`npm install ${deps}`, { stdio: "ignore" });
            }

            // Ensure TARGET directory exists
            const targetDir = path.join(process.cwd(), config.componentsDir);
            fs.ensureDirSync(targetDir);

            // Write all files attached to this component
            for (const fileDoc of item.files) {
                const filePath = path.join(process.cwd(), fileDoc.target);

                // create the directory for the file itself in case it's nested (like core/kine-engine.ts)
                fs.ensureDirSync(path.dirname(filePath));

                fs.writeFileSync(filePath, fileDoc.content, "utf-8");
            }

            spinner.succeed(`Successfully installed ${chalk.green(component)} to ${config.componentsDir}`);

        } catch (error: any) {
            spinner.fail(error.message || "Failed to add component.");
            process.exit(1);
        }
    });

program.parse();
