import { isInHypixel, stripRank, removeAntiSpamID, highlightTags, hoverableAhLink, hoverableStufLink, hoverableWebLink, splitMapN, isValidColorCode, processMessage, hasEmojiPack, stickers, emojis, formatSender, fixFormattedPrefix } from './functions';
import { data } from './utilities/bots';
import { prefixData } from './utilities/prefix';
import { registerWhen, timeThis } from './utils';
import { getGuildResponse } from './formatFunctions';
import PogObject from '../PogData';

export const bestData = new PogObject("bettershridge", {
    names: [],
    color: '&6',
    trigger: false,
}, './data/bestData.json');
bestData.autosave(1)

const continueSymbol = '➩';
const idRegex = /<@.+>/;

const MAYOR_NAMES = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];
const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', '  Runecrafting', 'Taming', 'Social'];

const eightBallAnswers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
];

function sortMessageByType(e) {
    const message = ChatLib.getChatMessage(e, true);
    const playerMessage = message.substring(message.indexOf("> ")+1).trim();
    let type = '';
    let resMessage = '';
    const playerRegex = /(.+) (&[a-qs-z0-9])\[(.+)\]&f: (.+)/;
    const playerMatch = playerMessage.match(playerRegex);
    if (playerMatch) {
        const [_, formattedName, roleColor, roleName, message] = playerMatch;
        const sender = stripRank(formattedName.removeFormatting()).trim();

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

            //  &b[MVP&c+&b] Shrimple77 &3[Admin]&f: &rbiscuit [to] nqeuk: blah&r
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
        prefix, `${sender}: &r`, ...processedMessageParts
    );
};

//! promoted from reg chat
register('chat', (name, oldRole, newRole, event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('Guild >')) return;

    const promoted = getGuildResponse('', message, 'promoted');
    const newMessages = [
        ChatLib.getChatBreak('&b&m-'),
        promoted,
        ChatLib.getChatBreak('&b&m-'),
    ];
    replaceMessage(event, newMessages);
}).setCriteria('${name} was promoted from ${oldRole} to ${newRole}').setContains();

//! demoted from reg chat
register('chat', (name, oldRole, newRole, event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('Guild >')) return;

    const demoted = getGuildResponse('', message, 'demoted');
    const newMessages = [
        ChatLib.getChatBreak('&b&m-'),
        demoted,
        ChatLib.getChatBreak('&b&m-'),
    ];
    replaceMessage(event, newMessages);
}).setCriteria('${name} was demoted from ${oldRole} to ${newRole}').setContains();

function botMessageHandler(prefix, message) {
    const botMessage = removeAntiSpamID(message).removeFormatting().replace(idRegex, '').trim();

    //! _mayor
    if (botMessage.startsWith('Current mayor: ')) {
        return getGuildResponse(prefix, botMessage, 'mayor')

    //! _mayor (certain mayor)
    } else if (MAYOR_NAMES.includes(botMessage.split(' ')[0])) {
        return getGuildResponse(prefix, botMessage, 'pickedMayor');

    //! role up to date
    } else if (botMessage.includes('Role is already up to date!')) {
        return getGuildResponse(prefix, botMessage, 'updatedMessage');

    //! your role does not have the requirements || Role does not have requirements
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

    //! dungeon floor
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

    //! booped player
    } else if (botMessage.includes('Booped')) {
        return getGuildResponse(prefix, botMessage, 'getBooped');

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

    //! error responses
    } else if (botMessage.startsWith('⚠') && !botMessage.includes('Usage')) {
        const errorReturn = hasEmojiPack()
            ? `${prefix}&c${botMessage.replace('⚠', ':warning:')}`
            : `${prefix}&c${botMessage}`;
        return processMessage(errorReturn);

    //! 8 ball responses
    } else if (eightBallAnswers.includes(botMessage)) {
        const show8ball = hasEmojiPack() ? ' &r:8ball:&a' : '';
        const eightBallMessage = `${prefix}${show8ball} &a&o${botMessage}`;
        return processMessage(eightBallMessage);

    } else {
        return processMessage(`${prefix}${botMessage}`);
    }
};

