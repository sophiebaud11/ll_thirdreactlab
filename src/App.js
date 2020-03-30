import React, { useState, useRef, useEffect } from 'react'
import Video from './Video'
import Play from './Play'
import Search from './Search'
import Roll from './Roll'
import Panel from './Panel'
import Firebase from 'firebase'
import Comment from './Comment.js'
import { config } from './config.js'

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
  const [saved, setSaved] = useState(false)
  const sessionId = useRef()
  const [data, setData] = useState([])

  const getUserData = () => {
    let ref = Firebase.database().ref('/')
    ref.on('value', snapshot => {
      const dbState = snapshot.val()
      console.log('db snap:', {dbState})
      if (dbState) {
        setData(dbState)
      }
    })
    console.log('DATA RETRIEVED')
  }
  useEffect(() => {
      Firebase.initializeApp(config)
      getUserData()
    }, [])

  useEffect(() => {
    console.log(commentArray)
    console.log(sessionId)

    const writeUserData = () => {
      if (sessionId.current !== null) {
        let update = {[sessionId.current]: {
          videoId: idValue,
          comments: commentArray
        }}
        setData(update)
      }
      // make a new variable - stick comment array into an object and send that object to the db
      // the key of this object is the numeric date, then video id, then comment data
      Firebase.database().ref('/').set(data)
      console.log('DATA SAVED')
    }
    if (saved) {
      writeUserData()
    }
  }, [saved, commentArray, idValue, sessionId])


  function newVideo(searchValue) {
    setId(searchValue)
    sessionId.current = new Date().toString()
    setComment('')
    setArray([])
    setLike(0)
  }
  function addLike() {
    setLike(likeValue + 1)
  }
  function onCommentSubmit (timeStamp) {
    const time = timeStamp
    const text = commentValue
    const uid = new Date().getTime().toString()
    setArray([...commentArray, { time: time, text: text, uid: uid }])
    console.log("comment submitted")
    setComment('')
    setCommentForm(false)
    setSaved(false)
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
        <Play playing={playing} setSaved={setSaved} setPlaying={setPlaying} player={player} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm} addLike={addLike} commentArray={commentArray} setCommentRoll={setCommentRoll} rollComments={rollComments} setCurrentTime={setCurrentTime} currentTime={currentTime} mode={mode} />
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
