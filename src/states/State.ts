namespace app {

    export interface IState {
        stage: Stage;
        onEnter(): void;
        onExit(): void;
        update(delta: number): void
    }

    export class State implements IState {

        public set stage(stage: Stage) { this._stage = stage; }
        protected _stage: Stage;

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