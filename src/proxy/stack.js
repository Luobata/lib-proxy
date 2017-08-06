/**
 * @description 存储dev-tools需要的数据信息
 */

let stackArr = [];

window.MATCH_STACK = stackArr;

export const pushStack = (
    stack: Stack
) => {
    stackArr.push(stack);
};

export class Stack {
    url: string;
    beforeParams: any;
    afterParams: any;

    constructor (
        config: object
    ) {
        this.url = config.url;
        this.beforeParams = config.beforeParams;
        this.afterParams = config.afterParams;
    }
};

