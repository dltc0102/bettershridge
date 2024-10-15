import STuFLib from '../STuFLib/index.js';
import { capitalise, formatTime, formatColonTime, getMonsterColor, formatItemsToTable, getLinkHoverable, createMessage, highlightTags } from './functions.js';

const SPACING = `&2   |  &a`; 

const collNameCodes = {
    "fishing": "&3",
    "combat": "&c",
    "foraging": "&2",
    "farming": "&6",
    "mining": "&b",
    "taming": "&d",
};

function generateMessage(prefix, message, regex, formatHandler) {
    const match = message.match(regex);
    if (match) {
        return formatHandler(prefix, match);    
    } else {        
        console.log(`matched: false`);
        console.log(`formatHandler: ${formatHandler}`);
        console.log(`message: ${message}`);
        console.log(`regex: ${regex}`);
        console.log(' ');
        return 'not matched';
    }
}

export function getGuildResponse(prefix, message, type) {
    const patterns = {
        // template: {
        //     regex: /./,
        //     format: formatFunc,
        // },
        updatedMessage: {
            regex: /Role is already up to date! Missing (.+) Fishing XP and (.+) Skyblock Levels for (.+)\./,
            format: formatUpdatedMessage,
        },
        promoted: {
            regex: /.+ Baltics .+?: (.+) (.+) &.+was promoted from (.+) to (.+)&.+/,
            format: formatPromotion,
        },
        demoted: {
            regex: /.+ Baltics .+?: (.+) (.+) &.+was demoted from (.+) to (.+)&.+/, 
            format: formatDemotion,
        },
        spooky1: {
            regex: /AAH! You scared me, (.+)!/,
            format: formatSpook1
        },
        spooky2: {  
            regex: /Spooked (.+)! \>:\)/,
            format: formatSpook2
        },
        syntaxError: {
            regex: /Syntax: (.+?) <(.+?)> (?:<(.+?)>)?/,
            format: formatSyntaxError
        },
        generalDecoded: {
            regex: /.+/, 
            format: formatGeneralDecodedLink
        },
        replyDecoded: {
            regex: /.+/,
            format: formatReplyDecodedLink
        },
        playerDecoded: {
            regex: /.+/,
            format: formatPlayerDecodedLink
        },
        pickCommand: {
            regex: /I choose (.+)/,
            format: formatPickMesage
        },
        playerTalking: {
            regex: /(.+?):\s+(.+)/,
            format: formatPlayerTalkingResponse
        },
        mayor: {
            regex: /Current mayor: (.+)\. Next mayor: (.+), in (.+)\. Next special: (.+), in (.+)\./,
            format: formatMayor
        },
        pickedMayor: {
            regex: /(.+) is in (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?)(?: and (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?))?(?: and (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?))?/,       
            format: formatMayorPicked
        },
        skillMaxed: {
            regex: /(.+) level for (.+) \((.+)\): (\d+) \| Total XP: (.+) \| Overflow XP: (.+)/,
            format: formatSkillMaxed  
        }, 
        skillProgress: {
            regex: /(.+) level for (.+) \((.+)\): (.+) \| Total XP: (.+) \| XP for level (\d+): (.+)/,
            format: formatSkillProgress  
        },       
        bazaar: {
            regex: /Bazaar data for (.+): insta-buy: (.+), insta-sell: (.+)/,
            format: formatBazaar
        },   
        bestiary: {
            regex: /(.+) data for (.+) \((.+)\) k\/d \(kdr\): (\d+)\/(\d+)(?: \((.+)\))?/,
            format: formatBestiary
        },
        commandHelp: {
            regex: /Available commands \(_command\): (.+)/,
            format: formatCommandHelp
        },
        sticker: {
            regex: /(.+):\s+(\<.+\>)/,
            format: formatSticker
        },
        replies: {  
            regex: /(.+)\s\[to\]\s(.+?): (.+)/,
            format: formatReplies
        },  
        cmdError: {
            regex: /Command (.+) not found, try _help/,
            format: formatCmdError
        },
        lbin: {
            regex: /Lowest BIN for (.+) is (.+)/,
            format: formatLbin
        },
        cata: {
            regex: /Catacombs level for (.+) \((.+)\): (.+) \| Total XP: (.+) \| XP for level (.+): (.+)/,
            format: formatCata
        },
        dungeonRecord: {
            regex: /([MF][1-7])\s+data\s+for\s+(.+?)\s+\((.+?)\):\s+Completions:\s+(\d+)\s+\|\s+Fastest\stime:\s+(.+?)\s+\|\s+Fastest\stime\s\(S\):\s+(.+?)\s+\|\s+Fastest\stime\s\(S\+\):\s+(.+?)\s+/,
            format: formatDungeonRecords
        },
        slayer: {
            regex: /(.+) slayer data for (.+)\s\((.+)\):\sTotal XP:\s(.+)\s\|\sTier kills:\s\((\d+)\s\|\s(\d+) \| (\d+) \| (\d+) \| (\d+)\)/,
            format: formatSlayer
        }, 
        tfishGeneral: {
            regex: /(.+) fish for (.+) \((.+)\): Total: (\d+?) \| Bronze: (\d+)\/18 \| Silver: (\d+)\/18 \| Gold: (\d+)\/18 \| Diamond: (\d+)\/18/,  
            format: formatTfishGeneral
        },
        tfishObf: {
            regex: /(.+) fish for (.+) \((.+)\): Total: (\d+?) \(w\/o Obf 1\) \| Bronze: (\d+)\/18 \| Silver: (\d+)\/18 \| Gold: (\d+)\/18 \| Diamond: (\d+)\/18.+/,
            format: formatTfishObf
        },
        tfishSpecific: {
            regex: /(.+) caught for (.+) \((.+)\): Total (.+): (\d+) \| Bronze: (\d+) \| Silver: (\d+) \| Gold: (\d+) \| Diamond: (\d+).+/,
            format: formatTfishSpecific     
        },
        contestSpecific: {
            regex: /Next (.+) contest in (.+)\./,
            format: formatContestSpecific
        },
        nextContest: {
            regex: /Next contest \((.+), (.+), (.+)\) in (.+)\..+/,
            format: formatNextContest
        },
        farmingWeight: {
            regex: /Farming weight for (.+) \((.+)\): (.+)\. Collections \((.+)\): (.+)\./,
            format: formatFarmingWeight
        },
        instasell: {
            regex: /Total earned from selling (\d+) (.+): (.+) coins, average price per unit: (.+) coins/,
            format: formatInstaSell
        },
        instabuy: {
            regex: /Total cost to buy (\d+) (.+): (.+) coins, average price per unit: (.+) coins/,
            format: formatInstaBuy
        },
        bot_boop: {
            regex: /(.+): _boop (.+)?/,
            format: getBotBooper
        },
        collection: {
            regex: /(.+) completion for (.+) \((.+)\): (.+)/,
            format: formatCollections,
        },
        auction: {
            regex: /(.+) (&[a-z0-9]\[.+\]&[a-z0-9]): &r(\/viewauction .+)&.+/,
            format: formatAuctionLinks
        },
        talkingAuction: {
            regex: /(.+): (\/viewauction .+).+/,
            format: formatTalkingAuctionLinks
        },
        replyAuction: {
            regex: /(.+) \[to\] (.+): (\/viewauction .+)/,
            format: formatReplyAuctionLinks
        },
        replyPatcherImage: {
            regex: /(.+) \[to\] (.+): \[Patcher\] .+ (https\:\/\/.+)\./,
            format: formatReplyPatcherImage
        },
        talkingPatcherImage: {
            regex: /(.+): \[Patcher\] .+ (https\:\/\/.+)\./,
            format: formatTalkingPatcherImage
        },
        playerPatcherImage: {
            regex: /(.+) (&[a-z0-9]\[.+\]&[a-z0-9]):\s.+(https\:\/\/.+)\..+/,
            format: formatPlayerPatcherImage
        },
        replyWebsite: {
            regex: /(.+) \[to\] (.+): (https\:\/\/.+)/,
            format: formatReplyWebsite
        },
        talkingWebsite: {
            regex: /(.+): (https\:\/\/.+)/,
            format: formatTalkingWebsite
        },
        playerWebsite: {
            regex: /(.+) (&[a-z0-9]\[.+\]&[a-z0-9]):(.+)(https\:\/\/.+)&.+/,    
            format: formatPlayerWebsite
        }
        };

        const { regex, format } = patterns[type];
        return generateMessage(prefix, message, regex, format);
    }   

