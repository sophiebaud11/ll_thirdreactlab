import React, { useState } from 'react'
// import {  } from './styles.js'

export default function Roll({ matchComments }) {
  console.log(matchComments)
  // const rollCommentsList = rollComments ? <div>
  //   {rollComments.map((item,i) => <p style={{marginTop: "3px"}} key={i}>{rollComments[i].text + " (comment made at " + rollComments[i].time + ")"}</p>)}
  // </div> : <p>No comments yet!</p>
  const matchCommentsList =  matchComments ? <div>
    {matchComments.map((item, i) => <p style={{marginTop:"3px"}} key={i}>matchComments.i.text</p> )}
  </div> : <p>No comments yet!</p>

// see if this works

  return (
    <>
      <div>
        {matchCommentsList}
      </div>
    </>
  )
}
