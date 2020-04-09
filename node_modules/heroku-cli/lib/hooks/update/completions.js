"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const completions_1 = require("@heroku-cli/command/lib/completions");
const config_1 = require("@oclif/config");
const cli_ux_1 = require("cli-ux");
const debug = require('debug')('heroku:completions');
exports.completions = async function () {
    if (this.config.windows) {
        debug('skipping autocomplete on windows');
    }
    else {
        const acPlugin = this.config.plugins.find(p => p.name === 'heroku-cli-autocomplete');
        if (acPlugin) {
            cli_ux_1.default.action.start('Updating completions');
            let ac = await acPlugin.findCommand('autocomplete:buildcache');
            if (ac)
                await ac.run([], this.config);
            let config = Object.assign(await config_1.load(), this.config);
            await completions_1.AppCompletion.options({ config });
            await completions_1.PipelineCompletion.options({ config });
            await completions_1.SpaceCompletion.options({ config });
            await completions_1.TeamCompletion.options({ config });
        }
        else {
            debug('skipping autocomplete, not installed');
        }
        cli_ux_1.default.done();
    }
};
