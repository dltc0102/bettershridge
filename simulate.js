function simulate(msg) { return ChatLib.simulateChat(`${RP_MSG_PREFIX}  ${msg}&r`); };   
function commentate(msg) { return ChatLib.simulateChat(`//? &7${msg}`); };

const BOT_MSG_PREFIX = `&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r`;
const DP_MSG_PREFIX = `&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &roBiscuit: &r`;
const GP_MSG_PREFIX = `&r&2Guild > &b[MVP&c+&b] oBiscuit &3[Cray]&f: &r`;
const RP_MSG_PREFIX = `&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &roBiscuit [to] Aidanqt: &r`;

// bot messages
register('command', () => {
    //* mayor message
    simulate(`Current mayor: Diana. Next mayor: Paul, in 1 day and 20 hours. Next special: Jerry, in 3 weeks and 6 days. <@u5qi1on91uk>`)

    //* mayor picked message
    simulate(`Derpy is in 2 months and 5 days and 10 hours. <@7a7rhuknim5>`)

    //* promoted from
    simulate(`&r&6[MVP&r&9++&r&6] Anddru &r&awas promoted from Krill to Crayfish`);

    //* demoted from
    simulate(`&r&6[MVP&r&9++&r&6] Anddru &r&awas demoted from Crayfish to Krill`)

    //* role up to date
    simulate(`Role is already up to date! Missing 49.3M Fishing XP and 4 Skyblock Levels for Lobter. <@ldbqwlt0b6>`)

    //* role does not have the requirements (your)
    simulate(`Your role does not have requirements! But you are Missing 61.3M Fishing XP and 2 Skyblock Levels for Shrimp. <@ldbqwlt0b6>`)  

    //* role does not have the requirements
    simulate(`Role does not have requirements! But you are Missing 61.3M Fishing XP and 2 Skyblock Levels for Shrimp. <@ldbqwlt0b6>`)

    //* skill maxed
    simulate(`Farming level for ayosiri (Coconut): 60 | Total XP: 593.937M | Overflow XP: 482.265M <@9g303ohhq9>`)

    //* skill progress
    simulate(`Foraging level for obiscuit (Coconut): 33.16 | Total XP: 12.484M | XP for level 34: 1.34M <@ph5luxsf4bd>`)

    //* bz
    simulate(`Bazaar data for Bobbin' Scriptures: insta-buy: 70K, insta-sell: 27.8K <@ijrp1hih4s>`);
    simulate(`Bazaar data for Enchantment Ultimate Inferno 1: insta-buy: 11.15M, insta-sell: 7.11M <@bnamohaml77>`);

    //* bestiary
    simulate(`Lord Jawbus data for hotaruwu (Watermelon) k/d (kdr): 845/545 (1.55) <@n2aj1un9mlc>`)

    //* command help
    simulate(`Available commands (_command): lbin, bz, cata, 8ball, election, help, pick, ping, skill, slayer, tfish, contest, fw, fc, is, ib, collection, be, raw, rlb, boop, boo, update <@px5sot5lvqq>`)

    //* syntax error
    simulate(`⚠ Usage: _skill <player:[profile|bingo|main]> <skill> <@eiad5y5lour>`)
    simulate(`⚠ Usage: _ib <amount>[k|m|b|s] <item name> <@0fvpzhzh5fsh>`)
    simulate(`⚠ Usage: _cata <player:[profile|bingo|main]> [class|f[0-7]|m[1-7]] <@pkkz7esxe2d>`)

    //* sticker
    
    //* october specials
    simulate(`Spooked demonhunter990! >:) <@4ir2f08o5f8>`)
    simulate(`AAH! You scared me, demonhunter990! >:) <@4ir2f08o5f8>`)

    //* command not found
    simulate(`Command blah not found, try _help`)

    //* lbin
    simulate(`Lowest BIN for Dark Claymore is 169M <@rdewqfd3d29>`)        

    //* cata
    simulate(`Catacombs level for ilmars112 (Mango): 40.74 | Total XP: 62.72M | XP for level 41: 3.84M <@axgt5awmh9b>`)

    //* cata floor
    simulate(`M5 data for nqek (Raspberry): Completions: 927 | Fastest time: 00:01:54 | Fastest time (S): 00:02:00 | Fastest time (S+): 00:01:54 <@q3w6zgnx0bc>`)

    //* slayer
    simulate(`Zombie slayer data for Xusae (Pineapple): Total XP: 48.41M | Tier kills: (10 | 29 | 208 | 245 | 29758) <@jelbx0gi8pc>`)

    //* tfish trophy fish
    simulate(`Trophy fish for Xusae (Pineapple): Total: 19880 | Bronze: 18/18 | Silver: 18/18 | Gold: 9/18 | Diamond: 7/18 <@3pa4qofddst>`)

    //* tfish vanille fish (specific)
    simulate(`Vanille caught for obiscuit (Coconut): Total Vanille: 55 | Bronze: 43 | Silver: 10 | Gold: 2 | Diamond: 0 <@5b97rgeq81g>`)

    //* tfish noobf
    simulate(`Trophy fish for Xusae (Pineapple): Total: 19880 (w/o Obf 1) | Bronze: 18/18 | Silver: 18/18 | Gold: 9/18 | Diamond: 7/18 <@3pa4qofddst>`)

    //* contest next
    simulate(`Next contest (cactus, mushroom, pumpkin) in 00:37:47. <@dptz9usfvs>`)

    //* contest active
    simulate(`Active contest (carrot, melon, wheat) ending in 00:11:55! Next contest (cactus, carrot, wheat) in 00:51:55. <@81g1hrkc9em>`)

    //* contest specific
    simulate(`Next wheat contest in 01:35:56. <@govhcsa00ae>`)

    //* boop    
    simulate(`altF5qt: _boop citwus <:(`)
    simulate(`altF5qt: _boop oBiscuit <:(`)

    //* booped
    simulate(`Booped citwus! <@tpblghiospn>&r`)
    simulate(`Booped oBiscuit! <@tpblghiospn>&r`)

    //* farming weight
    simulate(`Farming weight for ilmars112 (Mango): 1,590.66. Collections (1,590.66): Melon (1,439.37), Cactus (63.97). <@h60x0rdcrjt>`);

    //* insta buy
    simulate(`Total cost to buy 1 Enchantment Ultimate Chimera 1: 143.68M coins, average price per unit: 143.68M coins <@ix985g1xfbr>`)

    //* insta sell
    simulate(`Total earned from selling 1 Ultimate Bank 5: 5K coins, average price per unit: 5K coins <@uaeirqhu45>`)

    //! collection
    //* not continued
    simulate(`foraging completion for obiscuit (Coconut): Acacia Wood 9/9 (51,840) Spruce Wood 9/9 (461,058) Jungle Wood 9/9 (157,866) Birch Wood 10/10 (74,146) Oak Wood 9/9 (117,242) Dark Oak Wood 9/9 (909,637)  <@7i0fngd7xpu>`)

    //* continued
    simulate('fishing completion for obiscuit (Coconut): Lily Pad 9/9 (1,276,799) Prismarine Shard 5/7 (374,612/400) Ink Sac 9/9 (109,135) Raw Fish 11/11 (4,016,996) Pufferfish 10/10 (828,853) Clownfish 7/9 (271,824/1,600) Raw Salmon 9/9 (1,640,614) Magmafish 12/12 (5➩')
    simulate('➩,916,806) Prismarine Crystals 7/7 (353,133) Clay 5/6 (20,645/2,500) Sponge 9/9 (215,528)  <@6q6lm3d4zkd>')    

    //* pick
    simulate('I choose ink <@5s5sfzu5gp3>')

    //* misc data for
    simulate(`Gold Ingot data for obiscuit (Coconut): 9/9 (68,084,463) <@1s1hcum74bp>`)

    //* errors
    simulate(`⚠ Spam protection moment <@5s5sfzu5gp3>`)

    //* normal bot message
    simulate('a normal bot message <@5s5sfzu5gp3>')
    
}).setName('check_bettershridge_bot_messages');

