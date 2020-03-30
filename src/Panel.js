import React from 'react'
import { commentStyle, panelStyle, titleStyle } from './styles.js'

export default function Panel({ likeValue, commentArray }) {
  const commentsList = commentArray ? <div>
    {commentArray.map((item,i) => <p style={{marginTop: "3px"}} key={i}>{commentArray[i].text + " (comment made at " + commentArray[i].time + ")"}</p>)}
  </div> : <p>No comments yet!</p>

  return (
    <>
    <div style={panelStyle}>
      <span style={titleStyle}>Likes: </span><span style={{fontFamily: "'Montserrat', sans-serif"}}>{likeValue}</span>
      <br /><span style={titleStyle}>Comments: </span>
      <br /><span style={commentStyle}>{commentsList}</span>
    </div>
    </>
    )
}
