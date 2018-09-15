function myAjax(options) {
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
    let str = '';
    for (let k in data) {
        if (data.hasOwnProperty(k)) {
            str += `${k}=${data[k]}&`
        }
    }
    str = str.slice(0, str.length - 1);
    let isGet = null;
    if (/get|head|delete/.test(type)) {
        isGet = true;
    } else if (/post|put/.test(type)) {
        isGet = false;
    }
    let xhr = new XMLHttpRequest();
    if (isGet) {
        if (url.indexOf('?') === -1) {
            url += `?${str}`;
        } else {
            url = url.replace(/&$/, '');
            url += `&${str}`;
        }
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
    xhr.send(str);
}
/*
ajax.get = function (url, data, fn, dataType) {
    let obj = {};
    if (data instanceof Function) {
        obj = {type: 'get', url, success: data, dataType: fn};
    } else {
        obj = {type: 'get', url, data, success: fn, dataType};
    }
    ajax(obj);
};*/
