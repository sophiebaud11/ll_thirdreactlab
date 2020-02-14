import React, { useState } from 'react';

export default function Search({ onSearchSubmit }) {
  const [searchValue, setSearch] = useState(null)

  return (
    <div>
      <input type="text" onChange={e => setSearch(e.target.value)}></input>
      <button onClick={() => onSearchSubmit(searchValue)}>Submit!</button>
    </div>
  )
}
