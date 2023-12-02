import * as R from 'ramda';

interface QueueItem<T> {
    item: T;
    priority: number;
}

enum ERRORS {
    NO_ITEMS = 'There are no letters in the queue!',
}

export class ChristmasQueue<T> {
    private _queue: QueueItem<T>[] = [];

    private _groupQueueByPriority(): Partial<Record<string, QueueItem<T>[]>> {
        const byPriority = R.groupBy((item: QueueItem<T>): string => `${item.priority}`);
        return byPriority(this._queue);
    };

    private _sortQueue = (queue: QueueItem<T>[]): QueueItem<T>[] =>
        R.sortWith([R.descend<QueueItem<T>>(R.prop('priority'))])(queue);

    private _updateQueueInExistingPriorityGroup(
            groupToUpdate: QueueItem<T>[], 
            restOfGroups: QueueItem<T>[], 
            newRecord: QueueItem<T>
    ): QueueItem<T>[] {
        const updatedGroup = [...groupToUpdate, newRecord];
        return this._sortQueue([...restOfGroups, ...updatedGroup]);
    }

    private _updateQueueWithoutExistingPriorityGroup(
        newRecord: QueueItem<T>, 
        queueGroupedByPriority: Partial<Record<string, QueueItem<T>[]>>
    ): QueueItem<T>[] {
        return this._sortQueue(R.flatten(R.filter(R.isNotNil, [...R.values(queueGroupedByPriority), newRecord])));
    }
  
    public enqueue(item: T, priority: number): void {
        const newRecord: QueueItem<T> = {
            item,
            priority,
        }; 

        if(this._queue.length === 0) {
            this._queue.push(newRecord)
        } else {

            const queueGroupedByPriority = this._groupQueueByPriority();
            const groupToUpdate = queueGroupedByPriority?.[`${priority}`];
            let updatedQueue: QueueItem<T>[];

            if(groupToUpdate) {
                const restOfGroups = R.filter(R.isNotNil, R.flatten(R.values(R.omit([`${priority}`], queueGroupedByPriority))));
                updatedQueue = this._updateQueueInExistingPriorityGroup(groupToUpdate, restOfGroups, newRecord);
            } else {
                updatedQueue = this._updateQueueWithoutExistingPriorityGroup(newRecord, queueGroupedByPriority);
            }
            
            this._queue = updatedQueue;
        }
    }

    public dequeue(): T {
        if(this._queue.length === 0) {
            throw new Error(ERRORS.NO_ITEMS);
        } else {
            return this._queue.shift()!.item;
        }
    }

    public isEmpty = (): boolean => this._queue.length === 0;
}