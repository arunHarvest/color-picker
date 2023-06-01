import React,{createContext} from 'react'
import Login from './Login'
import User from './User'

export const AppContext = createContext(null)

const ContextCase = () => {
    const [userName, setUserName] = React.useState("")
  return (
      <AppContext.Provider value={{ userName, setUserName }}>
          <Login /><User /></AppContext.Provider>
  )
}

export default ContextCase