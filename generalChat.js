import { isInHypixel, emojis, hasEmojiPack, stripRank } from './functions.js'

// &r&9Party &8> &b[MVP&c+&b] oBiscuit&f: &rbot&r
register('chat', (stuff, event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);
    const regex = /&r&9Party &8> (.+?): &r(.+)&r/;
    const match = message.match(regex);
    if (!match) return;

    if (match) {
        const [_, rankedName, response] = match;
        const formattedResponse = hasEmojiPack() ? emojis(response) : response;
        const formattedMessage = `&r&9P &8> ${rankedName}&f: &r${formattedResponse}`;
        cancel(event);
        ChatLib.chat(formattedMessage);
    }
}).setCriteria('Party > ${stuff}');

// From DM
register('chat', (name, response, event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);
    const regex = /From (.+?): (.+)/;
    const match = message.match(regex);
    if (match) {
        const [_, sender, res] = match;
        const formattedResponse = hasEmojiPack() ? emojis(res) : res;
        const formattedMessage = `&dFrom ${sender}&7: &7${formattedResponse}`;
        cancel(event);
        ChatLib.chat(formattedMessage);
    }
}).setCriteria('From ${name}: ${response}');

// To DM
register('chat', (name, response, event) => {
    if (!isInHypixel()) return;
    const message = ChatLib.getChatMessage(event, true);
    const regex = /To (.+?): (.+)/;
    const match = message.match(regex);
    if (match) {
        const [_, sender, res] = match;
        const formattedResponse = hasEmojiPack() ? emojis(res) : res;
        const formattedMessage = `&dTo ${sender}&7: &7${formattedResponse}`;
        cancel(event);
        ChatLib.chat(formattedMessage);
    }
}).setCriteria('To ${name}: ${response}');

// All chat
register('chat', (sblvl, name, response, event) => {
    if (!isInHypixel()) return;
    const chatMessage = ChatLib.getChatMessage(event, true);
    const regex = /(&r&8\[&r&\d+&r&8\] &r&[a-z0-9&]+\S+ )(&r&[a-z0-9&]+\[.+?\] .+?): (.+)/;
    const match = chatMessage.match(regex);
    if (!match) return;
    if (match) {
        const [_, playerLevelAndEmblem, rankedName, matchRes] = match;
        const emojifiedResponse = hasEmojiPack() ? emojis(matchRes) : matchRes;
        const strippedName = stripRank(rankedName.removeFormatting().trim());
        const pvClickable = new TextComponent(rankedName)
            .setClick('run_command', `/pv ${strippedName}`)
        const formattedMessage = new Message(
            playerLevelAndEmblem,       
            pvClickable,
            ': ',
            emojifiedResponse
        );
        cancel(event)
        ChatLib.chat(formattedMessage);
    }
}).setCriteria('[${sblvl}] ${name}: ${response}');