import * as R from 'ramda';

enum ERRORS {
    NO_CHILD = 'Child not found',
    NO_GIFT = 'Gift not found',
};

interface GiftRegistryItem {
    childId: number;
    gifts: string[];
}

export class GiftRegistry {

    private _giftRegistry: GiftRegistryItem[] = [];

    private _getChoosenChild(childId: number): GiftRegistryItem | undefined {
        return R.find<GiftRegistryItem>(R.propEq(childId, 'childId'))(this._giftRegistry);
    }

    private _getChoosenChildIndex(childId: number): number {
       return R.findIndex(R.propEq(childId, 'childId'))(this._giftRegistry);
    }

    public getGiftsForChild(childId: number): string[] {
        return this._getChoosenChild(childId)?.gifts ?? [];
    }

    public addGift(childId: number, gift: string): void {
        const indexOfChild = this._getChoosenChildIndex(childId)
        if(indexOfChild !== -1) {
            const currentChildGifts = this._giftRegistry[indexOfChild].gifts;
            this._giftRegistry[indexOfChild].gifts = R.uniq([...currentChildGifts, gift]);
        } else {
            this._giftRegistry.push({childId, gifts: [gift]});
        }
    }

    public removeGift(childId: number, gift: string): void {
        const giftsOfChosenChild = this.getGiftsForChild(childId);
        const indexOfChoosenChild = this._getChoosenChildIndex(childId);
        const indexOfGiftToRemove = giftsOfChosenChild.findIndex((g) => g.trim().toUpperCase() === gift.trim().toUpperCase());
        if(indexOfChoosenChild === -1) {
            throw new Error (ERRORS.NO_CHILD);
        }
        if(indexOfGiftToRemove === -1) {
            throw new Error (ERRORS.NO_GIFT);
        } 
        this._giftRegistry[indexOfChoosenChild].gifts = R.without([gift], giftsOfChosenChild);
    }
  
}