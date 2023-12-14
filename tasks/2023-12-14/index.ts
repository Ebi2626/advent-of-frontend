import * as R from 'ramda';

export type Gift = {
    value: number;
    weight: number;
    volume: number;
  };

  
  export function calculateMaxGiftValue(gifts: Gift[], maxWeight: number, maxVolume: number): number {
    const anyGiftMeetsWeightRestrictions = gifts.some(({weight}) => weight < maxWeight );
    const anyGiftMeetsVolumeRestrictions = gifts.some(({volume}) => volume < maxVolume );

    if(!anyGiftMeetsVolumeRestrictions || !anyGiftMeetsWeightRestrictions) {
        return 0;
    }

    const result = getMaxValue(gifts, 0, 0, 0, maxWeight, maxVolume);

    return result;

  }

  const getIndexBestNextValue = (list: Gift[], currentVolume: number, currentWeight: number, maxWeight: number, maxVolume: number): number => {
    const bestValues = list.map((gift, i) => {
        const newWeight = currentWeight + gift.weight;
        const newVolume = currentWeight + gift.volume;
        const newValue = currentVolume + gift.value;
        if(newWeight <= maxWeight && newVolume <= maxVolume) {
            return newValue;
        }
        return -1;
    });
    return R.indexOf(Math.max(...bestValues), bestValues);
  }
  

  const getMaxValue = (list: Gift[], currentValue: number, currentVolume: number, currentWeight: number, maxWeight: number, maxVolume: number): number => {
    const bestNextValueIndex = getIndexBestNextValue(list, currentVolume, currentWeight, maxWeight, maxVolume);

    if(bestNextValueIndex === -1 || list.length === 0) {
        return currentValue;
    }

    const nextItemToAdd = list[bestNextValueIndex];
    const newList = list.filter((__, i) => i !== bestNextValueIndex);
    
    const newVolume = currentVolume + nextItemToAdd.volume;
    const newWeight = currentWeight + nextItemToAdd.weight;
    const newValue = currentValue + nextItemToAdd.value;

    if(newWeight > maxWeight || newVolume > maxVolume) {
        return currentValue;
    }

    return getMaxValue(newList, newValue, newVolume, newWeight, maxWeight, maxVolume);
  }