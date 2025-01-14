import { isInHypixel, stripRank, removeAntiSpamID, highlightTags, hoverableAhLink, hoverableStufLink, hoverableWebLink, splitMapN, isValidColorCode } from './functions';
import { data } from './utilities/bots';
import { prefixData } from './utilities/prefix';
import { registerWhen, timeThis } from './utils';
import { getGuildResponse } from './formatFunctions';
import PogObject from '../PogData';

const continueSymbol = '➩';
const idRegex = /<@.+>/;

const MAYOR_NAMES = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];
const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', 'Runecrafting', 'Taming', 'Social'];

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
        if (!data.bots.includes(stripRank(sender))) {
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

function botMessageHandler(prefix, message) {
    const botMessage = removeAntiSpamID(message).removeFormatting().trim();

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

    //! responses & 8ball
    } else {
        return botMessage.startsWith('⚠') && !botMessage.includes('Usage')
        ? `${prefix}&c${botMessage}`
        :`${prefix}${botMessage}`;
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
        return `&a${userObj.name}${addRole}`;
    }
}

function discordPlayerMessageHandler(prefix, message) {
    const dpMessage = removeAntiSpamID(message).removeFormatting().replace(/➩/g, '').replace(/  /g, '');
    const [sender, responses] = dpMessage.split(/: (.+)/);
    const formattedSender = updateFormattedSender({name: sender}, bestData);

    if (responses.includes('[LINK]') || responses.includes('viewauction') || responses.includes('http')) {
        return handleLinkMessages(prefix, formattedSender, dpMessage);
    } else {
        if (responses.includes('_boop')) getGuildResponse(prefix, dpMessage, 'getBooperDP');
        return `${prefix}${formattedSender}&r: ${highlightTags(responses)}`;
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
            return handleLinkMessages(prefix, formattedSender, responses);
        } else {
            if (responses.includes('_boop')) getGuildResponse(prefix, message, 'getBooperGP');
            return `${prefix}${formattedSender}&r: ${highlightTags(responses)}`;
        }
    }
};

function replyMessageHandler(prefix, message) {
    const replyMessage = removeAntiSpamID(message.removeFormatting().replace(/  /g, ''));
    const [sender, responses] = replyMessage.split(/: (.+)/);
    const [name1, name2] = sender.split(' [to] ');
    const formatted1 = updateFormattedSender({name: name1}, bestData);
    const formatted2 = updateFormattedSender({name: name2}, bestData);
    const formattedSender = `${formatted1} ${prefixData.reply} ${formatted2}`;
    if (!responses) return null;
    if (responses.includes('[LINK]') || responses.includes('http') || responses.includes('viewauction')) {
        return handleLinkMessages(prefix, formattedSender,  responses);
    } else {
        return `${prefix}${formattedSender}&r: ${highlightTags(responses)}`;
    };
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
    const arrow = prefixData.arrow ? ` ${prefixData.arrow}` : '';
    let prefix = `${prefixData.bot}&r${arrow}&r &a`;
    if (type === 'guildPlayer') {
        prefix = `${prefixData.guild}&r${arrow}&r &a`;
    };
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



//! guild best system
export const bestData = new PogObject("bettershridge", {
    names: [],
    color: '&6',
    trigger: false,
}, './data/bestData.json');
bestData.autosave(1)

register('command', (arg) => {
    if (!isInHypixel()) return;
    const lowerArg = arg ? arg.toLowerCase() : null;

    if (!arg || lowerArg === 'list') {
        if (bestData.names.length === 0) {
            ChatLib.chat(`&cGuild Best List is currently empty! Use &b/guildbest (name) &cto add a name!`);
        } else {
            ChatLib.chat(`&6<&3Guild Best List&6> &b---- Current: ${bestData.color}color`);
            bestData.names.forEach((name, index) => {
                ChatLib.chat(` &3${index + 1}.&r &b${name}`);
            });
        }
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
        bestData.color = arg;
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



//! helpline
register('command', () => {
    if (!isInHypixel()) return;
    const bulletSpace = '   &bo&r  ';
    ChatLib.chat(ChatLib.getChatBreak(' '))
    ChatLib.chat(`${data.modulePrefix}&r &cHelpline -------------`);
    ChatLib.chat(`   &d✯&r   &6Use '&r[rb]&6' to make a text §zrainbow&r&6! &b*Note: Only works in Skyblock`);
    ChatLib.chat(`${bulletSpace}&f/setbotprefix &3- Sets Bot Prefix &r| &eCurrent: &r['${prefixData.bot}&r']`);
    ChatLib.chat(`${bulletSpace}&f/setguildprefix &3- Sets Guild Prefix &r| &eCurrent: &r['${prefixData.guild}&r']`);
    ChatLib.chat(`${bulletSpace}&f/setarrowprefix &3- Sets Arrow Prefix &r| &eCurrent: &r['${prefixData.arrow}&r']`);
    ChatLib.chat(`${bulletSpace}&f/setreplyprefix &3- Sets Reply Prefix &r| &eCurrent: &r['${prefixData.reply}&r']`);
    ChatLib.chat(`${bulletSpace}&f/resetprefix (&9bot&r | &9guild&r | &9arrow&r | &9reply&r ) &3- Resets all prefixes`);
    ChatLib.chat(' ');
    ChatLib.chat(`      &6<&3Guild Best System&6> &b------ &r(/guildbest | /gb)`);
    ChatLib.chat(`${bulletSpace}&f/guildbest list &3- Shows all the names in the guild best list`);
    ChatLib.chat(`${bulletSpace}&f/guildbest (name) &3- Sets/Adds a name to the guild best list \n      &c(Do the command again to remove name)`);
    ChatLib.chat(`${bulletSpace}&f/guildbest clear &3- Removes all names from the guild best list`);
    ChatLib.chat(`${bulletSpace}&f/setbestcolor &3- Sets color for guild best list names \n      &eCurrent: &r['${bestData.color}test name&r'] `);
    ChatLib.chat(`${bulletSpace}&f/overriderankcolor | /orc &3- Overrides the rank colors for guild-best colors`);
    ChatLib.chat(ChatLib.getChatBreak(' '));
}).setName('bettershridge', true).setAliases('bshelp', 'bs');
