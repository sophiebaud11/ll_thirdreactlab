import React from 'react'
import { videoStyle } from './styles.js'

export default function Roll({ rollComments, setCommentRoll }) {
  console.log(rollComments)
// build a stopwatch thhat starts/stops when someone ihts play/Pause
// this triggers when the comments appear
// object has to be mapped like in panel.js

  return (
    <>
      <div>
        {rollComments}
      </div>
    </>
  )
}
