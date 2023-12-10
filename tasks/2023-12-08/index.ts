import * as R from 'ramda';

export interface Letter {
    content: string;
    country: 'pl' | 'de' | 'us';
    priority: 'low' | 'medium' | 'high';
  }


interface SortingStrategy {
  sort: (letters: Letter[]) => Letter[];
}

const PrioritiesMap = {
  low: 0,
  medium: 1,
  high: 2,
}

export class PriorityStrategy implements SortingStrategy {
  private _compareFunction(letterA: Letter, letterB: Letter) {
    const aPriorityValue = PrioritiesMap[letterA.priority];
    const bPriorityValue = PrioritiesMap[letterB.priority];

    if(aPriorityValue > bPriorityValue) {
      return -1;
    } else if( aPriorityValue < bPriorityValue) {
      return 1;
    }
    return 0;
  }
  public sort(letters: Letter[]) {
    return letters.sort(this._compareFunction);
  }
}

export class CountryStrategy implements SortingStrategy {
  public sort(letters: Letter[]) {
    return R.sortBy(R.prop('country'))(letters);
  }
}

export class LengthStrategy implements SortingStrategy {
  private _compareFunction(letterA: Letter, letterB: Letter) {
    const aContentLength = letterA.content.length;
    const bContentLength = letterB.content.length;
    if(aContentLength < bContentLength) {
      return -1;
    } else if( aContentLength > bContentLength) {
      return 1;
    }
    return 0;
  }
  public sort(letters: Letter[]) {
    return letters.sort(this._compareFunction);
  }
}
  
export class LetterSorter {
    private _sortingStrategy: SortingStrategy;

    constructor(sortingStrategy: SortingStrategy) {
      this._sortingStrategy = sortingStrategy;
    }

    sortLetters(letters: Letter[]): Letter[] {
      const sorted = this._sortingStrategy.sort(letters);
      return sorted;
    }
}