function formatUpdatedMessage(prefix, match) {  
    let [_, fexp, sblevel, role] = match;   
    return [    
        `&2${prefix} > &aRole is already up to date!`,
        `${SPACING}Next Role: &6${role}`,       
        `${SPACING}Missing Fishing XP: &r${fexp}`,
        `${SPACING}Missing Skyblock Lvls: &r${sblevel}`,
    ];      
}

function formatPromotion(prefix, match) {
    let [_, playerRank, playerName, from, to] = match;
    return `&2${prefix} > &r${playerRank} ${playerName}&a was &a&lpromoted&r &afrom &c${from} to &6${to}`;      
}

function formatDemotion(prefix, match) {
    let [_, playerRank, playerName, from, to] = match;
    return `&2${prefix} > &r${playerRank} ${playerName}&a was &c&ldemoted&r &afrom &6${from} to &c${to}`;      
}

function formatSpook1(prefix, match) {
    let [_, spooked] = match;       
    return `&2${prefix} > &cAAH! &8You scared me, &6${spooked}!`; 
}

function formatSpook2(prefix, match) {
    let [_, spooked] = match;
    return `&2${prefix} > &8Spooked &6${spooked}! &c>:)`;   
}       

function formatSyntaxError(prefix, match) {
    let [_, type, condition1, condition2=null] = match;
    if (condition1 === 'item name') {
        let newType = 'Insta-buy/sell';
        let hoverableName = new TextComponent(`&c_${newType.toLowerCase()}`).setHover('show_text', '&e_command (aliases)\n---------------\n&eInsta Buy: instabuy / ib / bzib\n&eInsta Sell: instasell / is / bzis') 
        let hoverableAmt = new TextComponent(`&e[amount](k|M|B|s)`).setHover('show_text', '&e(amount)\n---------------\n&ek: 1,000\n&eM: 1,000,000\n&eB: 1,000,000,000\n&es: stacks');
        let message = new Message(
            `&2${prefix} > &aUsage: `, hoverableName, ' ', hoverableAmt, ' ', '<item name>', condition2 ? condition2 : ''          
        );
        return message;     

    } else {
        let [part1, options] = condition1.replace(/\|/g, '/').split(':');
        let message = `&2${prefix} > &aUsage: &c_${type.toLowerCase()} &e${part1}:${options}`; 
        return condition2 ? `${message} [${condition2.includes('|') ? condition2.replace(/\|/g, '/') : condition2}]` : message;                                                 

    }
}

