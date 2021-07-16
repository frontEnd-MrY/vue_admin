import Cookies from 'js-cookie';

const TokenKey = 'adminAccountToken';
const userInfo = 'adminAccountInfo';


export function getUserInfo() {
    return Cookies.get(userInfo);
}

export function setUserInfo(info) {
    // 设置超时时间  expires：1为1天
    Cookies.set(userInfo, info, { expires: 1 });
}

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    Cookies.set(TokenKey, token);
}

export function removeToken() {
    Cookies.remove(TokenKey);
}
