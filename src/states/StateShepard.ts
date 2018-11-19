/// <reference path="./States.ts" />
/// <reference path="../display/Stage.ts" />

namespace app {
    
    export class StateShepard {

        public currentState: IState;

        private _states: IStateMap[];
        private _container: PIXI.Container;

        constructor(container: PIXI.Container, states?: IStateMap[]) {
            this._container = container;
            this._states = [];
            if (states) this._states = states;
        }

        public addState(stateMap: IStateMap): void {
            if (this._states.indexOf(stateMap) === -1) {

                this._states.forEach((addedState) => {
                    if(addedState.name === stateMap.name) {
                        throw new Error("Duplicate state name: " + stateMap.name);
                    }
                });

                this._states.push(stateMap);
            }
        }

        // TODO: Transitions?
        public changeToState(stateName: string): void;
        public changeToState(state: IState): void;
        public changeToState(stateOrName: string | IState): void {
            
            let newState: IState = null;
            if(typeof stateOrName === "string") {
                for(let i = 0; i < this._states.length; i++) {
                    if (this._states[i].name === stateOrName) {
                        newState = this._states[i].state;
                        break;
                    }
                }
            } else {
                newState = stateOrName;
            }
            
            if(newState == null) throw new Error("Couldn't find new state: " + stateOrName);
            
            if (this.currentState) this.currentState.onExit();
            this.currentState = newState;
            this.currentState.container = this._container;
            this.currentState.onEnter();
        }

        public update(delta: number): void {
            if (this.currentState) {
                this.currentState.update(delta);
            }
        }
    }
}