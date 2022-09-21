import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "./LocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data) => {
    // try {
    //   await axios.get('/sanctum/csrf-cookie').then(() => {
    //       axios.post(`/api/auth/login`, {
    //           'email': data.username,
    //           'password' : data.password
    //           }).then(resp => {
    //               setUser(resp);
    //               // console.log(response)
    //               //set user in auth provider
    //               // return AuthProvider(resp.data.user)
    //               navigate('/dashboard')
    //       })
    //   });
    // } catch (error) {
    //   console.error(err);
    //   alert('Failed Login!');
    // }
    setUser(data);
    // navigate('/dashboard');
  }

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}