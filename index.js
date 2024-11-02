import { getInHypixel } from './functions.js';
import { data } from './utilities/bots.js';    
import './guild.js';

//! any misc problems (/ct dump and copy message here)
//? ...

function makeChangelogHoverable(moduleVersion) {
    const version = `&aVersion: &r${moduleVersion}`;
    const changelog = [
        `&a+ hides messages if they are forwarded (where the message is blank)`,
        `&a+ completely refactored multi link messages for variety and changes &b(credits to gleb)`,
        `&a+ changed instabuy command formatting mistake from 'sell cost' to 'buy cost'`
        `&a+ added formatting for _gonline command`, 
        `&a+ dynamic bot updater`, 
        `&a+ removed unused functions`, 
        `&a+ added prefix changing options in commands`,
        `&ao &rDo &b/setguildprefix &e(prefixName)&r to set a guild prefix`,
        `&ao &rDo &b/setbotprefix &ror &b/setbridgeprefix &e(prefixName)&r to set a bot prefix`,
        `&ao &rDo &b/resetprefix &e[guild/bot/bridge]&r to reset a desired prefix`,
        `&2Note: &rIf player does &b/resetprefix&r, there will be a confirmation message to reset both prefixes.`,
    ];

    const formattedChangelog = [version, '&r------------------------', ...changelog].join('\n');
    return new TextComponent(`&3&l[&r&aHover for Changelog&3&l]`)
        .setHover(`show_text`, formattedChangelog);
};

let moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;
register('gameLoad', () => {
    if (!getInHypixel()) return;
    ChatLib.chat(`&9[&bBetterShridge&9] &3Loaded! &7Send @oBiscuit a dm if for any concerns`)   
    if (moduleVersion === '0.1.5') {
        const featureMessage = new Message(
            `  &3> &r&e&lNEW Features: (v${moduleVersion}) `, makeChangelogHoverable(moduleVersion)
        )
        ChatLib.chat(featureMessage);   
    };
    if (!data.firstInstall) {
        data.firstInstall = true;
    };      
});
