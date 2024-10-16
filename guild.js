import { createMessage, getInHypixel, getLinkHoverable, stripRank, removeRandomID, highlightTags } from './functions';
import { data } from './bots';
import { registerWhen, timeThis } from './utils';      
import { getGuildResponse } from './formatFunctions';

const BOT_PREFIX = '&2B > &a';              
const continueSymbol = '➩';
const idRegex = /<@.+>/;    

const MAYOR_NAMES = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];
const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', '  Runecrafting', 'Taming', 'Social'];          
const tempBoop = {
    'booper': '',
    'booped': '',
};      

function separatePlayerAndMessage(e) {
    const message = ChatLib.getChatMessage(e, true);
    const playerMessage = message.substring(message.indexOf("> ")+1).trim();
        let type = '';
    let resMessage = '';
    let playerRegex = /(.+) (&[a-qs-z0-9])\[(.+)\]&f: (.+)/;
    let playerMatch = playerMessage.match(playerRegex);
    if (playerMatch) {
        let [_, formattedName, roleColor, roleName, message] = playerMatch;
        let sender = stripRank(formattedName.removeFormatting());
        
        // &b[MVP&3+&b] Pebbles &3[Shrimp]&f: &rwatching a level 346 macro svens&r&r
        if (!data.bots.includes(sender)) {
            type = 'guildPlayer';
            resMessage = playerMatch[0];         
        }
        
        if (data.bots.includes(sender)) {
            let newMessage = message;
            
            // &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rAbyssal Miner data for obiscuit (Coconut) k/d (kdr): 221/0  <@928ykrs8ocd>&r
            if (idRegex.test(newMessage)) {
                type = 'bot';
                resMessage = newMessage;
                
                // &b[MVP&c+&b] Shrimple77 &3[Admin]&f: &rbiscuit [to] nqeuk: blah&r         
            } else if (newMessage.includes(' [to] ')) {
                type = 'reply';
                resMessage = newMessage;

            // &b[MVP&c+&b] Shrimple77 &3[Admin]&f: &rbiscuit: blah&r
            } else if (newMessage.includes(': ')) {
                type = 'discordPlayer';
                resMessage = newMessage;

            // &b[MVP&c+&b] Shrimple77 &3[Admin]&f: blah&r
            } else {
                type = 'bot';
                resMessage = newMessage;
            }   
        }
    }
    return [type, resMessage];  
}               

function handleLinkMessages(prefix, sender='', message) {
    let linkRegex = /\[LINK\]\((.+?)\)/g;       
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    if (linkList.length > 0) {
        let resultSender = sender ? `${sender}: ` : '';     
        let otherText = message.replace(linkRegex, '').replace(resultSender, '').trim();
        let titleMessage = `${prefix}${resultSender}&r${highlightTags(otherText)} `;
        let linkHoverables = linkList.map(link => {
            return getLinkHoverable(link);
        })  
        return createMessage(titleMessage, linkHoverables);

    } else { // view auction link
        let titleMessage = `${prefix}${sender}: `;
        let auctionClickable = new TextComponent('&e&l[CLICK TO VIEW AUCTION] ')
            .setClick('run_command', message)
            .setHover('show_text', message);

        return createMessage(titleMessage, [auctionClickable]);   
    }
}
                
