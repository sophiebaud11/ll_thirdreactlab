import React, { useState } from 'react'
import { buttonStyle, inputStyle, titleStyle } from './styles.js'

export default function Search({ newVideo }) {
  const [searchValue, setSearch] = useState(null)

  return (
    <div>
        <label style={titleStyle}>Search: </label>
        <input style={inputStyle} type="text" onChange={e => setSearch(e.target.value)}></input>
        <button style={buttonStyle} onClick={() => newVideo(searchValue)}>Submit!</button>
    </div>
  )
}
