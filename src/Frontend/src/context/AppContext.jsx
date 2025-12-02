import { createContext, useState } from 'react'

export const AppConetxt = createContext()

const AppContextProvider = (props) => {

    const [user, setUser] = useState(null);

    const value = {
        user,setUser
    }

    return (
        <AppConetxt.Provider value={value}>
            {props.children}
        </AppConetxt.Provider>
    )
}

export default AppContextProvider;