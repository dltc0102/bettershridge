import { capitalise, formatTime, formatColonTime, getMonsterColor, formatItemsToTable, truncateNumbers, stripRank } from './functions.js';
import PogObject from '../PogData';



//! GLOBALS
export const guildData = new PogObject("bettershridge", {
    commands: [
        "lbin", "bz", "cata", "8ball", "election", "help", "pick", "ping",
        "skill", "slayer", "tfish", "contest", "fw", "fc", "is", "ib",
        "collection", "be", "raw", "rlb", "boop", "glist", "gonline", "boo", "update"
    ],
    booper: '',
    booped: '',
    spacing: `&2   |  &a`,
}, './data/guildData.json');
guildData.autosave(5);

const collNameCodes = {
    // categories
    "fishing": "&3",
    "combat": "&c",
    "foraging": "&2",
    "farming": "&6",
    "mining": "&b",
    "taming": "&d",

    // sub categories
    "lava": "&c",
    "water": "&9",

    // bestiary
    "private island": "&f",
    "hub": "&f",
    "the farming islands": "&f",
    "the garden": "&2",
    "spider's den": "&c",
    "the end": "&d",
    "crimson isle": "&c",
    "deep caverns": "&b",
    "dwarven mines": "&2",
    "crystal hollows": "&5",
    "the park": "&3",
    "spooky festival": "&6",
    "the catacombs": "&c",
    "mythological creatures": "&2",
    "jerry": "&6",
    "kuudra": "&c",
};

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

const mayorPerks = {
    'Aatrox': {
        'Slayer XP Buff': 'Earn 25% more Slayer XP.',
        'Pathfinder': 'Gain rare drops 20% more often.',
        'SLASHED Pricing': 'Starting slayer quests is half price.',
    },
    'Cole': {
        'Mining Fiesta': `Mining Fiesta: Schedules 5 Mining Fiesta events that last for 7 SkyBlock Days each. Earn 2x drops and extra unique loot, including Refined Minerals and Glossy Gemstones. Grants +75 Mining Wisdom during the event which is only active on Public Islands.`,
        'Mining XP Buff': 'Earn +60 Mining Wisdom on public islands.',
        'Molten Forge': 'Decreases the time it takes to Forge items by 25%.',
        'Prospection': 'Mining minions work 25% faster.',
    },
    'Diana': {
        'Pet Luck XP Buff': 'Gain 35% more Pet XP.',
        'Lucky!': 'Gain +25 Pet Luck.',
        'Mythological Ritual': 'Mayor Diana will sell the Griffin Pet, which lets you find Mythological Creature and tons of unique items.',
        'Sharing is Caring': 'You can have up to 3 EXP Shared Pets active at once. Your EXP Share rate is increased by 10%.',
    },
    'Diaz': {
        'Long Term Investment': 'The elected Minister will appear in the next Election with all of their available perks.',
        'Shopping Spree': 'Increase daily NPC buy limits by 10x.',
        'Stock Exchange': 'Participate in the Stonks Auction for a chance to win Stock Of Stonks! Trade them for extravagant items at the ⏣ Trade Center.',
        'Volume Trading': `Double the item quantity from Shen's Auction, Shen's Special, and Rift Shen's on the year Diaz is elected. Two additional Shen’s Special auctions will be available for the duration of Diaz being elected as Mayor.`,
    },
    'Finnegan': {
        'Blooming Business': `Garden Visitors will give out Fine Flour and appear more often. Additional visitors may visit your Garden. Higher rarity Visitors are more likely to show up & will provide 10% more Copper.`,
        'GOATed': `Jacob's Farming Contest brackets include up to 10% more players each.`,
        'Pelt-pocalypse': `Obtain 1.5x more Pelts from Trevor in the ⏣ Mushroom Desert, hunt a new Trapper Mob, and purchase items from a new Trapper Shop.`,
        'Pest Eradicator': `The duration of Pesthunter Phillip's ☘Farming Fortune bonus is now 60 minutes. Pests are now 4x more likely to spawn in sprayed plots.`,
    },
    'Foxy': {
        'A Time for Giving': `Party Chests and Party Gifts can be obtained while this event is active.`,
        'Chivalrous Carnival': `Schedules a Carnival in the Hub that is active throughout the entire year.`,
        'Extra Event': `Schedules an extra (Fishing Festival/Mining Fiesta/Spooky Festival) event during the year.`,
        'Sweet Benevolence': `Earn +30% more Candy, Gifts and Chocolate from duplicate Rabbits during their respective events.`,
    },
    'Marina': {
        'Double Trouble': `For every 1 Sea Creature Chance, gain +0.1 Double Hook Chance.`,
        'Fishing XP Buff': `Gain +50 ☯Fishing Wisdom on public islands.`,
        'Fishing Festival': `Start a special fishing event during the first 3 days of each month! Fish and fight dangerous sharks and earn unique Shark loot.`,
        'Luck of the Sea 2.0': `Gain +15 Sea Creature Chance.`,
    },
    'Paul': {
        'Benediction': `Blessings are 25% stronger.`,
        'Marauder': `Dungeon reward chests are 20% cheaper.`,
        'EZPZ': `Gain 10 bonus score on dungeon runs.`,
    },
    'Jerry': {
        'Perkpocalypse': `Activate all perks of another mayor every 18 SkyBlock days (6 hours).`,
        'Statspocalypse': `Increases most stats by 10%.`,
        'Jerrypocalypse': `Reveal Hidden Jerries from logging, farming, mining, and killing mobs.`,
    },
    'Derpy': {
        'QUAD TAXES!!!': `Pay 4x the normal amount of taxes!`,
        'TURBO MINIONS!!!': `Minions have double the output!`,
        'DOUBLE MOBS HP!!!': `ALL monsters have double Health!`,
        'MOAR SKILLZ!!!': `Gain +50% more skill experience! `,
    },
    'Scorpius': {
        'Bribe': `If Scorpius wins and you voted for him, Mayor Scorpius will offer you Coins as a token of gratitude.`,
        'Darker Auctions': `Scorpius will intrude in Dark Auctions increasing the amount of rounds to 6 and offering special items.` ,
    },
};

