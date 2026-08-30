import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export function useAuth() {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login( {email, password });
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register( {username, email, password} );
      setUser(data.user);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGetMe = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      console.error("GetMe failed:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getAndSetUser = async () => {
      setLoading(true);
      try {
        const data = await getMe();
        if(data){
          setUser(data.user)
        }else{
          setUser(null)
        }
      } catch (error) {
        console.error("GetMe failed:", error);
        setUser(null);
      } finally{
        setLoading(false)
      }
    };
    getAndSetUser();
  }, []);
  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
}
