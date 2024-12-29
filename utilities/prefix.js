import PogObject from '../../PogData';
import { getInHypixel } from '../functions';

export const prefixData = new PogObject("bettershridge", {
    guild: '&2G&r',
    bot: '&2B&r',
    arrow: '&2>&r',
}, './data/prefixData.json');

function resetPrefixes() {
    prefixData.guild = '&2G&r';
    prefixData.bot = '&2B&r';
    prefixData.arrow = '&2>&r';
    prefixData.save();  
}

// set guild prefix
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
}).setName('setguildprefix', true);

// set bot prefix
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
}).setName('setbotprefix', true).setAliases('setbridgeprefix');

// set arrow prefix
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
}).setName('setarrowprefix', true);

// reset prefix
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
}).setName('resetprefix', true);

// confirm reset prefix
register('command', () => {
    if (!getInHypixel()) return;
    resetPrefixes();    
    prefixData.save();
    ChatLib.chat(`&aPrefixes have been reset! &rGuild: ${prefixData.guild} | Bridge/Bot: ${prefixData.bot} | Arrow: ${prefixData.arrow}`);
}).setName('confirmResetPrefix', true);                                       