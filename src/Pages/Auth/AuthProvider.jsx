// import { useLocalStorage } from "./LocalStorage";
import { useSessionStorage } from "./SessionStorage";

const GetAuthData = () => {
  return useSessionStorage('user', null);
}

const GetTokenData = () => {
  if (GetAuthData()) {
    return GetAuthData()[0].token
  }
  return null;
}

const AuthRedirect = (user) => {
  if (user) {
    if (user.role === "admin") {
      return '/dashboard'
    } else {
      return '/'
    }
  }
  return '/login'
}

const AuthData = JSON.parse(sessionStorage.getItem('user'));

export { GetAuthData, GetTokenData, AuthRedirect, AuthData };