const tfishColorsDict = {
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

const rareMobs = ['Lord Jawbus', 'Thunder', 'Plhlegblast', 'The Sea Emperor', 'Carrot King', 'Water Hydra', 'Yeti', 'Reindrake', 'Great White Shark', 'Grim Reaper', 'Phantom Fisher', 'Abyssal Miner'];



//! FUNCTIONS

/**
 * Generates a message for bot messages based on the parameters passed in, using the formatHandler for the respective regex.
 * @param {*} prefix - bot prefix (ex. &2B&r > )
 * @param {*} message - message to be formatted with formatHandler
 * @param {*} regex - regex for unique message
 * @param {*} formatHandler - formats the unique message into something aesthetically pleasing
 * @returns a formatted message for the respective bot message
 */
function generateMessage(prefix, message, regex, formatHandler) {
    try {
        const match = message.match(regex);
        return formatHandler(prefix, match);
    } catch(error) {
        ChatLib.chat(`&4[&b!&4]&r &cUnrecognised statement, please contact oBiscuit`)
        console.error(`not matched -- bettershridge\nError: ${error}\nMessage: '${message}\nregex: ${regex}'`);
    };
}

export function getGuildResponse(prefix, message, type) {
    const patterns = {
        // template: {
        //     regex: /./,
        //     format: formatFunc,
        // },
        mayor: {
            // regex: /Current mayor: (.+)\. Current minister: (.+)\. Next mayor: (.+), in (.+)\. Next special: (.+), in (.+)\./,
            regex: /Current mayor: (.+)\. Next mayor: (.+), in (.+)\. Next special: (.+), in (.+)\./,
            format: formatMayor
        },
        pickedMayor: {
            regex: /(.+) is in (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?)(?: and (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?))?(?: and (\d+) (years?|months?|weeks?|days?|hours?|minutes?|seconds?))?/,
            format: formatMayorPicked
        },
        promoted: {
            regex: /&r(&[a-qs-z0-9])(.+) &r&awas promoted from (.+) to (.+)&r.+/,
            format: formatPromotion,
        },
        demoted: {
            regex: /&r(&[a-qs-z0-9])(.+) &r&awas demoted from (.+) to (.+)&r.+/,
            format: formatDemotion,
        },
        updatedMessage: {
            regex: /Role is already up to date! Missing (.+) Fishing XP and (.+) Skyblock Levels for (.+)\./,
            format: formatUpdatedMessage,
        },
        noReqUpdate: {
            regex: /(.+) does not have requirements! But you are Missing (.+) Fishing XP and (.+) Skyblock Levels for (.+)\./,
            format: formatNoReqUpdateMessage
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
        bestiarySpecific: {
            regex: /(.+) data for (.+) \((.+)\) k\/d \(kdr\): (\d+)\/(\d+)(?: \((.+)\))?/,
            format: formatBestiarySpecific
        },
        bestiaryAll: {
            regex: /(.+) bestiary for (.+) \((.+)\) k\/d \(kdr\): (.+)/,
            format: formatBestiaryAll
        },
        commandHelp: {
            regex: /Available commands \(_command\): (.+)/,
            format: formatCommandHelp
        },
        syntaxError: {
            regex: /⚠ Usage: _(.+?) (.+)/,
            format: formatSyntaxErrors
        },
        spooky1: {
            regex: /AAH! You scared me, (.+)!/,
            format: formatSpook1
        },
        spooky2: {
            regex: /Spooked (.+)! \>:\)/,
            format: formatSpook2
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
        collection: {
            regex: /(.+) completion for (.+) \((.+)\): (.+)/,
            format: formatCollections,
        },
        pickCommand: {
            regex: /I choose (.+)/,
            format: formatPickMesage
        },
        miscDataFor: {
            regex: /(.+) data for (.+) \((.+)\): (.+)\/(.+) \((.+)\)/,
            format: formatMiscDataFor
        },
        getBooperGP: {
            regex: /(.+?) &3\[.+\]&f: &r_boop( .+)?&r/,
            format: getBotBooperGP
        },
        getBooperDP: {
            regex: /(.+?): _boop( .+)?/,
            format: getBotBooperDP
        },
        getBooped: {
            regex: /Booped (.+)!/,
            format: formatGetBooped
        },
        resetBoop: {
            regex: /reset the boop/,
            format: resetBoop,
        },
        guildmateStatus: {
            regex: /Guildmate (.+?) (is|is not) online\./,
            format: formatGuildmateStatus
        },
    };

    const { regex, format } = patterns[type];
    return generateMessage(prefix, message, regex, format);
};


function getCurrMayorPerks(nameWithPerkList) {
    const [currMayorName, currMayorPerks] = nameWithPerkList.split(' ');
    const perkIndicators = currMayorPerks.slice(1, -1).split('|');
    const possiblePerks = mayorPerks[currMayorName];
    const activePerks = perkIndicators
        .map((indicator, idx) => indicator === '✓' ? Object.entries(possiblePerks)[idx] : null)
        .filter(Boolean)
        .map(([name, description]) => ({ name, description }));
    return activePerks;
}

function getMayorColor(mayor) {
    return `${mayorColors[mayor]}${mayor}`
};

function formatMayor(prefix, match) {
    const [_, currMayor, nextMayor, nextTime, specialMayor, specialTime] = match;
    // const [_, currMayor, currMinister, nextMayor, nextTime, specialMayor, specialTime] = match;
    // const minister = '';
    return [
        // `${prefix}Current mayor: ${getMayorColor(currMayor)} &8|&r &aMinister: ${getMayorColor(minister)}`,
        `${prefix}Current mayor: ${getMayorColor(currMayor)}`,
        `${guildData.spacing}Next mayor: ${getMayorColor(nextMayor)} &r[${formatTime(nextTime)}]`,
        `${guildData.spacing}Next special: ${getMayorColor(specialMayor)} &r[${formatTime(specialTime)}]`
    ];
};

function formatMayorPicked(prefix, match) {
    const [_, mayorName, firstVal, firstUnit, secondVal=null, secondUnit=null, thirdVal=null, thirdUnit=null] = match;
    const [unit1, unit2, unit3] = [firstUnit, secondUnit, thirdUnit].map(formatTime);
    const parts = [
        firstVal && `${firstVal}${unit1}`,
        secondVal && `${secondVal}${unit2}`,
        thirdVal && `${thirdVal}${unit3}`
    ].filter(Boolean).join(' ');
    return `${prefix}${mayorColors[mayorName]}Mayor ${mayorName} &acomes in: &f${parts}&a.`;
};

function formatPromotion(prefix, match) {
    const [_, playerColor, playerName, from, to] = match;
    const playerFName = `${playerColor}${playerName.removeFormatting()}`;
    return `${prefix}${playerFName}&a was &a&lpromoted&r &afrom &c${from} to &6${to}`;
};

function formatDemotion(prefix, match) {
    const [_, playerColor, playerName, from, to] = match;
    const playerFName = `${playerColor}${playerName.removeFormatting()}`;
    return `${prefix}${playerFName}&a was &c&ldemoted&r &afrom &6${from} to &c${to}`;
};

function formatUpdatedMessage(prefix, match) {
    const [_, fexp, sblevels, nextRole] = match;
    return [
        `${prefix}Role is already up to date!`,
        `${guildData.spacing}Next Role: &6${nextRole}`,
        `${guildData.spacing}Missing &3Fishing XP&a: &r${fexp}`,
        `${guildData.spacing}Missing Skyblock Lvls: &r${sblevels}`,
    ];
};

function formatNoReqUpdateMessage(prefix, match) {
    const [_, your, fexp, sblevels, nextRole] = match;
    return [
        `${prefix}&c${your} does not have requirements!`,
        `${guildData.spacing}Next Role: &6${nextRole}`,
        `${guildData.spacing}Missing &3Fishing XP&a: &r${fexp}`,
        `${guildData.spacing}Missing Skyblock Lvls: &r${sblevels}`,
    ];
};

function formatSkillMaxed(prefix, match) {
    const [_, skillName, playerName, playerProfile, skillLevel, totalXP, overflowXP] = match;
    const skillColor = collNameCodes[skillName.toLowerCase()];
    return [
        `${prefix}${skillColor}${skillName} &askill info for &2${playerName}&a (${playerProfile}): &6${skillLevel}`,
        `${guildData.spacing}Total XP: &r${totalXP}`,
        `${guildData.spacing}Overflow XP: &r${overflowXP}`
    ];
};

function formatSkillProgress(prefix, match) {
    const [_, skillName, playerName, playerProfile, skillLevel, totalXP, nextLevel, xpLeft] = match;
    const skillColor = collNameCodes[skillName.toLowerCase()];
    return [
        `${prefix}${skillColor}${skillName} &askill info for &2${playerName}&a (${playerProfile}): &6${skillLevel}`,
        `${guildData.spacing}Total XP: &r${totalXP}`,
        `${guildData.spacing}XP for next level (&6${nextLevel}&a): &r${xpLeft}`
    ];
};

function formatItemColorBZ(str) {
    let itemColor = '&f';
    if (str.includes('Ultimate')) {
        itemColor = '&d&l';
    } else if (str.includes('Essence')) {
        itemColor = '&d';
    }
    return itemColor;
};

function formatEssence(str) {
    return str.startsWith('Essence ') ? `${str.split(' ')[1]} Essence` : str;
}

function formatBazaar(prefix, match) {
    const [_, itemName, buyPrice, sellPrice] = match;
    const itemColor = formatItemColorBZ(itemName);
    const formattedName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    const buyColor = buyPrice === 'Not available' ? '&c' : '&6';
    const sellColor = sellPrice === 'Not available' ? '&c' : '&6';
    return [
        `${prefix}Bazaar data for &r${itemColor}${formatEssence(formattedName)}&a:`,
        `${guildData.spacing}Insta-buy: ${buyColor}${buyPrice}`,
        `${guildData.spacing}Insta-sell: ${sellColor}${sellPrice}`
    ];
};

function formatBestiarySpecific(prefix, match) {
    const [_, monster, playerName, playerProfile, kills, deaths, ratio] = match;
    const stripMonster = monster.replace(/The/g, '').trim();
    const monsterColor = getMonsterColor(stripMonster);
    const isBeMaxed = Number(kills) >= Number(deaths);
    const maxBeColor = isBeMaxed ? '&6' : '&r';
    const beMessage = `${prefix}${monsterColor}${stripMonster}&a k/d for &2${playerName}&a (${playerProfile}): ${maxBeColor}${kills}/${deaths}`;
    return ratio ? beMessage + ` &6(${ratio})` : beMessage;
};

function formatBestiaryAll(prefix, match) {
    const [_, bestiaryType, playerName, playerProfile, bestiaryData] = match;
    let bestiaryList = bestiaryData
        .match(/([A-Za-z\s]+ \d+\/\d+(?: \(\d+\.\d+\))?)/g)
        .map(data => data.trim());


    const getBestiaryEntry = (name, kd, ratio) => {
        const mobColor = getMonsterColor(name, true);
        const [currBe, maxBe] = kd.split('/');
        const showRatio = ratio ? ` &7${ratio}` : '';
        const kdColor = Number(currBe) >= Number(maxBe) ? `&6` : `&r`;
        if (!ratio && kd === '0/0') return `${guildData.spacing}${mobColor}${name}: &80/0`;
        return `${guildData.spacing}${mobColor}${name}: ${kdColor}${kd}${showRatio}`;
    }

    const formatBestiaryDataByLine = (lst) => {
        let bestiaryRare = [];
        let bestiaryCommon = [];
        lst.forEach(line => {
            const lineRegex = /(.+?)\s(\d+\/\d+)\s?(\(\d+\.\d+\))?/;
            const lineMatch = line.match(lineRegex);
            if (lineMatch) {
                const [_, name, kd, ratio = null] = lineMatch;
                const bestiaryEntry = getBestiaryEntry(name, kd, ratio);
                if (rareMobs.includes(name)) {
                    bestiaryRare.push(bestiaryEntry);
                } else {
                    bestiaryCommon.push(bestiaryEntry);
                }
            }
        });
        return [bestiaryCommon, bestiaryRare];
    };

    const [beCommon, beRare] = formatBestiaryDataByLine(bestiaryList);
    const bestiaryColor = collNameCodes[bestiaryType.toLowerCase()] ?? '&2';
    const formattedBeType = bestiaryColor + capitalise(bestiaryType);
    const titleMessage = `${prefix}${formattedBeType} &r&abestiary data for &2${playerName}&a (${playerProfile}): `
    return [
        titleMessage, ...beCommon, guildData.spacing, ...beRare
        ];
};

function formatCommandHelp(prefix, match) {
    const [_, commands] = match;
    const splittedCommands = commands.trim().split(', ')
    splittedCommands
        .filter(item => !guildData.commands.includes(item))
        .forEach(item => guildData.commands.push(item))
    guildData.save();
    const formattedCmdLst = formatItemsToTable(splittedCommands);
    return [
        `${prefix}Available commands (_command):`,
        ...formattedCmdLst
    ];
};

function formatSyntaxErrors(prefix, match) {
    const [_, cmdName, optionsStr] = match;
    const con1 = optionsStr.split(' ')[0].trim();
    const con2 = optionsStr.substring(optionsStr.indexOf(' ')).trim();
    const fcon2 = cmdName === 'cata' ? con2.replace(/\[0-7\]/g, '0-7') : con2;
    return `${prefix}&c⚠ Usage: _${cmdName} ${con1} ${fcon2}`;
};

function formatSpook1(prefix, match) {
    const [_, spooked] = match;
    return `${prefix}&cAAH! &8You scared me, &6${spooked}!`;
};

function formatSpook2(prefix, match) {
    const [_, spooked] = match;
    return `${prefix}&8Spooked &6${spooked}! &c>:)`;
};

function formatCmdError(prefix, match) {
    const [_, cmdName] = match;
    return `${prefix}&cCommand ${cmdName} &cnot found, try _help.`;
};

function formatLbin(prefix, match) {
    const [_, itemName, itemLbin] = match;
    const f_itemName = itemName.includes(' ')
        ? itemName.split(' ').map(thing => capitalise(thing.toLowerCase())).join(' ')
        : capitalise(itemName.toLowerCase());
    return `${prefix}&6[LBIN]&a ${f_itemName}: &6${itemLbin.trim()}`;
};

function formatCata(prefix, match) {
    const [_, playerName, playerProfile, cataLvl, totalXP, currLvl, currXPProgress] = match;
    return [
        `${prefix}Catacombs level for &2${playerName}&a (${playerProfile}): &6${cataLvl}`,
        `${guildData.spacing}Total XP: &r${totalXP}`,
        `${guildData.spacing}XP for Cata. Lvl &6${currLvl}&a: &r${currXPProgress}`,
    ];
};

function formatDungeonRecords(prefix, match) {
    const [_, floor, playerName, playerProfile, comps, fastestTime, fastestTimeS, fastestTimeSPlus] = match;
    const [fTime, fTimeS, fTimeSPlus] = [fastestTime, fastestTimeS, fastestTimeSPlus].map(formatColonTime);
    const floorColor = floor.startsWith('M') ? '&c' : '&e';
    return [
        `${prefix}${floorColor}${floor}&r&a data for &2${playerName}&a (${playerProfile}):`,
        `${guildData.spacing}Completions: &r${comps}`,
        `${guildData.spacing}Fastest Time: &r${fTime}`,
        `${guildData.spacing}Fastest Time (&6S&a): &r${fTimeS}`,
        `${guildData.spacing}Fastest Time (&cS+&a): &r${fTimeSPlus}`,
    ];
};

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
        `${guildData.spacing}Total XP: &r${totalXP}`,
        `${guildData.spacing}Kills&r: &7T1: &a${t1} &8| &7T2: &e${t2} &8| &7T3: &c${t3} &8| &7T4: &4${t4} &8| &7T5: &5${t5}`,
    ];
};