function formatGeneralDecodedLink(prefix, match) {  
    let message = match[0].toString();
    let linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    let titleMessage = `&2${prefix} > &r`;     
    let linkHoverables = linkList.map(link => {
        let hoverable = getLinkHoverable(link);
        return hoverable; 
    });
    return createMessage(titleMessage, linkHoverables);  
}

function formatReplyDecodedLink(prefix, match) {
    let message = match[0].toString();
    let [sender, response] = message.split(': ');
    let [name1, name2] = sender.split(' [to] ');
    let linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    let titleMessage = `&2${prefix} > &a${name1} &2[to] &a${name2}: &r`; 
    let linkHoverables = linkList.map(link => {
        let hoverable = getLinkHoverable(link);
        return hoverable; 
    });
    return createMessage(titleMessage, linkHoverables); 
}

function formatPlayerDecodedLink(prefix, match) {   
    let message = match[0].toString();
    let [sender, response] = message.split(': ');
    let linkRegex = /\[LINK\]\((.+?)\)/g; 
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }     
    let titleMessage = `&2${prefix} > &a${sender}: &r`;
    let linkHoverables = linkList.map(link => {
        let hoverable = getLinkHoverable(link);
        return hoverable;       
    });
    return createMessage(titleMessage, linkHoverables); 
}

function formatPickMesage(prefix, match) {
    let [_, option] = match;
    return `&2${prefix} > &aI choose &e${capitalise(option).trim()}`;
}

function formatPlayerTalkingResponse(prefix, match) {
    let [_, player, message] = match;
    return `&2${prefix} > &a${player}&r: ${message}`;
}

const mayorColors = {
    'Aatrox': '&f',
    'Cole': '&8',
    'Diana': '&6',
    'Diaz': '&f',
    'Finnegan': '&f',
    'Foxy': '&f',
    'Marina': '&3',
    'Paul': '&f',
    'Jerry': '&d',
    'Derpy': '&d',
    'Scorpius': '&d',
    'Unknown': '&c',
};
function getMayorColor(mayor) {
    return `${mayorColors[mayor]}${mayor}`
}

