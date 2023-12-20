import { Readable } from "stream";

export class GiftStream extends Readable {
  private index: number;
  private transformedData: any[] = [];

  constructor(data: string[]) {
    super({ objectMode: true });
    this.transformedData = data;
    this.index = 0;
  }

  _read() {
    if (this.index < this.transformedData.length) {
      this.push({ gift: this.transformedData[this.index] });
      this.index++;
    } else {
      this.push(null); // Sygnał końca strumienia
    }
  }

  map(transformFunction: (value: string) => any): this {
    this.transformedData = this.transformedData.map(transformFunction);
    return this;
  }

  skip(count: number): this {
    this.transformedData = this.transformedData.slice(count);
    return this;
  }

  take(count: number): this {
    this.transformedData = this.transformedData.slice(0, count);
    return this;
  }

  getGifts(): any[] {
    return this.transformedData;
  }
}
