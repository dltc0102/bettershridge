// Referenced: Module GuildMemberOrganizer
// Create a nicer g list that also works with guild best system

import { isInHypixel } from "./functions.js"

/**
 * Rank weight system: Assigns numerical weight to ranks for sorting.
 * @param {String} entry
 * @returns Number between 0-5 exclusively for their respective rank weights.
 */
function getRankWeight(entry) {
    if (entry.match(/MVP.{4}\+\+/)) return 5
    if (entry.match(/MVP.{4}\+/)) return 4
    if (entry.match(/MVP/)) return 3
    if (entry.match(/VIP.{4}\+/)) return 2
    if (entry.match(/VIP/)) return 1
    return 0
};

function measureUnformatted(msg) {
    return Renderer.getStringWidth(ChatLib.removeFormatting(msg));
}

function rearrangeEntryParts(entry) {
    parts = entry.split(' ');
    if (parts.length == 2) {
      const statusColor = parts[0].substring(parts[0].length - 4)
      return `${statusColor}● ${parts[0]}`;
    }
    if (parts.length == 3) {
      const statusColor = parts[1].substring(parts[1].length - 4)
      return `${statusColor}● ${parts[0]} ${parts[1]}`;
    }
    return entry;
  }

function alignEntry(longest, entry) {
    let str = entry;
    let boldBonus = 0;
    while (longest > (measureUnformatted(str) + boldBonus)) {
        if ((longest - (measureUnformatted(str) + boldBonus)) % 4 != 0) {
            str += '&l &r';
            boldBonus += 1;
        } else {
            str += ' ';
        }
    }
    return str;
}
  
function sortEntry(e1, e2) {
    e1RankWeight = getRankWeight(e1);
    e2RankWeight = getRankWeight(e2);

    if (e1RankWeight > e2RankWeight) return -1;
    if (e2RankWeight > e1RankWeight) return 1;

    return ChatLib.removeFormatting(e1).toLowerCase()
        .localeCompare(
            ChatLib.removeFormatting(e2).toLowerCase()
        );
};

const newGList = {
    'line': ChatLib.getChatBreak('&b&m-'),
    'newLines': [],
}

register('chat', (event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);  
    const entries = message.split(/\s{2}/).filter(c => c.match(/●/));
    if (!entries.length > 0) return;
    console.log(message);                         
    cancel(event);  
});

// for some reason, this regex doesnt work but separating each of them does... :/
//* /-- (Guild Master|Admin|Lobster|Shrimp|Crayfish|Krill) --/,

const guildListTitles = [
    /Total Members: /,
    /Online Members: /,
    /Offline Members: /,
    /Guild Name: Shrimple/,
    /-- Guild Master --/,
    /-- Admin --/,
    /-- Lobster --/,
    /-- Shrimp --/,
    /-- Crayfish --/,
    /-- Krill --/,
];

guildListTitles.forEach(element => {
    register('chat', (event) => {
        if (!isInHypixel()) return;
        if (/Guild Name: Shrimple/.test(element)) {
            // ChatLib.chat(`&6Guild Name: Shrimple`);
            newGList.newLines.push(`&6Guild Name: Shrimple`);
        }   
        if (/-- .+ --/.test(element)) {
            ChatLib.chat(ChatLib.getCenteredText(`&a${element.toString().replace(/\//g, '')}`));
            newGList.newLines.push(ChatLib.getCenteredText(`&a${element}`));
        }
        cancel(event);
    }).setCriteria(element).setContains();
});