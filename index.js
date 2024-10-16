// import { getInSkyblock, stripRank, shortenMsg, capitalise } from './functions.js';
// import { getGuildResponse} from './formatFunctions.js'  
import { registerWhen, timeThis } from './utils.js'
// import { data } from './bots.js';    
import './test.js';
//! any misc problems (/ct dump and copy message here)
//? ...

// let moduleVersion = JSON.parse(FileLib.read("bettershridge", "metadata.json")).version;
// register('gameLoad', () => {
//     ChatLib.chat(`&9[&bBetterShridge&9] &3Loaded! &7@oBiscuit if any problems/questions`)   
//     if (!data.firstInstall) {
//         if (moduleVersion === '0.1.3') {
//             ChatLib.chat(`&e&lNEW Features: (v${moduleVersion})`);   
//             ChatLib.chat(`o  &rDo &b/setbot (botName) &rto set a new name for bot!`)  
//             ChatLib.chat(`o  &rDo &b/botlist &rto show bot list!`)  
//             ChatLib.chat(`o  &rDo &b/rmbot (botName) &rto remove a bot from the bot list!`)  
//         }   
//         data.firstInstall = true; 
//     }
// });

// let guildDebug = false; //? debug
// register('command', () => {
//     if (guildDebug) {
//         guildDebug = false;
//         ChatLib.chat(`Guild Debug: &c&lOFF`)
//     } else {
//         guildDebug = true;
//         ChatLib.chat(`Guild Debug: &a&lON`)
//     }
// }).setName('gdebug');

// const continueSymbol = '➩';
// const GUILD_PREFIX = 'G';
// const BOT_PREFIX = 'B'; // for bridge / bot
// let booper = '';
// let boopTarget = '';
// let p1 = '';
// let isIncomplete = false;
// let linkP1 = '';
// let isLinkIncomplete = false; 
// let tempText = [];

// const SKILL_NAMES = ['Combat', 'Fishing', 'Mining', 'Farming', 'Foraging', 'Enchanting', 'Alchemy', 'Carpentry', 'Runecrafting', 'Taming', 'Social'];
// const errorMessages = ["Wait a while before trying again.", "Can't message an offline player.", "Could not send a private message to that player.", "Spam protection moment", "No product found!", "Error: Failed to get UUID from API, and no cached UUID was found.", "No permission", "No username provided.", "You must be staff to update the role of another member!", "Invalid type or mob", "Too many arguments!"];         

// const mayorNames = ['Aatrox', 'Cole', 'Diana', 'Diaz', 'Finnegan', 'Foxy', 'Marina', 'Paul', 'Derpy', 'Jerry', 'Scorpius'];

function formatBotBooped(prefix, match, boopSender, boopReceiver) {
    let [_, name] = match;
    let booper = boopSender.trim();
    if (name.toLowerCase() === Player.getName().toLowerCase()) {
        return `&2${prefix} > &d&l${booper} Booped You!`

    } else if (name === boopReceiver) {
        return `&2${prefix} > &d&l${booper} Booped ${name}!`

    } else {
        return `&2${prefix} > &d&lBooped ${name}!`
    }
}

// function resetLinks() {
//     linkP1 = '';                            
//     isLinkIncomplete = false;
// }

// registerWhen('chat', timeThis('guild message time', (playerInfo, playerRole, playerStuff, event) => {
//     const message = ChatLib.getChatMessage(event, true);
//     const playerMessage = message.substring(message.indexOf("> ")+1);
//     let shortenedMessage = shortenMsg(playerMessage);
//     const playerName = stripRank(playerInfo);
    
//     if (data.bots.includes(playerName)) {
//         //! _mayor
//         if (shortenedMessage.startsWith('Current mayor: ')) {
//             if (guildDebug) ChatLib.chat('mayor response')
//             let mayorMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'mayor')
//             replaceGuildMessage(event, mayorMessages);

//         //! _mayor (certain mayor)
//         } else if (mayorNames.includes(capitalise(shortenedMessage.split(' ')[0]))) {
//             let mayorPickedMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'pickedMayor');         
//             replaceGuildMessage(event, mayorPickedMessage)

//         //! promoted from
//         } else if (shortenedMessage.includes('promoted from')) {
//             if (guildDebug) ChatLib.chat('promoted from -- response');
//             let promotedMessage = getGuildResponse(BOT_PREFIX, playerMessage, 'promoted')   
//             replaceGuildMessage(event, promotedMessage);

