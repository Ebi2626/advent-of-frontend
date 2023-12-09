export interface Tool {
    init: Function,
    update: Function,
    dispose: Function,
}

enum Errors {
    NOT_INITIALIZED = 'Cannot update any tools before initialization.'
}

export class Equipment {
    private _registeredTools: Tool[] = [];
    private _hasBeeInitialized: boolean[] = [];

    public registerTools(newTool: Tool) {
        this._registeredTools.push(newTool);
    }

    public initializeTools(): void {
        this._registeredTools.forEach(({init}, i) => init());
        this._hasBeeInitialized.push(true);
    }

    public updateTools(): void {
        this._registeredTools.forEach(({update}, i) => {
            if(!this._hasBeeInitialized[i]) {
                throw new Error(Errors.NOT_INITIALIZED);
            }
            update();
        });
    }

    public disposeTools(): void {
        this._registeredTools.forEach(({dispose}) => dispose());
    }

}
