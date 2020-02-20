import React, { useState } from 'react'
import { buttonStyle, inputStyle } from './styles.js'


export default function Search({ sendData }) {
  const [searchValue, setSearch] = useState(null)

  return (
    <div>
      <input style={inputStyle} type="text" onChange={e => setSearch(e.target.value)}></input>
      <button style={buttonStyle} onClick={() => sendData(searchValue)}>Submit!</button>
    </div>
  )
}
