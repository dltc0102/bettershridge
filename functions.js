import STuFLib from "../STuFLib";

export function stripRank(name) {
    const rankNameRegex = /\[(?:MVP\+\+|MVP\+|MVP|VIP\+|VIP)\] (\S+)/;
    return name.match(rankNameRegex)?.[1] || name.trim();
};

export function stripFormattedName(name) {
    return stripRank(name.removeFormatting());
};

export function getInSkyblock() {
    return (World.isLoaded() && ChatLib.removeFormatting(Scoreboard.getTitle()).includes("SKYBLOCK"));
};

export function getInHypixel() {
    return (World.isLoaded() && Server.getIP().includes('hypixel'));
};

export function capitalise(word) {
    if (word.includes(' ')) {
        return word.split(' ').map(part => capitalise(part.toLowerCase())).join(' ');
    } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
};          

export function formatTime(timeStr) {
    return timeStr
        .replace(/ ?and /g, ' ')
        .replace(/ ?minutes?/g, 'm')
        .replace(/ ?days?/g, 'D')
        .replace(/ ?hours?/g, 'h')
        .replace(/ ?months?/g, 'M')
        .replace(/ ?years?/g, 'Y')
        .replace(/ ?weeks?/g, 'W');
};

export function formatColonTime(timeStr) {
    const [h, m, s] = timeStr.split(':').map(Number);
    const formatTime = h * 60 + m ? `${h * 60 + m}m ` : '';
    return `${formatTime}${s}s`.trim();
};        

const knownMonsters = {
    "Lord Jawbus": '&c',
    "Thunder": '&b',
    "Sea Emperor": '&e',
    "Water Hydra": '&9',
    "Great White Shark": '&3',
    "Abyssal Miner": '&2',
    "Grim Reaper": '&5',
    "Yeti": '&f',
    "Vanquisher": '&5',
};

export function getMonsterColor(name) {
    return name in knownMonsters ? knownMonsters[name] : '&r';  
};

export function removeRandomID(msg) {   
    return msg ? msg.replace(/<@.+>/g, '') : msg;
};

export function highlightTags(message) {
    const tagRegex = /@\w+/g; 
    return message.replace(tagRegex, tag => `&b${tag}&r`);
};

export function formatItemsToTable(items, columns = 2) {
    const result = [];
    const columnWidth = Math.max(...items.map(item => item.length)) + 12;
    for (let i = 0; i < items.length; i += columns) {
        let line = '&2   |  ';
        for (let j = 0; j < columns; j++) {
            let index = i + j;
            if (index < items.length) {
                line += `&a${index + 1}. &f${items[index]}`.padEnd(columnWidth);
            }
        }
        result.push(line.trim());   
    }
    return result;
};

function getAttachmentName(link) {      
    if (link.includes('tenor')) {
        const regex = /https?:\/\/tenor.com\/view\/(.+)-gif.+/;
        const match = link.match(regex);
        return match ? match[1]+'.gif' : '';

    } else if (link.includes('gif') && !link.includes('tenor')) {
        const regex = /https?:\/\/.+\/(.+\.gif)/;
        const match = link.match(regex);
        return match ? match[1] : '';

    } else {
        const regex = /https?:\/\/.+\/(.+\.(png|jpeg|jpg|mp4|mov|avi))/;
        const match = link.match(regex);
        return match ? match[1] : '';
    }
};

function getLinkSource(link) {
    let source;
    if (link.includes('youtube') || link.includes('youtu.be')) source = 'Youtube';
    if (link.includes('twitch')) source = 'Twitch';
    if (link.includes('discord')) source = 'Discord';
    if (link.includes('twitter')) source = 'Twitter';
    if (link.includes('hypixel')) source = 'Hypixel';
    if (link.includes('facebook')) source = 'Facebook';
    if (link.includes('imgur')) source = 'Imgur';
    if (link.includes('tenor')) source = 'Tenor';
    return source;  
};