// discord player messages
register('command', () => {
    //* one link
    simulate(`[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&)`)

    //* one link with variety
    simulate(`@Nquek [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&) dafsdfadf`)

    //* multi links with variety
    simulate(`@oBiscuit [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95➩`)
    ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩62314551886352/jnbhf^qoh?fy=782aad7b&jt=78295bfb&in=376f855ae35f6c96fb7dfa49aaacc25117689a6ca91242875e5d157b1b3e1g74&) hahaha`)

    //* viewauction links
    simulate(`/viewauction 34ae8d0fb04947568220d9109da00d23`)

    //* viewauction links with variety
    simulate(`@watas haha /viewauction 34ae8d0fb04947568220d9109da00d23 adfasdf`)

    //* http links
    simulate(`https://www.youtube.com/watch?v=ZxdVty0lXFk&list=RDZxdVty0lXFk&start_radio=1`)

    //* http links with variety
    simulate(`listen https://www.youtube.com/watch?v=ZxdVty0lXFk&list=RDZxdVty0lXFk&start_radio=1 @lol`)

    //* normal message
    simulate(` a normal dp message`)        
}).setName('check_bettershridge_dp_messages');

// guild player messages
register('command', () => {
    //* one link
    simulate(`[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&)`)

    //* one link with variety
    simulate(`@Nquek [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&) dafsdfadf`)

    //* multi links with variety
    simulate(`@oBiscuit [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95➩`)
    ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩62314551886352/jnbhf^qoh?fy=782aad7b&jt=78295bfb&in=376f855ae35f6c96fb7dfa49aaacc25117689a6ca91242875e5d157b1b3e1g74&) hahaha`)

    //* viewauction links
    simulate(`/viewauction 34ae8d0fb04947568220d9109da00d23`)

    //* viewauction links with variety
    simulate(`@watas haha /viewauction 34ae8d0fb04947568220d9109da00d23 adfasdf`)

    //* http links
    simulate(`https://www.youtube.com/watch?v=ZxdVty0lXFk&list=RDZxdVty0lXFk&start_radio=1`)

    //* http links with variety
    simulate(`listen https://www.youtube.com/watch?v=ZxdVty0lXFk&list=RDZxdVty0lXFk&start_radio=1 @lol`)

    //* normal message
    simulate(` a normal gp message`)            
}).setName('check_bettershridge_gp_messages');

