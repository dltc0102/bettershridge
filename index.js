import { data } from './bots.js';    
import './guild.js';

import './simulate.js';
//! any misc problems (/ct dump and copy message here)
//? ...

let moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;
register('gameLoad', () => {
    ChatLib.chat(`&9[&bBetterShridge&9] &3Loaded! &7Send @oBiscuit a dm if for any concerns`)   
    if (!data.firstInstall) {
        if (moduleVersion === '0.1.4') {
            const featureMessage = new Message(
                `  &3> &r&e&lNEW Features: (v${moduleVersion}) `, makeChangelogHoverable(moduleVersion)
            )
            ChatLib.chat(featureMessage);   
        };
        data.firstInstall = true;
    };      
});

function makeChangelogHoverable(moduleVersion) {
    const version = `&aVersion: &r${moduleVersion}`;
    const changelog = [
        `&a+ added format for miscellaneous data for responses`,
        `&a+ added color for 'Vanquisher' in _be command responses`,
        `&a+ reformatted functions to be even more flexible for edge cases`,
        `&a+ re-added formatting for normal non-stuf links`
    ];
    const formattedChangelog = [version, '&r------------------------', ...changelog].join('\n');
    return new TextComponent('&3&l[&r&aHover for Changelog&3&l]')
        .setHover(`show_text`, formattedChangelog);
};