function formatMayor(prefix, match) {
    let [_, currMayor, nextMayor, nextTime, specialMayor, specialTime] = match;
    return [
        `&2${prefix} > &aCurrent mayor: ${getMayorColor(currMayor)}`,
        `${SPACING}Next mayor: ${getMayorColor(nextMayor)} &r[${formatTime(nextTime)}]`,
        `${SPACING}Next special: ${getMayorColor(specialMayor)} &r[${formatTime(specialTime)}]`
    ];
}

function formatMayorPicked(prefix, match) {
    let [_, mayorName, firstVal, firstUnit, secondVal=null, secondUnit=null, thirdVal=null, thirdUnit=null] = match;
    let firstPart = firstVal ? `${firstVal}${formatTime(firstUnit)}` : '';
    let secondPart = secondVal ? `${secondVal}${formatTime(secondUnit)}` : '';
    let thirdPart = thirdVal ? `${thirdVal}${formatTime(thirdUnit)}` : '';  
    return `&2${prefix} > &r${mayorColors[mayorName]}Mayor ${mayorName} &acomes in: &f${firstPart} ${secondPart} ${thirdPart}&a.`;    
}

function formatSkillMaxed(prefix, match) {
    let [_, skillName, playerName, playerProfile, skillLevel, totalXP, overflowXP] = match;
    let skillColor = collNameCodes[skillName.toLowerCase()];
    return [
        `&2${prefix} > &a${skillColor}${skillName} &askill info for &2${playerName}&a (${playerProfile}): &6${skillLevel}`,    
        `${SPACING}Total XP: &r${totalXP}`, 
        `${SPACING}Overflow XP: &r${overflowXP}`
    ];  
}

function formatSkillProgress(prefix, match) {
    let [_, skillName, playerName, playerProfile, skillLevel, totalXP, nextLevel, xpLeft] = match;
    let skillColor = collNameCodes[skillName.toLowerCase()];
    return [
        `&2${prefix} > &a${skillColor}${skillName} &askill info for &2${playerName}&a (${playerProfile}): &6${skillLevel}`,    
        `${SPACING}Total XP: &r${totalXP}`, 
        `${SPACING}XP for next level (&6${nextLevel}&a): &r${xpLeft}`
    ];
}

function formatEssence(str) {
    return str.startsWith('Essence ') ? `${str.split(' ')[1]} Essence` : str;
}

function formatItemColorBZ(str) {
    let itemColor = '&f';
    if (str.includes('Ultimate')) {
        itemColor = '&d&l';
    } else if (str.includes('Essence')) {
        itemColor = '&d';
    }
    return itemColor;
};

function formatBazaar(prefix, match) {   
    let [_, itemName, buyPrice, sellPrice] = match;
    let itemColor = formatItemColorBZ(itemName);
    let formattedName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    let buyColor = buyPrice === 'Not available' ? '&c' : '&6';
    let sellColor = sellPrice === 'Not available' ? '&c' : '&6';
    return [
        `&2${prefix} > &aBazaar data for &r${itemColor}${formatEssence(formattedName)}&a:`,
        `${SPACING}Insta-buy: ${buyColor}${buyPrice}`,
        `${SPACING}Insta-sell: ${sellColor}${sellPrice}`
    ];
}

function formatBestiary(prefix, match) {
    let [_, monster, playerName, playerProfile, kills, collection, ratio] = match;  
    let stripMonster = monster.replace(/The/g, '').trim();
    let monsterColor = getMonsterColor(stripMonster);        
    let beMessage = `&2${prefix} > ${monsterColor}${stripMonster}&a data for &2${playerName}&a (${playerProfile}): &r${kills}/${collection}`;
    return ratio ? beMessage + ` &6(${ratio})` : beMessage;  
}

function formatCommandHelp(prefix, match) {
    let [_, commands] = match;
    let splittedCommands = commands.trim().split(', ')
    const formattedCmdLst = formatItemsToTable(splittedCommands);   
    return [
        `&2${prefix} > &aAvailable commands (_command):`,
        ...formattedCmdLst
    ];
}

function formatSticker(prefix, match) {
    let [_, name, sticker] = match;
    if (name.includes(' [to] ')) {
        let [name1, name2] = name.split(' [to] ');
        return `&2${prefix} > &a${name1} &2[to]&a ${name2}: &r${sticker}`;
    }   
    return `&2${prefix} > &a${name}: &r${sticker}`;
}   

