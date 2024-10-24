import PogObject from '../PogData';
import { getInHypixel } from './functions';

export const data = new PogObject("bettershridge", {
    bots: ['Baltics', 'NqekMyBeloved', 'Shrimple77'],
    firstInstall: false,
    guildPrefix: 'G',
    botPrefix: 'B',
});
data.autosave(5);

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setbot (botName) &7(botName is case sensitive)')
    } else if (args) {
        if (data.bots.includes(args)) {
            ChatLib.chat(`&c${args} is already in Bot list!`);

        } else {
            data.bots.push(args);
            ChatLib.chat(`&aBridge Bot added: &r${args}`);
            data.bots = data.bots.filter(bot => bot !== null);
        }
    }
}).setName('addbot');

register('command', () => {
    if (!getInHypixel()) return;
    ChatLib.chat(`Bot list: `)
    ChatLib.chat('---------------------------')
    for (let idx = 0; idx < data.bots.length+1; idx++) {
        if (idx+1 === data.bots.length+1) return;
        ChatLib.chat(`${idx+1}. ${data.bots[idx]}`);
    };
}).setName('botlist');

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: /rmbot (botName) &7(botName is case sensitive)')
    } else {
        data.bots = data.bots.filter(bot => bot !== args);        
        ChatLib.chat(`&a${args} &cremoved &afrom bot list.`);       
        ChatLib.chat(new TextComponent('&e&l[CLICK TO VIEW BOTLIST]').setClick('run_command', '/botlist').setHover('show_text', '/botlist'));
        data.save();
    }
}).setName('rmbot');

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setguildprefix (prefix name)')
    } else if (args) {
        ChatLib.chat(`&aGuild prefix set: &r${args}`);
        data.guildPrefix = args;
        data.save();
    }
}).setName('setguildprefix');

register('command', (args) => {
    if (!getInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setbotprefix (prefix name)')
    } else if (args) {
        ChatLib.chat(`&aBot prefix set: &r${args}`);
        data.botPrefix = args;
        data.save();    
    }
}).setName('setbotprefix').setAliases('setbridgeprefix');