function botMessageHandler(prefix, message) {   
    let botMessage = removeRandomID(message).removeFormatting().replace(idRegex, '').trim();

    //! _mayor
    if (botMessage.startsWith('Current mayor: ')) {
        return getGuildResponse(prefix, botMessage, 'mayor')

    //! _mayor (certain mayor)
    } else if (MAYOR_NAMES.includes(botMessage.split(' ')[0])) {
        return getGuildResponse(prefix, botMessage, 'pickedMayor');

    //! promoted from
    } else if (botMessage.includes('promoted from')) {
        return getGuildResponse(prefix, message, 'promoted');

    //! demoted from
    } else if (botMessage.includes('demoted from')) {   
        return getGuildResponse(prefix, message, 'demoted');

    //! role up to date
    } else if (botMessage.includes('Role is already up to date!')) {
        return getGuildResponse(prefix, botMessage, 'updatedMessage');

    //! your role does not have the requirements
    } else if (botMessage.includes('Your role does not have requirements!')) {
        return getGuildResponse(prefix, botMessage, 'yourNoReqUpdate');
    
    //! Role does not have requirements
    } else if (botMessage.includes('Role does not have the requirements!')) {
        return getGuildResponse(prefix, botMessage, 'noReqUpdate')

    //! _skill
    } else if (SKILL_NAMES.includes(botMessage.split(' ')[0]) && botMessage.includes('level for')) {
        return botMessage.includes('Overflow XP') 
            ? getGuildResponse(prefix, botMessage, 'skillMaxed')
            : getGuildResponse(prefix, botMessage, 'skillProgress');
    
    //! _bz
    } else if (botMessage.startsWith('Bazaar data for ')) {
        return getGuildResponse(prefix, botMessage, 'bazaar');

    //! _be data
    } else if (botMessage.includes('k/d (kdr)')) {
        return getGuildResponse(prefix, botMessage, 'bestiary');

    //! _command
    } else if (botMessage.includes('Available commands (_command)')) {
        return getGuildResponse(prefix, botMessage, 'commandHelp');

    //! syntax error
    } else if (botMessage.includes('Syntax')) { 
        let [title, message] = botMessage.split(': ');
        let alias = removeRandomID(message).split(' ')[0].trim();
        const list1 = ['skill', 'be', 'bestiary', 'col', 'coll', 'collection', 'fw', 'fweight', 'elite', 'slayer'];
        const list2 = ['ib', 'bzib', 'instabuy', 'is', 'bzis', 'instasell'];
        const list3 = ['cata', 'trophy', 'trophyfish', 'tfish'];
        if (list1.some(name => alias === name)) {
            return getGuildResponse(prefix, botMessage, 'syntaxError1')
        }
        if (alias === '<amount>[k|m|b|s]') {    
            return getGuildResponse(prefix, botMessage, 'syntaxError2')
        }
        if (list3.some(name => alias === name)) {
            return getGuildResponse(prefix, botMessage, 'syntaxError3')
        }

    //! sticker     
    } else if (/\<.+\>/.test(botMessage) && !botMessage.includes('⚠')) {   
        return getGuildResponse(prefix, botMessage, 'sticker');
        
    //! october specials
    } else if (botMessage.includes('AAH! You scared me,')) {
        return getGuildResponse(prefix, botMessage, 'spooky1');
        
    } else if (botMessage.includes('Spooked')) {
        return getGuildResponse(prefix, botMessage, 'spooky2');
        
    //! command not found
    } else if (botMessage.includes('try _help')) {
        return getGuildResponse(prefix, botMessage, 'cmdError');
        
    //! _lbin
    } else if (botMessage.includes('Lowest BIN for')) {
        return getGuildResponse(prefix, botMessage, 'lbin');
        
    //! _cata
    } else if (botMessage.includes('Catacombs level for')) {
        return getGuildResponse(prefix, botMessage, 'cata');
        
    //! dungoen floor
    } else if (botMessage.includes('Completions') && botMessage.includes('Fastest time')) {
        return getGuildResponse(prefix, botMessage, 'dungeonRecord');

    //! _slayer
    } else if (botMessage.includes('slayer data for')) {
        return getGuildResponse(prefix, botMessage, 'slayer');
        
    //! _tfish
    } else if (['Bronze', 'Silver', 'Gold', 'Diamond'].every(item => botMessage.includes(item))) {
        const noobf = botMessage.includes('(w/o Obf 1)');
        if (botMessage.startsWith('Trophy') && !noobf) {
            return getGuildResponse(prefix, botMessage, 'tfishGeneral');
        } else if (noobf) {
            return getGuildResponse(prefix, botMessage, 'tfishObf');
        } else {
            return getGuildResponse(prefix, botMessage, 'tfishSpecific');
        }
        
    //! _contest specific
    } else if (botMessage.includes('contest in')) {
        return getGuildResponse(prefix, botMessage, 'contestSpecific');

    //! _contest next
    } else if (botMessage.includes('Next contest')) {
        return botMessage.includes('Active contest')    
            ? getGuildResponse(prefix, botMessage, 'activeContest')
            : getGuildResponse(prefix, botMessage, 'nextContest');
        
    //! _boop player
    } else if (botMessage.includes('_boop')) {
        [tempBoop.booper, tempBoop.booped] = getGuildResponse(prefix, botMessage, 'bot_boop');
        return `${prefix}${tempBoop.booper}: &r_boop {tempBoop.booped}`;
        
    //! booped player
    } else if (botMessage.includes('Booped')) {
        let match = botMessage.match(/Booped (.+)!/);
        if (match) {    
            let [_, name] = match;
            if (name.toLowerCase() === Player.getName().toLowerCase()) {    
                return `${prefix}&d&l${tempBoop.booper}Booped You!`;
            } else if (name === tempBoop.booped) {
                return `${prefix}&d&l${tempBoop.booper} Booped ${name}!`;
            } else {
                return `${prefix}&d&lBooped ${name}!`;
            }
        }
        return formatBotBooped(prefix, boopedMatch, booper, boopTarget);         
        
    //! _fw farming weight
    } else if (botMessage.includes('Farming weight for')) {
        return getGuildResponse(prefix, botMessage, 'farmingWeight');
        
    //! _is insta sell price
    } else if (botMessage.includes('Total earned from selling')) {
        return getGuildResponse(prefix, botMessage, 'instasell');
        
    //! _ib insta buy price
    } else if (botMessage.includes('Total cost to buy')) {
        return getGuildResponse(prefix, botMessage, 'instabuy');
        
    //! _collection
    } else if (botMessage.includes('completion for')) { 
        return getGuildResponse(prefix, botMessage, 'collection');
        
    //! _pick
    } else if (botMessage.startsWith('I choose')) {
        return getGuildResponse(prefix, botMessage, 'pickCommand');
        
    //! links
    } else if (botMessage.includes('l$')) {
        return getGuildResponse(prefix, botMessage, 'generalDecoded');
        
    //! responses & 8ball
    } else {
        return (botMessage.startsWith('⚠'))
        ? `${prefix}&c${botMessage}` 
        : `${prefix}${botMessage}`; 
    }
};

