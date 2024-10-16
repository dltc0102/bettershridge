import { createMessage, getInSkyblock, getLinkHoverable, shortenMsg, stripRank, removeRandomID } from './functions';
import { data } from './bots';      
import { getGuildResponse } from './formatFunctions';

const BOT_PREFIX = '&2B > &a';
const continueSymbol = '➩';
const idRegex = /<@.+>/;

const MAYOR_NAMES = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];
const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', 'Runecrafting', 'Taming', 'Social'];
const ERROR_MESSAGES = ["Wait a while before trying again.", "Can't message an offline player.", "Could not send a private message to that player.", "Spam protection moment", "No product found!", "Error: Failed to get UUID from API, and no cached UUID was found.", "No permission", "No username provided.", "You must be staff to update the role of another member!", "Invalid type or mob", "Too many arguments!"];   

let multiMessages = [];
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

function highlightTags(message) {
    let tagRegex = /@\w+/g; 
    return message.replace(tagRegex, tag => `&b${tag}&r`);
};

function handleLinkMessages(message) {
    console.log(message);   
    let linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    let otherText = highlightTags(message.replace(linkRegex, ''));
    let titleMessage = `${BOT_PREFIX}&r${otherText} `;
    let linkHoverables = linkList.map(link => {
        return getLinkHoverable(link);
    })
    return createMessage(titleMessage, linkHoverables);
}

function botMessageHandler(message) {   
    let botMessage = message.removeFormatting().replace(idRegex, '').trim();

    //! _mayor
    if (botMessage.startsWith('Current mayor: ')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'mayor')

    //! _mayor (certain mayor)
    } else if (MAYOR_NAMES.includes(botMessage.split(' ')[0])) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'pickedMayor');
    //! promoted from
    } else if (botMessage.includes('promoted from')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'promoted');

    //! demoted from
    } else if (botMessage.includes('demoted from')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'promoted');

    //! role up to date
    } else if (botMessage.includes('Role is already up to date!')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'updatedMessage');

    //! _skill
    } else if (SKILL_NAMES.includes(botMessage.split(' ')[0]) && botMessage.includes('level for')) {
        return botMessage.includes('Overflow XP') 
            ? getGuildResponse(BOT_PREFIX, botMessage, 'skillMaxed')
            : getGuildResponse(BOT_PREFIX, botMessage, 'skillProgress');
    
    //! _bz
    } else if (botMessage.startsWith('Bazaar data for ')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'bazaar');

    //! _be data
    } else if (botMessage.includes('k/d (kdr)')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'bestiary');

    //! _command
    } else if (botMessage.includes('Available commands (_command)')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'commandHelp');

    //! syntax error
    } else if (botMessage.includes('Syntax')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'syntaxError');

    //! sticker
    } else if (/\<.+\>/.test(botMessage)) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'sticker');
        
    //! october specials
    } else if (botMessage.includes('AAH! You scared me,')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'spooky1');
        
    } else if (botMessage.includes('Spooked')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'spooky2');
        
    //! command not found
    } else if (botMessage.includes('try _help')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'cmdError');
        
    //! _lbin
    } else if (botMessage.includes('Lowest BIN for')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'lbin');
        
    //! _cata
    } else if (botMessage.includes('Catacombs level for')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'cata');
        
    //! dungoen floor
    } else if (botMessage.includes('Completions') && botMessage.includes('Fastest time')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'dungeonRecord');

    //! _slayer
    } else if (botMessage.includes('slayer data for')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'slayer');
        
    //! _tfish
    } else if (['Bronze', 'Silver', 'Gold', 'Diamond'].every(item => botMessage.includes(item))) {
        const noobf = botMessage.includes('(w/o Obf 1)');
        if (botMessage.startsWith('Trophy') && !noobf) {
            return getGuildResponse(BOT_PREFIX, botMessage, 'tfishGeneral');
        } else if (noobf) {
            return getGuildResponse(BOT_PREFIX, botMessage, 'tfishObf');
        } else {
            return getGuildResponse(BOT_PREFIX, botMessage, 'tfishSpecific');
        }
        
    //! _contest specific
    } else if (botMessage.includes('contest in')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'contestSpecific');

    //! _contest next
    } else if (botMessage.includes('Next contest')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'nextContest');
        
    //! _boop player
    // } else if (botMessage.includes('_boop')) {
    //     return getGuildResponse(BOT_PREFIX, botMessage, 'bot_boop');
        
    //! booped player
    // } else if (botMessage.includes('Booped')) {
    //     return formatBotBooped(BOT_PREFIX, boopedMatch, booper, boopTarget);         
        
    //! _fw farming weight
    } else if (botMessage.includes('Farming weight for')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'farmingWeight');
        
    //! _is insta sell price
    } else if (botMessage.includes('Total earned from selling')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'instasell');
        
    //! _ib insta buy price
    } else if (botMessage.includes('Total cost to buy')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'instabuy');
        
    //! _collection
    } else if (botMessage.includes('completion for')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'collection');
        
    //! _pick
    } else if (botMessage.startsWith('I choose')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'pickCommand');
        
    //! links
    } else if (botMessage.includes('l$')) {
        return getGuildResponse(BOT_PREFIX, botMessage, 'generalDecoded');
        
    //! responses & 8ball
    } else {
        return `${BOT_PREFIX}${botMessage}`;
    }
};

