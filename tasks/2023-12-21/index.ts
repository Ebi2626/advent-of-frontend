import * as R from 'ramda';

type Class = {
    new(...args: any[]): any;
}

export class InjectionToken<T> {
    name!: T;

    constructor(name: T) {
        this.name = name;
    }
}

export class FactoryInjector {
    registeredClasses: Record<string, any> = {};

    registerClass(newClass: Class){
        if(newClass.name) {
           this.registeredClasses[newClass.name] = new newClass();
        }
    }

    get<T>(classType: Class | InjectionToken<any>) { 
        if(classType instanceof InjectionToken) {
            return this.registeredClasses[classType.name];
        }

        const givenClass = R.values(this.registeredClasses).find((c) => {
            if(typeof c === 'object') {
                const newObject = new classType();
                return newObject; 
            }
            return c;
        });

        if(!givenClass) {
            throw new Error('There is no such class');
        }
        
        return givenClass;
    }

    provideValue(token: InjectionToken<any>, value: any){
        this.registeredClasses[token.name] = value;
    }
  
}

