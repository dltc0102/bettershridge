import PogObject from '../PogData';
import { getInSkyblock } from './functions';

export const data = new PogObject("bettershridge", {
    bots: ['Baltics', 'NqekMyBeloved', 'Shrimple77'],
    firstInstall: false,
});
data.autosave(5);

register('command', (args) => {
    if (!getInSkyblock()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setbot (botName) &7(botName is case sensitive)')
    } else {
        data.bots.push(args);
        ChatLib.chat(`Bridge Bot set: ${args}`);
        data.bots = data.bots.filter(bot => bot !== null);
    }
}).setName('setbot');

register('command', () => {
    if (!getInSkyblock()) return;
    ChatLib.chat(`Bot list: `)
    ChatLib.chat('---------------------------')
    for (let idx = 0; idx < data.bots.length+1; idx++) {
        if (idx+1 === data.bots.length+1) return;
        ChatLib.chat(`${idx+1}. ${data.bots[idx]}`);
    };
}).setName('botlist');

register('command', (args) => {
    if (!getInSkyblock()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: /rmbot (botName) &7(botName is case sensitive)')
    } else {
        if (data.bots.includes(args)) data.bots = data.bots.filter(bot => bot !== args);        
        ChatLib.chat(`&a${args} &cremoved &afrom bot list.`);       
        ChatLib.chat(new TextComponent('&e&l[CLICK TO VIEW BOTLIST]').setClick('run_command', '/botlist').setHover('show_text', '/botlist'));
    }
}).setName('rmbot');