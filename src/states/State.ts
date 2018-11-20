namespace app {

    export class State {

        public container: PIXI.Container;

        public set changeStateSignal(signal: Signal<string | State>) { this._changeStateSignal = signal; }
        protected _changeStateSignal: Signal<string | State>;

        public onEnter(): void {
            //
        }

        public onExit(): void {
            //
        }

        public update(delta: number): void {
            //
        }
    }
}