function discordPlayerMessageHandler(prefix, message) {
    let dpMessage = removeRandomID(message).removeFormatting().replace(/➩/g, '').replace('  ', ' ')
    let [sender, responses] = dpMessage.split(/: (.+)/);     
    return responses.includes('[LINK]') || responses.includes('viewauction')      
        ? handleLinkMessages(prefix, sender, dpMessage)
        : `${prefix}${sender}&r: ${highlightTags(responses)}`;
};

function guildPlayerMessageHandler(prefix, message) {
    let [sender, responses] = removeRandomID(message).split(/: (.+)/); 
    if (responses.includes('[LINK]') || responses.includes('viewauction')) {     
        return handleLinkMessages(prefix, sender, responses);
    } else {                    
        return `${prefix}${sender}&r: ${highlightTags(responses)}`;
    }
};

function replyMessageHandler(prefix, message) {
    let replyMessage = removeRandomID(message.removeFormatting());
    let [sender, responses] = replyMessage.split(/: (.+)/);
    let [name1, name2] = sender.split(' [to] ');   
    let formattedSender = `&a${name1} &2[to]&a ${name2}`    
    return responses.includes('[LINK]') || responses.includes('viewauction')
        ? handleLinkMessages(prefix, formattedSender, responses)        
        : `${prefix}${name1} &2[to]&a ${name2}&r: ${highlightTags(responses)}`;
};  

function messageHandler(prefix, message) {
    let type = '';
    let resMessage = '';
    let strippedMessage = message.removeFormatting();
    //* bot     
    if (idRegex.test(message) || !message.includes(': ') && !message.includes('l$')) {
        type = 'bot';
        resMessage = message;   

    //* guildPlayer
    } else if (/(&[a-qs-z0-9])(.+) &3(.+)&f: &r(.+)&r/.test(message) && !idRegex.test(message)) {
        type = 'guildPlayer';
        resMessage = message;

    //* discordPlayer & reply                               
    } else if (strippedMessage.includes(': ') && !idRegex.test(message)) {
        let [sender, responses] = strippedMessage.split(/: (.+)/);  
        if (sender.includes(' [to] ')) {
            type = 'reply';
            resMessage = strippedMessage;

        } else {
            type = 'discordPlayer';
            resMessage = strippedMessage;
        }
    }
    if (type === 'bot') return botMessageHandler(prefix, resMessage);
    if (type === 'discordPlayer') return discordPlayerMessageHandler(prefix, resMessage);
    if (type === 'guildPlayer') return guildPlayerMessageHandler(prefix, resMessage);
    if (type === 'reply') return replyMessageHandler(prefix, resMessage);
};

function replaceMessage(event, message) {
    cancel(event);
    if (Array.isArray(message)) {
        message.forEach(msg => {
            ChatLib.chat(msg);
        })
    } else {
        ChatLib.chat(message);
    }
};

let multiMessages = [];
registerWhen('chat', timeThis("regChat guild messages", (playerInfo, playerRole, playerStuff, event) => {
    let [msgType, msg] = separatePlayerAndMessage(event); 
    let strippedMsg = msg.removeFormatting();
    const starts = strippedMsg.startsWith(continueSymbol);
    const ends = strippedMsg.endsWith(continueSymbol);
    const player = stripRank(playerInfo);            
    const isBot = data.bots.includes(player);

    if (!ends) { // finish (both multi and single message)
        let finalMsg = msg;
        if (starts) { // ending message of continued parts
            finalMsg = multiMessages.pop() + msg.slice(continueSymbol.length);
        };

        const newMsg = messageHandler(BOT_PREFIX, finalMsg);
        if (newMsg && newMsg !== finalMsg) {    
            finalMsg = newMsg;
            replaceMessage(event, newMsg);               
        };

    } else if (starts) { // middle of multi-message -- bot
        multiMessages[0] += msg.slice(continueSymbol.length, -continueSymbol.length);
        cancel(event);
    
    } else { // start of multi-message
        multiMessages.push(msg.slice(0, -continueSymbol.length));
        cancel(event);
    };
}), () => getInHypixel()).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}');