function getComponentParts(link) {
    let linkName, hoverText;
    const imageSuffixes = ['jpeg', 'jpg', 'png'];
    const videoSuffixes = ['mp4', 'mov', 'avi'];
    const attachmentName = getAttachmentName(link);
    const linkSource = getLinkSource(link);

    if (imageSuffixes.some(suffix => link.includes(suffix))) {
        linkName = `&b&l[${linkSource} Image]`;
        hoverText = attachmentName;        

    } else if (videoSuffixes.some(suffix => link.includes(suffix))) {
        linkName = '&e&l[CLICK TO VIEW VIDEO]';
        hoverText = attachmentName;
    
    } else if (link.includes('gif')) {
        linkName =  `&b&l[${linkSource} Gif]`;
        hoverText = attachmentName;
        
    }
    return [linkName, hoverText]
};

export function truncateNumbers(amt, isCoins=false) { 
    const cost = Number(amt.toString().replace(/,/g, ''));
    const formatNumber = (num) => {
        const fixedNum = num.toFixed(2);
        return fixedNum.endsWith('.00') ? num.toFixed(0) : fixedNum;
    };

    switch (true) {
        case cost >= 1_000_000_000_000:
            return formatNumber(cost / 1_000_000_000_000) + 'T';
        case cost >= 1_000_000_000:
            return formatNumber(cost / 1_000_000_000) + 'B';
        case cost >= 1_000_000:
            return formatNumber(cost / 1_000_000) + 'M';
        case cost >= 1_000:
            return formatNumber(cost / 1_000) + 'K';
        case cost !== 1 && cost < 1_000:
            return isCoins 
                ? `${cost.toString()} coins` 
                : cost.toString();
        default:
            return isCoins 
                ? `${cost.toString()} coin` 
                : cost.toString();
    }
};

function isLinkExpired(link) {
    const regex = /ex=([0-9a-fA-F]+)/;
    const match = link.match(regex);
    if (match) {
        const [_, expiryHex] = match;
        const expiryTime = parseInt(expiryHex, 16);
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime > expiryTime;
    } else if (!match && !link.includes('viewauction')) {
        return false;
    } else if (link.includes('viewauction')) {
        return 'auction link';
    }
};

export function hoverableStufLink(link) {
    const decodedLink = STuFLib.decode(link);
    const checkExpired = isLinkExpired(decodedLink);
    const [linkName, hoverText] = getComponentParts(decodedLink);
    return checkExpired 
        ? '&b<link expired> '
        : new TextComponent(`${linkName}`)       
            .setClick('open_url', decodedLink)      
            .setHover('show_text', hoverText);
};

export function hoverableAhLink(msg) {
    const link = `/viewauction ${msg}`;
    return new TextComponent(`&e&l[VIEW AUCTION]`)
        .setClick('run_command', link)
        .setHover('show_text', link);
};

export function hoverableWebLink(link) {
    return new TextComponent(`&e&l[&r&cYouTube Link&r&e&l]`)
        .setClick('open_url', link)
        .setHover('show_text', link.slice(0, 45) + '...')
};

// Credit to @gleb
// splitOpts is a list of [splitRegex, mapFunction]
export const splitMapN = (text, ...splitOpts) => {
    // Base case: no split options, equivalent to text.split()
    if (splitOpts === undefined || splitOpts.length === 0) return [text];
    const [regex, mapFn] = splitOpts[0];
    // flatMap because the recursive splitMapN returns a list
    return text.split(regex).map((val, idx) => {
        // This is remaining text, continue to call splitMapN on it with the remaining options.
        if (idx % 2 === 0) return splitMapN(val, ...splitOpts.slice(1));
        // This is the text matched by the split regex, use mapFn on it.
        else return mapFn(val);
    }).reduce((acc, val) => {
        if (val instanceof Array) acc.push(...val);
        else acc.push(val);
        return acc;
    }, []);
}           