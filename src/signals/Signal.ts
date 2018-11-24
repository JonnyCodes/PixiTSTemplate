namespace app {
    
    export class Signal<T = any> {

        private _listeners: SignalListener<T>[];

        constructor() {
            this._listeners = [];
        }

        public on(func: (param: T) => void, context: any, once: boolean = false): void {
            
            for (let i = this._listeners.length - 1; i >= 0; i--) {
                if (this._listeners[i].matches(func, context)) {
                    throw new Error("Attempted to add duplicate signal");
                }
            }

            this._listeners.push(new SignalListener<T>(func, context, once));
        }

        public off(func: (param: T) => void, context: any): void {
            let index = -1;

            for (let i = this._listeners.length - 1; i >= 0; i--) {
                if (this._listeners[i].matches(func, context)) {
                    
                    index = i;
                    break;
                }
            }

            if (index === -1) throw new Error("Couldn't find matching signal");

            let listener = this._listeners[index];
            this._listeners.splice(index, 1);
            listener.destroy();
            listener = null;
        }

        public dispatch(param: T): void {
            for (let i = this._listeners.length - 1; i >= 0; i--) {
                const listener = this._listeners[i];
                listener.dispatch(param);

                if(listener.once) {
                    this._listeners.splice(i, 1);
                    listener.destroy();
                }
            }
        }

        public destroy(): void {
            for (let i = this._listeners.length - 1; i >= 0; i--) {
                this._listeners[i].destroy();
            }

            this._listeners = null;
        }
    }

    class SignalListener<T> {

        public get once(): boolean { return this._once; }

        private _func: (param: T) => void;
        private _context: any;
        private _once: boolean;

        constructor(func: (param: T) => void, context: any, once: boolean) {
            this._func = func;
            this._context = context;
            this._once = once;
        }

        public dispatch(...param: T[]): void {
            this._func.apply(this._context, param);
        }

        public matches(func: (param: T) => void, context: any): boolean {
            return this._func === func && this._context === context;
        }

        public destroy(): void {
            this._func = null;
            this._context = null;
            this._once = null;
        }

    }
}