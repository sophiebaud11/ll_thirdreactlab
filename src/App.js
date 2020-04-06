import React, { useState, useRef, useEffect } from 'react'
import Video from './Video'
import Play from './Play'
import Search from './Search'
import Roll from './Roll'
import Panel from './Panel'
import Firebase from 'firebase'
import Comment from './Comment.js'
import commentData from './dataModel.js'
import { config } from './config.js'

import { p1, p2, p3, p4, r2 } from './styles.js'

export default function App() {
  const [idValue, setId] = useState('')
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
  const [sessionId, setSessionId] = useState('')
  const [data, setData] = useState([])
  const [username, setUser] = useState('')


  useEffect(() => {
      Firebase.initializeApp(config)
    }, [])

  // useEffect(() => {
  //   console.log(commentArray)
  //   console.log(sessionId)
  //
  //   const writeUserData = () => {
  //     var newKey = Firebase.database().ref().child('comments').push().key
  //     var updates = {}
  //     updates['/comments/' + newKey] = data
  //     Firebase.database().ref('/').update(updates)
  //     console.log('DATA SAVED')
  //   }
  //   if (saved) {
  //     writeUserData()
  //   }
  // }, [saved, commentArray, idValue, sessionId])

  function newVideo(formState) {
    console.log(formState.video)
    console.log(formState.user)
    const videoId = formState.video
    setId(formState.video)
    setUser(formState.user)
    setComment('')
    setArray([])
    setLike(0)
    setMatch([])
    let commentData = {}
    // check database for if this video id is already a key; if it is, update that with the new user & their comments, if not, add the video id as a new key to the database
    Firebase.database().ref().once('value').then(function(snapshot) {
        const dbState =  snapshot.val()
        console.log('db snap:', {dbState})
        return dbState
    })
    const newSessionKey = Firebase.database().ref().child('videos').push().key
    console.log(videoId)
    console.log("doesn't include")
    var updates = {}
    updates['/videos/' + videoId + '/'] = newSessionKey
    Firebase.database().ref().update(updates)
    setSessionId(newSessionKey)
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
    //update db with user object & comment
    let newComment = {
        user: username,
        comment: commentArray
    }
    const sessionRef = Firebase.database().ref('/session')
    sessionRef.child(sessionId).update(newComment)
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
