import React, { useReducer } from 'react'
import App from './App.js'
import { dataReducer } from './reducers.js'

export const updateSessionData = React.createContext()
export const SessionData = React.createContext()

export default function DataContext() {
  const initialData =
  {
    sessionID: '',
    video: '',
    username: 'anonymous',
    comments: []
  }
  const [session, updateSession] = useReducer(dataReducer, initialData)

  return (
    <updateSessionData.Provider value={updateSession}>
      <SessionData.Provider value={session}>
        <App />
      </SessionData.Provider>
    </updateSessionData.Provider>
  )
}
