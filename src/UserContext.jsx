import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookies";

export const UserContext = createContext();

// axios.defaults.headers.common['Authorization'] = cookies.getItem('token');
// axios.defaults.baseURL = "https://capris-basket-clam.cyclic.app";
// axios.defaults.withCredentials = true;

export function UserContextProvider({ children }) {

  const [email, setEmail] = useState(null)
  const [_id, setId] = useState(null)
  const [token, setToken] = useState(null)

  const navigate = useNavigate()
 
  
  useEffect(() => {
    // Load user data from localStorage on component mount
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)
    if (storedUser) {
      setEmail(JSON.parse(storedUser).email);
      setId(JSON.parse(storedUser)._id);
      navigate("/")
    }
  }, []);

  useEffect(() => {
    if(email)
    localStorage.setItem('user', JSON.stringify({email, _id}))
  }, [email, _id])
  

  useEffect(() => {
    if(email)
    navigate("/")
  else
  navigate("/login")

  }, [email])

  useEffect(() => {
    setToken(cookies.getItem("token"));
  }, [token])
  

  
  return (
    <UserContext.Provider value={{email, _id, token, setEmail, setId,  setToken}}>
      {children}
    </UserContext.Provider>
  );
}
