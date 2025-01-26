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
    }).setName('logtimestore', true);
