const simulate = (str) => ChatLib.simulateChat(str);
const comment = (str) => ChatLib.simulateChat(`&8${str}`);

register('command', () => {
    //! _mayor
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rCurrent mayor: Cole. Next mayor: Unknown, in 5 days and 3 hours. Next special: Jerry, in 2 weeks and 6 days. <@7pm3xbkvigy>&r')

    //! _mayor (specific)
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rJerry is in 1 week and 1 day and 23 hours. <@0ll2sd2wsq9q>&r')

    //! promoted from
    simulate('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &r&6[MVP&r&9++&r&6] Anddru &r&awas promoted from Krill to Crayfish&r&r')

    //! demoted from
    simulate('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &r&6[MVP&r&9++&r&6] Anddru &r&awas demoted from Crayfish to Krill&r&r')
    
    //! role up to date
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rRole is already up to date! Missing 44.94M Fishing XP and 0 Skyblock Levels for Crayfish. <@pcmn6k6n3o>&r')

    //! role does not have the reqs
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rRole does not have the requirements! Missing 44.94M Fishing XP and 0 Skyblock Levels for Crayfish. <@pcmn6k6n3o>&r')

    //! syntax error
    // simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rSyntax: fw <player:[profile|bingo|main]> <@gjzlt0s1p4d>&r')
    // simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rSyntax: <amount>[k|m|b|s] <item name> <@gjzlt0s1p4d>&r')
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rSyntax: bestiary <player:[profile|bingo|main]> <type|mob> <@gjzlt0s1p4d>&r')
    
    //! october specials
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rSpooked demonhunter990! >:) <@vwaws6swopr>&r')
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rAA H! You scared me, demonhunter990! >:) <@vwaws6swopr>&r')

    //! _skill maxed
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rCombat level for tmarrk (Cucumber): 60 | Total XP: 305.957M | Overflow XP: 194.284M <@378cvm01g0d>&r')

    //! _skill in progress
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rFishing level for im_a_squid_kid (Grapes): 47.52 | Total XP: 45.827M | XP for level 48: 1.65M <@378cvm01g0d>&r')

    //! _bz normal
    simulate("&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rBazaar data for Bobbin' Scriptures: insta-buy: 70K, insta-sell: 27.8K <@ijrp1hih4s>&r")

    //! _bz ult
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rBazaar data for Enchantment Ultimate Inferno 1: insta-buy: 11.15M, insta-sell: 7.11M <@bnamohaml77>&r')

    //! _be
    simulate("&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rLord Jawbus data for hotaruwu (Watermelon) k/d (kdr): 845/545 (1.55) <@n2aj1un9mlc>&r")

    //! _command
    simulate('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &rAvailable commands (_command): ah, bazaar, cata, 8ball, election, help, pick, ping, skill, slayer, trophy, contest, fw, fc, is, ib, collection, bestiary, raw, reloadbot, boop, update <@xuif6sextv>&r')

    //! _sticker
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rZatoh:  <Raw Manta Ray>&r')

    //! auction links
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rIGrindDiana [to] Citrus: &r/viewauction 4091b78aab284cdc808cbcd684e9741f&r')
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rIGrindDiana: &r/viewauction 4091b78aab284cdc808cbcd684e9741f&r')

    //! command not help
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rCommand blah not found, try _help&r')

    //! _lbin
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rLowest BIN for Dark Claymore is 169M <@rdewqfd3d29>&r')

    //! _cata
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rCatacombs level for ilmars112 (Mango): 40.74 | Total XP: 62.72M | XP for level 41: 3.84M <@axgt5awmh9b>&r')

    //! dungeon floor
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rM5 data for nqek (Raspberry): Completions: 927 | Fastest time: 00:01:54 | Fastest time (S): 00:02:00 | Fastest time (S+): 00:01:54 <@q3w6zgnx0bc>&r')

    //! slayer
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rEnderman slayer data for ilmars112 (Mango): Total XP: 7.79M | Tier kills: (5 | 51 | 314 | 14862 | 0) <@ozdhyrxvrwf>&r')

    //! _tfish trophy fish
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rTrophy fish for Xusae (Pineapple): Total: 19880 | Bronze: 18/18 | Silver: 18/18 | Gold: 9/18 | Diamond: 7/18 <@3pa4qofddst>&r')

    //! _tfish noobf
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rTrophy fish for Xusae (Pineapple): Total: 19880 (w/o Obf 1) | Bronze: 18/18 | Silver: 18/18 | Gold: 9/18 | Diamond: 7/18 <@3pa4qofddst>&r')

    //! _tfish specific fish
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rKarate Fish caught for stanklin (Cucumber): Total Karate Fish: 81 | Bronze: 56 | Silver: 23 | Gold: 1 | Diamond: 1 <@3pa4qofddst>&r')

    //! _contest next 
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNext contest (cactus, potato, wheat) in 00:21:25. <@619pyn1lhrq>&r')       

    //! _contest (specific crop)
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rNext cactus contest in 02:34:41. <@u39dxpqjcug>&r')

    //! _boop player
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &raltF5qt: _boop oBiscuit <:(&r')
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &raltF5qt: _boop citwus <:(&r')

    //! _boop ''
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &raltF5qt: _boop &r')

    //! booped player
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rBooped oBiscuit! <@tpblghiospn>&r')
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rBooped citwus! <@tpblghiospn>&r')

    //! _fw farming weight
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rFarming weight for ilmars112 (Mango): 1,590.66. Collections (1,590.66): Melon (1,439.37), Cactus (63.97). <@h60x0rdcrjt>&r')

    //! _is instasell price
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rTotal earned from selling 1 Ultimate Bank 5: 5K coins, average price per unit: 5K coins <@uaeirqhu45>&r')

    //! _ib instabuy price
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rTotal cost to buy 1 Enchantment Ultimate Chimera 1: 143.68M coins, average price per unit: 143.68M coins <@ix985g1xfbr>&r')

    //! _coll (w/out continued symbol)
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rforaging completion for obiscuit (Coconut): Acacia Wood 9/9 (51,840) Spruce Wood 9/9 (461,058) Jungle Wood 9/9 (157,866) Birch Wood 10/10 (74,146) Oak Wood 9/9 (117,242) Dark Oak Wood 9/9 (909,637)  <@7i0fngd7xpu>&r')

    //! _coll (w/ continued symbol)
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rfishing completion for obiscuit (Coconut): Lily Pad 9/9 (1,276,799) Prismarine Shard 5/7 (374,612/400) Ink Sac 9/9 (109,135) Raw Fish 11/11 (4,016,996) Pufferfish 10/10 (828,853) Clownfish 7/9 (271,824/1,600) Raw Salmon 9/9 (1,640,614) Magmafish 12/12 (5➩&r')
    simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩,916,806) Prismarine Crystals 7/7 (353,133) Clay 5/6 (20,645/2,500) Sponge 9/9 (215,528)  <@6q6lm3d4zkd>&r')      

    //! _pick
    simulate('&r&2Guild > &b[MVP&c+&b] Baltics &3[Admin]&f: &rI choose ink <@5s5sfzu5gp3>&r')

    //! error
    simulate("&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rCan't message an offline player. <@3j4g7r76gjl>&r")
}).setName('bsbot_simulates');


