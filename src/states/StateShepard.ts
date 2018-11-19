/// <reference path="./States.ts" />

namespace app {
    
    export class StateShepard {

        private static Instance: StateShepard;

        public currentState: IState;

        private _states: IStateMap[];
        private _stage: PIXI.Container;
        
        public static getInstance(): StateShepard {
            if(!StateShepard.Instance) {
                StateShepard.Instance = new StateShepard();
            }

            return StateShepard.Instance;
        }

        private constructor() {
            this._states = [];
        }

        public init(stage: PIXI.Container, states?: IStateMap[]): void {
            this._stage = stage;
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
        public changeToState(stateOrName: IState | string): void {
            
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
            this.currentState.stage = this._stage;
            this.currentState.onEnter();
        }

        public update(delta: number): void {
            if (this.currentState) {
                this.currentState.update(delta);
            }
        }
    }
}