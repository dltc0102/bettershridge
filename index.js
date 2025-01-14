import { isInHypixel } from './functions.js';
import { data } from './utilities/bots.js';
import './guild.js';
import './glist.js';

function makeChangelogHoverable(moduleVersion) {
    const version = `&aVersion: &r${moduleVersion}`;
    const changelog = [
        //? ...
      ];

    const formattedChangelog = [version, '&r------------------------', ...changelog].join('\n');
    return new TextComponent(`&3&l[&r&aHover for Changelog&3&l]`)
        .setHover(`show_text`, formattedChangelog);
};

register('gameLoad', () => {
    if (!isInHypixel()) return;
    const moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;

    ChatLib.chat(`${data.modulePrefix} &3Loaded! &7DM @oBiscuit for any concerns`);

    console.info(`${data.modulePrefix} &3Loaded! -- v${moduleVersion}`);

    if (moduleVersion === '0.1.7') {
        const featureMessage = new Message(
            `  &3> &r&e&lNEW Features: (v${moduleVersion}) `, makeChangelogHoverable(moduleVersion)
        )
        ChatLib.chat(featureMessage);
    };

    if (!data.firstInstall) data.firstInstall = true;
});