// //! multi link discordPlayer
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rAyaDaSheep:  [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a74411894a3791569/jnbhf^qoh?fy=7822f5g8&jt=7821a488&in=944b4326373d213bad854fce5g475gcebf2d3gae99382317ge27eda5519e5ff4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7516887882a88361/jnbhf^qoh?fy=78233c88&jt=7821eag8&in=aeg5bf131f8e5c6af5727gabff6319367b81124f8f1315329b➩&r');
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩4bb59afd7d678d&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7517693894226456/jnbhf^qoh?fy=78233d48&jt=7821ebc8&in=78cb48dbcd55b423d9d629eb588bcaddg3b1g85c7be9f46c91➩&r')
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩593g66382gd67f&)&r')   

// //! multi link guildPlayer
// simulate('&r&2Guild > &b[MVP&c+&b] oBiscuit &3[Cray]&f: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a74411894a3791569/jnbhf^qoh?fy=7822f5g8&jt=7821a488&in=944b4326373d213bad854fce5g475gcebf2d3gae99382317ge27eda5519e5ff4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7516887882a88361/jnbhf^qoh?fy=78233c88&jt=7821eag8&in=aeg5bf131f8e5c6af5727gabff6319367b81124f8f1315329b➩&r');
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩4bb59afd7d678d&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7517693894226456/jnbhf^qoh?fy=78233d48&jt=7821ebc8&in=78cb48dbcd55b423d9d629eb588bcaddg3b1g85c7be9f46c91➩&r')
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩593g66382gd67f&)&r')   

// //! multi link reply
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &rAyaDaSheep [to] nquek: [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a74411894a3791569/jnbhf^qoh?fy=7822f5g8&jt=7821a488&in=944b4326373d213bad854fce5g475gcebf2d3gae99382317ge27eda5519e5ff4&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7516887882a88361/jnbhf^qoh?fy=78233c88&jt=7821eag8&in=aeg5bf131f8e5c6af5727gabff6319367b81124f8f1315329b➩&r');
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩4bb59afd7d678d&) [LINK](l$H03|deoejtdpsebqq^dpn/buubdinfout/215953a5457a1187784/23a7517693894226456/jnbhf^qoh?fy=78233d48&jt=7821ebc8&in=78cb48dbcd55b423d9d629eb588bcaddg3b1g85c7be9f46c91➩&r')
// simulate('&r&2Guild > &b[MVP&8+&b] Shrimple77 &3[Admin]&f: &r➩593g66382gd67f&)&r') 