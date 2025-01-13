import { isInHypixel } from './functions.js';
import { data } from './utilities/bots.js';  
import { prefixData } from './utilities/prefix.js';  
import { bestData } from './guild.js';
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
    ChatLib.chat(`${data.modulePrefix} &3Loaded! &7DM @oBiscuit for any concerns`);
    
    const moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;
    if (moduleVersion === '0.1.7') {
        const featureMessage = new Message(
            `  &3> &r&e&lNEW Features: (v${moduleVersion}) `, makeChangelogHoverable(moduleVersion)
        )
        ChatLib.chat(featureMessage);   
    };
    if (!data.firstInstall) {
        data.firstInstall = true;
    };      
});     

register('command', () => {
    if (!isInHypixel()) return;
    const bulletSpace = '   &bo&r  ';
    ChatLib.chat(ChatLib.getChatBreak(' '))
    ChatLib.chat(`${data.modulePrefix}&r &cHelpline -------------`);
    ChatLib.chat(`   &d✯&r   &6Use '&r[rb]&6' to make a text §zrainbow!`)
    ChatLib.chat(`${bulletSpace}&f/setbotprefix &3- Sets Bot Prefix &r| &eCurrent: &r['${prefixData.bot}&r']`)
    ChatLib.chat(`${bulletSpace}&f/setguildprefix &3- Sets Guild Prefix &r| &eCurrent: &r['${prefixData.guild}&r']`)
    ChatLib.chat(`${bulletSpace}&f/setarrowprefix &3- Sets Arrow Prefix &r| &eCurrent: &r['${prefixData.arrow}&r']`)
    ChatLib.chat(`${bulletSpace}&f/setreplyprefix &3- Sets Reply Prefix &r| &eCurrent: &r['${prefixData.reply}&r']`)
    ChatLib.chat(`${bulletSpace}&f/resetprefix (&9bot&r | &9guild&r | &9arrow&r | &9reply&r ) &3- Resets all prefixes`)
    ChatLib.chat(' ');
    ChatLib.chat(`      &6<&3Guild Best System&6> &b------ &r(/guildbest | /gb)`)
    ChatLib.chat(`${bulletSpace}&f/guildbest list &3- Shows all the names in the guild best list`)
    ChatLib.chat(`${bulletSpace}&f/guildbest (name) &3- Sets/Adds a name to the guild best list \n      &c(Do the command again to remove name)`)
    ChatLib.chat(`${bulletSpace}&f/guildbest clear &3- Removes all names from the guild best list`)
    ChatLib.chat(`${bulletSpace}&f/setbestcolor &3- Sets color for guild best list names \n      &eCurrent: &r['${bestData.color}test name&r'] `)
    ChatLib.chat(`${bulletSpace}&f/overriderankcolor | /orc &3- Overrides the rank colors for guild-best colors`)
    ChatLib.chat(ChatLib.getChatBreak(' '))
}).setName('bettershridge', true).setAliases('bshelp', 'bs');