function formatReplies(prefix, match) {
    let [_, name1, name2, response] = match;
    let colon = response ? ': ' : '';   
    if (response) {
        return `&2${prefix} > &a${name1} &2[to] &a${name2}&r${colon}${response}`;
    } else {
        return `&2${prefix} > &f${name1} &apinned a message from &f${name2}`
    }
}

function formatCmdError(prefix, match) {
    let [_, cmdName] = match;
    return `&2${prefix} > &cCommand ${cmdName} &cnot found, try _help.`;
}

function formatLbin(prefix, match) {
    let [_, itemName, itemLbin] = match;
    let f_itemName = itemName.includes(' ') ? itemName.split(' ').map(thing => capitalise(thing.toLowerCase())).join(' ') : capitalise(itemName.toLowerCase()); 
    return `&2${prefix} > &6[LBIN]&a ${f_itemName}: &6${itemLbin.trim()}`;
}

function formatCata(prefix, match) {
    let [_, playerName, playerProfile, cataLvl, totalXP, currLvl, currXPProgress] = match;
    return [
        `&2${prefix} > &aCatacombs level for ${playerName} (${playerProfile}): &6${cataLvl}`,
        `${SPACING}Total XP: &r${totalXP}`,
        `${SPACING}XP for Cata. Lvl &6${currLvl}&a: &r${currXPProgress}`,
    ];
}

function formatDungeonRecords(prefix, match) {
    let [_, floor, playerName, playerProfile, comps, fastestTime, fastestTimeS, fastestTimeSPlus] = match;
    let [fTime, fTimeS, fTimeSPlus] = [fastestTime, fastestTimeS, fastestTimeSPlus].map(formatColonTime);
    let floorColor = floor.startsWith('M') ? '&c' : '&e';
    return [
        `&2${prefix} > &r${floorColor}${floor}&r&a data for ${playerName} (${playerProfile}):`,
        `${SPACING}Completions: &r${comps}`,
        `${SPACING}Fastest Time: &r${fTime}`,
        `${SPACING}Fastest Time (&6S&a): &r${fTimeS}`,
        `${SPACING}Fastest Time (&cS+&a): &r${fTimeSPlus}`,
    ];
}

function formatSlayer(prefix, match) {
    let [_, slayerName, playerName, playerProfile, totalXP, t1, t2, t3, t4, t5] = match;

    const slayerColors = {
        "Zombie": "&2",
        "Wolf": "&f",               
        "Enderman": "&5",
        "Blaze": "&6",
        "Tarantula": "&c",
        "Vampire": "&4",
    };      
    let slayerColor = slayerColors[slayerName];
    return [   
        `&2${prefix} > &r${slayerColor}${slayerName}&r&a Slayer Data for &2${playerName}&a (${playerProfile}):`,
        `${SPACING}Total XP: &r${totalXP}`,
        `${SPACING}Kills&r: &7T1: &a${t1} &8| &7T2: &e${t2} &8| &7T3: &c${t3} &8| &7T4: &4${t4} &8| &7T5: &5${t5}`,             
    ];
}

const fishColorsDict = {
    'Blobfish': '&f', 
    'Gusher': '&f', 
    'Obfuscated 1': '&f', 
    'Sulphur Skitter': '&f', 
    'Steaming-Hot Flounder': '& f', 
    'Obfuscated 2': '&a', 
    'Slugfish': '&a', 
    'Flyfish': '&a', 
    'Obfuscated 3': '&9', 
    'Lavahorse': '&9',
    'Mana Ray': '&9', 
    'Volcanic Stonefish': '&9', 
    'Vanille': '&9', 
    'Skeleton Fish': '&5', 
    'Moldfin': '&5', 
    'Soulfish': '&5', 
    'Karate Fish': '&5', 
    'Golden Fish': '&6' 
};

function formatTfishGeneral(prefix, match) {
    let [_, fishName, playerName, playerProfile, totalFish, bronzeProg, silverProg, goldProg, diamondProg] = match;
    let title = `&2${prefix} > &aTrophy Fish for &2${playerName}&a (${playerProfile}):`;  
    return [    
        title,
        `${SPACING}Total Fish: &r${totalFish} &a[&r &8${bronzeProg}/18 &a|&r &7${silverProg}/18 &a|&r &6${goldProg}/18 &a|&r &b${diamondProg}/18 &a]&r`,
    ];      
}

