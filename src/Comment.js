import React, { useState } from 'react'
import { buttonStyle, inputStyle} from './styles.js'

// add a log of the timestamp, and a showcommentform state to reset the form

export default function Comment (props) {
  const { timeStamp, onCommentSubmit, commentValue, setComment } = props
  return (
    <>
    <div>
      <form>
        <label>
          Leave a comment:
        </label>
        <input style={inputStyle} type="text" value={commentValue}  onChange={e => setComment(e.target.value)}></input>
      </form>
      <button style={buttonStyle} onClick={() => onCommentSubmit(timeStamp)}>Submit!</button>
    </div>
    </>
  )

}