//         //! demoted from
//         } else if (shortenedMessage.includes('demoted from')) {
//             if (guildDebug) ChatLib.chat('promoted from -- response');
//             let demotedMessage = getGuildResponse(BOT_PREFIX, playerMessage, 'demoted')
//             replaceGuildMessage(event, demotedMessage);
        
//         //! role already up to date
//         } else if (shortenedMessage.includes('Role is already up to date!')) {
//             if (guildDebug) ChatLib.chat('role is already up to date message');
//             let updatedMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'updatedMessage');
//             replaceGuildMessage(event, updatedMessage);
//                 let skillMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'skillMaxed')
//                 replaceGuildMessage(event, skillMessages);
            
//             //* skill in progress
//             } else {
//                 if (guildDebug) ChatLib.chat('skill response -- in progress')
//                 let skillMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'skillProgress')
//                 replaceGuildMessage(event, skillMessages);
//             }

//         //! _bz         
//         } else if (shortenedMessage.startsWith('Bazaar data for ')) {
//             if (guildDebug) ChatLib.chat('bz guild response')
//             let bzMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'bazaar');
//             replaceGuildMessage(event, bzMessages); 

//         //! _be data
//         } else if (shortenedMessage.includes('k/d (kdr)')) {
//             if (guildDebug) ChatLib.chat('be guild response')
//             let beMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'bestiary');
//             replaceGuildMessage(event, beMessages);

//         //! _command
//         } else if (shortenedMessage.includes('Available commands (_command)')) {
//             if (guildDebug) ChatLib.chat('command help response')
//             let availableCMDMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'commandHelp');
//             replaceGuildMessage(event, availableCMDMessage)

//         //! syntax error
//         } else if (shortenedMessage.includes('Syntax')) {
//             if (guildDebug) ChatLib.chat('syntax error response');
//             let syntaxMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'syntaxError');
//             replaceGuildMessage(event, syntaxMessage, 'syntaxError');
            
//         //! sticker
//         } else if (/\<.+\>/.test(shortenedMessage)) {
//             if (guildDebug) ChatLib.chat('sticker response')
//             let stickerMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'sticker');
//             replaceGuildMessage(event, stickerMessage);

//         //! october specials
//         } else if (shortenedMessage.includes('AAH! You scared me,')) {
//             if (guildDebug) ChatLib.chat('october boo! response -- 1');
//             let spookyMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'spooky1')
//             replaceGuildMessage(event, spookyMessage);
            
//         } else if (shortenedMessage.includes('Spooked')) {
//             if (guildDebug) ChatLib.chat('october boo! response -- 2');
//             let spookyMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'spooky2')
//             replaceGuildMessage(event, spookyMessage);


//         //! bridge reply
//         } else if (shortenedMessage.includes(' [to] ')) {   
//             //* reply: viewauction links
//             if (shortenedMessage.includes('/viewauction')) {
//                 if (guildDebug) ChatLib.chat(`reply response: has link == viewauction links`)
//                 let viewAHLinkMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'replyAuction');
//                 replaceGuildMessage(event, viewAHLinkMessage, bypass=true);

//             //* reply: stuf links
//             } else if (shortenedMessage.includes('l$')) {

//                 //* reply w/out symbol -- no parts
//                 if (!shortenedMessage.includes(continueSymbol)) {

//                     if (guildDebug) ChatLib.chat(`reply response: stuf link -- without symbol`);
//                     let decodedLinkMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'replyDecoded');
//                     replaceGuildMessage(event, decodedLinkMessage, bypass=true);

//                 //* reply w/ symbol -- p1
//                 } else if (shortenedMessage.endsWith(continueSymbol)) {
//                     if (guildDebug) ChatLib.chat(`reply response: stuf link -- with symbol -- encoded p1`);
//                     linkP1 = shortenedMessage.replace(continueSymbol, '');    
//                     isLinkIncomplete = true;        
//                     cancel(event);          
//                 };
                
