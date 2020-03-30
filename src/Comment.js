import React from 'react'
import { buttonStyle, inputStyle} from './styles.js'

export default function Comment (props) {
  const { timeStamp, onCommentSubmit, commentValue, setComment } = props
  

  return (
    <>
    <div style={{color: "#142952"}}>
      Leave a comment: <input style={inputStyle} type="text" value={commentValue}  onChange={e => setComment(e.target.value)}></input>
      <button style={buttonStyle} onClick={() => onCommentSubmit(timeStamp)}>Submit!</button>
    </div>
    </>
  )

}
