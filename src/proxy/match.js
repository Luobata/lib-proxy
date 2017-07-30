/**
 * @descprition 全局提供的match 可被替换
 */

import match from 'lib-match';

let userMatch = match;

export const changeMatch = function (
    match: object
) {
    userMatch = match;
};

export default userMatch;
