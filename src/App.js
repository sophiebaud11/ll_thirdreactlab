import React, { useState } from 'react'
import Video from './Video'
import Response from './Response'
import Search from './Search'
import Panel from './Panel'
import Comment from './Comment.js'
import { p1, p2, p3 } from './styles.js'

export default function App() {
  const [idValue, setId] = useState(null)
  const [showForm, setShowForm] = useState(true)
  const [commentValue, setComment] = useState('')
  const [commentArray, setArray] = useState([])
  const [likeValue, setLike] = useState(0)
  const [timeStamp, setTimeStamp] = useState(null)
  const [showCommentForm, setCommentForm] = useState(false)

  console.log(timeStamp)
// add show form state
  function sendData(searchValue) {
    setId(searchValue)
    // setShowForm(false)
  }
  function addLike() {
    setLike(likeValue + 1)
  }
  function onCommentSubmit (timeStamp) {
    setArray([...commentArray, commentValue + " (comment made at " + timeStamp +")"])
    setComment('')
    setCommentForm(false)
  }

  return (
    <>
      <div style={p1}>
        <div style={p2}>
        Search:
        <Search sendData={sendData} />
      {idValue &&
        <>
          <Video idValue={idValue} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm}/>
          <Response setShowForm={setShowForm}  addLike={addLike}/>
        </>
      }
      {(timeStamp && showCommentForm) &&
        <Comment timeStamp={timeStamp} onCommentSubmit={onCommentSubmit} commentValue={commentValue} setComment={setComment}/>
      }
      </div>
      <div style={p3}>
      {idValue &&
        <Panel likeValue={likeValue} commentArray={commentArray}/>
      }
      </div>
    </div>

    </>
    )
  }
