export class RateLimiter {
    private _maxRequests: number;
    private _interval: number;
    private _attemptInProgress: boolean[] = [];

    constructor(maxRequests: number, interval: number) {
        this._maxRequests = maxRequests;
        this._interval = interval;
    }

    private saveAttemptForGivenInterval() {
        this._attemptInProgress.push(true);
        setTimeout(() => {
            this._attemptInProgress.shift();
        }, this._interval).unref();
    }

    public attemptAccess(): boolean {
        if(this._attemptInProgress.length >= this._maxRequests) {
            return false;
        }
        this.saveAttemptForGivenInterval()
        return true;
    } 
  
}