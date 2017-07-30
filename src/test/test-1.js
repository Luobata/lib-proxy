import Proxy from 'PROXY/proxy';

const data = {
    provinceId: 1
};

let proxy = new Proxy({
    params: data,
    url: 'https://house-sv-base.focus.cn/city/list',
    before: function (next) {
        console.log('before');
    },
    match: function (match) {
        console.log(match);
    },
    ajax: function (request, resolve, reject) {
        request.ajax({
            url: this.url,
            data: this.params,
            type: 'GET',
            complete: function (data) {
                resolve(data);
            }
        });
    },
    after: function (next) {
        console.log('after');
    }
});

console.log(proxy);
proxy.then(function (data) {
    console.log(data);
});