function formatTfishGeneral(prefix, match) {
    const [_, fishName, playerName, playerProfile, totalFish, bronzeProg, silverProg, goldProg, diamondProg] = match;
    const title = `${prefix}Trophy Fish for &2${playerName}&a (${playerProfile}):`;
    return [
        title,
        `${guildData.spacing}Total Fish: &r${totalFish} &a[&r &8${bronzeProg}/18 &a|&r &7${silverProg}/18 &a|&r &6${goldProg}/18 &a|&r &b${diamondProg}/18 &a]&r`,
    ];
};

function formatTfishObf(prefix, match) {
    const [_, fishName, playerName, playerProfile, totalFish, bronzeProg, silverProg, goldProg, diamondProg] = match;
    const title = `${prefix}Trophy fish for &2${playerName}&a (${playerProfile}) &cwithout Obf 1&a: `;
    return [
        title,
        `${guildData.spacing}Total Fish: &r${totalFish} &a[&r &8${bronzeProg}/18 &a|&r &7${silverProg}/18 &a|&r &6${goldProg}/18 &a|&r &b${diamondProg}/18 &a]&r`,
    ]
};

function formatTfishSpecific(prefix, match) {
    const [_, fishName, playerName, playerProfile, fishName2, totalFish, bronzeFish, silverFish, goldFish, diamondFish] = match;
    const fishNameColor = fishName in tfishColorsDict ? tfishColorsDict[fishName] : '';
    return [
        `${prefix}${fishNameColor}${fishName} &adata for &2${playerName}&a (${playerProfile}):`,
        `${guildData.spacing}Total Fish: &r${totalFish} &a[&r &8${bronzeFish} &a|&r &7${silverFish} &a|&r &6${goldFish} &a|&r &b${diamondFish} &a]&r`,
    ];
};

