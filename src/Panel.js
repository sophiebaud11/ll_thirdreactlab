import React from 'react'
import { commentStyle, panelStyle } from './styles.js'

export default function Panel({ likeValue, commentArray }) {

  const commentsList = commentArray ? <div>
    {commentArray.map((item,i) => <p key={i}>{commentArray[i]}</p>)}
  </div> : <p>No comments yet!</p>

  return (
    <>
    <div style = {panelStyle}>
      <h2>Likes:</h2>
      <p>{likeValue}</p>
      <h2>Comments: </h2>
      <p style={commentStyle}>{commentsList}</p>
    </div>
    </>
    )
}
