declare const mainReducer: (state: {
    operands: string[];
    operator: null;
    history: never[];
} | undefined, action: any) => {
    operands: any[];
    operator: any;
    history: String[];
};
export default mainReducer;
