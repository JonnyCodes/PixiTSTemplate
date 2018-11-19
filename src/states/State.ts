namespace app {

    export interface IState {
        stage: PIXI.Container;
        onEnter(): void;
        onExit(): void;
        update(delta: number): void
    }

    export class State implements IState {

        public set stage(stage: PIXI.Container) { this._stage = stage; }
        protected _stage: PIXI.Container;

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