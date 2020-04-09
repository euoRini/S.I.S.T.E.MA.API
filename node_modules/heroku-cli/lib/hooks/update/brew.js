"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const cli_ux_1 = require("cli-ux");
const path = require("path");
const fs = require("../../file");
const debug = require('debug')('heroku:completions');
function brew(args, opts = {}) {
    debug('brew %o', args);
    return child_process_1.spawnSync('brew', args, Object.assign({ stdio: 'inherit' }, opts, { encoding: 'utf8' }));
}
exports.brewHook = async function () {
    if (this.config.platform !== 'darwin')
        return;
    const brewRoot = path.join(process.env.HOMEBREW_PREFIX || '/usr/local');
    let binPath;
    try {
        binPath = fs.realpathSync(path.join(brewRoot, 'bin/heroku'));
    }
    catch (err) {
        if (err.code === 'ENOENT')
            return;
        throw err;
    }
    let cellarPath;
    if (binPath && binPath.startsWith(path.join(brewRoot, 'Cellar'))) {
        cellarPath = path.resolve(binPath, path.dirname(path.relative(binPath, path.join(brewRoot, 'Cellar/heroku'))));
    }
    const fetchInstallReceipt = async () => {
        if (!cellarPath)
            return;
        return fs.readJSON(path.join(cellarPath, 'INSTALL_RECEIPT.json'));
    };
    const needsMigrate = async () => {
        let receipt = await fetchInstallReceipt();
        if (!receipt)
            return false;
        return receipt.source.tap === 'homebrew/core';
    };
    if (!await needsMigrate())
        return;
    debug('migrating from brew');
    // not on private tap, move to it
    cli_ux_1.default.action.start('Upgrading homebrew formula');
    brew(['uninstall', 'heroku']);
    brew(['install', 'heroku/brew/heroku']);
    cli_ux_1.default.action.stop();
};
