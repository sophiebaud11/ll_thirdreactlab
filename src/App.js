import React, { useState } from 'react'
import Video from './Video'
import Response from './Response'
import Panel from './Panel'
import Search from './Search'

export default function App() {
  const [idValue, setId] = useState(null)

  async function sendData(searchValue) {
    setId(searchValue)
  }



  if (!idValue) {
    return (
      <div>
        Search:
        <Search onSearchSubmit={sendData} />
      </div>

    )
  }
  else {
    return (
      <>
      <div>
        <Video idValue={idValue}/>
      </div>
      <div>
        <Response />
      </div>
      </>
       )
  }

   }
