import React, { useState } from 'react'
import Video from './Video'
import Search from './Search'
import Roll from './Roll'
import Panel from './Panel'
import Comment from './Comment.js'
import { p1, p2, p3, p4, r2, r3 } from './styles.js'

export default function App() {
  const [idValue, setId] = useState(null)
  const [commentValue, setComment] = useState('')
  const [commentArray, setArray] = useState([])
  const [likeValue, setLike] = useState(0)
  const [timeStamp, setTimeStamp] = useState(null)
  const [showCommentForm, setCommentForm] = useState(false)
  const [rollComments, setCommentRoll] = useState([])
  const [showRollComments, setShowRoll] = useState(false)

  function newVideo(searchValue) {
    setId(searchValue)
    setComment('')
    setArray([])
    setLike(0)
  }
  function addLike() {
    setLike(likeValue + 1)
  }
  function onCommentSubmit (timeStamp) {
    setArray([...commentArray, {time: timeStamp, text: commentValue}])
    // setArray([...commentArray, commentValue + " (comment made at " + timeStamp +")", timeStamp])
    setComment('')
    setCommentForm(false)
  }

  if (idValue) {
    return (
      <>
      <div style={p1}>
        <Search newVideo={newVideo} />
      </div>
      <div style={r2}>
        <div style={p2}>
        <Video idValue={idValue} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm} addLike={addLike} commentArray={commentArray} setCommentRoll={setCommentRoll} rollComments={rollComments} setShowRoll={setShowRoll} />
          <div style={p4}>
            {(timeStamp && showCommentForm) &&
              <Comment timeStamp={timeStamp} onCommentSubmit={onCommentSubmit} commentValue={commentValue} setComment={setComment}/>
            }
          </div>
        </div>
        <div style={p3}>
          <Panel likeValue={likeValue} commentArray={commentArray}/>
        </div>
      </div>
      <div style={r3}>
        {(showRollComments) &&
        <Roll setCommentRoll={setCommentRoll} rollComments={rollComments} />
        }
      </div>
      </>
    )
  }
  else {
    return (
      <div style={p1}>
          <Search newVideo={newVideo} />
      </div>
    )
  }
}

  // return (
  //   <>
  //     <div style={p1}>
  //       <div style={p2}>
  //       Search:
  //       <Search newVideo={newVideo} />
  //     {idValue &&
  //       <>
  //         <Video idValue={idValue} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm}/>
  //
  //         <Response addLike={addLike}/>
  //       </>
  //     }
  //     {(timeStamp && showCommentForm) &&
  //       <Comment timeStamp={timeStamp} onCommentSubmit={onCommentSubmit} commentValue={commentValue} setComment={setComment}/>
  //     }
  //     </div>
  //     <div style={p3}>
  //     {idValue &&
  //       <Panel likeValue={likeValue} commentArray={commentArray}/>
  //     }
  //     </div>
  //   </div>
  //
  //   </>
  //   )
  // }
