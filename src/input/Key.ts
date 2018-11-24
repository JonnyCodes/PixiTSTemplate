/// <reference path="../signals/Signal.ts" />
/// <reference path="./IKeyEvent.ts" />

namespace app {

    export class Key {

        public get keyCode(): number { return this._keyCode; }

        // TODO: I only want to expose the on and off methods of the Signals!
        public get onPressed(): Signal<IKeyEvent> {
            return this._onPressed;
        }
        public get onDown(): Signal<IKeyEvent> {
            return this._onDown;
        }
        public get onReleased(): Signal<IKeyEvent> {
            return this._onReleased;
        }
        
        private _onPressed: Signal<IKeyEvent>;
        private _onDown: Signal<IKeyEvent>;
        private _onReleased: Signal<IKeyEvent>;
        private _keyCode: number;
        private _down: boolean;
        private _downEvent: IKeyEvent;

        constructor(keyCode: number) {

            this._keyCode = keyCode;
            this._down = false;

            this._onPressed = new Signal<IKeyEvent>();
            this._onDown = new Signal<IKeyEvent>();
            this._onReleased = new Signal<IKeyEvent>();
        }

        public onKeyDown(event: IKeyEvent): void {
            if (!this._down) {
                this._down = true;
                this._downEvent = event;
                this._onPressed.dispatch(event);
            }
        }

        public onKeyUp(event: IKeyEvent): void {
            if (this._down) {
                this._down = false;
                this._downEvent = null;
                this._onReleased.dispatch(event);
            }
        }

        public update(delta: number): void {
            if(this._down) {
                this._onDown.dispatch(this._downEvent);
            }
        }

        public destroy(): void {
            this._onDown.destroy();
            this._onPressed.destroy();
            this._onReleased.destroy();
            
            this._onDown = null;
            this._onPressed = null;
            this._onReleased = null;
            this._keyCode = null;
            this._down = null;
            this._downEvent = null;
        }
    }
}