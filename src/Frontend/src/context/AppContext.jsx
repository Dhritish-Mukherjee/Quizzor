import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export const AppConetxt = createContext()

const AppContextProvider = (props) => {

    const location = useLocation();


    const [user, setUser] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
     const [showMenu, setShowMenu] = useState(false);

    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if(location.pathname === '/') {
            setShowMenu(false);
        }

    }, [location.pathname])
   
    const dashMenuHandler = () => {
        user ? setShowMenu(!showMenu) : '';


    }
    
    

    // logout functionality 
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setShowMenu(false);
        navigate('/');
    }


    const value = {
        user,setUser,showLogin,setShowLogin,token,setToken,logout,showMenu,setShowMenu,dashMenuHandler
    }

    return (
        <AppConetxt.Provider value={value}>
            {props.children}
        </AppConetxt.Provider>
    )
}

export default AppContextProvider;