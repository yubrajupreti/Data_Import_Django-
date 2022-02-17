import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const setCookie = (key,value) => {

    const option={path:'/'}
    cookies.set(key,value,option);
  };


  export const getCookie = (key) => {

    const option={path:'/'}
    const token=cookies.get(key);
    return {token}
  };


  export const removeCookie=(key)=>{
    const option={path:'/'}
    cookies.remove(key,option);
  }