function formatTfishObf(prefix, match) {                
    let [_, fishName, playerName, playerProfile, totalFish, bronzeProg, silverProg, goldProg, diamondProg] = match;
    let title = `&2${prefix} > &aTrophy fish for &2${playerName}&a (${playerProfile}) &cwithout Obf 1&a: `; 
    return [
        title,
        `${SPACING}Total Fish: &r${totalFish} &a[&r &8${bronzeProg}/18 &a|&r &7${silverProg}/18 &a|&r &6${goldProg}/18 &a|&r &b${diamondProg}/18 &a]&r`,
    ]
}

function formatTfishSpecific(prefix, match) {
    let [_, fishName, playerName, playerProfile, fishName2, totalFish, bronzeFish, silverFish, goldFish, diamondFish] = match;
    let fishNameColor = fishName in fishColorsDict ? fishColorsDict[fishName] : ''; 
    return [
        `&2${prefix} > &a${fishNameColor}${fishName} &adata for ${playerName} (${playerProfile}):`,                         
        `${SPACING}Total Fish: &r${totalFish} &a[&r &8${bronzeFish} &a|&r &7${silverFish} &a|&r &6${goldFish} &a|&r &b${diamondFish} &a]&r`,        
    ];
}

function formatContestSpecific(prefix, match) {
    let [_, crop, time] = match;
    let [hrs, mins, secs] = time.split(':');
    let formatTime = `${Number(hrs)}h ${Number(mins)}m ${Number(secs)}s`;
    return `&2${prefix}&a > Next &6${capitalise(crop)} &acontest in &6${formatTime}&a.`;
}

function formatNextContest(prefix, match) {
    let [_, crop1, crop2, crop3, dur] = match;
    let [h, m, s] = dur.split(':');
    let formatTime = `${Number(h)}h ${Number(m)}m ${Number(s)}s`;
    return `&2${prefix} > &aNext contest in &6${formatTime}&a.\n${SPACING}&aCrops: &6${capitalise(crop1)}, ${capitalise(crop2)}, ${capitalise(crop3)}`;
}   

function formatFarmingWeight(prefix, match) {
    let [_, playerName, playerProfile, weight, collWeight, others] = match;
    let otherWeights = others.split(', ').map(weightLine => {
        let fwFormatRegex = /(.+) \((.+)\)/;
        let fwFormatMatch = weightLine.match(fwFormatRegex);
        if (fwFormatMatch) {
            let [_, name, weight] = fwFormatMatch;
            return `${SPACING}${name}: &r${weight}`;
        };
    });
    return [
        `&2${prefix} > &eFarming &aweight for ${playerName} (${playerProfile}): &6${weight}`,
        `${SPACING}Collections: &r${collWeight}`,
        ...otherWeights, 
    ];
};

function formatInstaSell(prefix, match) {
    let [_, itemAmt, itemName, sellCost, aveCost] = match;
    let itemColor = itemName.includes('Ultimate') ? '&d&l' : '&r';
    let formattedItemName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim(); 
    return [
        `&2${prefix} > &aInsta-sell: &r${itemAmt}&ax ${itemColor}${formattedItemName}:`,        
        `${SPACING}Sell Cost: &6${sellCost}`,
        `${SPACING}Ave. Cost/unit: &6${aveCost}`,
    ];
}

function formatInstaBuy(prefix, match) {
    let [_, itemAmt, itemName, sellCost, aveCost] = match;
    let itemColor = itemName.includes('Ultimate') ? '&d&l' : '&r';
    let formattedItemName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    return [
        `&2${prefix} > &aInsta-buy: &r${itemAmt}&ax ${itemColor}${formattedItemName}:`,
        `${SPACING}Sell Cost: &6${sellCost}`,
        `${SPACING}Ave. Cost/unit: &6${aveCost}`,
    ];
} 

function getBotBooper(prefix, match) {
    let [_, booper, booped=''] = match;
    return booped === '' ? [booper, ''] : [booper, booped];
}