function formatContestSpecific(prefix, match) {
    const [_, crop, time] = match;
    const [hrs, mins, secs] = time.split(':');
    const formatTime = `${Number(hrs)}h ${Number(mins)}m ${Number(secs)}s`;
    return `${prefix}Next &6${capitalise(crop)} &acontest in &6${formatTime}&a.`;
};

function formatNextContest(prefix, match) {
    const [_, nextCrops, timeTillNext] = match;
    const f_nextCrops = nextCrops.split(', ').map(crop => capitalise(crop)).join(', ');
    return [
        `${prefix}Next Contest in ${formatColonTime(timeTillNext)}!`,
        `${guildData.spacing}Crops: &6${f_nextCrops}`
    ];
};

function formatActiveContest(prefix, match) {
    [_, activeCrops, currContestTimeLeft, nextCrops, nextContestTime] = match;
    const currCrops = activeCrops.split(', ').map(crop => capitalise(crop)).join(', ');
    const f_nextCrops = nextCrops.split(', ').map(crop => capitalise(crop)).join(', ');
    return [
        `${prefix}Contest is Active! [&r${formatColonTime          (currContestTimeLeft)} left&a] &8|&r &7Next in ${formatColonTime(nextContestTime)}`,
        `${guildData.spacing}Current Contest: &6${currCrops}`,
        `${guildData.spacing}Next Contest: &6${f_nextCrops}`
    ];
};

