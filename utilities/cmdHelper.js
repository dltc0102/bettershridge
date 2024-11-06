import { getInHypixel } from "../functions";
import { guildData } from '../formatFunctions';
import { registerWhen } from '../utils';
import BoxElement from '../../DocGuiLib/elements/Box'             
import HandleGui from "../../DocGuiLib/core/Gui"

const gui = new HandleGui("../../DocGuiLib/data/DefaultColors.json").setCommand("testdoc")
const element = new BoxElement()

function findLongestStrW(lst) {
    return Renderer.getStringWidth(lst.reduce((longest, curr) => curr.length > longest.length ? curr : longest, ""));
}  

function getTabCompletions(input, cmdLst) {
    let usedCommand = !input.startsWith('_');
    let tabCompList = [];
    let argInput = null;
    if (usedCommand && input.startsWith('/gc')) {
        // /gc _
        console.log(`cmd input: ${input}`)
        const [command, ...args] = input.split(' ');
        const argString = args.join(' ');
        if (argString.trim().startsWith('_')) { 
            argInput = argString.slice(1);
        }
    } else if (!usedCommand && input.startsWith('_')) {
        console.log(`ingc input: ${input}`)
        // _    
        argInput = input.trim().slice(0, input.indexOf(' '));   
    }

    for (let idx = 0; idx < cmdLst.length; idx++) { 
        let cmdOption = cmdLst[idx];        
        if (argInput && cmdOption.toLowerCase().startsWith(argInput.toLowerCase()) || argInput === '') {
            tabCompList.push(cmdOption);
        }
        if (argInput && argInput.startsWith('_')) {
            if (cmdOption.toLowerCase().startsWith(argInput.slice(1).toLowerCase())) {
                tabCompList.push(cmdOption);            
            }
        }
    }
    return tabCompList;     
}       

let lastStoredMessage = '';
let lastStoredSuggestions = [];
registerWhen('guiKey', (event) => {
    const message = Client.getCurrentChatMessage();
    // console.log(message);                
    if (message === '' || message !== lastStoredMessage) return;   
    if (message.startsWith('/gc')) {
        lastStoredMessage = message;
        console.log(`command message`);
    }       
    if (message.startsWith('_')) {
        lastStoredMessage = message;
        console.log('in channel message');      
    }   
    // if (message === '' || message === lastStoredMessage || (!message.includes('_'))) return;
    // lastStoredMessage = message;
    // const offsetX = Renderer.getStringWidth('_');
    // const suggestions = getTabCompletions(message, guildData.commands);
    // if (suggestions && suggestions.length > 0 && suggestions !== lastStoredSuggestions) {   
    //     console.log(`suggestions: ${suggestions}`)
    //     console.log(' ');                   
    //     lastStoredSuggestions = suggestions;
    //     ChatLib.chat(`&7${suggestions}`);
    //     element
    //         .setPosition(offsetX, -35)
    //         .setSize(findLongestStrW(suggestions), suggestions.length*10)
    //         .setText('testing block');       
    //     gui.draw(element);
    // }
}, () => Client.isInChat() && getInHypixel());            

//* feature details
//! 1. if user types `/gc _` or `_`, possible command, show suggestions
//? let player tab through possible commands

//! 2. if letter after _ is in starting letters of cmdOption names, keep showing suggestions.
    //? if cmdName not in cmdOptions, stop showing suggestions
    //? if cmdName in cmdOptions, let player do tab to autocomplete command name

//! 3. with command name logged, show prefix bar to guide user on how to use the command


