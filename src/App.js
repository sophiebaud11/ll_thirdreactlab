import React, { useState, useRef, useEffect } from 'react'
import Video from './Video'
import Play from './Play'
import Search from './Search'
import Roll from './Roll'
import Panel from './Panel'
import Comment from './Comment.js'
import * as FirestoreService from './Firebase.js'

import { p1, p2, p3, p4, r2 } from './styles.js'

export default function App() {
  const [idValue, setId] = useState(null)
  const [commentValue, setComment] = useState('')
  const [commentArray, setArray] = useState([])
  const [likeValue, setLike] = useState(0)
  const [timeStamp, setTimeStamp] = useState(null)
  const [showCommentForm, setCommentForm] = useState(false)
  const [rollComments, setCommentRoll] = useState([])
  const [playing, setPlaying] = useState(true)
  const player = useRef()
  const [matchComments, setMatch] = useState([])
  const [mode, setMode] = useState("initial")
  const [currentTime, setCurrentTime] = useState(0)
  const [collectionId, setCollectionId] = useState("")
  const [error, setError] = useState();


  useEffect(() => {
    FirestoreService.authenticateAnonymously().then(userCredential => {
      setCollectionId("8KsivCkLneKoUOslMaZb")
      if (collectionId) {
        console.log("hi")
      }
    })
    .catch(() => setError('anonymous-auth-failed'));
  }, [collectionId, setCollectionId]);


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
        <Video player={player} idValue={idValue} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm} addLike={addLike} commentArray={commentArray} setCommentRoll={setCommentRoll} rollComments={rollComments} playing={playing} setPlaying={setPlaying} />
        <Play playing={playing} setPlaying={setPlaying} player={player} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm} addLike={addLike} commentArray={commentArray} setCommentRoll={setCommentRoll} rollComments={rollComments} setCurrentTime={setCurrentTime} currentTime={currentTime} mode={mode} />
        <div style={p4}>
          {(timeStamp && showCommentForm) &&
            <Comment timeStamp={timeStamp} onCommentSubmit={onCommentSubmit} commentValue={commentValue} setComment={setComment}/>
          }
        </div>
        <Panel likeValue={likeValue} commentArray={commentArray}/>
        </div>
        <div style={p3}>
          <Roll matchComments={matchComments} currentTime={currentTime} playing={playing} player={player} setMode={setMode} setMatch={setMatch} commentArray={commentArray} rollComments={rollComments} mode={mode} />
        </div>
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
