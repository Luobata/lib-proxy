/**
 * @descprition 全局提供的request 可被替换
 */

import request from 'lib-request';

let userRequest = request;;

export const changeRequest = function (
    request: object
) {
    userRequest = request;
};

export default userRequest;
