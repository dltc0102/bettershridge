import PogObject from '../../PogData';

export const bestData = new PogObject("bettershridge", {
    names: [],
    color: '&6',
}, './data/bestData.json');
bestData.autosave(5);

register('command', (arg) => {
    // list 
    if ((arg && arg.toLowerCase() === 'list') || !arg) {
        if (bestData.names.length === 0) {
            ChatLib.chat(`&cGuild Best List is currently empty! Do &b/guildbest (name) &c to add one to the list!`);
            return;

        } else {                
            ChatLib.chat(`&6<&3Guild Best List&6> &b---- Current: &r['${bestData.color}test name&r']`);
            for (let i=0; i < bestData.names.length; i++) {
                let bestName = bestData.names[i];
                ChatLib.chat(` &3o&r &b${bestName}`)
            }
            return;
        }
    
    // clear
    } else if (arg && arg.toLowerCase() == 'clear') {
        if (bestData.names.length === 0) {
            ChatLib.chat(`&cGuild Best List is already empty!`);
            return;
        } else {
            bestData.names = [];
            bestData.save();
            ChatLib.chat(`&cCleared Guild Best List!`);
            return;
        }

    // name
    } else {    
        const loweredName = arg.toLowerCase();
        if (bestData.names.includes(loweredName)) {
            let tempLst = [];
            ChatLib.chat(`&cRemoved ${arg} &cfrom the Guild Best List!`)
            tempLst = bestData.names.filter(name => name !== loweredName);
            bestData.names = tempLst;
            bestData.save();
            return;

        } else {
            ChatLib.chat(`&aAdded ${arg} &ato the Guild Best List!`)
                bestData.names.push(loweredName);
                bestData.save();
            return;                 
        }
    }

}).setName('guildbest').setAliases('gb');

register('command', (arg) => {
    if (!arg || !arg.includes('&')) {
        ChatLib.chat(`&cPlease input a color code for the Guild Best Color.`)
    } else {
        bestData.color = arg;
        bestData.save();
        ChatLib.chat(`&aGuild Best Color set: &r${bestData.color}test name`)
        console.log(`guild best color is set to: ${bestData.color}`)                                        
    };
}).setName('setbestcolor'); 


