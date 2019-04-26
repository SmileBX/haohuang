//API接口地址
const host = 'http://hhapi.wtvxin.com/api/';
const filePath = 'https://hh.wtvxin.com';

export function formatNumber(n) {
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

//请求封装
function request(url, method, data, curPage, header = {}) {
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
                if (res.data.code === 0) {
                    resolve(res.data);
                } else if (res.data.code === 2) {
                    wx.showToast({
                            title: '需要重新登录!',
                            icon: 'none'
                        })
                        // logins();
                    setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/login/main?askUrl=' + curPage
                        })
                    }, 1000);
                    reject(false);
                } else {
                    wx.showToast({
                        title: res.data.msg + '!',
                        icon: 'none'
                    })
                    reject(false)
                }
            },
            fail: function(error) {
                wx.hideLoading();
                wx.showToast({
                    title: error + '，请刷新页面重试!',
                    icon: 'none'
                })
                reject(false)
            },
            complete: function() {
                wx.hideLoading();
            }
        })
    })
}

export function get(url, data, curpage) { //curpage：是传进来的当前地址在没有登录的时候，把这个参数传到登录哪里，如果登录了就跳回curpage
    return request(url, 'GET', data, curpage)
}

export function post(url, data, curpage) {
    return request(url, 'POST', data, curpage)
}

//提供全局方法，维护和判断accessToken
export function toLogin(objUrl) { //identity: 1:客服；2：客户；3：师傅
    const userId = wx.getStorageSync('userId');
    const token = wx.getStorageSync('token');
    if (userInfo && userId && token) {
        return true;
    } else {
        var objUrl = objUrl.replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
        wx.redirectTo({
            url: "/pages/login/main?askUrl=" + objUrl
        });
        return false;
    }
}

//验证手机号
export function valPhone(tel) {
    var r_phone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    // var phoneNumber = $.trim($('#phoneNumber').val());
    if (tel == "") {
        wx.showToast({
            title: "手机号不能为空!",
            icon: "none",
            duration: 2000
        });
        return false;
    }
    if (!r_phone.test(tel)) {
        wx.showToast({
            title: "请输入正确的手机格式!",
            icon: "none",
            duration: 2000
        });
        return false;
    }
    return true;
}

export default {
    host,
    filePath,
    get,
    post,
    formatNumber,
    formatTime,
    getCurrentPageUrlWithArgs,
    valPhone: valPhone
}