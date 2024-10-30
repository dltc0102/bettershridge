import { getInHypixel } from "../functions";
import { guildData } from '../formatFunctions';
import { chatData } from "./chatTracker";
import { registerWhen } from '../utils';
import BoxElement from '../../DocGuiLib/elements/Box'              
import HandleGui from "../../DocGuiLib/core/Gui"

const gui = new HandleGui("../../DocGuiLib/data/DefaultColors.json").setCommand("testdoc")
const cmdElement = new BoxElement();
const syntaxDict = {
    'lbin': '<item name>',
    'bz': '<item name>',
    'cata': '<player:[profile|bingo|main]> [class|f0-7|m1-7]',
    'ib': '<amount>[k|m|b|s] <item name>',
    'bzib': '<amount>[k|m|b|s] <item name>',
    'instabuy': '<amount>[k|m|b|s] <item name>',
}

function findLongestStrW(lst) {
    return Renderer.getStringWidth(lst.reduce((longest, curr) => curr.length > longest.length ? curr : longest, ""));
}  

function getTabCompletions(input, cmdLst, syntaxDict) {
    let tabCompList = [];
    const isBaseCommand = input.includes(' ');
    if (!isBaseCommand) {
        for (let idx = 0; idx < cmdLst.length; idx++) {
            let cmdOption = cmdLst[idx];
            if (cmdOption.toLowerCase().startsWith(input.toLowerCase()) || input === '') {
                tabCompList.push(cmdOption);
            }
        }
    } else {        
        let [command, ...args] = input.split(' ');
        if (command !== '/gc') return;
        if (args.startsWith('_')) {
            let gcCmd = args.slice(1);
            const syntax = syntaxDict[gcCmd];
            tabCompList.push(`&7${syntax}`);
        }
    }    
    return tabCompList;
}

let lastStoredMessage = '';
let lastStoredSuggestions = [];
const cmdObject = {
    text: '',
    raw_lst: '',
    show: false,
    x: 0,
    y: Renderer.screen.getHeight(),
};

registerWhen('guiKey', (event) => {
    const message = Client.getCurrentChatMessage();
    if (Client.getCurrentChatMessage() === '' || message === lastStoredMessage || (!chatData.inGCChannel && !message.includes('_'))) {
        cmdObject.show = false;
        return;
    }
    lastStoredMessage = message;
    const offsetX = Renderer.getStringWidth('_');
    const input = message.substring(1);
    const suggestions = getTabCompletions(input, guildData.commands);
    if (chatData.inGCChannel && suggestions && suggestions.length > 0 && suggestions !== lastStoredSuggestions) {   
        lastStoredSuggestions = suggestions;
        // ChatLib.chat(`&7${suggestions}`);
        cmdObject.raw_lst = suggestions;
        cmdObject.text = suggestions.join('\n');
        cmdObject.show = true;
        cmdObject.x = offsetX;
    } else {
        cmdObject.text = '';
        cmdObject.show = false;
    }
    // cmdElement
    //     .setPosition(cmdObject.x, cmdObject.y)
    //     .setText(cmdObject.text)
}, () => Client.isInChat() && getInHypixel());

// registerWhen('renderOverlay', () => {
//     gui.draw(cmdElement);       
// }, () => cmdObject.show);

register('command', () => {
    ChatLib.chat(`ingcchannel: ${chatData.inGCChannel}`)
}).setName('test_type');   

// } else if (!chatData.inGCChannel && currMessage.substring(currMessage.indexOf('/gc ')+1).startsWith('_')) {
// detect chat tab opened
// detect key pressed is "_"
// show possible commands when "_" is pressed
// fuzzy match possible commands when letters are pressed after "_"
// if ' ' is after '_', cancel all processes
