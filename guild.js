import { createMessage, getInSkyblock, getLinkHoverable, stripRank, removeRandomID, highlightTags } from './functions';
import { data } from './bots';
import { registerWhen, timeThis } from './utils';      
import { getGuildResponse } from './formatFunctions';

const BOT_PREFIX = '&2B > &a';      
const continueSymbol = '➩';
const idRegex = /<@.+>/;

const MAYOR_NAMES = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];
const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', 'Runecrafting', 'Taming', 'Social'];
const ERROR_MESSAGES = ["Wait a while before trying again.", "Can't message an offline player.", "Could not send a private message to that player.", "Spam protection moment", "No product found!", "Error: Failed to get UUID from API, and no cached UUID was found.", "No permission", "No username provided.", "You must be staff to update the role of another member!", "Invalid type or mob", "Too many arguments!"];        

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
    // AyaDaSheep: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a74411894a3791569/jnbhf^qoh?fy=7822f5g8&jt=7821a488&in=944b4326373d213bad854fce5g475gcebf2d3gae99382317ge27eda5519e5ff4&) [LINK](deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7516887882a88361/jnbhf^qoh?fy=78233c88&jt=7821eag8&in=aeg5bf131f8e5c6af5727gabff6319367b81124f8f1315329b➩4bb59afd7d678d&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7517693894226456/jnbhf^qoh?fy=78233d48&jt=7821ebc8&in=78cb48dbcd55b423d9d629eb588bcaddg3b1g85c7be9f46c91➩➩593g66382gd67f&)
    let linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    let resultSender = sender ? `${sender}: ` : '';     
    let otherText = message.replace(linkRegex, '').replace(resultSender, '').trim();
    let titleMessage = `${prefix}${resultSender}&r${highlightTags(otherText)} `;
    let linkHoverables = linkList.map(link => {
        return getLinkHoverable(link);
    })
    return createMessage(titleMessage, linkHoverables);
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
        return getGuildResponse(prefix, botMessage, 'promoted');

    //! demoted from
    } else if (botMessage.includes('demoted from')) {
        return getGuildResponse(prefix, botMessage, 'promoted');

    //! role up to date
    } else if (botMessage.includes('Role is already up to date!')) {
        return getGuildResponse(prefix, botMessage, 'updatedMessage');

    //! role does not have the requirements
    } else if (botMessage.includes('Your role does not have requirements!')) {
        return getGuildResponse(prefix, botMessage, 'noreqUpdate');

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
    } else if (/\<.+\>/.test(botMessage)) {
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
        let match = botMessage.match(/Booped (.+)/);
        if (match) {    
            let [_, name] = match;
            if (name.toLowerCase() === Player.getName().toLowerCase()) {
                return `${prefix}&d&l${tempBoop.booper} Booped You!`;
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
        return ERROR_MESSAGES.some(errorMessage => botMessage.includes(errorMessage)) 
        ? `${prefix}&c${botMessage}` 
        : `${prefix}${botMessage}`; 
    }
};

function discordPlayerMessageHandler(prefix, message) {
    // &rAyaDaSheep:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a65aa5a1637216851/JNH_31352125_344166^kqh?fy=781feg7c&jt=781e9efc&in=593dd25bbgd7b761625ba2ce6294ec3f33c18e436673672fd48e36e894b65b3a&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfo➩&r&r➩ut/2178616a237255a1343/23a65aa5a211942a63a/JNH_31352125_344227^kqh?fy=781feg7c&jt=781e9efc&in=4c3f723a6d948c22ge4ef8ggdc31effb6g727ggeef842b66dg996559a3fc61e4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a65aa5a2518151623/JNH_313521➩&r&r➩25_344323^kqh?fy=781feg7c&jt=781e9efc&in=99346118f34549a2158d67d8225g72ff88b6528a6a6ccee8f61a9cca6ad4ca15&)&r&r    
    let dpMessage = removeRandomID(message).removeFormatting().replace(/➩/g, '').replace('  ', ' ')
    let [sender, responses] = dpMessage.split(/: (.+)/);     
    return responses.includes('[LINK]')       
        ? handleLinkMessages(prefix, sender, dpMessage)
        : `${prefix}${sender}&r: ${highlightTags(responses)}`;
};

function guildPlayerMessageHandler(prefix, message) {
    // &b[MVP&9+&b] Usamah &3[Krill]&f: &r[370] 〣 [MVP+] Usamah: join shrimple if u do main it frfr  [348] α [MVP+] IMainFishing: l guild&r&r
    let [sender, responses] = removeRandomID(message).split(/: (.+)/); 
    if (responses.includes('[LINK]')) {     
        return handleLinkMessages(prefix, sender, responses);
    } else {                    
        return `${prefix}${sender}&r: ${highlightTags(responses)}`;
    }
};

function replyMessageHandler(prefix, message) {
    // &r&2Guild > &6[MVP&c++&6] Baltics &3[Admin]&f: &rIGrindDiana [to] Citrus: &r[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a2762a4a9285a3642/23a66795336aa766575/jnbhf^qoh?fy=781g2gaf&jt=781edf2f&in=cc65a397a3d7a693cec2b9f8b21f67ab44fc69gcc23958cg6eagcefc16ce943d&)&r
    console.log('replymessagehandler');
    console.log(message);
    let replyMessage = removeRandomID(message.removeFormatting());
    let [sender, responses] = replyMessage.split(/: (.+)/);
    let [name1, name2] = sender.split(' [to] ');    
    let formattedSender = `&a${name1} &2[to]&a${name2}`
    return responses.includes('[LINK]') 
        ? handleLinkMessages(prefix, formattedSender, responses)        
        : `${prefix}${name1} &2[to]&a ${name2}&r: ${highlightTags(responses)}`;
};

function messageHandler(prefix, message) {
    let type = '';
    let resMessage = '';
    let strippedMessage = message.removeFormatting();
    //* bot
    if (idRegex.test(message) || !message.includes(': ')) {
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
    // const isBot = data.bots.includes(player); // not sure if needed

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
}), () => getInSkyblock()).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}');

register('command', () => {
    console.log(multiMessages);
}).setName('logstored');     