import STuFLib from "../STuFLib";

export function stripRank(name) {
    const rankNameRegex = /\[(?:MVP\+\+|MVP\+|MVP|VIP\+|VIP)\] (\S+)/;
    return name.match(rankNameRegex)?.[1] || name.trim();
};

export function isInHypixel() {
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
        .replace(/ ?days?/g, 'd')
        .replace(/ ?hours?/g, 'h')
        .replace(/ ?months?/g, 'M')
        .replace(/ ?years?/g, 'y')
        .replace(/ ?weeks?/g, 'w');
};

export function formatColonTime(timeStr) {
    const [h, m, s] = timeStr.split(':').map(Number);
    const formatTime = h * 60 + m ? `${h * 60 + m}m ` : '';
    return `${formatTime}${s}s`.trim();
};

export function getMonsterColor(name, bypass=false) {
    const knownMonsters = {
        "Lord Jawbus": '&c',
        "Thunder": '&b',
        "Plhlegblast": "&4",
        "The Sea Emperor": '&e',
        "Carrot King": "&6",
        "Water Hydra": '&9',
        "Great White Shark": '&3',
        "Abyssal Miner": '&2',
        "Grim Reaper": '&5',
        "Phantom Fisher": "&d",
        "Yeti": '&f',
        "Reindrake": "&c",
        "Vanquisher": '&5',
    };

    if (bypass) return name in knownMonsters ? knownMonsters[name] : '&a';
    return name in knownMonsters ? knownMonsters[name] : '&r';
};

export function removeAntiSpamID(msg) {
    return msg ? msg.replace(/<@.+>/g, '') : msg;
};

function dizzyTag(tagRegex, msg) {
    const parts = msg.split('@_@');
    const highlightedParts = parts.map(part => part.replace(tagRegex, tag => `&b${tag}&r`));
    return highlightedParts.join('@_@');
}

export function highlightTags(msg) {
    const tagRegex = /@\w+/g;
    if (Array.isArray(msg)) {
        return msg.map(m => {
            return m.includes('@_@')
                ? dizzyTag(tagRegex, m)
                : m.replace(tagRegex, tag => `&b${tag}&r`);
        });
    } else if (typeof msg === 'string') {
        return msg.includes('@_@')
            ? dizzyTag(tagRegex, msg)
            : msg.replace(tagRegex, tag => `&b${tag}&r`);
    }
}

export function getLastColorCode(message) {
    const firstEmojiIndex = message.search(/:(\w+):/);
    if (firstEmojiIndex === -1) return null;
    const colorCodeRegex = /(&[a-z0-9])/g;
    let lastMatch = '', match;
    while ((match = colorCodeRegex.exec(message.slice(0, firstEmojiIndex))) !== null) {
        lastMatch = match[0];
    }
    return lastMatch;
}

function parseJSON(filename) {
    return JSON.parse(FileLib.read('bettershridge', `/utilities/${filename}`));
};

export function emojis(msg) {
    if (!msg) return msg;

    try {
        const parsedEmojis = parseJSON('emojis.json');
        const emojiRegex = /:\w+:/g;

        const replaceEmojis = (text) => {
            const lastColor = getLastColorCode(text);
            return text.replace(emojiRegex, match => {
                const emoji = parsedEmojis[match];
                return emoji ? `&r${emoji}&r${lastColor}` : match;
            });
        };

        if (Array.isArray(msg)) {
            return msg.map(m => replaceEmojis(m));
        } else if (typeof msg === 'string') {
            return replaceEmojis(msg);
        } else {
            return msg;
        }
    } catch (error) {
        console.error("Error processing emojis:", error);
        return msg;
    }
}

export function stickers(prefix, message) {
    const regex = /<[^>]+>/g; // Updated regex to match tags with spaces
    const matches = message.match(regex);
    if (!matches) return `${prefix}: &r${message}`;
    const stickersData = parseJSON('stickers.json');

    try {
        let replacement = [];
        if (matches) {
            matches.forEach(match => {
                replacement = stickersData[match] || stickersData[match.toLowerCase()] || replacement;
                message = message.replace(match, '');
            });
        }

        let output = `${prefix}: &r${message}`;
        if (replacement.length > 0) replacement.forEach(item => output += `\n     &r${item}`);
        return output;
    } catch (error) {
        console.error(`stickers func()\nerror: ${error}`)
    }
}

export function processMessage(message) {
    const highlighted = highlightTags(message);
    const emojified = emojis(highlighted)
    return emojified;
};

