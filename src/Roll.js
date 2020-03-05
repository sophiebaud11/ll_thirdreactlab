import React, { useState } from 'react'
// import {  } from './styles.js'

export default function Roll({ matchComments }) {
  console.log(matchComments)
  // const rollCommentsList = rollComments ? <div>
  //   {rollComments.map((item,i) => <p style={{marginTop: "3px"}} key={i}>{rollComments[i].text + " (comment made at " + rollComments[i].time + ")"}</p>)}
  // </div> : <p>No comments yet!</p>
  // const matchCommentsList =  matchComments ? <div>
  //   {matchComments.map((item, i) => <p style={{marginTop:"3px"}} key={i}>item.text</p> )}
  // </div> : <p>No comments yet!</p>
  // console.log(matchCommentsList)
// see if this works

  const items = matchComments.map( (comment, i) => {
    return <p key={i}>{comment.text}</p>
  })

  // const items = []
  // for (const item of matchComments) {
  //   items.push(item.text)
  // }
  console.log(items)
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
