/**
 * @description 公干函数
 */

//空函数
export const noop = function () { 
};

export const isFun = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
}
