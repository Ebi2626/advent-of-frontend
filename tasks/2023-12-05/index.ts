import * as R from 'ramda';

interface EventWithCallbacks {
    name: string;
    callbacks: Function[];
};

enum Errors {
    LACK_OF_EVENT_TO_REMOVE = 'There is no event to remove.',
    LACK_OF_EVENT_TO_EMIT = 'There is no event to emit.',
};

export class ChristmasEmitter {

    private _events: EventWithCallbacks[] = [];

    private _addNewCallback(eventName: string, eventCallback: Function) {

        if(this._events.length === 0) {

            this._events.push({name: eventName, callbacks: [eventCallback]});

        } else {
            
            let indexOfSavedCallback = -1;
            const savedCallbacksForGivenEvent = this._events.find(
                ({name}, index) => {
                    if(name.trim().toUpperCase() === eventName.trim().toUpperCase()){
                        indexOfSavedCallback = index;
                        return true;
                    }

                    return false;
                }
            );

            if (savedCallbacksForGivenEvent) {
            
                const oldCallbacks = this._events[indexOfSavedCallback].callbacks;
                const newCallbacks = R.uniq([...oldCallbacks, eventCallback]);
                this._events[indexOfSavedCallback].callbacks = newCallbacks;

            } else {

                this._events.push({name: eventName, callbacks: [eventCallback]});

            }
        }
    }

    private _removeCallback(eventName: string, eventCallback: Function) {

        const indexOfEvent = this._events.findIndex(({name}) => name.trim().toUpperCase() === eventName.trim().toUpperCase());

        if(this._events.length === 0 || indexOfEvent === -1) {
            throw new Error(Errors.LACK_OF_EVENT_TO_REMOVE);
        } else {
            const updatedCallbacksList = this._events[indexOfEvent].callbacks.filter((callback) => callback.name !== eventCallback.name);
            this._events[indexOfEvent].callbacks = updatedCallbacksList; 
        }
        
    }

    public on(eventName: string, eventCallback: Function) {
        this._addNewCallback(eventName, eventCallback);
    }

    public off(eventName: string, eventCallback: Function) {
        this._removeCallback(eventName, eventCallback);
    }

    public emit(eventName: string) {

        const event = this._events.find((event) => event.name.trim().toUpperCase() === eventName.trim().toUpperCase());

        if(!event) {
            throw new Error(Errors.LACK_OF_EVENT_TO_EMIT);
        } else {
            event.callbacks.forEach((callback) => {
                callback();
            })
        }
    }
}