/**
 * Formats the sender by some conditions with either the default &a color or the best color.
 * only for guildMessageHandler, discordPlayerMessageHandler and replyMessageHandler
 * @param {Object} userObj : name, role
 * @param {Object} givData : bestData for trigger, names and color
 * @returns formatted name based on conditions.
 */
// works for replies, discord messages, guild player messages
function updateFormattedSender(userObj, givData) {
    const addRole = userObj.role ? ` &3[${userObj.role}]&r` : '';
    const strippedName = stripRank(userObj.name.removeFormatting()).toLowerCase();

    if (givData.names.includes(userObj.name) || givData.names.includes(strippedName)) {
        return givData.trigger
            ? `${givData.color}${stripRank(userObj.name.removeFormatting())}${addRole}`
            : `${givData.color}${userObj.name}${addRole}`;

    } else if (givData.names.some(name => userObj.name.includes(name) || strippedName.includes(name))) {
        return givData.trigger
            ? `${givData.color}${stripRank(userObj.name )}${addRole}`
            : `${givData.color}${userObj.name}${addRole}`;

    } else {
        return `${userObj.name}${addRole}`;
    }
}

function discordPlayerMessageHandler(prefix, message) {
    const dpMessage = removeAntiSpamID(message).removeFormatting().replace(/➩/g, '').replace(/  /g, '');
    const emojiedDPMessage = emojis(dpMessage);
    const [sender, responses] = emojiedDPMessage.split(/: (.+)/);
    const formattedSender = updateSender(sender, bestData);
    if (responses === '_bettershridge') {
        ChatLib.chat(`${data.modulePrefix}&r &6Hiya!\n&6Do &r/bs help&6 to be redirected to the Bettershridge Helpline!`)
        return;

    } else if (responses.includes('[LINK]') || responses.includes('viewauction') || responses.includes('http')) {
        return handleLinkMessages(processMessage(prefix), formattedSender, emojiedDPMessage);

    } else if (responses.includes('_boop')) {
        getGuildResponse(prefix, emojiedDPMessage, 'getBooperDP');
        ChatLib.chat(`${prefix}${formattedSender}&f: &r${emojiedDPMessage.split(': ')[1]}`);
        return;

    } else {
        const newPrefix = `${prefix}${formattedSender}`;
        return processMessage(stickers(newPrefix, responses));
    }
};

function guildPlayerMessageHandler(prefix, message) {
    const rawMessage = removeAntiSpamID(message).replace(/  /g, '');
    const regex = /(.+?) &3\[(\w+)\]&f: &r(.+)&r/;
    const match = rawMessage.match(regex);
    if (match) {
        const [_, sender, role, responses] = match;
        const formattedSender = updateFormattedSender({name: sender, role: role}, bestData);
        if (responses.includes('[LINK]') || responses.includes('viewauction') || responses.includes('http')) {
            return handleLinkMessages(processMessage(prefix), processMessage(formattedSender), processMessage(responses));

        } else if (responses.includes('_boop')) {
            getGuildResponse(prefix, message, 'getBooperGP');
            ChatLib.chat(`${prefix}${formattedSender}&f: &r${rawMessage.split(': ')[1]}`);
            return;

        } else {
            const newPrefix = `${prefix}${formattedSender}`;
            const idRemovedRes = responses.replace(/@.+/g, '').trim();
            if (eightBallAnswers.includes(idRemovedRes)) {
                return processMessage(stickers(newPrefix, idRemovedRes));
            }
            return processMessage(stickers(newPrefix, responses));
        }
    }
};

function updateSender(name, givData) {
    const formattedName = formatSender(name);
    const updatedName = updateFormattedSender({name: formattedName}, givData)
    return updatedName;
};