function formatCollections(prefix, match) {
    let [_, collName, playerName, playerProfile, items] = match;
    let collColor = collNameCodes[collName.toLowerCase()];
    let itemList = items.match(/[\w\s]+ \d+\/\d+ \(\d{1,3}(?:,\d{3})*(?:\/\d{1,3}(?:,\d{3})*)?\)/g);
    itemList = itemList.map(item => {       
        let itemRegex = /(.+) (\d+)\/(\d+) \((.+)\)/;
        let itemMatch = (item.trim()).match(itemRegex);
        if (itemMatch) {
            let [_, itemName, itemLvl, itemMaxLvl, itemAmount] = itemMatch;
            let maxColor = itemLvl === itemMaxLvl ? '&6' : '';
            return `${SPACING}&r${itemName}: &a${maxColor}${itemLvl}/${itemMaxLvl} &7(${itemAmount})`;    
        }   
    });
    const collectionMessages = [
        `&2${prefix} > &r${collColor}${capitalise(collName)} &afor $&2{playerName}&a (${playerProfile}): `,
        ...itemList,
    ]
    return collectionMessages;
}

// guild prefix: talking -- viewauction links ##
function formatAuctionLinks(prefix, match) {
    let [_, nameInfo, formattedRole, link] = match;
    let titleMessage = `&2${prefix} > &r${nameInfo} ${formattedRole}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}

// bot prefix: talking -- viewauction links ##
function formatTalkingAuctionLinks(prefix, match) {
    let [_, name, link] = match;
    let titleMessage = `&2${prefix} > &a${name}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
};

// bot prefix: [to] -- viewauction link ##
function formatReplyAuctionLinks(prefix, match) {
    let [_, name1, name2, link] = match;
    let titleMessage = `&2${prefix} > &a${name1.trim()} &2[to] &a${name2.trim()}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}

// bot prefix: [to] -- wesbites and discord images ##
function formatReplyWebsite(prefix, match) {
    let [_, name1, name2, link] = match;        
    let titleMessage = `&2${prefix} > &a${name1.trim()} &2[to] &a${name2.trim()}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}   

// bot prefix: talking -- wesbites and discord images ##
function formatTalkingWebsite(prefix, match) {
    let [_, name, link] = match;
    let titleMessage = `&2${prefix} > &a${name.trim()}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}

// guild prefix: talking -- wesbites and discord images ##
function wrapText(givText, everyNum, color) {
    const words = givText.split(' ').map(word => word.trim());
    let result = '';
    words.forEach((word, idx) => {
        if ((idx + 1) % everyNum === 0) {
            result += `${word}\n`;
        } else {
            result += `${color}${word} `;
        }
    });
    return result.trim();
}

function formatReason(comment, reason) {
    let wrapComment = wrapText(comment, 4, '&f')
    let wrapReason = wrapText(reason, 4, '&c');
    return `&6Blocked Comment:\n&r${wrapComment}\n--------------------\n&aReason: \n&c${wrapReason}\n--------------------\n&eClick to View Rules`;            
}

function formatPlayerWebsite(prefix, match) {
    let [_, formattedName, formattedRole, fullMessage, link] = match;
    let blockReason = '';
    let comment = '';
    if (fullMessage.includes('We blocked your comment')) {  
        const commentRegex = /"([^"]*)"/;
        let commentMatch = fullMessage.match(commentRegex);
        comment = commentMatch ? commentMatch[1] : null;

        const blockRegex = /because it (.+)\./;
        let blockMatch =  fullMessage.match(blockRegex);
        if (blockMatch) blockReason = blockMatch[1]
    }   
    let newBlockReason = formatReason(comment, blockReason);
    let reasonHoverable = new TextComponent('&c&l<BLOCKED>')
        .setHover('show_text', newBlockReason)
        .setClick('open_url', link);

    let titleMessage = `&2${prefix} > &a${formattedName} ${formattedRole}: `;

    let hoverable = getLinkHoverable(link);
    return blockReason === '' 
        ? createMessage(titleMessage, hoverable) 
        : createMessage(titleMessage, reasonHoverable);
}

// bot prefix: [to] -- patcher images ## 
function formatReplyPatcherImage(prefix, match) {
    let [_, name1, name2, link] = match;
    let titleMessage = `&2${prefix} > &a${name1.trim()} &2[to] &a${name2.trim()}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}

// bot prefix: talking -- patcher images ## 
function formatTalkingPatcherImage(prefix, match) {
    let [_, name, link] = match;
    let titleMessage = `&2${prefix} > &a${name.trim()}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}

// guild prefix: talking -- patcher images ## 
function formatPlayerPatcherImage(prefix, match) {
    let [_, formattedName, formattedRole, link] = match;
    let titleMessage = `&2${prefix} > &a${formattedName} ${formattedRole}: `;
    let hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}
