import PogObject from '../../PogData';
import { data } from './bots'
import { isInHypixel, fixFormattedPrefix, capitalise } from '../functions';

export const prefixData = new PogObject("bettershridge", {
    guild: '&2Guild&r',
    bot: '&2Bot&r',
    arrow: '&2>&r',
    reply: '&2[to]&r',
}, './data/prefixData.json');
prefixData.autosave(3);

function resetPrefixes() {
    prefixData.guild = '&2Guild&r';
    prefixData.bot = '&2Bot&r';
    prefixData.arrow = '&2>&r';
    prefixData.reply = '&2[to]&r';
    prefixData.save();
};

// confirm prompt if prefix does not have any color codes
register('command', (...args) => {
    if (!isInHypixel()) return;
    const [givType, givPrefix] = args;
    Object.keys(prefixData).forEach(key => {
        if (key === givType) {
            prefixData[key] = givPrefix;
            prefixData.save();
            ChatLib.chat(`&a${capitalise(givType)} prefix set: &r${givPrefix}`);
        };
    });
}).setName('setbypassedprefix', true);

function checkPromptForPrefix(type, prefix, givData) {
    const colorCodeRegex = /[&|§][a-fk-orz0-9]/g;
    if (colorCodeRegex.test(prefix)) {
        ChatLib.chat(`&a${capitalise(type)} prefix set: &r${prefix}`);
        givData[type] = prefix;
        givData.save();
        return;

    } else {
        const yesCommand = `/setbypassedprefix ${type} ${prefix}`;
        const yesClickable = new TextComponent(' &a&l[YES]')
            .setClick('run_command', yesCommand)
            .setHover('show_text', yesCommand);

        const noClickable = new TextComponent(` &c&l[NO]`)
            .setClick('run_command', '/clearchatbyid 999');

        const colorCodeURL = 'https://www.digminecraft.com/lists/color_list_pc.php';
        const colorCodeURLClickable = new TextComponent(` &b&l[VIEW COLOR CODES]`)
            .setClick('open_url', colorCodeURL)
            .setHover('show_text', colorCodeURL.slice(0, 25) + '...');

        const hasColorCodes = prefix.includes('&') || prefix.includes('§z') ? 'It has invalid color codes.' : "It doesn't have color codes."
        const confirmQ = new Message(
            `${data.modulePrefix} &cAre you sure about this prefix &r"${prefix}&r"&c?\n&c${hasColorCodes}`,
            yesClickable,
            noClickable,
            colorCodeURLClickable,
        ).setChatLineId(999);
        ChatLib.chat(confirmQ);
    };
};

// set guild prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setguildprefix (prefix name)');

    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        return checkPromptForPrefix('guild', prefix, prefixData);
    };
}).setName('setguildprefix', true);

// set bot prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setbotprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        return checkPromptForPrefix('bot', prefix, prefixData);
    };
}).setName('setbotprefix', true);

// set arrow prefix     
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setarrowprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        return checkPromptForPrefix('arrow', prefix, prefixData);
    };
}).setName('setarrowprefix', true);

// set reply prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setreplyprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        return checkPromptForPrefix('reply', prefix, prefixData);
    };
}).setName('setreplyprefix', true);

// reset prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) { // reset all prefixes
        const confirmButton = new TextComponent('&a&lCONFIRM?')
            .setClick('run_command', '/confirmResetPrefix')
            .setHover('show_text', 'Click to Confirm Prefix Reset');
        const confirmQuestion = `Are you sure you want to reset prefixes? `;
        const confirmMessage = new Message (
            confirmQuestion, confirmButton
        )
        ChatLib.chat(confirmMessage);

    } else {
        if (args === 'bot') {
            prefixData.bot = '&2Bot&r';
            prefixData.save();
            ChatLib.chat(`&aBot Prefix has been reset to &r&2Bot&a!`);

        } else if (args === 'guild') {
            prefixData.guild = '&2Guild&r';
            prefixData.save();
            ChatLib.chat(`&aGuild Prefix has been reset to &r&2Guild&a!`);

        } else if (args === 'arrow') {
            prefixData.arrow = '&2>&r';
            prefixData.save();
            ChatLib.chat(`&aArrow Prefix has been reset to &r&2>&a!`);

        } else if (args === 'reply') {
            prefixData.reply = '&2[to]&r';
            prefixData.save();
            ChatLib.chat(`&aArrow Prefix has been reset to &2[to]&r&a!`);
        }
    }
}).setName('resetprefix', true);

// confirm reset prefix
register('command', () => {
    if (!isInHypixel()) return;
    resetPrefixes();
    prefixData.save();
    ChatLib.chat(`
        &aPrefixes have been reset!\n
        &rGuild: ${prefixData.guild}&r | Bridge/Bot: ${prefixData.bot}\n
        &rArrow: ${prefixData.arrow}&r | Reply: ${prefixData.reply}
    `);
}).setName('confirmResetPrefix', true);
