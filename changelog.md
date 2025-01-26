# Changelog

All notable changes to this project will be documented in this file.
Link to the github for this project. [Github](https://github.com/dltc0102/bettershridge)

## [Unreleased]

? see if I can isolate args like 'online' and 'list' from hypixel's '/guild' command while retaining it's original use
- any new stickers/emotes from shrimple or from suggestions
- slow animations of gifs if possible
- soundmoji from discord beta
- remove kerning between unicode-used characters to make the 'sticker' look better without grids



## [0.6.0]

### Added

- Added support for emojis and stickers
- Implemented emojis in some bot messages (only if user has texturepack installed)
- Added prompts for if player sets prefix with invalid color code or without color codes

### Changed

- Added '.gg' as a website domain option for getLinkSource()
- Updated regex for getGuildResponse types: promoted, demoted, noReqUpdate
- Made 'thanks for the boop' messages go to 'gc' instead of 'cc'
- Made party list visible even with guild-best list cancelling out members from /guild list command
- If the prefixes (bot/guild/arrow/reply) contain a rainbow prefix, replace it with '&6' (gold) if player is not in skyblock.
  (Currently the rainbow-ed area when player is not in skyblock will show a default WHITE)
- Made the output of \_help command neater

### Fixed

- Fixed double spaces between prefix and message when arrow prefix is [empty]
- Fixed moduleversion being undefined because of usage before naming
- Fixed \_be command having a extra line of spacing when there are any rare mobs for separation

### Removed

- resetBoop
- /dontshowgb command
  Reason: It was too niche to be used frequently, and most people rather leave it on.



## [0.5.0] - 2025-01-19

### Added

- Feature: /gsearch (queryName) -- to search for names specifically in the guild
- Feature: /gb online
- Feature: When player is booped, you will send a 'Thanks for the Boop, player\_who\_booped\_you!' message.
(There's also a toggle for this if you don't want this - do /togglethanks)

### Changed

- highlightTags function will now ignore '@\_@' text emojis
- changed the default best color from '&4' (dark red) to '&6' (gold)



## [0.4.0]

### Added

- Feature: /setreplyprefix (prefix) -- to set prefix for the default '[to]' when a discord user replies to a message, shown in chat.

### Changed

- for names that appear in replies on bridge, if they are in your guild best friends list, best color will be set to their name too
- made a wrapper for formatted senders in messages
- functions were renamed to avoid misinterpretation
- function truncateNumbers() was changed to support inputs if they had a '/' in them
- function getLinkSource() was changed to avoid returning an undefined source

### Removed

- useless functions like stripFormattedNames and getInSkyblock were removed



## [0.3.0]

### Added

- \_bettershridge command to \_help command's output (only works for bettershridge users client-side)
- added a /bs help or /bettershridge command
- allowed players to use rainbow colors in their prefixes using '[rb]' or '&z'
- allowed players to set their prefixes empty using '[empty]'

### Changed

- changed the default bot prefix from 'B' to 'Bot'
- changed the default guild prefix from 'G' to 'Guild'



## [0.2.0]

### Added

- /setarrowprefix (prefix) -- allows user to set the arrow in 'Guild >' and 'Bot >'
- added color support for rare sea creatures when a player used the \_bestiary command
- introduced the guild best-friends system
- /overriderankcolors | /orc -- allows the user to toggle the option for in-game players to be set to how best-friends look when they are offline and talking on shridge.

### Changed

- prettified \_bestiary command with separation between common and rare sea creatures
- prettified \_boop command to show who booped who, or who booped you
- some pogObjects were changed
- reorganised some code
- changed how errors are caught and reported in-game or in-console through function generateMessage()



## [0.1.5]

### Added

- Refactored how multi-link messages are handled (credits to gleb)
- Dynamic bot updater
- Hides messages if they are forwarded
- /setguildprefix (prefix) -- you can set the default 'Guild' in 'Guild > name: message' to whatever you'd like (including colors)
- /setbotprefix (prefix) -- you can set the default 'Guild > bot name:' in 'Guild > bot name: user: message' to whatever you'd like (including colors)
- /resetprefix (bot/guild/none) -- you can either reset an explicit prefix, or leave the argument empty and reset all prefixes

### Changed

- added formatting to \_gonline command
- \_ib command output mistake: 'sell cost' to 'buy cost'

### Removed

- unused functions



## [0.1.4]

### Added

- color for 'Vanquisher' in \_be command outputs

### Changed

- reformatted functions to be more flexible for edge cases
- formatting for normal non-stuf links
- format for miscellaneous data responses



## [0.1.3]

### Added

- bot commands /addbot, /botlist, /rmbot
- added formatting to 'Your role does not have requirements!'

### Changed

- restructed code to be more flexible
  Reasoning: code structure was hindering the management of multi-continuous chat messages as well as multi-link messages
- changed regchat triggers to work outside of hypixel as long as player is in hypixel
- reformatted a lot of code (most notably role updates, contest messages and collection messages)
- changed bestiary color for 'Abyssal Miner' to '&2' (dark green)
- changed gameload message
- changed taming color for \_skill bridge command to '&d' (pink)

### Fixed

- \_tfish command for noobf and general args
- updated formatTime() for mayor picked command
- updated link name for discord gifs to work like previews
- updated error messages with a new warning prefix



## [0.1.2]

### Changed

- formatting error messages
- 'role updated' missing conditions are formatted now
- tenor gifs have their own name
- hover text for images/gifs/videos have the 'imagename.suffix' format
- player names in a guild command's output are now &e (yellow) for clarity

### Fixed

- \_help command having a 24th 'undefined' command
- mayor colors in the \_mayor command

### Removed

- stripColors()



## [0.1.1]

### Added

- support for bot names in shridge/pridge
- support for \_tfish noobf command
- formatting to syntax errors (hover details for instabuy/instasell commands)
- formatting to promotion/demotion messages
- added source to links
- formatting to october special 'boo' command outputs
- formatting to tfish 'w/o obf 1' command outputs

### Changed

- formatted formatLbin() returns
- createMessage()

### Fixed

- greedy regex for 'player talking responses'
- highlighting with encoded link messages



## [0.1.0]

### Added

- support for \_mayor (certain mayor) command
- support for \_help command
- /ct load message
- support for newly implemented stuf\_links
- support for 'reply' guild messages
- support for general 'tfish' command messages

### Changed

- made bot's answer for \_pick command clearer
- updated colors for skills and collections from bot messages
- updated \_mayor (certain mayor) regex
- allowed messages before and after links to be included in the formatted message too

### Fixed

- fixed incorrect matches
- fixed \_boop edge cases
- fixed \_help list



## [0.0.6]

### Added

- support for viewauction links
- support for patcher image links



## [0.0.5]

### Added

- support for \_collection (skillName) commands
- support for \_boop commands
- support to render images using patcher's renderer

### Changes

- restructured code for readability
- auction links
- website clickables will show '<link expired>' if link is expired

### Removed

- 'ult' suffix from \_bz command output



## [0.0.4]

### Added

- support for viewing links with a [CLICK] button
- added highlight tags (ex. @User)

### Fixed

- slayer names for format color codes



## [0.0.3]

### Changed

- made the project a bit more efficient and easier to add new features



## [0.0.2]

### Added

- support for viewauction links
- support for \_cata command
- support for \_slayer command
- support for \_contest command
- support for \_fw (farming weight) command
- support for \_is (insta-sell) command
- support for \_ib (insta-buy) command
- support for \_collection command
- support for multi tags in a message

### Changed

- consistency of messages

### Removed

- support for \_raw command



## [0.0.1] - pilot

### Added

- formats for bot and guild chat messages
- support for \_bz command
- support for \_mayor command
- support for \_skill command
- support for \_be command
- support for \_lbin command
- support for \_tfish command
- support for stickers in discord (ex. <Raw Manta Ray>)
- support for @ tags
- support for reply messages from bridge
