export const baseUrlProd1 = 'http://employee-nepal.herokuapp.com';
export const baseUrlDev1 = 'http://employee-nepal.herokuapp.com';
export const baseUrl1 = process.env.NODE_ENV === 'development' ? baseUrlDev1 : baseUrlProd1;

export const baseUrlProd = 'http://employee-nepal.herokuapp.com/api/';
export const baseUrlDev = 'http://employee-nepal.herokuapp.com/api/';
export const baseUrl = process.env.NODE_ENV === 'development' ? baseUrlDev : baseUrlProd;

//Auth
export const USER_LOGIN_URL = baseUrl + 'login/';
export const USER_LOGOUT_URL = baseUrl + 'logout/';

export const HOMEPAGE_URL = baseUrl + 'employee/';

export const IMPORT_FILE=baseUrl +'import/'