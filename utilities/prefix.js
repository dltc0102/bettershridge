import PogObject from '../../PogData';
import { isInHypixel } from '../functions';

export const prefixData = new PogObject("bettershridge", {
    guild: '&2Guild&r',
    bot: '&2Bot&r',
    arrow: '&2>&r',
    reply: '&2[to]&r',
}, './data/prefixData.json');
prefixData.autosave(1);

function resetPrefixes() {
    prefixData.guild = '&2Guild&r';
    prefixData.bot = '&2Bot&r';
    prefixData.arrow = '&2>&r';
    prefixData.reply = '&2[to]&r';
    prefixData.save();
}

function fixFormattedPrefix(text) {
    if (text === '[empty]') return '';
    return text.includes('[rb]') || text.includes('&z')
    ? text.replace(/\[rb\]/g, '§z').replace(/&z/g, '§z').trim()
    : text.trim();
}
// set guild prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args || args.removeFormatting() === '') {
        ChatLib.chat('&cCorrect Usage: &b/setguildprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        ChatLib.chat(`&aGuild prefix set: &r${prefix}`);
        prefixData.guild = prefix;
        prefixData.save();
    }
}).setName('setguildprefix', true);

// set bot prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args || args.removeFormatting().trim() === '') {
        ChatLib.chat('&cCorrect Usage: &b/setbotprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        ChatLib.chat(`&aBot prefix set: &r${prefix}`);
        prefixData.bot = prefix;
        prefixData.save();
    }
}).setName('setbotprefix', true).setAliases('setbridgeprefix');

// set arrow prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args || args.removeFormatting().trim() === '') {
        ChatLib.chat('&cCorrect Usage: &b/setarrowprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        ChatLib.chat(`&aArrow prefix set: &r${prefix}`);
        prefixData.arrow = prefix;
        prefixData.save();
    }
}).setName('setarrowprefix', true);

// set reply prefix
register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args || args.removeFormatting().trim() === '') {
        ChatLib.chat('&cCorrect Usage: &b/setreplyprefix (prefix name)')
    } else if (args) {
        const prefix = fixFormattedPrefix(args);
        ChatLib.chat(`&aReply prefix set: &r${prefix}`);
        prefixData.reply = prefix;
        prefixData.save();
    }
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
    ChatLib.chat(`&aPrefixes have been reset! &rGuild: ${prefixData.guild} | Bridge/Bot: ${prefixData.bot} | Arrow: ${prefixData.arrow} | Reply: ${prefixData.reply}`);
}).setName('confirmResetPrefix', true);
