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
//! only shows 1 link
register('command', () => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rAyaDaSheep:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a65aa5a1637216851/JNH_31352125_344166^kqh?fy=781feg7c&jt=781e9efc&in=593dd25bbgd7b761625ba2ce6294ec3f33c18e436673672fd48e36e894b65b3a&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfo➩&r');
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩ut/2178616a237255a1343/23a65aa5a211942a63a/JNH_31352125_344227^kqh?fy=781feg7c&jt=781e9efc&in=4c3f723a6d948c22ge4ef8ggdc31effb6g727ggeef842b66dg996559a3fc61e4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a65aa5a2518151623/JNH_313521➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩25_344323^kqh?fy=781feg7c&jt=781e9efc&in=99346118f34549a2158d67d8225g72ff88b6528a6a6ccee8f61a9cca6ad4ca15&)&r')  
}).setName('bs1');

// 2 links 
//* works
register('command', () => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdi➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩nfout/2178616a237255a1343/23a6612241345839619/JNH_3646^kqh?fy=781ff1g3&jt=781e9g83&in=e42bf8b183db7bb39aaf179g656c99f9296fec2172dgbbgda4d6gafc7bbf8418&)&r') 
}).setName('bs2');

// link consistency
register('command', () => {
    //* double links -- player, bot -- done
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩6fcf7be4bcc39g&)&r') 

    //* bot talking case -- player talking response no colon
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g6fcf7be4bcc39g&)&r')

    //* bot talking case -- bot , bot
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a2762a4a9285a3642/23a66795336aa766575/jnbhf^qoh?fy=781g2gaf&jt=781edf2f&in=cc65a397a3d7a693cec2b9f8b21f67ab44fc69gcc23958cg6e➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &r➩agcefc16ce943d&)&r')

    //* reply case -- reply response no link
    ChatLib.simulateChat('&r&2Guild > &6[MVP&c++&6] Baltics &3[Admin]&f: &rIGrindDiana [to] Citrus: &r[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a2762a4a9285a3642/23a66795336aa766575/jnbhf^qoh?fy=781g2gaf&jt=781edf2f&in=cc65a397a3d7a693cec2b9f8b21f67ab44fc69gcc23958cg6eagcefc16ce943d&)&r')

    //* reply case -- reply response -- reply, reply
    ChatLib.simulateChat('&r&2Guild > &6[MVP&c++&6] Baltics &3[Admin]&f: &rIGrindDiana [to] Citrus: &r[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a2762a4a9285a3642/23a6679935612a38a57/jnbhf^qoh?fy=781g2ggf&jt=781edf8f&in=463f23bc3c675668a353e32f24a665cd8f3d46d43c3ad1997c➩&r')
    ChatLib.simulateChat(`&r&2Guild > &6[MVP&c++&6] Baltics &3[Admin]&f: &rIGrindDiana [to] Citrus: &r➩fe72eb2cec81f3&)&r`)

    //* player case
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &rKraff Nof:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a2762a4a9285a3642/23a6679935612a38a57/jnbhf^qoh?fy=781g2ggf&jt=781edf8f&in=463f23bc3c675668a353e32f24a665cd8f3d46d43c3ad1997cfe72eb2cec81f3&)')       
    
    //* playercase 2 parts -- player, player
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &rKraff Nof:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a2762a4a9285a3642/23a667a146a98235366/jnbhf^qoh?fy=781g3141&jt=781edfc1&in=667d47a15ff9fbc2g32ca6135c6b6ae6bgc34b6df914bddg7a➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &rKraff Nof: &r➩fccg36fg1g823f&)&r')   
}).setName('bs_consistency');       


register('command', () => {
    //* no symbol
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank [to] &rNquek: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&)&r')

    //* continued 1 link
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank [to] &rNquek: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank [to] &rNquek: &r➩g4ac79df2791e7ebda4c361257&)&r')

    //* continued multiple links (2 links)
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank [to] &rNquek: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdi➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank [to] &rNquek: &r➩nfout/2178616a237255a1343/23a6612241345839619/JNH_3646^kqh?fy=781ff1g3&jt=781e9g83&in=e42bf8b183db7bb39aaf179g656c99f9296fec2172dgbbgda4d6gafc7bbf8418&)&r') 
}).setName('reply_consistency');     

register('command', () => {
    //* no symbol =- works
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: Much more normal see [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&)&r')

    //* continued 1 link - dank: 
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: &r➩g4ac79df2791e7ebda4c361257&)&r')

    //* continued multiple links (2 links)
    // player talking response: encoded link -- has symbols -- p1
    // player talking response: encoded link -- has symbols -- p2
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdi➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: &r➩nfout/2178616a237255a1343/23a6612241345839619/JNH_3646^kqh?fy=781ff1g3&jt=781e9g83&in=e42bf8b183db7bb39aaf179g656c99f9296fec2172dgbbgda4d6gafc7bbf8418&)&r') 
}).setName('player_consistency');   

register('command', () => {
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rDank: &r➩g4ac79df2791e7ebda4c361257&)&r')
}).setName('player1');

register('command', () => {
    //* no symbol 
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/838817366167a72839/23a6642373233a33146/jnbhf^qoh?fy=781fge13&jt=781ebc93&in=3acd5c9d246267f75e2a62a478g58de3e78d186d6b2g1f2b8g6fcf7be4bcc39g&)&r')        

    //* continued 1 link - dank: 
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f:  &r➩g4ac79df2791e7ebda4c361257&)&r')

    //* continued multiple links (2 links)
    // player talking response: encoded link -- has symbols -- p1
    // player talking response: encoded link -- has symbols -- p2
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/2178616a237255a1343/23a66122398987a4689/JNH_3647^kqh?fy=781ff1g3&jt=781e9g83&in=6b335af55c1fee49f3e5cd1a85765743cfaf58g4ac79df2791e7ebda4c361257&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdi➩&r')
    ChatLib.simulateChat('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f:  &r➩nfout/2178616a237255a1343/23a6612241345839619/JNH_3646^kqh?fy=781ff1g3&jt=781e9g83&in=e42bf8b183db7bb39aaf179g656c99f9296fec2172dgbbgda4d6gafc7bbf8418&)&r') 
}).setName('bot_consistency');              