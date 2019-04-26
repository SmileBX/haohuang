function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

//API接口地址
const host = 'http://hhapi.wtvxin.com/Help/';
//const host = 'http://localhost:801/api/';
export {
    host
}
//请求封装
function request(url, method, data, header = {}) {
    wx.showLoading({
        title: '加载中' //数据请求前loading
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url, //仅为示例，并非真实的接口地址
            method: method,
            data: data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                wx.hideLoading();
                resolve(res.data)
            },
            fail: function(error) {
                wx.hideLoading();
                reject(false)
            },
            complete: function() {
                wx.hideLoading();
            }
        })
    })
}

export function get(url, data) {
    return request(url, 'GET', data)
}
export function post(url, data) {
    return request(url, 'POST', data)
}

export function getCurrentPageUrlWithArgs() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const url = currentPage.route
    const options = currentPage.options;
    let urlWithArgs = `/${url}?`
    for (let key in options) {
        const value = options[key]
        urlWithArgs += `${key}=${value}&`
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    return urlWithArgs
}

export default {
    formatNumber,
    formatTime,
    getCurrentPageUrlWithArgs
}