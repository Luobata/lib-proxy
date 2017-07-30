/**
 * @descprition proxy 入口文件
 */
import { noop } from 'LIB/util';
import request from 'lib-request';

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

        return new Promise((resolve, reject) => {
            this.ajax.call(config, request, resolve, reject);
        });
    };
};
