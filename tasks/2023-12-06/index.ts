import * as R from 'ramda';

enum ERRORS {
    INVALID_MACHINE_STATE = 'Invalid state provided'
};

const INVALID_ARGUMENT = 'unknown';

export class OrderController {
    private _registeredMachines: Machine[] = [];

    public setState(newOrder: string) {
        if(typeof newOrder !== 'string' || newOrder === INVALID_ARGUMENT) {
            throw new Error(ERRORS.INVALID_MACHINE_STATE);
        }
        this._registeredMachines.forEach((machine) => {
            machine.setState(newOrder);
        });
    }

    public registerMachine(newMachine: Machine) {
        const updatedMachineList = [...this._registeredMachines, newMachine];
        this._registeredMachines = updatedMachineList;
    }

    public unregisterMachine(newMachine: Machine) {
        const updatedMachineList = R.filter((machine) => machine !== newMachine)(this._registeredMachines);
        this._registeredMachines = updatedMachineList;
    } 
  
}

export class Machine {
  private _state: string | null = null;
  private _orders: string[] = [];

  public get state(): string | null {
    return this._state;
  }

  public setState(newOrder: string) {
    const ordersLength = this._orders.length;
    this._orders.push(`Order #${ordersLength + 1} - ${newOrder}`);
    this._state = newOrder;
  }

  public performAudit(): string[] {
    return this._orders;
  }

}