function discordPlayerMessageHandler(message) {
    // &rbiscuit: test &r
    let dpMessage = removeRandomID(message.removeFormatting());
    let [sender, response] = dpMessage.split(': ');
    if (response.includes('[LINK]')) {
        return handleLinkMessages(response);
    } else {    
        return `${BOT_PREFIX}${sender}&r: ${highlightTags(response)}`;
    }
};

function guildPlayerMessageHandler(message) {
    // &b[MVP&c+&b] oBiscuit &3[Cray]&f: &rblooh blah&r    
    let [sender, response] = removeRandomID(message).split(': '); 
    if (response.includes('[LINK]')) {
        return handleLinkMessages(response);
    } else {                    
        return `${BOT_PREFIX}${sender}&r: ${highlightTags(response)}`;
    }
};

function replyMessageHandler(message) {
    // &rbiscuit [to] nquek: test &r
    let replyMessage = removeRandomID(message.removeFormatting());
    let [sender, response] = replyMessage.split(': ');
    let [name1, name2] = sender.split(' [to] ');
    return response.includes('[LINK]') 
        ? handleLinkMessages(response)
        : `${BOT_PREFIX}${name1} &2[to]&a ${name2}&r: ${highlightTags(response)}`;
};

function messageHandler(type, message) {
    if (type === 'bot') return botMessageHandler(message);
    if (type === 'discordPlayer') return discordPlayerMessageHandler(message);
    if (type === 'guildPlayer') return guildPlayerMessageHandler(message);
    if (type === 'reply') return replyMessageHandler(message);
};

register('chat', (playerInfo, playerRole, playerStuff, event) => {
    let [msgType, msg] = separatePlayerAndMessage(event); 
    const starts = msg.startsWith(continueSymbol);
    const ends = msg.endsWith(continueSymbol);
    // const player = stripRank(playerInfo);            
    // const isBot = data.bots.includes(player);
        
    // if !starts && ends, starting message of continued parts
    // if starts && ends, middle message of continued parts
    // if starts && !ends, ending message of continued parts
    if (!ends) {
        let finalMsg = msg;
        if (starts) { // ending message of continued parts
            finalMsg = multiMessages.pop() + msg.slice(continueSymbol.length);  
        }
        const newMsg = messageHandler(msgType, finalMsg);
        if (newMsg && finalMsg !== newMsg) {
            finalMsg = newMsg;
            cancel(event);
            if (Array.isArray(newMsg)) {
                newMsg.forEach(msg => {
                    ChatLib.chat(msg);
                })
            } else {
                ChatLib.chat(newMsg);
            }
        }       
    } else if (starts) {
        multiMessages[0] += msg.slice(continueSymbol.length);
    } else {    
        multiMessages.push(rawMsg);
    }   
}).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}');

register('command', () => {
    console.log(multiMessages);
}).setName('logstored');    