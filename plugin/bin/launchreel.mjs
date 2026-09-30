#!/usr/bin/env node
// Starts launchreel-mcp: from this repo when it's built here (development), otherwise the npm package.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const local = join(here, "..", "..", "packages", "mcp", "bin", "launchreel-mcp.mjs");
const dev = existsSync(local) && existsSync(join(here, "..", "..", "node_modules", "@modelcontextprotocol"));
const child = dev ? spawn(process.execPath, [local, ...process.argv.slice(2)], { stdio: "inherit" }) : spawn("npx", ["-y", "launchreel-mcp@latest", ...process.argv.slice(2)], { stdio: "inherit", shell: process.platform === "win32" });
child.on("exit", (c) => process.exit(c ?? 0));
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) process.on(sig, () => child.kill(sig));
