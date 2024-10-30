import PogObject from '../../PogData';  
import { getInHypixel } from '../functions';

export const chatData = new PogObject("bettershridge", {
    inGCChannel: false,
}, './data/chatData.json');
chatData.autosave(5);

//! guild
const guildPointers = [
    /You are now in the GUILD channel/,
    /Guild \> .+/,
];

guildPointers.forEach(pointer => {
    register('chat', (event) => {
        if (!getInHypixel()) return;
        chatData.inGCChannel = true;
    }).setCriteria(pointer);
});

//! not guild
const otherPointers = [
    /You are now in the SKYBLOCK-CO-OP channel/,
    /You are now in the ALL channel/,
    /You are now in the PARTY channel/, 
];

otherPointers.forEach(pointer => {
    register('chat', (event) => {
        if (!getInHypixel()) return;
        chatData.inGCChannel = false;
    }).setCriteria(pointer);
});
