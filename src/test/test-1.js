import Proxy from 'PROXY/proxy';

const data = {
    provinceId: 1
};

let proxy = new Proxy({
    params: data,
    url: 'https://house-sv-base.focus.cn/city/list',
    isContinues: true, // 针对连续的请求，因为请求时间等不确定因素，保证先发后收到的回调不执行
    before: function (next) {
        console.log('before');
    },
    match: function (match) {
        return match.parse(this.params, {
            id: '$${{provinceId}}'
        });
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

proxy.then(function (data) {
    console.log(data);
});
