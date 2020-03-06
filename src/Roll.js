import React, { useState } from 'react'

export default function Roll({ matchComments }) {
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
