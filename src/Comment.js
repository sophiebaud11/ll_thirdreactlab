import React, { useContext, useReducer } from 'react'
import { buttonStyle, inputStyle} from './styles.js'
import { updateSessionData, SessionData } from './context.js'

const commentReducer = (markers, action) => {
  switch (action.type) {
  case 'comment':
    return {...markers, text: action.text, time: action.time}
  default:
    alert('failed to set marker; try again')
  }
}
export default function Comment (props) {
  const { timeStamp, commentValue, setArray, commentArray, setComment, setCommentForm } = props
  const [thisComment, setThisComment] = useReducer(commentReducer, null)
  const markers = useContext(SessionData).comments
  const updateSession = useContext(updateSessionData)


  function onCommentSubmit (timeStamp) {
    const time = timeStamp
    const text = commentValue
    const uid = new Date().getTime().toString()
    setArray([...commentArray, { time: time, text: text, uid: uid }])
    console.log("comment submitted")
    updateSession({type: 'addComment', comment: commentArray})
    setThisComment({type: 'clear'})
    setComment('')
    setCommentForm(false)
  }



  return (
    <>
    <div style={{color: "#142952"}}>
      Leave a comment: <input style={inputStyle} type="text" value={commentValue}  onChange={e => setComment(e.target.value)}></input>
      <button style={buttonStyle} onClick={() => onCommentSubmit(timeStamp)}>Submit!</button>
    </div>
    </>
  )

}
