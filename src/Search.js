import React, { useState } from 'react'
import { buttonStyle, inputStyle, titleStyle } from './styles.js'

export default function Search({ newVideo }) {
  const [formState, setFormState] = useState({video: '', user: ''})

  return (
    <div>
        <label style={titleStyle}>Username: </label>
        <input style={inputStyle} type="text" onChange={e => setFormState({...formState, user: e.target.value})}></input>
        <label style={titleStyle}>Search: </label>
        <input style={inputStyle} type="text" onChange={e => setFormState({...formState, video: e.target.value})}></input>
        <button style={buttonStyle} onClick={() => newVideo(formState)}>Submit!</button>
    </div>
  )
}
