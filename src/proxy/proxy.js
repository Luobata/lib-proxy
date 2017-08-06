/**
 * @descprition proxy 入口文件
 */
import { noop, isFun } from 'LIB/util';
import request, { changeRequest } from 'PROXY/request';
import match from 'PROXY/match';
import { pushStack, Stack } from 'PROXY/stack';

export default class Proxy {

    params: any;
    url: string;
    isContinues: boolean;
    before: Function;
    match: Function;
    ajax: Function;
    after: Function;
    requestTime: number; // new Date().getTime();

    constructor (
        config: object
    ) {
        this.params = config.params || {};
        this.url = config.url || '';
        this.isContinues = config.isContinues || false;
        this.before = config.before || noop;
        this.after = config.after || noop;
        this.ajax = config.ajax || noop;
        this.match = config.match;

        const beforeParams = Object.assign({}, this.params);

        this.match && this.format(config);
        this.requestTime = new Date().getTime();

        pushStack(new Stack({
            url: this.url,
            beforeParams: beforeParams,
            afterParams: this.params
        }));


        return this.promiseGen(config);
    };

    format (
        config: object
    ) {
        this.params = this.match.call(config, match);
    };

    promiseGen (
        config: object
    ) {
        let that = this;
        let promise = new Promise((resolve, reject) => {
            this.before();
            this.ajax.call(config, request, resolve, reject);
        });

        let cb = promise.then;

        // 这里不能用箭头函数
        promise.then = function () {
            const args = [].slice.call(arguments);
            for (let i = 0; i < args.length; i++) {
                if (isFun(args[i])) {
                    let fn = args[i];
                    // 必须修改aruments才能劫持函数
                    arguments[i] = function () {
                        if (new Date().getTime() > that.requestTime) {
                            that.requestTime = new Date().getTime();
                            fn.apply(this, arguments);
                            that.after(this, arguments);
                        }
                    };
                }
            }
            cb.apply(this, arguments);
        }

        return promise;
    };
};

export const config = (
) => {
    return {
        changeRequest: (
            request: any
        ) => {
            changeRequest(request);
        }
    };
};