//             //* reply w/ symbol -- p2   
//             } else if (isLinkIncomplete && shortenedMessage.split(": ")[1].includes(continueSymbol)) {
//                 if (guildDebug) ChatLib.chat(`reply response: stuf link -- with symbol -- encoded p2`);
//                 let [sender, response] = shortenedMessage.split(': ');
//                 let combinedLink = (linkP1 + response).replace(continueSymbol, '');
//                 let combinedMessage = combinedLink.includes('[LINK]') ? combinedLink : `[LINK](${combinedLink})`;
//                 let decodedLinkMessage = getGuildResponse(BOT_PREFIX, combinedMessage, 'replyDecoded');
//                 replaceGuildMessage(event, decodedLinkMessage, bypass=true);
//                 resetLinks();
                
//             //* reply: normal talking           
//             } else if (!shortenedMessage.includes(continueSymbol)) {
//                 if (guildDebug) ChatLib.chat(`reply response: no link`)
//                 let replyMessage = getGuildResponse(BOT_PREFIX, shortenedMessage + ' ', 'replies')
//                 replaceGuildMessage(event, replyMessage);
//             }

//         //! command not found
//         } else if (shortenedMessage.includes('try _help')) {
//             if (guildDebug) ChatLib.chat('command not found')
//             let helpMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'cmdError');
//             replaceGuildMessage(event, helpMessage);
            
//         //! _lbin
//         } else if (shortenedMessage.startsWith('Lowest BIN for')) {
//             if (guildDebug) ChatLib.chat('lbin response')
//             let lbinMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'lbin');
//             replaceGuildMessage(event, lbinMessage);

//         //! _cata
//         } else if (shortenedMessage.includes('Catacombs level for')) {

//             if (guildDebug) ChatLib.chat('cata response')
//             const cataMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'cata');
//             replaceGuildMessage(event, cataMessage);

//         //! dungeon floor
//         } else if (shortenedMessage.includes('Completions') && shortenedMessage.includes('Fastest time')) {

//             if (guildDebug) ChatLib.chat('dungeon floor response')
//             let dungeonFloorMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'dungeonRecord');
//             replaceGuildMessage(event, dungeonFloorMessages);

//         //! _slayer
//         } else if (shortenedMessage.includes('slayer data for')) {
//             if (guildDebug) ChatLib.chat('slayer response')
//             let slayerMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'slayer');
//             replaceGuildMessage(event, slayerMessage);

//         //! _tfish
//         } else if (['Bronze', 'Silver', 'Gold', 'Diamond'].every(item => shortenedMessage.includes(item))) {        
//             //* if given just 'Trophy Fish'
//             if (shortenedMessage.startsWith('Trophy') && !shortenedMessage.includes('(w/o Obf 1)')) {           
//                 if (guildDebug) ChatLib.chat('tfish response -- general')
//                 let tfishMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'tfishGeneral');     
//                 replaceGuildMessage(event, tfishMessages);  

//             //* if w/o obf fish
//             } else if (shortenedMessage.includes('(w/o Obf 1)')) {
//                 if (guildDebug) ChatLib.chat('tfish response -- noobf');
//                 let tfishMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'tfishObf');          
//                 replaceGuildMessage(event, tfishMessages);          

//             //* if given a certain fish
//             } else {
//                 if (guildDebug) ChatLib.chat('tfish response -- specific')
//                 let tfishMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'tfishSpecific');
//                 replaceGuildMessage(event, tfishMessages);
//             }

//         //! _contest (specific)
//         } else if (shortenedMessage.includes('contest in')) {
//             if (guildDebug) ChatLib.chat('contest response');
//             let contestMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'contestSpecific');
//             replaceGuildMessage(event, contestMessage);

//         //! _contest (next contest)
//         } else if (shortenedMessage.includes('Next contest')) {
//             if (guildDebug) ChatLib.chat('next contest response');
//             let contestMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'nextContest');
//             replaceGuildMessage(event, contestMessage);

//         //! _boop player (bot -- sender)
//         } else if (shortenedMessage.includes('_boop')) {
//             if (guildDebug) ChatLib.chat(`bot -- send boop response`)
//             let [sender, receiver] = getGuildResponse(BOT_PREFIX, shortenedMessage, 'bot_boop');
//             boopTarget = receiver;
//             booper = sender.trim();
//             if (guildDebug) ChatLib.chat(`booper: ${booper}`)       
//             if (guildDebug) ChatLib.chat(`boopTarget: ${boopTarget}`)

//             replaceGuildMessage(event, `&2${BOT_PREFIX} > &a${booper}: &f_boop ${receiver}`);

