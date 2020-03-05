import React, { useState } from 'react'
// import {  } from './styles.js'

export default function Roll({ matchComments }) {
ß
  const items = matchComments.map( (comment, i) => {
    return <p key={i}>{comment.text}</p>
  })

    return (
      <div>
        Comments:
          { matchComments &&
            <>
            {items}
            </>
          }
      </div>
  )
}