function formatFarmingWeight(prefix, match) {
    const [_, playerName, playerProfile, weight, collWeight, others] = match;
    const otherWeights = others.split(', ').map(weightLine => {
        const fwFormatRegex = /(.+) \((.+)\)/;
        const fwFormatMatch = weightLine.match(fwFormatRegex);
        if (fwFormatMatch) {
            const [_, name, weight] = fwFormatMatch;
            return `${guildData.spacing}${name}: &r${weight}`;
        };
    });
    return [
        `${prefix}&eFarming &aweight for &2${playerName}&a (${playerProfile}): &6${weight}`,
        `${guildData.spacing}Collections: &r${collWeight}`,
        ...otherWeights,
    ];
};

function formatInstaSell(prefix, match) {
    const [_, itemAmt, itemName, sellCost, aveCost] = match;
    const itemColor = itemName.includes('Ultimate') ? '&d&l' : '&r';
    const formattedItemName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    return [
        `${prefix}Insta-sell: &r${itemAmt}&ax ${itemColor}${formattedItemName}:`,
        `${guildData.spacing}Sell Cost: &6${sellCost}`,
        `${guildData.spacing}Ave. Cost/unit: &6${aveCost}`,
    ];
};

function formatInstaBuy(prefix, match) {
    const [_, itemAmt, itemName, sellCost, aveCost] = match;
    const itemColor = itemName.includes('Ultimate') ? '&d&l' : '&r';
    const formattedItemName = itemName.replace(/Enchantment/g, '').replace(/Ultimate/g, '').trim();
    return [
        `${prefix}Insta-buy: &r${itemAmt}&ax ${itemColor}${formattedItemName}:`,
        `${guildData.spacing}Buy Cost: &6${sellCost}`,
        `${guildData.spacing}Ave. Cost/unit: &6${aveCost}`,
    ];
};

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
                return `${guildData.spacing}&r${itemName}: &a${maxColor}${itemLvl}/${itemMaxLvl} &7(${itemAmount})`;
            };
        });

    const collectionMessages = [
        `${prefix}${collColor}${capitalise(collName)} &afor &2${playerName}&a (${playerProfile}): `,
        ...itemList,
    ];
    return collectionMessages;
};