//         //! booped player (bot --receiver)
//         } else if (shortenedMessage.includes('Booped')) {
//             if (guildDebug) ChatLib.chat(`booping response`);
//             let boopedMatch = shortenedMessage.match(/Booped (.+)!/);
//             let boopedMessage = formatBotBooped(BOT_PREFIX, boopedMatch, booper, boopTarget);
//             replaceGuildMessage(event, boopedMessage);
//             if (shortenedMessage.includes(boopTarget) && shortenedMessage.includes(booper)) {
//                 booper = '';
//                 boopTarget = '';
//             }

//         //! _fw farming weight
//         } else if (shortenedMessage.includes('Farming weight for')) {
//             if (guildDebug) ChatLib.chat('farming weight response')
//             let farmingWeightMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'farmingWeight');
//             replaceGuildMessage(event, farmingWeightMessage);

//         //! _is insta sell price
//         } else if (shortenedMessage.includes('Total earned from selling')) {
//             if (guildDebug) ChatLib.chat('insta sell response')
//             let instaSellMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'instasell');
//             replaceGuildMessage(event, instaSellMessage);

//         //! _ib insta buy price
//         } else if (shortenedMessage.includes('Total cost to buy')) {
//             if (guildDebug) ChatLib.chat('insta buy response')
//             let instabuyMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'instabuy');
//             replaceGuildMessage(event, instabuyMessage);

//         //! collection P1
//         } else if (shortenedMessage.includes('completion for')) {
//             //* collection p1 has continue symbol
//             if (shortenedMessage.endsWith(continueSymbol)) {
//                 if (guildDebug) ChatLib.chat('collection response -- has symbol')
//                 if (!isIncomplete) {
//                     p1 = shortenedMessage;
//                     isIncomplete = true;
//                     cancel(event);
//                 }

//             //* collection p1 does not have continue symbol
//             } else if (!shortenedMessage.endsWith(continueSymbol) && !isIncomplete) {
//                 if (guildDebug) ChatLib.chat('collection response -- no symbol')
//                 let collMessages = getGuildResponse(BOT_PREFIX, shortenedMessage, 'collection');
//                 replaceGuildMessage(event, collMessages);
//             }

//         //! collection P2
//         } else if (shortenedMessage.startsWith(continueSymbol) && isIncomplete) {
//             if (guildDebug) ChatLib.chat('collection response p2')
//             let combinedMessage = (p1 + shortenedMessage).replace(/\/➩/g, '').replace(/➩/g, '');
//             let collMessages = getGuildResponse(BOT_PREFIX, combinedMessage, 'collection');
//             isIncomplete = false;
//             replaceGuildMessage(event, collMessages);

//         //! _pick
//         } else if (shortenedMessage.startsWith('I choose')) {
//             if (guildDebug) ChatLib.chat(`bridge _pick response`);
//             let pickMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'pickCommand');
//             replaceGuildMessage(event, pickMessage);

//         //! bridge response to cmd
//         } else if (errorMessages.some(msg => shortenedMessage.trim().includes(msg))) {
//             if (guildDebug) ChatLib.chat(`bridge cmd response`)
//             replaceGuildMessage(event, `&2${BOT_PREFIX} > &c${shortenedMessage.trim()}`);

//         //! bridge: player talking
//         } else if (shortenedMessage.includes(': ') && !shortenedMessage.includes(' [to] ')) {
//             //* viewauction links                           
//             if (shortenedMessage.includes('/viewauction')) {
//                 if (guildDebug) ChatLib.chat('player talking response: has link -- viewauction links');
//                 let viewAHLinkMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'talkingAuction');
//                 replaceGuildMessage(event, viewAHLinkMessage, bypass=true);
            
//             //* encoded links
//             } else if (shortenedMessage.includes('l$')) {
//                 //* player talking: encoded links w/out symbol
//                 if (!shortenedMessage.includes(continueSymbol)) {
//                     if (guildDebug) ChatLib.chat('player talking response: encoded link -- no symbols');
//                     let decodedLinkMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'playerDecoded');
//                     replaceGuildMessage(event, decodedLinkMessage,  bypass=true);

//                 //* player talking: encoded links w/ symbol -- p1
//                 } else {
//                     if (guildDebug) ChatLib.chat('player talking response: encoded link -- has symbols -- p1');
//                     linkP1 = shortenedMessage.replace(continueSymbol, '').trim();
//                     isLinkIncomplete = true;
//                     cancel(event);
//                 }

