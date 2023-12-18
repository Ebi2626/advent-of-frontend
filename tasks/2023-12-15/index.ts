export function* storageQuery(range: number, gift: string, resolver: (n: number, gift: string) => boolean): Generator<number> {
    for(let i = 0; i <= range; i++){
        if(i !== 0 && storageResolver(i, gift)) {
            yield i;
        }
    }
}

export function storageResolver(n: number, gift: string): boolean {
    return n % gift.length === 0;
}
