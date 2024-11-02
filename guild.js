import { getInHypixel, stripRank, removeRandomID, highlightTags, stripFormattedName, hoverableAhLink, hoverableStufLink, hoverableWebLink, splitMapN } from './functions';
import { data } from './utilities/bots';
import { prefixData } from './utilities/prefix';
import { registerWhen, timeThis } from './utils';      
import { getGuildResponse } from './formatFunctions';

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
    const playerRegex = /(.+) (&[a-qs-z0-9])\[(.+)\]&f: (.+)/;
    const playerMatch = playerMessage.match(playerRegex);
    if (playerMatch) {
        const [_, formattedName, roleColor, roleName, message] = playerMatch;
        const sender = stripFormattedName(formattedName);
        
        // &b[MVP&3+&b] Pebbles &3[Shrimp]&f: &rwatching a level 346 macro svens&r&r
        if (!data.bots.includes(sender)) {
            type = 'guildPlayer';
            resMessage = playerMatch[0];         
        }
        
        if (data.bots.includes(sender)) {
            const newMessage = message;
            
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

function handleLinkMessages(prefix, sender='', msg) {
    const preFMessage = highlightTags(
        msg.slice(msg.indexOf(': ')+1).removeFormatting().replace(/\s+/g, ' ')
      ).trim();

    const processedMessageParts = splitMapN(preFMessage,
        [/\[LINK\]\(([^\(\)]+)\)/, hoverableStufLink],
        [/\/viewauction (\w+)/, hoverableAhLink],
        [/(https?:\/\/\S+)/, hoverableWebLink]
    );
    return new Message(
        prefix, `&a${sender}: &r`, ...processedMessageParts
    );      
};
                
function botMessageHandler(prefix, message) {
    const botMessage = removeRandomID(message).removeFormatting().replace(idRegex, '').trim();
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
    //! Role does not have requirements
    } else if (botMessage.includes('Your role does not have requirements!') || botMessage.includes('Role does not have requirements!')) {
        return getGuildResponse(prefix, botMessage, 'noReqUpdate');
    
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
        return botMessage.includes('bestiary for') 
            ? getGuildResponse(prefix, botMessage, 'bestiaryAll')
            : getGuildResponse(prefix, botMessage, 'bestiarySpecific');
    
    //! _command
    } else if (botMessage.includes('Available commands (_command)')) {
        return getGuildResponse(prefix, botMessage, 'commandHelp');

    //! syntax error
    } else if (botMessage.includes('⚠ Usage:')) { 
        return getGuildResponse(prefix, botMessage, 'syntaxError');

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
        return `${prefix}${tempBoop.booper}: &r_boop ${tempBoop.booped}`;       
        
    //! booped player
    } else if (botMessage.includes('Booped')) {
        const match = botMessage.match(/Booped (.+)!/);
        if (match) {    
            const [_, name] = match;
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
        
    //! misc data for
    } else if (botMessage.includes('data for') && !botMessage.includes('slayer') && !botMessage.includes('Bazaar')) {
        return getGuildResponse(prefix, botMessage, 'miscDataFor');
    
    //! _gonline command
    } else if (botMessage.startsWith('Guildmate')) {
        return getGuildResponse(prefix, botMessage, 'guildmateStatus');     

    //! responses & 8ball
    } else {
        return (botMessage.startsWith('⚠') && !botMessage.includes('Usage'))  
        ? `${prefix}&c${botMessage}` 
        : `${prefix}${botMessage}`;     
    }
};

function discordPlayerMessageHandler(prefix, message) {
    const dpMessage = removeRandomID(message).removeFormatting().replace(/➩/g, '').replace(/  /g, '');
    const [sender, responses] = dpMessage.split(/: (.+)/);  
    if (!responses) return null;   
    return responses.includes('[LINK]') || responses.includes('viewauction') || responses.includes('http')    
        ? handleLinkMessages(prefix, sender, dpMessage)
        : `${prefix}${sender}&r: ${highlightTags(responses)}`;
};  

function guildPlayerMessageHandler(prefix, message) {
    const [sender, responses] = removeRandomID(message).replace(/  /g, '').split(/: (.+)/); 
    if (responses.includes('[LINK]') || responses.includes('viewauction') || responses.includes('http')) {     
        return handleLinkMessages(prefix, sender, responses);
    } else {                    
        return `${prefix}${sender}&r: ${highlightTags(responses)}`;
    }
};

function replyMessageHandler(prefix, message) {
    const replyMessage = removeRandomID(message.removeFormatting().replace(/  /g, ''));
    const [sender, responses] = replyMessage.split(/: (.+)/);
    const [name1, name2] = sender.split(' [to] ');   
    const formattedSender = `&a${name1} &2[to]&a ${name2}`; 
    if (!responses) return null;
    if (responses.includes('[LINK]') || responses.includes('http') || responses.includes('viewauction')) {
        return handleLinkMessages(prefix, formattedSender, responses);      

    } else {    
        return `${prefix}${name1} &2[to]&a ${name2}&r: ${highlightTags(responses)}`;
    }
};  

function messageHandler(message) {
    let type = '';
    let resMessage = '';
    const strippedMessage = message.removeFormatting();
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
        const [sender, responses] = strippedMessage.split(/: (.+)/);  
        if (sender.includes(' [to] ')) {
            type = 'reply';
            resMessage = strippedMessage;

        } else {
            type = 'discordPlayer';
            resMessage = strippedMessage;
        }
    }
    // console.log(' ');
    // console.log(type, resMessage);
    const prefix = type === 'guildPlayer'
        ? `&2${prefixData.guild}&2 > &a` 
        : `&2${prefixData.bot}&2 > &a`;
    const trimmedMessage = resMessage.replace(/\s+/g, ' ').trim();
    if (type === 'bot') return [type, botMessageHandler(prefix, trimmedMessage)];
    if (type === 'discordPlayer') return [type, discordPlayerMessageHandler(prefix, trimmedMessage)];
    if (type === 'guildPlayer') return [type, guildPlayerMessageHandler(prefix, trimmedMessage)];
    if (type === 'reply') return [type, replyMessageHandler(prefix, trimmedMessage)];
};

function replaceMessage(event, message) {
    cancel(event);
    if (Array.isArray(message)) {
        message.forEach(msg => {
            const editedMsg = msg;
            ChatLib.chat(editedMsg);
        })
    } else {
        const editedMsg = message;
        ChatLib.chat(editedMsg);                     
    }
};

let multiMessages = [];
registerWhen('chat', timeThis("regChat guild messages", (playerInfo, playerRole, playerStuff, event) => {
    const [msgType, msg] = separatePlayerAndMessage(event); 
    const strippedMsg = msg.removeFormatting();
    const starts = strippedMsg.startsWith(continueSymbol);
    const ends = strippedMsg.endsWith(continueSymbol);
    const player = stripRank(playerInfo);
    const isBot = data.bots.includes(player);

    if (!ends) { // finish (both multi and single message)
        let finalMsg = msg; 
        if (starts) { // ending message of continued parts
            const endingMsg = msg.slice(msg.indexOf(continueSymbol)+1);
            finalMsg = multiMessages.pop() + endingMsg;
        };

        const [newType, newMsg] = messageHandler(finalMsg);
        if (newType === 'bot' && !isBot) {
            const yesClickable = new TextComponent('&a&l[YES] ')
                .setClick('run_command', `/addbot ${player}`)
                .setHover('show_text', `/addbot ${player}`);                        
            const noClickable = new TextComponent('&c&l[NO] ')
                .setClick('run_command', `/clearchatbyid 999`);
            const updateBotMessage = new Message(
                `&9[&bBetterShridge&9] &rIs &b${player}&r a new bot name? `, yesClickable, noClickable
            ).setChatLineId(999);
            ChatLib.chat(updateBotMessage);
        }
        if (newMsg && newMsg !== finalMsg) {        
            finalMsg = newMsg;
            replaceMessage(event, newMsg);    

        } else if (!newMsg) {
            cancel(event);
        }

    } else if (starts) { // middle of multi-message -- bot
        const submsg = msg.substring(msg.indexOf(continueSymbol) + 1);
        const middlemsg = submsg.slice(0, submsg.indexOf(continueSymbol));
        multiMessages[0] += middlemsg;
        cancel(event);
        
    } else { // start of multi-message !starts && !ends
        const startMsg = msg.slice(0, msg.indexOf(continueSymbol));
        multiMessages.push(startMsg);
        cancel(event);      
    };      
}), () => getInHypixel()).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}');

register('command', (id) => {
    ChatLib.deleteChat(id)
}).setName('clearchatbyid');