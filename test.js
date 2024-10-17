import { createMessage, getInSkyblock, getLinkHoverable, shortenMsg, stripRank, removeRandomID } from './functions';
import { data } from './bots';      
import { getGuildResponse } from './formatFunctions';

const BOT_PREFIX = '&2B > &a';
const continueSymbol = '➩';
const idRegex = /<@.+>/;

const MAYOR_NAMES = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];
const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', 'Runecrafting', 'Taming', 'Social'];
const ERROR_MESSAGES = ["Wait a while before trying again.", "Can't message an offline player.", "Could not send a private message to that player.", "Spam protection moment", "No product found!", "Error: Failed to get UUID from API, and no cached UUID was found.", "No permission", "No username provided.", "You must be staff to update the role of another member!", "Invalid type or mob", "Too many arguments!"];   

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
    console.log('handlelinkmessages');
    console.log(message);   
    let linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    let titleMessage = `${BOT_PREFIX}`;
    let linkHoverables = linkList.map(link => {
        return getLinkHoverable(link);
    })
    return createMessage(titleMessage, linkHoverables);
}

const tempBoop = {
    'booper': '',
    'booped': '',
};

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
    } else if (botMessage.includes('_boop')) {
        [tempBoop.booper, tempBoop.booped] = getGuildResponse(BOT_PREFIX, botMessage, 'bot_boop');
        return `${prefix}${tempBoop.booper}: &r_boop {tempBoop.booped}`;
        
    //! booped player
    } else if (botMessage.includes('Booped')) {
        let match = botMessage.match(/Booped (.+)/);
        if (match) {    
            let [_, name] = match;
            if (name.toLowerCase() === Player.getName().toLowerCase()) {
                return `${BOT_PREFIX}&d&l${tempBoop.booper} Booped You!`;
            } else if (name === tempBoop.booped) {
                return `${BOT_PREFIX}&d&l${tempBoop.booper} Booped ${name}!`;
            } else {
                return `${BOT_PREFIX}&d&lBooped ${name}!`;
            }
        }
        return formatBotBooped(BOT_PREFIX, boopedMatch, booper, boopTarget);         
        
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
        return ERROR_MESSAGES.includes(botMessage) 
            ? `${BOT_PREFIX}&c${botMessage}` 
            : `${BOT_PREFIX}${botMessage}`;
    }
};

function discordPlayerMessageHandler(message) {
    // &rAyaDaSheep:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a65aa5a1637216851/JNH_31352125_344166^kqh?fy=781feg7c&jt=781e9efc&in=593dd25bbgd7b761625ba2ce6294ec3f33c18e436673672fd48e36e894b65b3a&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfo➩&r&r➩ut/2178616a237255a1343/23a65aa5a211942a63a/JNH_31352125_344227^kqh?fy=781feg7c&jt=781e9efc&in=4c3f723a6d948c22ge4ef8ggdc31effb6g727ggeef842b66dg996559a3fc61e4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a65aa5a2518151623/JNH_313521➩&r&r➩25_344323^kqh?fy=781feg7c&jt=781e9efc&in=99346118f34549a2158d67d8225g72ff88b6528a6a6ccee8f61a9cca6ad4ca15&)&r&r
    let dpMessage = removeRandomID(message).removeFormatting().replace(continueSymbol, '').replace('  ', ' ')
    let [sender, response] = dpMessage.split(': ');
    return response.includes('[LINK]')      
        ? handleLinkMessages(response)
        : `${BOT_PREFIX}${sender}&r: ${highlightTags(response)}`;
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

function messageHandler(message) {
    let type = '';
    let strippedMessage = message.removeFormatting();

    //* bot
    // &rBooped demonhunter990! <@vor9bagt13>&r
    if (idRegex.test(message)) type = 'bot';

    //* guildPlayer
    // &b[MVP&3+&b] Pebbles &3[Shrimp]&f: &ri wasn't even brainrot posting diana :sob:&r
    if (/(&[a-qs-z0-9])(.+) &3(.+)&f: &r(.+)&r/.test(message) && !idRegex.test(message)) {
        type = 'guildPlayer';
    }

    //* discordPlayer
    // DamianKirishima: raw mute pebbles 120h brainrot 
    //* reply
    // pebbles [to] IGrindDiana77:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a7447717a63796699/jnbhf^qoh?fy=7822fc1c&jt=7821aa9c&in=3af8a989b4cee7d1a99d51b593f8166f5456a697b7453ad41a7d2gbb316e78f2&)
    if (strippedMessage.includes(': ') && !idRegex.test(message)) {
        let [sender, response] = strippedMessage.split(': ');
        type = sender.includes(' [to] ') ? 'reply' : 'discordPlayer';
    }   

    console.log(type, message);
    if (type === 'bot') return botMessageHandler(message);
    if (type === 'discordPlayer') return discordPlayerMessageHandler(message);
    if (type === 'guildPlayer') return guildPlayerMessageHandler(message);
    if (type === 'reply') return replyMessageHandler(message);
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
register('chat', (playerInfo, playerRole, playerStuff, event) => {
    const rawMsg = ChatLib.getChatMessage(event, true);
    let [msgType, msg] = separatePlayerAndMessage(event); 
    let strippedMsg = msg.removeFormatting();
    const starts = strippedMsg.startsWith(continueSymbol);
    const ends = strippedMsg.endsWith(continueSymbol);
    const player = stripRank(playerInfo);            
    const isBot = data.bots.includes(player);

    // if !starts && ends, starting message of continued parts
    // if starts && ends, middle message of continued parts
    // if starts && !ends, ending message of continued parts

    if (!ends) { // finish (both multi and single message)
        let finalMsg = msg;
        if (starts && isBot) { // ending message of continued parts
            finalMsg = multiMessages.pop() + msg.slice(continueSymbol.length);
        }   
        const newMsg = messageHandler(finalMsg);        
        if (newMsg && newMsg !== finalMsg) {    
            finalMsg = newMsg;
            replaceMessage(event, newMsg);               
        }           
    } else if (starts && isBot) { // middle of multi-message -- bot
        multiMessages[0] += msg.slice(continueSymbol.length, -continueSymbol.length);
        cancel(event);
    
    } else { // start of multi-message
        multiMessages.push(msg.slice(0, -continueSymbol.length));
        cancel(event);
    }   
}).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}');

register('command', () => {
    console.log(multiMessages);
}).setName('logstored');     