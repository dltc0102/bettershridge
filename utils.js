let checkingTrigs = [];
/**
 * Registers and unregisters the trigger depending on the result of the checkFunc. Use with render triggers to reduce lag when they are not being used.
 * @param {string} eventName
 * @param {idek} callback
 * @param {() => boolean} checkFunc
 * @returns {Trigger}
 */
export function registerWhen(eventName, callback, checkFunc) {
    const trigger = register(eventName, (...args) => {
        return checkFunc() && callback(...args);
    });
    checkingTrigs.push([trigger, checkFunc]);
    return trigger;
}

register('tick', () => {
    checkingTrigs.forEach(([trigger, func]) =>
        func() ? trigger.register() : trigger.unregister()
    );
});

const timeStore = {};
const Instant = Java.type('java.time.Instant');
export function timeThis(key, callback) {
    return function(...args) {
        const start = Instant.now();
        const result = callback(...args);
        const end = Instant.now();
        timeStore[key] = (timeStore[key] || 0) + (end.getNano() - start.getNano()) + (end.getEpochSecond() - start.getEpochSecond()) * 1000000000;
        return result;
    }
}

function nsToMs(ns) {
    return ns / 1000000;
}

function nsToS(ns) {
    return ns / 1000000000;
}

register('command', () => {
    let currTime = new Date();
    let formattedDate = `${(currTime.getMonth() + 1).toString().padStart(2, '0')}/${currTime.getDate().toString().padStart(2, '0')}/${currTime.getFullYear()} ${currTime.getHours().toString().padStart(2, '0')}:${currTime.getMinutes().toString().padStart(2, '0')}`;
    console.log(formattedDate);
    console.log('');

    Object.entries(timeStore).forEach(([key, value]) => {
        console.log(`${key}: ${value} (${nsToMs(value)}ms || ${nsToS(value)}s)`);

    });
    console.log(' ');
}).setName('logtimestore', true);

// 2+ links         
register('command', () => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rAyaDaSheep:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a74411894a3791569/jnbhf^qoh?fy=7822f5g8&jt=7821a488&in=944b4326373d213bad854fce5g475gcebf2d3gae99382317ge27eda5519e5ff4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7516887882a88361/jnbhf^qoh?fy=78233c88&jt=7821eag8&in=aeg5bf131f8e5c6af5727gabff6319367b81124f8f1315329b➩&r');
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩4bb59afd7d678d&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7517693894226456/jnbhf^qoh?fy=78233d48&jt=7821ebc8&in=78cb48dbcd55b423d9d629eb588bcaddg3b1g85c7be9f46c91➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩593g66382gd67f&)&r')                       
}).setName('bs1');

// 2 links 
register('command', () => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdi➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩nfout/2178616a237255a1343/23a6612241345839619/JNH_3646^kqh?fy=781ff1g3&jt=781e9g83&in=e42bf8b183db7bb39aaf179g656c99f9296fec2172dgbbgda4d6gafc7bbf8418&)&r') 
}).setName('bs2');

register('command', () => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Krill]&f: &rdew: Milo77 — Yesterday at 11:43 PM Hello fishers, I am hereby resigning from GM. I have dedicated a vast portion of my time to the guild over the last 21 months, but no longer. No matter how much work I put in, no matter how much money I sponsor, no mat➩&r')
    ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Krill]&f: &r➩ter how much I try to listen to people and change things, people constantly complain, disagree, cause drama, insult the guild, and leave. I'm tired of doing all this stupid work for ungrateful people who beg to be included in every single event but const➩&r`)
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Krill]&f: &r➩antly rant about how garbage Shrimple is. I am done letting this impact my life and will not be coming back. &r')
}).setName('p1'); 

// link consistency
register('command', () => {
    //* double links -- player, bot -- done
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩6fcf7be4bcc39g&)&r') 

    //* bot talking case -- player talking response no colon
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g6fcf7be4bcc39g&)&r')
}).setName('bs_consistency');        

register('command', () => {
    //* no symbol
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank [to] &rNquek: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&)&r')
}).setName('reply_consistency');     

register('command', () => {
    //* no symbol =- works
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&)&r')

}).setName('player_consistency');       

register('command', () => {
    //* no symbol 
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g6fcf7be4bcc39g&)&r')        
}).setName('bot_consistency');              

register('command', () => {                         
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Shrimple77 &3[Admin]&f: &rbiscuit [to] nqeuk: blah')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Shrimple77 &3[Admin]&f: blah')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Shrimple77 &3[Admin]&f: &rbiscuit: blah')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&3+&b] Pebbles &3[Shrimp]&f: &rwatching a level 346 macro svens&r')
}).setName('testresponse');         

register('command', () => {     
    //* collection w/o continued
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rforaging completion for obiscuit (Coconut): Acacia Wood 9/9 (51,840) Spruce Wood 9/9 (461,058) Jungle Wood 9/9 (157,866) Birch Wood 10/10 (74,146) Oak Wood 9/9 (117,242) Dark Oak Wood 9/9 (909,637)  <@7i0fngd7xpu>&r')

    //* continued coll 1
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rfishing completion for obiscuit (Coconut): Lily Pad 9/9 (1,276,799) Prismarine Shard 5/7 (374,612/400) Ink Sac 9/9 (109,135) Raw Fish 11/11 (4,016,996) Pufferfish 10/10 (828,853) Clownfish 7/9 (271,824/1,600) Raw Salmon 9/9 (1,640,614) Magmafish 12/12 (5➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩,916,806) Prismarine Crystals 7/7 (353,133) Clay 5/6 (20,645/2,500) Sponge 9/9 (215,528)  <@6q6lm3d4zkd>&r')      

    //* continued coll 2
    // ChatLib.simulateChat('&r&2Guild > &6[MVP&c++&6] Baltics &3[Admin]&f: &rfishing completion for aidanqt (Lemon): Lily Pad 9/9 (7,593,848) Prismarine Shard 6/7 (2,750,120/800) Ink Sac 9/9 (461,505) Raw Fish 11/11 (36,266,834) Pufferfish 10/10 (8,203,961) Clownfish 7/9 (2,635,213/1,600) Raw Salmon 9/9 (16,297,443) Magmafish 12/➩&r')
    // ChatLib.simulateChat('&r&2Guild > &6[MVP&c++&6] Baltics &3[Admin]&f: &r➩12 (32,178,320) Prismarine Crystals 7/7 (2,635,963) Clay 5/6 (10,748,507/2,500) Sponge 9/9 (2,009,550)  <@rlm5ilv066o>&r')    
}).setName('testcoll');         

register('command', (event) => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g6fcf7be4bcc39g&)&r')
}).setName('testlink');     