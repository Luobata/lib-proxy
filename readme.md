# lib-proxy

## 一个用于前后端完全分离时 帮助抽离数据层之间耦合的库

### 作用
前后端完全分离，在前端主要的问题是ui层和data层的分离，然而这其中ui层的开发可以完全脱离data层，但是data层的数据接口，数据类型可能对ui层的实现产生制约。比较常规的做法是与后端定义好数据格式，然后使用mock数据。但是mock数据根本不是前后端完全分离的最佳方案，因为mock本身太复杂，需要各种各样的数据结构，并且mock本身的成本比较大。最关键的一点，开发过程中需要和server开发人员有足够的沟通，包括数据格式，数据接口，字段定义等。为了解决这个问题，lib-match诞生了，但是仅仅有lib-match还不够，match的问题是，match的过程，给请求的发送处理增加了一部，使得开发人员在排查问题的时候，无法通过network的请求返回值直观的发现问题，即使后端的数据没有问题，需要进一步排查问题的环节，需要进入代码，打断点，打印处理后的值，所以需要把match和请求做一个绑定，并且提供dev-tools来提供查看、筛选功能（类似vue-devtools），所以proxy的出现是为了让异步请求和match之间存在一个绑定关系。

### 语法

```
    import Proxy from 'lib-proxy';

    const data = {
        abc: 1
    };

    let proxy = new Proxy({
        params: data,
        url: '',
        before: function (next) {
        },
        match: function (match) {
        },
        ajax: function (request) {
        },
        after: function (next) {
        }
    });

```

### 参数说明
| 参数 | 默认值 | 含义 |
| ---- | :----: | :--- |
| params | {} | 请求对应的唯一参数 |
| url | '' | 用来映射到dev-tools |
| before | | function 函数前统一过滤器 可以注册全局前处理器 |
| after | | function 函数处理后统一处理器 可以注册全局后处理器 |
| match | | function 处理match过程的函数 args(match) 提供的lib-match对象 |
| ajax | | function 发送请求的函数 包装成一个promise对象，args(request, resolve, reject) request lib-request 默认为lib-request 对象，resolve, reject, promise相关对象 |

1. params
请求对应唯一的参数

2. url
请求对应的url，用来映射到dev-tools
