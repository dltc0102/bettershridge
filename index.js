import { isInHypixel, hasEmojiPack } from './functions.js';
import { guildData } from './formatFunctions.js';
import { data } from './utilities/bots.js';
import { prefixData } from './utilities/prefix.js';
import { bestData } from './guild.js';
import './guild.js';
import './generalChat.js';

const texturePackGitLink = 'https://github.com/dltc0102/biscuitsEmojiPack/releases';
const tpClickable = new TextComponent('&b&l[Download Here]')
    .setClick('open_url', texturePackGitLink)
    .setHover('show_text', texturePackGitLink);

function makeChangelogHoverable(moduleVersion) {
    const version = `&aVersion: &r${moduleVersion}`;
    const changelog = [

    ];

    const formattedChangelog = [version, '&r------------------------', ...changelog].join('\n');
    return new TextComponent(`&3&l[&r&aHover for Changelog&3&l]`)
        .setHover(`show_text`, formattedChangelog);
};

function createCommandClickable(appearance, command) {
    return new TextComponent(appearance).setClick('run_command', command);
}

const helpButtonClickable = new TextComponent(`&c&l[Click For Help]`)   
    .setClick('run_command', '/bettershridge')

register('command', () => {
    ChatLib.chat(' ');
    const showRobot = hasEmojiPack() ? '㑖' : '';
    ChatLib.chat(ChatLib.getCenteredText(`${showRobot} &bo&m--------&r &bBettershridge Bot Commands&r &b&m--------&r&bo&r ${showRobot}`));
    ChatLib.chat('&9|| ' + ChatLib.getCenteredText(`&rDo &b/botlist&r to show bots added/bot list`) + '                 &r&9||&r');
    ChatLib.chat('&9|| ' + ChatLib.getCenteredText(`&rDo &b/addbot&r to add bot name`) + '                          &r&9||&r');
    ChatLib.chat('&9|| ' + ChatLib.getCenteredText(`&rDo &b/rmbot&r to remove a bot name`) + '                      &r&9||&r');
    ChatLib.chat(ChatLib.getChatBreak('&b&m-'));
}).setName('showBSBotCommands', true);
const botCommandClickable = createCommandClickable('&b&l[Show Bot Commands]&r', '/showBSBotCommands')

register('command', () => {
    if (!isInHypixel()) return;
    ChatLib.chat(`      &6<&3Prefixes&7> &b------`);
    ChatLib.chat(`   &d✯&r   &6Use '&r[rb]&6' to make a text §zrainbow&r&6! &b*Note: Only works in SB`);
    ChatLib.chat(`${bulletSpace}&f/setbotprefix &3- Sets Bot Prefix &r| &eCurrent: &r['${prefixData.bot}&r']`);
    ChatLib.chat(`${bulletSpace}&f/setguildprefix &3- Sets Guild Prefix &r| &eCurrent: &r['${prefixData.guild}&r']`);
    ChatLib.chat(`${bulletSpace}&f/setarrowprefix &3- Sets Arrow Prefix &r| &eCurrent: &r['${prefixData.arrow}&r']`);
    ChatLib.chat(`${bulletSpace}&f/setreplyprefix &3- Sets Reply Prefix &r| &eCurrent: &r['${prefixData.reply}&r']`);
    ChatLib.chat(`${bulletSpace}&f/resetprefix (&9bot&r | &9guild&r | &9arrow&r | &9reply&r) &3- Resets all prefixes`);
}).setName('showBSPrefixCommands', true);
const prefixCommandClickable = createCommandClickable('&b&l[Show Prefix Commands]&r', '/showBSPrefixCommands')

register('command', () => {
    if (!isInHypixel()) return;
    ChatLib.chat(`      &6<&3Guild Best System&6> &b------ &r(/guildbest | /gb)`);
    ChatLib.chat(`${bulletSpace}&f/guildbest list &3- Shows all the names in the guild best list`);
    ChatLib.chat(`${bulletSpace}&f/guildbest (name) &3- Sets/Adds a name to the guild best list \n      &c(Do the command again to remove name)`);
    ChatLib.chat(`${bulletSpace}&f/guildbest clear &3- Removes all names from the guild best list`);
    ChatLib.chat(`${bulletSpace}&f/setbestcolor &3- Sets color for guild best list names \n      &eCurrent: &r['${bestData.color}test name&r'] `);
    ChatLib.chat(`${bulletSpace}&f/overriderankcolor | /orc &3- Overrides the rank colors for guild-best colors`);
}).setName('showBSGuildBestCommands', true);
const guildBestCommandClickable = createCommandClickable('&b&l[Show Guild Best Commands]&r', '/showBSGuildBestCommands')

register('gameLoad', () => {
    if (!isInHypixel()) return;
    ChatLib.chat(`${data.modulePrefix} &3Loaded! &7DM @oBiscuit for any concerns`);

    const moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;

    console.info(`[Bettershridge] Loaded! -- v${moduleVersion}`);
    if (moduleVersion === '0.6.0') {
        const featureMessage = new Message(
            `  &3> &r&eNEW Features (v${moduleVersion}): &dADDED EMOJIS AND STICKERS!!!`,
            `\n  &3|| &bNeed help? `,  helpButtonClickable
        )
        ChatLib.chat(featureMessage);

        if (!data.showChangelog) {
            ChatLib.chat(new Message('&3  || &bTexture pack: ', tpClickable))
            ChatLib.chat('&3  || &cNote: Texture pack is needed to render emojis & stickers!\n');
            data.showChangelog = true;
        };
    };

    if (!data.firstInstall) {
        data.firstInstall = true;
    };
});

//! helpline
register('command', () => {
    if (!isInHypixel()) return;
    const bulletSpace = '  &bo&r  ';
    const toggleThanksStatus = guildData.toggleThanks ? '&a&lON' : '&c&lOFF';

    ChatLib.chat(' ')
    ChatLib.chat(ChatLib.getCenteredText(`&r&c&m-------&r ${data.modulePrefix}&r &c&lHelpline &r&c&m-------&r`));
    ChatLib.chat(' ')
    ChatLib.chat(new Message(`     &d<&6!&d>&r &e&lTEXTURE PACK &d<&6!&d>&r `, tpClickable));
    ChatLib.chat(' ')
    ChatLib.chat(new Message('      ', botCommandClickable));
    ChatLib.chat(' ')
    ChatLib.chat(new Message('      ', prefixCommandClickable));
    ChatLib.chat(' ');
    ChatLib.chat(new Message('      ', guildBestCommandClickable));
    ChatLib.chat(' ');
    ChatLib.chat(`${bulletSpace}&fDo &b/togglethanks&r to thank the person who booped you! \n       &eCurrently ${toggleThanksStatus}`);
    ChatLib.chat(ChatLib.getChatBreak('&c&m-'))
    ChatLib.chat(' ');
}).setName('bettershridge', true).setAliases('bshelp', 'bs');
