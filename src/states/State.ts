namespace app {

    export interface IState {
        container: PIXI.Container;
        onEnter(): void;
        onExit(): void;
        update(delta: number): void
    }

    export class State implements IState {

        public container: PIXI.Container;

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