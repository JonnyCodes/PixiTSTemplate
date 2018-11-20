/// <reference path="./States.ts" />
/// <reference path="../signals/Signal.ts" />

namespace app {
    
    export class StateShepard {

        private _currentState: State;
        private _states: IStateMap[];
        private _container: PIXI.Container;
        private _changeStateSignal: Signal<string | State>;

        constructor(container: PIXI.Container, states?: IStateMap[]) {
            this._states = [];
            this._container = container;
            this._changeStateSignal = new Signal();
            this._changeStateSignal.on(this.changeToState, this);

            states.forEach((state) => {
                this.addState(state);
            });
        }

        public addState(stateMap: IStateMap): void {
            if (this._states.indexOf(stateMap) === -1) {

                this._states.forEach((addedState) => {
                    if(addedState.name === stateMap.name) {
                        throw new Error("Duplicate state name: " + stateMap.name);
                    }
                });

                stateMap.state.container = this._container;
                stateMap.state.changeStateSignal = this._changeStateSignal;

                this._states.push(stateMap);
            }
        }

        // TODO: Transitions?
        public changeToState(stateName: string): void;
        public changeToState(state: State): void;
        public changeToState(stateOrName: string | State): void {
            
            let newState: State = null;
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
            
            if (this._currentState) this._currentState.onExit();
            this._currentState = newState;
            this._currentState.onEnter();
        }

        public update(delta: number): void {
            if (this._currentState) {
                this._currentState.update(delta);
            }
        }
    }
}