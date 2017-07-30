/**
 * @descprition proxy 入口文件
 */
import { noop, isFun } from 'LIB/util';
import request from 'PROXY/request';

export default class Proxy {

    params: any;
    url: string;
    before: Function;
    match: Function;
    ajax: Function;
    after: Function;

    constructor (
        config: object
    ) {
        this.params = config.params || {};
        this.url = config.url || '';
        this.before = config.before || noop;
        this.after = config.after || noop;
        this.ajax = config.ajax || noop;
        this.match = config.match || noop;

        return this.promiseGen(config);
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
                    arguments[i] = function () {
                        fn.apply(this, arguments);
                        that.after(this, arguments);
                    };
                }
            }
            cb.apply(this, arguments);
        }

        return promise;
    };
};

