import { isInHypixel } from './functions.js'

const wheelSequence = ['一', '\\', '|', '/']
let startWheel = false;
register('command', () => {
    if (!isInHypixel()) return;
    let wheelStart = wheelSequence[0];
    const pollMessage = new Message(
        '&7Polling query for status ',
        wheelStart
    ).setChatLineID(111);   
    startWheel = true;
    ChatLib.chat('&aPoll starting...')
    ChatLib.chat(pollMessage);
}).setName('pollit', true);

registerWhen('step', timeThis('step trigger for poll wheel', () => {
    const message = ChatLib.getChatLineID(111);
    console.log(message);
}).setFps(1), () => startWheel && isInHypixel());

register('command', () => {
    if (!isInHypixel()) return;
    startWheel = false;
    ChatLib.chat('&cPoll stopped...')
}).setName('stoppoll');
