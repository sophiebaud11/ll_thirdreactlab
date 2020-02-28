import React from 'react'
// import {  } from './styles.js'

export default function Roll({ rollComments, setCommentRoll }) {
  console.log(rollComments[0])
  const rollCommentsList = rollComments ? <div>
    {rollComments.map((item,i) => <p style={{marginTop: "3px"}} key={i}>{rollComments[i].text + " (comment made at " + rollComments[i].time + ")"}</p>)}
  </div> : <p>No comments yet!</p>

// build a stopwatch that starts/stops when someone ihts play/Pause
// this triggers when the comments appear
// object has to be mapped like in panel.js

  return (
    <>
      <div>
        {rollCommentsList}
      </div>
    </>
  )
}