export function hasEmojiPack() {
    return Client.getSettings().getSettings().field_151453_l.includes('biscuitsEmojiPack');
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
    const extensions = ["png", "jpeg", "jpg", "mp4", "mov", "avi"];
    if (link.includes('tenor')) {
        const regex = /https?:\/\/tenor.com\/view\/(.+)-gif.+/;
        const match = link.match(regex);
        return match ? match[1]+'.gif' : '';

    } else if (link.includes('gif') && !link.includes('tenor')) {
        const regex = /https?:\/\/.+\/(.+\.gif)/;
        const match = link.match(regex);
        return match ? match[1] : '';

    } else if (extensions.some(ext => link.toLowerCase().includes(`.${ext}`))) {
        const regex = /https?:\/\/.+\/(.+\.(png|jpeg|jpg|mp4|mov|avi))/;
        const match = link.match(regex);
        return match ? match[1] : '';
    } else {
        return 'link';
    }
};

function getLinkSource(link) {
    let source;
    if (link.includes('youtube') || link.includes('youtu.be')) return 'Youtube';
    if (link.includes('twitch')) return 'Twitch';
    if (link.includes('discord')) return 'Discord';
    if (link.includes('twitter')) return 'Twitter';
    if (link.includes('hypixel')) return 'Hypixel';
    if (link.includes('facebook')) return 'Facebook';
    if (link.includes('instagram')) return 'Instagram';
    if (link.includes('imgur')) return 'Imgur';
    if (link.includes('tenor')) return 'Tenor';
    if (link.includes('regex101')) return 'regex101';
    if (link.includes('chattriggers')) return 'CT';
    const linkRegex = /https?:\/\/(.+)?\.(com|net|org|int|edu|gov|gg)\/.*?/;
    const linkMatch = link.match(linkRegex);                                
    if (linkMatch) {
        const linkSource = linkMatch[1].replace(/\.(com|net|org|int|edu|gov|gg)/g, '').replace(/\w+\./g, '');
        return capitalise(linkSource);
    };
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
    } else if (attachmentName === 'link') {
        linkName = `&b&l[${linkSource} Link]`;
        hoverText = `${link.slice(0, 35)}...`;
    }
    return [linkName, hoverText]
};

export function truncateNumbers(amt, isCoins=false) {
    if (typeof amt === 'string' && amt.includes('/')) return amt;

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
    const source = getLinkSource(link);
    const linkName = source === 'Youtube'
        ? `&e&l[&r&cYouTube Link&r&e&l]`
        : `&b&l[${source} Link]`;

    return new TextComponent(linkName)
        .setClick('open_url', link)
        .setHover('show_text', link.slice(0, 45) + '...')
};

// Credit to @gleb
export const splitMapN = (text, ...splitOpts) => {
    if (splitOpts === undefined || splitOpts.length === 0) return [text];
    const [regex, mapFn] = splitOpts[0];
    return text.split(regex).map((val, idx) => {
        if (idx % 2 === 0) return splitMapN(val, ...splitOpts.slice(1));
        else return mapFn(val);
    }).reduce((acc, val) => {
        if (val instanceof Array) acc.push(...val);
        else acc.push(val);
        return acc;
    }, []);
};

export function isValidColorCode(arg) {
    const invalidArgs = ['&k', '&l', '&m', '&n', '&o'];
    return !invalidArgs.includes(arg);
};