function replyMessageHandler(prefix, message) {
    const replyMessage = removeAntiSpamID(message.removeFormatting().replace(/  /g, ''));
    const [sender, responses] = replyMessage.split(/: (.+)/);
    const [name1, name2] = sender.split(' [to] ');
    const formatted1 = updateSender(name1, bestData);
    const formatted2 = updateSender(name2, bestData);
    const formattedSender = `${formatted1}&r ${prefixData.reply} &r${formatted2}`;

    if (!responses) return null;
    if (responses.includes('[LINK]') || responses.includes('http') || responses.includes('viewauction')) {
        return handleLinkMessages(processMessage(prefix), formattedSender, processMessage(responses));

    } else {
        const newPrefix = `${prefix}${formattedSender}`;
        return processMessage(stickers(newPrefix, responses));
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
        const emojiedMessage = emojis(strippedMessage);
        const [sender, responses] = emojiedMessage.split(/: (.+)/);
        if (sender.includes(' [to] ') || sender.includes(prefixData.reply)) {
            type = 'reply';
            resMessage = emojiedMessage;

        } else {
            type = 'discordPlayer';
            resMessage = emojiedMessage;
        }
    }


    const showArrow = prefixData.arrow === '' ? ' ' : ` ${prefixData.arrow}`;
    let prefix = `${prefixData.bot}&r${showArrow} &r&a`;
    if (type === 'guildPlayer') {
        prefix = `${prefixData.guild}&r${showArrow} &r&a`;
    };

    const trimmedMessage = resMessage.replace(/\s+/g, ' ').trim();

    // console.log(type, resMessage);
    if (type === 'bot') return [type, botMessageHandler(prefix, trimmedMessage)];
    if (type === 'discordPlayer') return [type, discordPlayerMessageHandler(prefix, trimmedMessage)];
    if (type === 'guildPlayer') return [type, guildPlayerMessageHandler(prefix, trimmedMessage)];
    if (type === 'reply') return [type, replyMessageHandler(prefix, trimmedMessage)];
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

//! multi message handler
let multiMessages = [];
registerWhen('chat', timeThis("regChat guild messages", (playerInfo, playerRole, playerStuff, event) => {
    const [msgType, msg] = sortMessageByType(event);
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
                `${data.modulePrefix} &rIs &b${player}&r a new bot name? `, yesClickable, noClickable
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
}), () => isInHypixel()).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}');

register('command', (id) => {
    ChatLib.deleteChat(id)
}).setName('clearchatbyid', true);

//! glist
function getOnlineMembers(storedGuildData, givData) {
    let onlineMembers = [];
    storedGuildData.forEach(member => {
        if (member.endsWith('&a ●')) onlineMembers.push(member);
    })
    return onlineMembers;
};

function getOnlineBests(onlineLst, inputData) {
    let onlineBests = [];
    onlineLst.map(onlineMember => stripRank(onlineMember.removeFormatting()).toLowerCase()).forEach(onlineMember => {
        if (inputData.names.includes(onlineMember) || inputData.names.some(bestName => onlineMember.includes(bestName))) {
            onlineBests.push(onlineMember);
        };
    });
    return onlineBests;
};

let guildMembers = [];
let glLoads = 6;
register('chat', (event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes('Party')) return;
    const entries = message.split(/\s{2}/).filter(c => c.match(/●/));
    if (!entries.length > 0) return;
    if (glLoads > 0) {
        guildMembers.push(...entries);
        glLoads -= 1;
    }

    if (glLoads === 0) {
        let onlineMembers = getOnlineMembers(guildMembers);
        let onlineBestMembers = getOnlineBests(onlineMembers, bestData);
        ChatLib.chat(ChatLib.getChatBreak('&b&m-'));
        ChatLib.chat(`&6<&3Guild Best List&6> &b---- Current: ${bestData.color}color`);
        bestData.names.forEach(bestName => {
            const bestNameStatus = onlineBestMembers.includes(bestName) || onlineBestMembers.some(name => name.includes(bestName))
                ? '&a' : '&c';
            ChatLib.chat(`${bestNameStatus}●&r &b${bestName}`);
        });
        ChatLib.chat(ChatLib.getChatBreak('&b&m-'));
        glLoads = 6;
    }
    cancel(event);
});

