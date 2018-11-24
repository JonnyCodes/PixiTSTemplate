namespace app {

    export interface IKeyEvent {

        type: string;
        char: string;
        charCode: number;
        key: string;
        keyCode: number;
        code: string;
        ctrlKey: boolean;
        shiftKey: boolean;
        altKey: boolean;
        metaKey: boolean;
        preventDefault(): () => void;
    }
}