//             //* player talking: encoded links w/ symbol -- p2
//             } else if (shortenedMessage.split(': ')[1].includes(continueSymbol) && isLinkIncomplete) {
//                 if (guildDebug) ChatLib.chat('player talking response: encoded link -- has symbols -- p2');
//                 let [sender, response] = shortenedMessage.split(': ')
//                 let combinedLink = (linkP1 + response).replace(continueSymbol, '');
//                 let combinedMessage = combinedLink.includes('[LINK]') ? combinedLink : `[LINK](${combinedLink})`;
//                 let decodedMessage = getGuildResponse(BOT_PREFIX, combinedMessage, 'playerDecoded');
//                 replaceGuildMessage(event, decodedMessage, bypass=true);
//                 resetLinks();
                                
//             } else {
//                 if (guildDebug) ChatLib.chat('player talking response')
//                 if (shortenedMessage.endsWith(continueSymbol)) {
//                     let [ign, startMessage] = shortenedMessage.split(': ');
//                     let title = `&2${BOT_PREFIX} > &a${ign}: &r`
//                     tempText = [title];
//                     if (!tempText.includes(startMessage)) tempText.push(startMessage.replace(continueSymbol, '').trim());
//                     // ChatLib.chat(tempText.join(' '))
//                     cancel(event);

//                 } else {
//                     let playerTalkingMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'playerTalking');
//                     replaceGuildMessage(event, playerTalkingMessage);
//                 }
//             }           


//         //! bot talking -- encoded
//         } else if (shortenedMessage.includes('l$')) {
//             //* encoded -- bot talking -- no symbol
//             if (!shortenedMessage.includes(continueSymbol)) {
//                 if (guildDebug) ChatLib.chat('bot talking encoded link w/out symbol');
//                 let decodedLinkMessage = getGuildResponse(BOT_PREFIX, shortenedMessage, 'generalDecoded');
//                 replaceGuildMessage(event, decodedLinkMessage, bypass=true);

//             //* encoded -- bot talking -- with symbol p1
//             } else if (shortenedMessage.endsWith(continueSymbol)) {
//                 if (guildDebug) ChatLib.chat('bot talking encoded link w/ ending symbol -- encoded p1');
//                 linkP1 = shortenedMessage.replace(continueSymbol, '').trim();
//                 isLinkIncomplete = true;
//                 cancel(event);  
//             }   

//         //* encoded -- bot talking -- with symbol p2
//         } else if (shortenedMessage.startsWith(continueSymbol) && isLinkIncomplete) {
//             if (guildDebug) ChatLib.chat('bot talking encoded link w/ starting symbol -- encoded p2');
//             let combinedLink = (linkP1 + shortenedMessage).replace(continueSymbol, '');   
//             let combinedMessage = combinedLink.includes('[LINK]') ? combinedLink : `[LINK](${combinedLink})`;
//             let decodedLinkMessage = getGuildResponse(BOT_PREFIX, combinedMessage, 'generalDecoded');
//             replaceGuildMessage(event, decodedLinkMessage, bypass=true);                                       
//             resetLinks();    

//         //! bot talking -- normal
//         } else if (!shortenedMessage.includes(continueSymbol) && !shortenedMessage.includes(': ')) {
//             if (guildDebug) ChatLib.chat('player talking response no colon')
//             replaceGuildMessage(event, `&2${BOT_PREFIX} > &a${shortenedMessage}`);
//         }   

//     //! not bridge but guild stuffs 
//     } else if (!data.bots.includes(playerName)) {
//         //* view auction links
//         if (shortenedMessage.includes('/viewauction')) {
//             if (guildDebug) ChatLib.chat('guild player message -- auction links');
//             let viewAHLinkMessage = getGuildResponse(GUILD_PREFIX, playerMessage, 'auction');
//             replaceGuildMessage(event, viewAHLinkMessage, bypass=true);

//         //* guild message
//         } else {
//             if (guildDebug) ChatLib.chat('normal guild chat message');
//             replaceGuildMessage(event, `&2${GUILD_PREFIX} > &r${playerMessage.trim()}`);
//         }   
//     }
// }), () => getInSkyblock()).setCriteria('Guild > ${playerInfo} [${playerRole}]: ${playerStuff}'); 
