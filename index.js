import { data } from './bots.js';    
import './guild.js';

//! any misc problems (/ct dump and copy message here)
//? ...

let moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;
register('gameLoad', () => {
    ChatLib.chat(`&9[&bBetterShridge&9] &3Loaded! &7@oBiscuit if any problems/questions`)   
    if (!data.firstInstall) {
        if (moduleVersion === '0.1.3') {
            ChatLib.chat(`&e&lNEW Features: (v${moduleVersion})`);   
            ChatLib.chat(`o  &rDo &b/setbot (botName) &rto set a new name for bot!`)  
            ChatLib.chat(`o  &rDo &b/botlist &rto show bot list!`)  
            ChatLib.chat(`o  &rDo &b/rmbot (botName) &rto remove a bot from the bot list!`)  
        }   
        data.firstInstall = true; 
    }
});

let guildDebug = false; //? debug
register('command', () => {
    if (guildDebug) {
        guildDebug = false;
        ChatLib.chat(`Guild Debug: &c&lOFF`)
    } else {
        guildDebug = true;
        ChatLib.chat(`Guild Debug: &a&lON`)
    }
}).setName('gdebug');
