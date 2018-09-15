function ajax(options) {
    let {
        type = 'get',
        url,
        data = {},
        dataType = 'json',
        async = true,
        cache = false,
        success,
        error
    }=options;
    //———先处理data数据———
    let str = '';
    for (let k in data) {
        if (data.hasOwnProperty(k)) {
            str += `${k}=${data[k]}&`
        }
    }
    str = str.slice(0, str.length - 1);//删除最后一个“&”
    //———判断是get系列还是post系列———
    let isGet = null;
    if (/get|head|delete/.test(type)) {
        isGet = true;
    } else if (/post|put/.test(type)) {
        isGet = false;
    }
    //———建立Ajax实例———
    let xhr = new XMLHttpRequest();
    //———若是get系列，将参数拼接到url后边———
    if (isGet) {
        //要判断原url是否有“？”
        if (url.indexOf('?') === -1) {
            url += `?${str}`;
        } else {
            url = url.replace(/&$/, '');//在原url有“？”的前提下，为保证参数拼接正确，不管有没有“&”，都要进行这一步
            url += `&${str}`;
        }
        //判断get系列是否允许缓存：false是不允许；true是允许
        if (!cache) {
            url += `_=${Math.random()}`;
        }
    }
    xhr.open(type, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}|304/.test(xhr.status)) {
            switch (dataType) {
                case 'json':
                    let data = JSON.parse(xhr.response);
                    success && success(data);
                    break;
                case 'xml':
                    success && success(xhr.responseXML);
                    break;
                default:
                    success && success(xhr.responseText);
            }
        }
        if (xhr.readyState == 4 && /^[45]\d{2}/.test(xhr.status)) {
            error && error(xhr);
        }
    };
    if (!isGet) {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    }
    xhr.send(str);//如果是post系列，就要把参数放到响应体里，这个方法对于get系列是不起作用的
}
ajax.get = function (url, data, fn, dataType) {
    let obj = {};
    if (data instanceof Function) {
        obj = {type: 'get', url, success: data, dataType: fn};
    } else {
        obj = {type: 'get', url, data, success: fn, dataType};
    }
    ajax(obj);
};