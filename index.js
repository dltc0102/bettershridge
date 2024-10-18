import { data } from './bots.js';    
import './guild.js';

//! any misc problems (/ct dump and copy message here)
//? ...

let moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;
register('gameLoad', () => {
    ChatLib.chat(`&9[&bBetterShridge&9] &3Loaded! &7Send @oBiscuit a dm if for any concerns`)   
    if (!data.firstInstall) {
        if (moduleVersion === '0.1.3') {
            ChatLib.chat(`&e&lNEW Features: (v${moduleVersion})`);
            ChatLib.chat(`o  &rDo &b/addtbot (botName) &rto add a new bot to the list of bots!`);
            ChatLib.chat(`o  &rDo &b/botlist &rto show bot list!`);
            ChatLib.chat(`o  &rDo &b/rmbot (botName) &rto remove a bot from the bot list!`);
        }   ;
        data.firstInstall = true;
    };
});
