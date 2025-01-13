# v0.1
Formats Bot & Guild chat messages, including _bz, _mayor, _skill, _be, _lbin, _tfish, stickers in discord, @ tags, replies

WIP: _cata, _slayer, _contest, _fw, _fc, _is, _ib, _collection, _raw

# v0.2
- added viewauction link messages
- added in _cata, _slayer, _contest, _fw (farming weight), _is (insta-sell), _ib (insta-buy), _collection for items, and removed _raw (cuz no need)
- improved consistency of messages
- allowed multiple tags to be higlighted:
    e.g: '@name1 @name2 blah blah blah'
    before: only @name1 was highlighted
    after: all that start with @ are highlighted.

WIP: _collection for skills, view website links

# v0.3
- made the project a bit more efficient and easier to add new things

# v0.4
- put highlight tags at post-processing of message formatting
- added support for viewing links with a [CLICK] thing
- fixed slayer names for format color codes

# v0.5
+ added support for _collection (fishing/mining/combat/foraging/farming) commands
+ added support for _boop commands
+ added support to render images using patcher's renderer for images using discord/imgur links if passed in from bot
+ tried to structure imports and code better
+ removed 'Ult' suffix from _bz formatted messages
+ refactored auction links
+ refactored website clickables, will show '<link expired>' if link is expired.

WIP: add support to render :(blah): custom discord emotes for shrimple
WIP: make gui and customizable settings (not sure if needed)

# v0.6
+ added support for viewauction links for more message cases
+ added support for patcher image links for more message cases

# v0.7 + v0.8 = v1.0
+ fixed some miscorrect matches
+ added support for _mayor (certain mayor) command
+ made bot answer for _pick clearer
+ added fix for _boop edge cases
+ added support for _command
+ added load message
+ updated colors for skills and collections from bot messages
+ added support for newly implemented stuf_links! (embedded links and normal links)
+ added support for 'reply' guild messages for discord names with special characters in them
+ added support for general 'tfish' command messages
+ updated _mayor (certain mayor) regex
+ fixed _help list
+ allowed messages before and after links to be included in formatted message too

WIP: gifs

# v1.1
+ added support for any bot name for shridge/pridge
+ added support for _tfish noobf command
+ added formatting to syntax errors (hover details for instabuy/instasell commands)
+ fixed greedy regex for 'player talking response'
+ updated formatLbin() func to format words nicer
+ updated createMessage() func
+ fix highlighting with encoded link messages
+ added formatting for promotion/demotion messages
+ Added source to links
+ added formatting to october special ('bo      o') command messages
+ added formatting for tfishi (w/o obf 1) messages

TEST: commented out patcher/discord images/websites related code (works without)

# v1.2
+ made formatting error messages more flexible
+ role updated missing conditions are formatted now
+ tenor gifs are now their own nam  e ex. [Tenor Gif]
+ hover text for images and gifs and videos alike have the 'imagename.suffix' format
+ changed command player names to have yellow color for clarity
+ fixed _help command having a 24th 'undefined' command
+ fixed mayor colors for _mayor command
+ removed all traces of 'stripColors' function xd

# v1.3
Main Changes:
+ added bot commands for if theres a new name for the bot
+ restructured code to be more flexible (structure was hindering the management of multi-continuous chat messages and multi-link messages)
+ updated error messages with new warning prefix
+ changed regchats to work outside of skyblock as long as you're on hypixel
+ reformatted a lot of code (most notably role updates, contest messages, collection messages)
+ stopped constant addons of a bot that is already in bot list

Minor Changes:
+ updated formatTime() func to have flexibility for mayor picked cmd
+ updated link names for discord gifs to work like previews
+ changed bestiary color for Abyssal Miner to dark green
+ changed taming color for _skill bridge command to 'pink'
+ changed gameload message
+ changed formatting for _be command to include 'k/d'
+ added formatting to 'Your role does not have requirements!'
+ fixed _tfish command for noobf and general

WIP: dynamic botName recognition (detects if there seems to be a new bot in town for bridge)

# v1.4
+ added format for miscellaneous data for responses
+ added color for 'Vanquisher' in _be command responses
+ reformatted functions to be even more flexible for edge cases
+ readded formatting for normal non-stuf links

# v1.5
+ hides messages if they are forwarded (where the message is blank)
+ completely refactored multi link messages for variety and changes (credits to gleb)
+ removed unused functions
+ added /setguildprefix commands
+ added /setbotprefix and /setbridgeprefix commands
+ added /resetprefix (bot/bridge/guild/none) command
    Note: /resetprefix without any arguments resets both guild & bridge prefixes with a confirmation message.
+ dynamic bot updater
+ adds formatting for _gonline command
+ changed instabuy command formatting mistake from 'sell cost' to 'buy cost'

# v1.6
+ fixed prefixes only working for bot commands
+ fixed player1 booped player2 messages
+ added formatting for new mayor command's formats (minister and perks in hoverables)
+ added arrow prefix changer (/setarrowprefix)
+ added support for directional discord links
+ make bestiary categories &6 if number is /0
+ fix undefined names for _be and _coll commands
+ add a /bettershridge (aliases: /bshelp, /bs) command for command help list
+ Added commands for the guild best friend system
WIP: /gb online to see best friends in guild that are online
WIP: [paste to chat]

# v1.7.1
= renamed func name 'getInHypixel' to 'isInHypixel'
= renamed func name 'removeRandomID' to 'removeAntiSpamID'
= renamed func name 'separatePlayerAndMessage' to 'sortMessageByType'
= changed func truncateNumbers(...) to return input if input is a string that contains '/' - in the case when api doesn't recognise a collection/bestiary being maxed
= added glist.js to parse guild lists and reformat them based on type of command.
= names that appear in replies on bridge, if in the guild best list, will be set to best color
= removed unused/unneccessary comments
= added /setreplyprefix
= added Rainbow Colors using '[rb]' or '&z'
= removed useless functions like 'stripFormattedName'
= added [empty] for if anyone wants to set their prefix as empty :: Usage: /setarrowprefix [empty]
= removed double space between bot/guild prefix and message if arrow prefix is empty

TODO:
+ new helper module: interface for making your own prefix with color picking
+ new g list
+ /gb online to see best friends in guild that are online