register('command', () => {
    ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDuncan: guys is this a mistake? [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/244419224143111842a/jnbhf^qoh?fy=78a8a91d&jt=78a7579d&in=6f3926e92aaf2cgbb864gcc7b16b284cb9g7c5b2b4cb7d83317edeb97a2gd989&)&r`)
}).setName('discordlinktest');

    register('command', (args) => {
        const isAll = args === 'all';
        const isGC = args === 'general';
        const isBot = args === 'bot';
        const isGuild = args === 'guild';
        const isDiscord = args === 'discord';
        const isReply = args === 'replies';
        const isReplySticker = args === 'replies:sticker'
        const isReplyEmoji = args === 'replies:emoji'
        const isReplyLink = args === 'replies:link'
        const isReplyTag = args === 'replies:highlight'
        const isReplyAll = args === 'replies:all'

        //! generalChat.js
        if (isAll || isGC) ChatLib.simulateChat(`&dFrom &r&b[MVP&r&2+&r&b] Aidanqt&r&7: &r&7:smile: blah :shrug:`) // from general chat w/ emoji
        if (isAll || isGC) ChatLib.simulateChat(`&dTo &r&b[MVP&r&2+&r&b] Aidanqt&r&7: &r&7:smile: blah :shrug:`) // to general chat w/ emoji
        if (isAll || isGC) ChatLib.simulateChat(`&r&9Party &8> &b[MVP&c+&b] oBiscuit&f: &r:smile: blah :shrug:&r`) // party chat w/ emoji

        //! bot messages
        if (isAll || isBot) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rCurrent mayor: Marina. Next mayor: Unknown, in 1 day and 14 hours. Next special: Jerry, in 1 week and 4 days. <@1zefarqfd3w>&r`) // normal and listed
        if (isAll || isBot) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rYes - definitely. <@8hi5z2lbg5n>&r`) // with emoji
        //? formatspooks, syntax errors & errors, _pick messages

        //! guild message
        if (isAll || isGuild) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &bZatoh: &r<Raw Manta Ray>&r`) // sticker
        if (isAll || isGuild) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &bZatoh: &r:shrug: blah  :ShrimpRave:&r`) // emoji
        if (isAll || isGuild) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &bZatoh: &r[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/244419224143111842a/jnbhf^qoh?fy=78a8a91d&jt=78a7579d&in=6f3926e92aaf2cgbb864gcc7b16b284cb9g7c5b2b4cb7d83317edeb97a2gd989&)&r`) // link
        if (isAll || isGuild) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &bZatoh: &rgm shrimple @blah @dog @_@&r`) // highlight tags

        //! discord message
        if (isAll || isDiscord) ChatLib.simulateChat(`&r&2Guild > &6[MVP&4++&6] Mixend &3[Lobter]&f: &r<Raw Manta Ray>&r`) // sticker
        if (isAll || isDiscord) ChatLib.simulateChat(`&r&2Guild > &6[MVP&4++&6] Mixend &3[Lobter]&f: &r:shrug: blah  :ShrimpRave:&r`) // emoji
        if (isAll || isDiscord) ChatLib.simulateChat(`&r&2Guild > &6[MVP&4++&6] Mixend &3[Lobter]&f: &r[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/244419224143111842a/jnbhf^qoh?fy=78a8a91d&jt=78a7579d&in=6f3926e92aaf2cgbb864gcc7b16b284cb9g7c5b2b4cb7d83317edeb97a2gd989&)&r`) // link
        if (isAll || isDiscord) ChatLib.simulateChat(`&r&2Guild > &6[MVP&4++&6] Mixend &3[Lobter]&f: &rgm shrimple @blah @dog @_@&r`) // highlight tags
        if (isAll || isDiscord) ChatLib.simulateChat(`&r&2Guild > &6[MVP&4++&6] Mixend &3[Lobter]&f: &r[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/244419224143111842a/jnbhf^qoh?fy=78a8a91d&jt=78a7579d&in=6f3926e92aaf2cgbb864gcc7b16b284cb9g7c5b2b4cb7d83317edeb97a2gd989&) @car1 @car2 @_@ @car3 <Raw Manta Ray> :ShrimpRave: something :blah:&r`) // all

        //! reply message
        if (isAll || isReply || isReplySticker) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNarga :moyai: [to] :shrimp: Shrimply 8_box: <Relaxolotl>`) // sticker
        if (isAll || isReply || isReplyEmoji) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNarga :moyai: [to] :shrimp: Shrimply 8_box: :100: haha :inq:`) // emoji
        if (isAll || isReply || isReplyLink) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNarga :moyai: [to] :shrimp: Shrimply 8_box: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/244419224143111842a/jnbhf^qoh?fy=78a8a91d&jt=78a7579d&in=6f3926e92aaf2cgbb864gcc7b16b284cb9g7c5b2b4cb7d83317edeb97a2gd989&)`) // link
        if (isAll || isReply || isReplyTag) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNarga :moyai: [to] :shrimp: Shrimply 8_box: @Gnasez @1zez @Mixend @_@ @lol`) // highlight tags
        if (isAll || isReply || isReplyAll) ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNarga :moyai: [to] :shrimp: Shrimply 8_box: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/244419224143111842a/jnbhf^qoh?fy=78a8a91d&jt=78a7579d&in=6f3926e92aaf2cgbb864gcc7b16b284cb9g7c5b2b4cb7d83317edeb97a2gd989&) some crazy shit <Vaquita> :wrongEmoji: :dog~1: @abc @def @ghi @_@ @jklmnop qrstuv wxyz something normal ples`) // all
    }).setName('testbs', true);

//! update reply sender funcs
export function isChineseChar(givChar) {
    const code = givChar.charCodeAt(0);
    if (code >= 0x4E00 && code <= 0x9FFF) return true;                                                  // CJK Unified Ideographs range
    if (code >= 0x3400 && code <= 0x4DBF) return true;                                                  // CJK Unified Ideographs Extension A range
    if (code >= 0x20000 && code <= 0x2A6DF) return true;                                                // CJK Unified Ideographs Extension B range
    if ((code >= 0x2A700 && code <= 0x2B73F) || (code >= 0x2B740 && code <= 0x2B81F)) return true;      // CJK Unified Ideographs Extension C-E range
    return false;
};

export function formatSender(name) {
    if (!name.includes(' ')) return `&a${name}`;
    if (name.includes(' ')) {
        let parts = name.split(' ');
        parts = parts.map(part => isChineseChar(part) ? `&r${part}&a` : `&a${part}`)
        return parts.join(' ');
    };
};
