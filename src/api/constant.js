export const baseUrlProd1 = 'http://127.0.0.1:8000';
export const baseUrlDev1 = 'http://127.0.0.1:8000';
export const baseUrl1 = process.env.NODE_ENV === 'development' ? baseUrlDev1 : baseUrlProd1;

export const baseUrlProd = 'http://127.0.0.1:8000/api/';
export const baseUrlDev = 'http://127.0.0.1:8000/api/';
export const baseUrl = process.env.NODE_ENV === 'development' ? baseUrlDev : baseUrlProd;

//Auth
export const USER_LOGIN_URL = baseUrl + 'login/';
export const USER_LOGOUT_URL = baseUrl + 'logout/';

export const HOMEPAGE_URL = baseUrl + 'employee/';

export const IMPORT_FILE=baseUrl +'import/'