// reply messages
register('command', () => {
    //* one link
    simulate(`[LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&)`)

    //* one link with variety
    simulate(`@Nquek [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&) dafsdfadf`)

    //* multi links with variety
    simulate(`@oBiscuit [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95618a4138aa4771/jnbhf^qoh?fy=782aad1a&jt=78295b9a&in=15g6ba975a5c5f37f4g24323adea8352f216aedag18e5e5ceg9991e64e5d831b&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/23a4382a88986976781/23a95➩`)
    ChatLib.simulateChat(`&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩62314551886352/jnbhf^qoh?fy=782aad7b&jt=78295bfb&in=376f855ae35f6c96fb7dfa49aaacc25117689a6ca91242875e5d157b1b3e1g74&) hahaha`)

    //* viewauction links
    simulate(`/viewauction 34ae8d0fb04947568220d9109da00d23`)

    //* viewauction links with variety
    simulate(`@watas haha /viewauction 34ae8d0fb04947568220d9109da00d23 adfasdf`)

    //* http links
    simulate(`https://www.youtube.com/watch?v=ZxdVty0lXFk&list=RDZxdVty0lXFk&start_radio=1`)

    //* http links with variety
    simulate(`listen https://www.youtube.com/watch?v=ZxdVty0lXFk&list=RDZxdVty0lXFk&start_radio=1 @lol`)

    //* normal message
    simulate(` a normal reply message`)            
}).setName('check_bettershridge_reply_messages');
