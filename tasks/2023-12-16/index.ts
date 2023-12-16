type GalacticHistoryTracer<T> = {
    add: Function;
    undo: Function;
    redo: Function;
    current: Function;
};

enum Errors {
    NO_GALAXIES = 'No more galaxies to explore',
}

export function createTracer<T>(): GalacticHistoryTracer<T> {

  const undoRegister: T[] = [];
  const redoRegister: T[] = [];
  
  const add = (newLocation: T) => {
    undoRegister.push(newLocation);
    redoRegister.length = 0;
  }

  const undo = (): void => {
    const elementToRedo = undoRegister.pop();
    if(elementToRedo) {
        redoRegister.push(elementToRedo);
    }
  }

  const redo = (): void => {
    const elementToUndo = redoRegister.pop();
    if(elementToUndo) {
        undoRegister.push(elementToUndo);
    } else {
        throw new Error(Errors.NO_GALAXIES);
    }
  }

  const current = (): T | null => {
    const lastIndex = undoRegister.length - 1;
    return undoRegister[lastIndex] || null;
  }

  return {
    add: add,
    undo: undo,
    redo: redo,
    current: current,
  };
}