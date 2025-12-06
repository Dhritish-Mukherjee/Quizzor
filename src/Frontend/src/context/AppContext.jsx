import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css'


export const AppConetxt = createContext()

const AppContextProvider = (props) => {

    const location = useLocation();


    const [user, setUser] = useState(null);
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
        if (!user) return;

        const newShowMenu = !showMenu;
        setShowMenu(newShowMenu);

        
        if (newShowMenu) {
            document.body.classList.add('scroll-lock'); // lock scroll
        } else {
            document.body.classList.remove('scroll-lock'); // unlock scroll
        }
        
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