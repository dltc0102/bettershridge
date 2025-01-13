import PogObject from '../../PogData';
import { isInHypixel } from '../functions';

export const data = new PogObject("bettershridge", {
    modulePrefix: '&9[&bBetterShridge&9]',
    bots: ['Baltics', 'NqekMyBeloved', 'Shrimple77'],
    firstInstall: false,
}, './data/data.json');
data.autosave(5);

register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: &b/setbot (botName) &7(botName is case sensitive)')
    } else if (args) {
        if (data.bots.includes(args)) {
            ChatLib.chat(`&c${args} is already in Bot list!`);

        } else {
            data.bots.push(args);
            ChatLib.chat(`&aBridge Bot added: &r${args}`);
            data.bots = data.bots.filter(bot => bot !== null);
            ChatLib.deleteChat(999);
        }
    }
}).setName('addbot', true);

register('command', () => {
    if (!isInHypixel()) return;
    ChatLib.chat(`Bot list: `)
    ChatLib.chat('---------------------------')
    for (let idx = 0; idx < data.bots.length+1; idx++) {
        if (idx+1 === data.bots.length+1) return;
        ChatLib.chat(`${idx+1}. ${data.bots[idx]}`);
    };
}).setName('botlist', true);

register('command', (args) => {
    if (!isInHypixel()) return;
    if (!args) {
        ChatLib.chat('&cCorrect Usage: /rmbot (botName) &7(botName is case sensitive)')
    } else {
        data.bots = data.bots.filter(bot => bot !== args);
        ChatLib.chat(`&a${args} &cremoved &afrom bot list.`);
        ChatLib.chat(new TextComponent('&e&l[CLICK TO VIEW BOTLIST]').setClick('run_command', '/botlist').setHover('show_text', '/botlist'));
        data.save();
    }
}).setName('rmbot', true);
