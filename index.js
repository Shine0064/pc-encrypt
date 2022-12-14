const fs = require("fs");
const child_process = require("child_process");
const path = require("path");
const nodeModulesPath = path.join(process.cwd(), "node_modules");

async function installDeps() {
    return new Promise((res) => {
        child_process.exec("npm install", { cwd: process.cwd() }, (err, stdout, stderr) => {
            if (err) {
                res();
            }
            res();
        })
    })
}

if (!fs.existsSync(nodeModulesPath)) {
    installDeps().then(() => {
        setTimeout(() => {
            powercord.pluginManager.remount(process.cwd());
        }, 1000)
    })
}

const { Plugin } = require('powercord/entities');

module.exports = class Encrypt extends Plugin {
    startPlugin() {
        fs.readdirSync(path.join(__dirname, "src", "commands"), "utf8").forEach(c => {
            let cpath = path.join(__dirname, "src", "commands", c);
            powercord.api.commands.registerCommand(require(cpath));
        })
    }

    pluginWillUnload() {
        fs.readdirSync(path.join(__dirname, "src", "commands"), "utf8").forEach(c => {
            let cpath = path.join(__dirname, "src", "commands", c);
            powercord.api.commands.registerCommand(require(cpath).command);
        })
    }
}