import React from 'react'
import { commentStyle, panelStyle } from './styles.js'

export default function Panel({ likeValue, commentArray }) {

  const commentsList = commentArray ? <div>
    {commentArray.map((item,i) => <p key={i}>{commentArray[i]}</p>)}
  </div> : <p>No comments yet!</p>

  return (
    <>
    <div style = {panelStyle}>
      <span style={{fontSize: "1.17em", }}><bold>Likes:</bold> {likeValue}</span>
      <h3>Comments: </h3>
      <p style={commentStyle}>{commentsList}</p>
    </div>
    </>
    )
}
