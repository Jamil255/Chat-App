import { createContext, useMemo, useContext } from 'react'
import io from 'socket.io-client'
import {server}from "./constants/confing"

const SocketContext = createContext()

const getSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:3030", { withCredentials: true }), [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export { SocketProvider, getSocket }
