import * as R from 'ramda';

type GenericFunction<T> = (...args: any[] ) => T;
enum ERRORS {
    WRONG_ARG = 'Function to be memoized must be a function.'
};

interface MemorizedFunctionCall<T> {
    functionName: string;
    functionArgs: any[];
    result: T;
}

export function memoize<T>(functionToMemoize: GenericFunction<T>) {
    const cache: MemorizedFunctionCall<T>[] = [];

    if(typeof functionToMemoize !== 'function') {
        throw new Error(ERRORS.WRONG_ARG);
    }

    return function (...args: any[]): T {
        const cachedResult = cache.find(({functionName, functionArgs}) => 
            functionName === functionToMemoize.name
            && R.equals(functionArgs, args)
        );

        if (cachedResult) {
            return cachedResult.result;
        }

        const result: T = functionToMemoize(...args);
        const newItemToCache: MemorizedFunctionCall<T> = {
            functionArgs: [...args],
            functionName: functionToMemoize.name,
            result,
        };

        cache.push(newItemToCache);

        return result;
    };
}