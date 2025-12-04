import { createContext, useState } from 'react'

export const AppConetxt = createContext()

const AppContextProvider = (props) => {

    const [user, setUser] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    const [token, setToken] = useState(localStorage.getItem('token'));


    // logout functionality 
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }


    const value = {
        user,setUser,showLogin,setShowLogin,token,setToken,logout
    }

    return (
        <AppConetxt.Provider value={value}>
            {props.children}
        </AppConetxt.Provider>
    )
}

export default AppContextProvider;