function formatPickMesage(prefix, match) {
    const [_, option] = match;
    return `${prefix}I choose &e${capitalise(option).trim()}`;
};

function formatMiscDataFor(prefix, match) {
    const [_, itemName, playerName, playerProfile, collLevel, collMax, collItems] = match;
    const collectionColor = collLevel === collMax ? '&6' : '&a';
    return `${prefix}${itemName} data for &2${playerName}&a (${playerProfile}): &r${collectionColor}${collLevel}/${collMax} &r(${truncateNumbers(collItems)})`;
};

function getBotBooperDP(prefix, match) {
    const [_, boopSender, boopResponse=''] = match;
    guildData.booper = stripRank(boopSender.removeFormatting().trim());
    guildData.booped = boopResponse.trim().split(' ')[0];
};

function getBotBooperGP(prefix, match) {
    const [_, boopSender, boopTarget='', otherText=null] = match;
    guildData.booper = stripRank(boopSender.trim().removeFormatting());
    guildData.booped = boopTarget.trim();
};

function formatGetBooped(prefix, match) {
    const [_, name] = match;
    const isSelfBeingBooped = name.toLowerCase() === Player.getName().toLowerCase();
    if (isSelfBeingBooped) {
        return `${prefix}&d&l${guildData.booper} Booped You!`;
    } else {
        return `${prefix}&d&l${guildData.booper} Booped ${name}!`;
    }
}

function resetBoop(prefix, match) {
    guildData.booper = '';
    guildData.booped = '';
}

function formatGuildmateStatus(prefix, match) {
    const [_, guildmateName, status] = match;
    const formattedStatus = status === 'is not'
        ? '&r&ais &c&lOffline'
        : '&r&ais &lOnline';
    return `${prefix}${guildmateName} ${formattedStatus}`;
};
