/// <reference path="../states/States.ts" />

namespace app {

    export class PreloaderState extends State {

        constructor() {
            super();
        }

        public onEnter(): void {
            super.onEnter();

            console.log("ENTER PRELOADER STATE");

            const loader = PIXI.loader;
            loader.add(AssetBundle.getBundle());

            loader.load(this.onLoaded.bind(this));
        }

        private onLoaded(): void {
            StateShepard.getInstance().changeToState(States.MENU_STATE.name);
        }

        public onExit(): void {
            super.onExit();

            console.log("EXIT PRELOADER STATE");
        }

        public update(delta: number): void {
            super.update(delta);
        }
    }
}