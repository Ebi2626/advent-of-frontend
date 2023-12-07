type Letter = { [key: string]: number };

export function createTrackedLetter(letter: Letter, changeTracker: Function): Letter {
    const proxyHandler = {
        set(__: Letter, prop: string, value: number) {
            changeTracker(prop, value);
            return true;
        }
    }
    return new Proxy(letter, proxyHandler);;
}
