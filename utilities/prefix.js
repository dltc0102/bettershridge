import PogObject from '../../PogData';
import { getInHypixel } from '../functions';

export const prefixData = new PogObject("bettershridge", {
    guild: 'G',
    bot: 'B',
    arrow: '>',
    best: '&6',
}, './data/prefixData.json');
prefixData.autosave(5);

function resetPrefixes() {
    prefixData.guild = '&2G&r';
    prefixData.bot = '&2B&r';
    prefixData.arrow = '&2>&r';
    prefixData.best = '&6'; 
    prefixData.save();
}

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setguildprefix (prefix name)')
    } else if (args) {
        const prefix = args.trim();
        ChatLib.chat(`&aGuild prefix set: &r${prefix}`);
        prefixData.guild = prefix;
        prefixData.save();
    }
}).setName('setguildprefix');

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setbotprefix (prefix name)')
    } else if (args) {
        const prefix = args.trim();
        ChatLib.chat(`&aBot prefix set: &r${prefix}`);
        prefixData.bot = prefix;
        prefixData.save();
    }
}).setName('setbotprefix').setAliases('setbridgeprefix');

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setarrowprefix (prefix name)')
    } else if (args) {
        const prefix = args.trim();
        ChatLib.chat(`&aArrow prefix set: &r${prefix}`);
        prefixData.arrow = prefix;
        prefixData.save();
    }
}).setName('setarrowprefix');

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) { // reset both
        const confirmButton = new TextComponent('&a&lCONFIRM?')
            .setClick('run_command', '/confirmResetPrefix')
            .setHover('show_text', 'Click to Confirm Prefix Reset');
        const confirmQuestion = `Are you sure you want to reset prefixes? `;
        const confirmMessage = new Message (
            confirmQuestion, confirmButton
        )
        ChatLib.chat(confirmMessage);
    } else if (args) {
        if (args === 'bot' || args === 'bridge') {
            prefixData.bot = '&2B&r';
            prefixData.save();
            ChatLib.chat(`&aBot Prefix has been reset to &r&2B&a!`);
        } else if (args === 'guild') {
            prefixData.guild = '&2G&r';
            prefixData.save();
            ChatLib.chat(`&aGuild Prefix has been reset to &r&2G&a!`);
        } else if (args === 'arrow') {
            prefixData.arrow = '&2>&r';
            prefixData.save();      
            ChatLib.chat(`&aArrow Prefix has been reset to &r&2>&a!`);
        }
    }   
}).setName('resetprefix');

register('command', () => {
    if (!getInHypixel()) return;
    resetPrefixes()                     
    ChatLib.chat(`&aPrefixes have been reset! &rGuild: &2G&r | Bridge: &2B&r | Arrow: &2>&r`)               ;   
}).setName('confirmResetPrefix');