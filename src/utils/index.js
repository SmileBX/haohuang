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
                    reject(res.data);
                } else {
                    wx.showToast({
                        title: res.data.msg + '!',
                        icon: 'none'
                    })
                    reject(res.data);
                }
            },
            fail: function(error) {
                wx.hideLoading();
                wx.showToast({
                    title: error + '，请刷新页面重试!',
                    icon: 'none'
                })
                reject(res.data);
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
            duration: 1500
        });
        return false;
    }
    return true;
}

//用户直接微信登录
async function wxMemberLogin(code, iv, encryptedData, identity) {
    let result = await post("Login/MemberLogin", {
        iv,
        code,
        encryptedData
    });
    if (result.code === 0) { //登录成功
        //把返回的userId、token保存起来
        wx.setStorageSync("userId", result.MemberId);
        wx.setStorageSync("token", result.MemberToken);
        wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,
            success: function() {
                setTimeout(function() {
                    wx.redirectTo({
                        url: '/pages/my/main?identity=' + identity
                    })
                }, 1500);
            }
        })
    }
}

//师傅直接微信登录
async function wxInstalMasterLogin(code, iv, encryptedData, identity) {
    let result = await post("Login/InstalMasterLogin", {
        iv,
        code,
        encryptedData
    });
    if (result.code === 0) { //登录成功
        wx.setStorageSync("userId", result.MemberId);
        wx.setStorageSync("token", result.MemberToken);
        wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,
            success: function() {
                setTimeout(function() {
                    wx.redirectTo({
                        url: '/pages/my/main?identity=' + identity
                    })
                }, 1500);
            }
        })
    }
}

//客服微信直接登录
async function wxCustomerServiceLogin(code, iv, encryptedData, identity) {
    let result = await post("Login/InstalMasterLogin", {
        iv,
        code,
        encryptedData
    });
    if (result.code === 0) { //登录成功
        wx.setStorageSync("userId", result.MemberId);
        wx.setStorageSync("token", result.MemberToken);
        wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,
            success: function() {
                setTimeout(function() {
                    wx.redirectTo({
                        url: '/pages/my/main?identity=' + identity
                    })
                }, 1500);
            }
        })
    }
}

//微信直接登录
export function Login(identity) {
    wx.login({
        success(res) {
            if (res.code) {
                wx.getUserInfo({
                    success(res2) {
                        console.log(res2);
                        wx.setStorageSync("userInfo", res2.userInfo);
                        if (identity == 1) { //identity: 1:客服；2：客户；3：师傅
                            wxCustomerServiceLogin(res.code, res2.iv, res2.encryptedData, identity);
                        }
                        if (identity == 2) { //identity: 1:客服；2：客户；3：师傅
                            wxMemberLogin(res.code, res2.iv, res2.encryptedData, identity);
                        }
                        if (identity == 3) {
                            wxInstalMasterLogin(res.code, res2.iv, res2.encryptedData, identity);
                        }
                    },
                    fail() {
                        wx.showToast({
                            title: '授权失败，请重新执行!',
                            icon: 'none',
                            duration: 1500
                        })
                    }
                })
            } else {
                wx.showToast({
                    title: res.errMsg,
                    icon: "none",
                    duration: 1500
                });
            }
        },
        fail() {
            wx.showToast({
                title: "调取登录失败!",
                icon: "none",
                duration: 1500
            });
        }
    })

}



export default {
    Login,
    host,
    filePath,
    get,
    post,
    formatNumber,
    formatTime,
    getCurrentPageUrlWithArgs,
    valPhone: valPhone
}