register('command', (query) => {
    if (!isInHypixel()) return;
    if (!query) {
        ChatLib.chat(`${data.modulePrefix} &cQuery Unrecognised, enter a name!`);
    };

    ChatLib.command('gl');
    let onlineMembers = getOnlineMembers(guildMembers);
    const queryName = query.toLowerCase();
    const isOnline = onlineMembers.some(member => member.includes(queryName) || stripRank(member.removeFormatting()).toLowerCase() === queryName) ? ' -- &aONLINE' : ' -- &cOFFLINE';
    ChatLib.chat(`${data.modulePrefix} &r&aSearch Query: &f${JSON.stringify(query)}${isOnline}`);
}).setName('gsearch', true).setAliases('gs');


const guildListTitles = [
    /Total Members: \d+/,
    /Online Members: \d+/,
    /Offline Members: \d+/,
    /Guild Name: Shrimple/,
    /\s*-- Guild Master --\s*/,
    /\s*-- Admin --\s*/,
    /\s*-- Lobster --\s*/,
    /\s*-- Shrimp --\s*/,
    /\s*-- Crayfish --\s*/,
    /\s*-- Krill --\s*/,
];

guildListTitles.forEach(element => {
    register('chat', (event) => {
        if (!isInHypixel()) return;
        cancel(event);
    }).setCriteria(element);
});

register('chat', (event) => {
    const message = ChatLib.getChatMessage(event, true);
    if (message === '&b&m-----------------------------------------------------&r') cancel(event);
});


//! guild best system
register('command', (arg) => {
    if (!isInHypixel()) return;
    const lowerArg = arg ? arg.toLowerCase() : null;

    if (!arg || lowerArg === 'list' || lowerArg === 'online') {
        if (bestData.names.length === 0) {
            ChatLib.chat(`&cGuild Best List is currently empty! Use &b/guildbest (name) &cto add a name!`);
            return;
        }
        ChatLib.command('gl');
        return;
    };

    if (lowerArg === 'clear') {
        if (bestData.names.length === 0) {
            ChatLib.chat(`&cGuild Best List is already empty!`);
        } else {
            bestData.names = [];
            bestData.save();
            ChatLib.chat(`&cCleared Guild Best List!`);
        }
        return;
    }

    const nameIdx = bestData.names.indexOf(lowerArg);
    if (nameIdx !== -1) {
        // remove name if exists
        bestData.names.splice(nameIdx, 1);
        bestData.save();
        ChatLib.chat(`&cRemoved ${arg} &cfrom the Guild Best List!`);
    } else {
        // add name if doesn't exist
        bestData.names.push(lowerArg);
        bestData.save();
        ChatLib.chat(`&aAdded ${arg} &ato the Guild Best List!`);
    }
}).setName('guildbest', true).setAliases('gb');

register('command', (arg) => {
    if (!isInHypixel()) return;
    if (!arg || !arg.includes('&') || !isValidColorCode(arg)) {
        ChatLib.chat(`&cPlease input a color code for the Guild Best Color.`);

    } else {
        bestData.color = fixFormattedPrefix(arg);
        bestData.save();
        ChatLib.chat(`&aGuild Best Color set: &r${bestData.color}test name`)
    };
}).setName('setbestcolor', true);

register('command', () => {
    if (!isInHypixel()) return;
    if (bestData.trigger) {
        bestData.trigger = false;
        bestData.save();
        ChatLib.chat(`${data.modulePrefix} &bOverride Rank Colors: &c&lNO&r`);
    } else {
        bestData.trigger = true;
        bestData.save();
        ChatLib.chat(`${data.modulePrefix} &bOverride Rank Colors: &a&lYES&r`);
    };
}).setName('overriderankcolor', true).setAliases('orc');
