import { capitalise, formatTime, formatColonTime, getMonsterColor, formatItemsToTable, getLinkHoverable, createMessage, stripRank, getInHypixel, truncateNumbers, stripFormattedName } from './functions.js';  

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
        console.log('not matched -- bettershridge')
        console.log(`matched: false`);
        console.log(`formatHandler: ${formatHandler}`);
        console.log(`message: ${message}`);
        console.log(`regex: ${regex}`);
        console.log(' ');
        return;
    }
}

export function getGuildResponse(prefix, message, type) {
    const patterns = {
        // template: {
        //     regex: /./,
        //     format: formatFunc,
        // },
        mayor: {
            regex: /Current mayor: (.+)\. Next mayor: (.+), in (.+)\. Next special: (.+), in (.+)\./,
            format: formatMayor
        },
        pickedMayor: {
            regex: /(.+) is in (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?)(?: and (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?))?(?: and (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?))?/,       
            format: formatMayorPicked
        },
        noReqUpdate: {
            regex: /But you are Missing (.+) Fishing XP and (.+) Skyblock Levels for (.+)\./,
            format: formatNoReqUpdateMessage
        },
        updatedMessage: {
            regex: /Role is already up to date! Missing (.+) Fishing XP and (.+) Skyblock Levels for (.+)\./,
            format: formatUpdatedMessage,
        },
        promoted: {
            regex: /&r(&[a-qs-z0-9])(.+) &r&awas promoted from (.+) to (.+)&r.+/,
            format: formatPromotion,
        },
        demoted: {
            regex: /&r(&[a-qs-z0-9])(.+) &r&awas demoted from (.+) to (.+)&r.+/, 
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
        syntaxError1: {
            regex: /Syntax: (.+) \<player:\[(.+)\]\>( \<.+\>)?/,
            format: formatSyntaxError1
        },
        syntaxError2: { 
            regex: /Syntax: \<amount\>\[k\|m\|b\|s\] \<item name\>/,
            format: formatSyntaxError2
        },
        syntaxError3: {
            regex: /Syntax: (.+) \<player:\[(.+)\]\> \[(.+)\]/,
            format: formatSyntaxError3
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
        skillMaxed: {
            regex: /(.+) level for (.+) \((.+)\): (\d+) \| Total XP: (.+) \| Overflow XP: (.+)/,
            format: formatSkillMaxed  
        }, 
        skillProgress: {
            regex: /(.+) level for (.+) \((.+)\): (.+) \| Total XP: (.+) \| XP for level (\d+): (.+)/,
            format: formatSkillProgress  
        },       
        bazaar: {
            regex: /Bazaar data for (.+): insta-buy: (.+), insta-sell: (.+) ?/,
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
            regex: /([MF][1-7]) data for (.+) \((.+)\): Completions: (.+) \| Fastest time: (.+) \| Fastest time \(S\): (.+) \| Fastest time \(S\+\): (.+)/,
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
            regex: /(.+) for (.+) \((.+)\): Total: (\d+) \(w\/o Obf 1\) \| Bronze: (\d+)\/18 \| Silver: (\d+)\/18 \| Gold: (\d+)\/18 \| Diamond: (\d+)\/18/,
            format: formatTfishObf
        },
        tfishSpecific: {        
            regex: /(.+) caught for (.+) \((.+)\): Total (.+): (\d+) \| Bronze: (\d+) \| Silver: (\d+) \| Gold: (\d+) \| Diamond: (\d+)/,
            format: formatTfishSpecific     
        },
        contestSpecific: {
            regex: /Next (.+) contest in (.+)\./,
            format: formatContestSpecific
        },
        nextContest: {
            regex: /Next contest \((.+)\) in (.+)\./,
            format: formatNextContest
        },
        activeContest: {
            regex: /Active contest \((.+)\) ending in (.+)! Next contest \((.+)\) in (.+)\./,
            format: formatActiveContest
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
            regex: /(.+): _boop (.+)? (.+?)/,
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
        miscDataFor: {
            regex: /(.+) data for (.+) \((.+)\): (.+)\/(.+) \((.+)\)/,
            format: formatMiscDataFor
        },
    };

    const { regex, format } = patterns[type];
    return generateMessage(prefix, message, regex, format);
}   

function formatUpdatedMessage(prefix, match) {  
    const [_, fexp, sblevels, nextRole] = match;   
    return [    
        `${prefix}Role is already up to date!`, 
        `${SPACING}Next Role: &6${nextRole}`,
        `${SPACING}Missing &3Fishing XP&a: &r${fexp}`,
        `${SPACING}Missing Skyblock Lvls: &r${sblevels}`,
    ];      
};

function formatNoReqUpdateMessage(prefix, match) {
    const [_, fexp, sblevels, nextRole] = match;
    return [
        `${prefix}&cRole does not have requirements!`,
        `${SPACING}Next Role: &6${nextRole}`,
        `${SPACING}Missing &3Fishing XP&a: &r${fexp}`,
        `${SPACING}Missing Skyblock Lvls: &r${sblevels}`,
    ];
};

function formatPromotion(prefix, match) {
    const [_, playerColor, playerName, from, to] = match;
    const playerFName = `${playerColor}${stripFormattedName(playerName)}`       
    return `${prefix}${playerFName}&a was &a&lpromoted&r &afrom &c${from} to &6${to}`;          
};

function formatDemotion(prefix, match) {
    const [_, playerColor, playerName, from, to] = match;
    const playerFName = `${playerColor}${stripFormattedName(playerName)}`
    return `${prefix}${playerFName}&a was &c&ldemoted&r &afrom &6${from} to &c${to}`;      
};

function formatSpook1(prefix, match) {
    const [_, spooked] = match;       
    return `${prefix}&cAAH! &8You scared me, &6${spooked}!`; 
};

function formatSpook2(prefix, match) {
    const [_, spooked] = match;
    return `${prefix}&8Spooked &6${spooked}! &c>:)`;   
};

function formatGeneralDecodedLink(prefix, match) {  
    const message = match[0].toString();
    const linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    const titleMessage = `${prefix}`;     
    let linkHoverables = linkList.map(link => {
        const hoverable = getLinkHoverable(link);
        return hoverable; 
    });
    return createMessage(titleMessage, linkHoverables);  
};  

function formatReplyDecodedLink(prefix, match) {
    const message = match[0].toString();
    const [sender, response] = message.split(': ');
    const [name1, name2] = sender.split(' [to] ');
    const linkRegex = /\[LINK\]\((.+?)\)/g;
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }
    const titleMessage = `${prefix}${name1} &2[to] &a${name2}: &r`; 
    let linkHoverables = linkList.map(link => {
        const hoverable = getLinkHoverable(link);
        return hoverable; 
    });
    return createMessage(titleMessage, linkHoverables); 
}

function formatPlayerDecodedLink(prefix, match) {   
    const message = match[0].toString();
    const [sender, response] = message.split(': ');
    const linkRegex = /\[LINK\]\((.+?)\)/g; 
    let linkList = [];
    let foundLinks;
    while ((foundLinks = linkRegex.exec(message)) !== null) {
        linkList.push(foundLinks[1]);
    }     
    const titleMessage = `${prefix}${sender}: &r`;
    let linkHoverables = linkList.map(link => {
        const hoverable = getLinkHoverable(link);
        return hoverable;       
    });
    return createMessage(titleMessage, linkHoverables); 
}

function formatPickMesage(prefix, match) {
    const [_, option] = match;
    return `${prefix}I choose &e${capitalise(option).trim()}`;
}

function formatPlayerTalkingResponse(prefix, match) {
    const [_, player, message] = match;
    return `${prefix}${player}&r: ${message}`;
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
    const [_, currMayor, nextMayor, nextTime, specialMayor, specialTime] = match;
    return [
        `${prefix}Current mayor: ${getMayorColor(currMayor)}`,
        `${SPACING}Next mayor: ${getMayorColor(nextMayor)} &r[${formatTime(nextTime)}]`,
        `${SPACING}Next special: ${getMayorColor(specialMayor)} &r[${formatTime(specialTime)}]`
    ];
}

function formatMayorPicked(prefix, match) { 
    const [_, mayorName, firstVal, firstUnit, secondVal=null, secondUnit=null, thirdVal=null, thirdUnit=null] = match;
    const [unit1, unit2, unit3] = [firstUnit, secondUnit, thirdUnit].map(formatTime);
    const parts = [
        firstVal && `${firstVal}${unit1}`,
        secondVal && `${secondVal}${unit2}`,
        thirdVal && `${thirdVal}${unit3}`
    ].filter(Boolean).join(' ');
    return `${prefix}${mayorColors[mayorName]}Mayor ${mayorName} &acomes in: &f${parts}&a.`;
}

function formatSkillMaxed(prefix, match) {
    const [_, skillName, playerName, playerProfile, skillLevel, totalXP, overflowXP] = match;
    const skillColor = collNameCodes[skillName.toLowerCase()];
    return [
        `${prefix}${skillColor}${skillName} &askill info for &2${playerName}&a (${playerProfile}): &6${skillLevel}`,    
        `${SPACING}Total XP: &r${totalXP}`, 
        `${SPACING}Overflow XP: &r${overflowXP}`
    ];  
}

function formatSkillProgress(prefix, match) {
    const [_, skillName, playerName, playerProfile, skillLevel, totalXP, nextLevel, xpLeft] = match;
    const skillColor = collNameCodes[skillName.toLowerCase()];
    return [
        `${prefix}${skillColor}${skillName} &askill info for &2${playerName}&a (${playerProfile}): &6${skillLevel}`,    
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
    const [_, itemName, buyPrice, sellPrice] = match;
    const itemColor = formatItemColorBZ(itemName);
    const formattedName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    const buyColor = buyPrice === 'Not available' ? '&c' : '&6';
    const sellColor = sellPrice === 'Not available' ? '&c' : '&6';
    return [
        `${prefix}Bazaar data for &r${itemColor}${formatEssence(formattedName)}&a:`,
        `${SPACING}Insta-buy: ${buyColor}${buyPrice}`,
        `${SPACING}Insta-sell: ${sellColor}${sellPrice}`
    ];
}

function formatBestiary(prefix, match) {
    const [_, monster, playerName, playerProfile, kills, deaths, ratio] = match;  
    const stripMonster = monster.replace(/The/g, '').trim();
    const monsterColor = getMonsterColor(stripMonster);                  
    const beMessage = `${prefix}${monsterColor}${stripMonster}&a k/d for &2${playerName}&a (${playerProfile}): &r${kills}/${deaths}`;
    return ratio ? beMessage + ` &6(${ratio})` : beMessage;        
}

function formatCommandHelp(prefix, match) {
    const [_, commands] = match;
    const splittedCommands = commands.trim().split(', ')
    const formattedCmdLst = formatItemsToTable(splittedCommands);   
    return [
        `${prefix}Available commands (_command):`,
        ...formattedCmdLst
    ];
}

function formatReplies(prefix, match) {
    const [_, name1, name2, response] = match;
    const colon = response ? ': ' : '';   
    return response 
        ? `${prefix}${name1} &2[to] &a${name2}&r${colon}${response}`
        : `&2${prefix} > &f${name1} &apinned a message from &f${name2}`;
}

function formatCmdError(prefix, match) {
    const [_, cmdName] = match;
    return `${prefix}&cCommand ${cmdName} &cnot found, try _help.`;
}

function formatLbin(prefix, match) {
    const [_, itemName, itemLbin] = match;
    const f_itemName = itemName.includes(' ') 
        ? itemName.split(' ').map(thing => capitalise(thing.toLowerCase())).join(' ') 
        : capitalise(itemName.toLowerCase()); 
    return `${prefix}&6[LBIN]&a ${f_itemName}: &6${itemLbin.trim()}`;
}

function formatCata(prefix, match) {
    const [_, playerName, playerProfile, cataLvl, totalXP, currLvl, currXPProgress] = match;
    return [
        `${prefix}Catacombs level for &2${playerName}&a (${playerProfile}): &6${cataLvl}`,
        `${SPACING}Total XP: &r${totalXP}`,
        `${SPACING}XP for Cata. Lvl &6${currLvl}&a: &r${currXPProgress}`,
    ];
}

function formatDungeonRecords(prefix, match) {
    const [_, floor, playerName, playerProfile, comps, fastestTime, fastestTimeS, fastestTimeSPlus] = match;
    const [fTime, fTimeS, fTimeSPlus] = [fastestTime, fastestTimeS, fastestTimeSPlus].map(formatColonTime);
    const floorColor = floor.startsWith('M') ? '&c' : '&e';
    return [
        `${prefix}${floorColor}${floor}&r&a data for &2${playerName}&a (${playerProfile}):`,
        `${SPACING}Completions: &r${comps}`,
        `${SPACING}Fastest Time: &r${fTime}`,
        `${SPACING}Fastest Time (&6S&a): &r${fTimeS}`,
        `${SPACING}Fastest Time (&cS+&a): &r${fTimeSPlus}`,
    ];      
}

function formatSlayer(prefix, match) {
    const [_, slayerName, playerName, playerProfile, totalXP, t1, t2, t3, t4, t5] = match;

    const slayerColors = {
        "Zombie": "&2",
        "Wolf": "&f",               
        "Enderman": "&5",
        "Blaze": "&6",
        "Tarantula": "&c",
        "Vampire": "&4",
    };      
    const slayerColor = slayerColors[slayerName];
    return [   
        `${prefix}${slayerColor}${slayerName}&r&a Slayer Data for &2${playerName}&a (${playerProfile}):`,
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
    const [_, fishName, playerName, playerProfile, totalFish, bronzeProg, silverProg, goldProg, diamondProg] = match;
    const title = `${prefix}Trophy Fish for &2${playerName}&a (${playerProfile}):`;  
    return [    
        title,
        `${SPACING}Total Fish: &r${totalFish} &a[&r &8${bronzeProg}/18 &a|&r &7${silverProg}/18 &a|&r &6${goldProg}/18 &a|&r &b${diamondProg}/18 &a]&r`,
    ];      
}

function formatTfishObf(prefix, match) {                
    const [_, fishName, playerName, playerProfile, totalFish, bronzeProg, silverProg, goldProg, diamondProg] = match;
    const title = `${prefix}Trophy fish for &2${playerName}&a (${playerProfile}) &cwithout Obf 1&a: `; 
    return [
        title,
        `${SPACING}Total Fish: &r${totalFish} &a[&r &8${bronzeProg}/18 &a|&r &7${silverProg}/18 &a|&r &6${goldProg}/18 &a|&r &b${diamondProg}/18 &a]&r`,
    ]
}

function formatTfishSpecific(prefix, match) {
    const [_, fishName, playerName, playerProfile, fishName2, totalFish, bronzeFish, silverFish, goldFish, diamondFish] = match;
    const fishNameColor = fishName in fishColorsDict ? fishColorsDict[fishName] : ''; 
    return [
        `${prefix}${fishNameColor}${fishName} &adata for &2${playerName}&a (${playerProfile}):`,                         
        `${SPACING}Total Fish: &r${totalFish} &a[&r &8${bronzeFish} &a|&r &7${silverFish} &a|&r &6${goldFish} &a|&r &b${diamondFish} &a]&r`,        
    ];
}

function formatContestSpecific(prefix, match) {
    const [_, crop, time] = match;
    const [hrs, mins, secs] = time.split(':');
    const formatTime = `${Number(hrs)}h ${Number(mins)}m ${Number(secs)}s`;
    return `${prefix}Next &6${capitalise(crop)} &acontest in &6${formatTime}&a.`;
}

function formatNextContest(prefix, match) {
    const [_, nextCrops, timeTillNext] = match;
    const f_nextCrops = nextCrops.split(', ').map(crop => capitalise(crop)).join(', ');
    return [
        `${prefix}Next Contest in ${formatColonTime(timeTillNext)}!`,
        `${SPACING}Crops: &6${f_nextCrops}`
    ];  
}   

function formatActiveContest(prefix, match) {
    [_, activeCrops, currContestTimeLeft, nextCrops, nextContestTime] = match;
    const currCrops = activeCrops.split(', ').map(crop => capitalise(crop)).join(', ');       
    const f_nextCrops = nextCrops.split(', ').map(crop => capitalise(crop)).join(', ');
    return [        
        `${prefix}Contest is Active! [&r${formatColonTime          (currContestTimeLeft)} left&a] &8|&r &7Next in ${formatColonTime(nextContestTime)}`,
        `${SPACING}Current Contest: &6${currCrops}`,
        `${SPACING}Next Contest: &6${f_nextCrops}`
    ];
}

function formatFarmingWeight(prefix, match) {
    const [_, playerName, playerProfile, weight, collWeight, others] = match;
    const otherWeights = others.split(', ').map(weightLine => {
        const fwFormatRegex = /(.+) \((.+)\)/;
        const fwFormatMatch = weightLine.match(fwFormatRegex);
        if (fwFormatMatch) {
            const [_, name, weight] = fwFormatMatch;
            return `${SPACING}${name}: &r${weight}`;
        };
    });
    return [
        `${prefix}&eFarming &aweight for &2${playerName}&a (${playerProfile}): &6${weight}`,
        `${SPACING}Collections: &r${collWeight}`,
        ...otherWeights, 
    ];
};

function formatInstaSell(prefix, match) {
    const [_, itemAmt, itemName, sellCost, aveCost] = match;
    const itemColor = itemName.includes('Ultimate') ? '&d&l' : '&r';
    const formattedItemName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim(); 
    return [
        `${prefix}Insta-sell: &r${itemAmt}&ax ${itemColor}${formattedItemName}:`,        
        `${SPACING}Sell Cost: &6${sellCost}`,
        `${SPACING}Ave. Cost/unit: &6${aveCost}`,
    ];
}

function formatInstaBuy(prefix, match) {
    const [_, itemAmt, itemName, sellCost, aveCost] = match;
    const itemColor = itemName.includes('Ultimate') ? '&d&l' : '&r';
    const formattedItemName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    return [
        `${prefix}Insta-buy: &r${itemAmt}&ax ${itemColor}${formattedItemName}:`,
        `${SPACING}Sell Cost: &6${sellCost}`,
        `${SPACING}Ave. Cost/unit: &6${aveCost}`,
    ];
} 

function getBotBooper(prefix, match) {
    const [_, booper, booped='', otherText=null] = match;
    return booped === '' ? [booper, ''] : [booper, booped];
}

function formatCollections(prefix, match) {
    const [_, collName, playerName, playerProfile, items] = match;
    const collColor = collNameCodes[collName.toLowerCase()];
    let itemList = items
        .match(/[\w\s]+ \d+\/\d+ \(\d{1,3}(?:,\d{3})*(?:\/\d{1,3}(?:,\d{3})*)?\)/g)
        .map(item => {       
            const itemRegex = /(.+) (\d+)\/(\d+) \((.+)\)/;
            const itemMatch = (item.trim()).match(itemRegex);
            if (itemMatch) {
                const [_, itemName, itemLvl, itemMaxLvl, itemAmount] = itemMatch;
                const maxColor = itemLvl === itemMaxLvl ? '&6' : '';
                return `${SPACING}&r${itemName}: &a${maxColor}${itemLvl}/${itemMaxLvl} &7(${itemAmount})`;    
            };
        });

    const collectionMessages = [
        `${prefix}${collColor}${capitalise(collName)} &afor &2${playerName}&a (${playerProfile}): `,
        ...itemList,                
    ];
    return collectionMessages;
}

function formatAuctionLinks(prefix, match) {
    const [_, nameInfo, formattedRole, link] = match;
    const titleMessage = `${prefix}${nameInfo} ${formattedRole}: `;
    const hoverable = getLinkHoverable(link);
    return createMessage(titleMessage, hoverable);
}       

function formatSyntaxError1(prefix, match) {
    const [_, alias, playerOptions, condition2=null] = match;
    const options2 = condition2 ? condition2 : '';
    return `${prefix}Usage: &r_${alias} player:[${playerOptions}] ${options2}`;
};

function formatSyntaxError2(prefix, match) {
    const [_] = match;    
    return `${prefix}Usage: &r_[ib|is] amount:[k|m|b|s] <item name>`;
};      

function formatSyntaxError3(prefix, match) {
    const [_, alias, playerOptions, options2] = match;
    return `${prefix}Usage: &r_${alias} player:[${playerOptions} [${options2}]`;        
};

function formatMiscDataFor(prefix, match) {
    const [_, itemName, playerName, playerProfile, collLevel, collMax, collItems] = match;
    const collectionColor = collLevel === collMax ? '&6' : '&a';
    return `${prefix}${itemName} data for &2${playerName}&a (${playerProfile}): &r${collectionColor}${collLevel}/${collMax} &r(${truncateNumbers(collItems)})`;
};      
    
    
