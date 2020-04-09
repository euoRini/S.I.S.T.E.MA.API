"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const exec = (cmd, args) => {
    const execa = require('execa');
    return execa(cmd, args, { stdio: 'inherit' });
};
exports.migrate = async function () {
    if (process.argv[2] && process.argv[2].startsWith('plugins'))
        return;
    const pluginsDir = path.join(this.config.dataDir, 'plugins');
    if (!await fs.pathExists(pluginsDir))
        return;
    process.stderr.write('heroku-cli: migrating plugins\n');
    try {
        const p = path.join(pluginsDir, 'user.json');
        if (await fs.pathExists(p)) {
            const { manifest } = await fs.readJSON(p);
            for (let plugin of Object.keys(manifest.plugins)) {
                process.stderr.write(`heroku-cli: migrating ${plugin}\n`);
                await exec('heroku', ['plugins:install', plugin]);
            }
        }
    }
    catch (err) {
        this.warn(err);
    }
    try {
        const p = path.join(pluginsDir, 'link.json');
        if (await fs.pathExists(p)) {
            const { manifest } = await fs.readJSON(path.join(pluginsDir, 'link.json'));
            for (let { root } of Object.values(manifest.plugins)) {
                process.stderr.write(`heroku-cli: migrating ${root}\n`);
                await exec('heroku', ['plugins:link', root]);
            }
        }
    }
    catch (err) {
        this.warn(err);
    }
    await fs.remove(pluginsDir);
    process.stderr.write('heroku-cli: done migrating plugins\n');
};
