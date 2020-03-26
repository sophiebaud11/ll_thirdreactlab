import React, { useState, useRef, useEffect } from 'react'
import Video from './Video'
import Play from './Play'
import Search from './Search'
import Roll from './Roll'
import Panel from './Panel'
import Firebase from 'firebase'
import Comment from './Comment.js'

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
  const [error, setError] = useState()
  const indexToUpdate = useRef(null)


  const config = {
    apiKey: "AIzaSyDcHFo130e0QqbOEa6wgcZwws858Xe326c",
    authDomain: "ll-thirdreactlab.firebaseapp.com",
    databaseURL: "https://ll-thirdreactlab.firebaseio.com",
    projectId: "ll-thirdreactlab",
    storageBucket: "ll-thirdreactlab.appspot.com",
    messagingSenderId: "465521793807",
    appId: "1:465521793807:web:74a2ed70d2b5a614fb3c7a"
  }
  const getUserData = () => {
    let ref = Firebase.database().ref('/')
    ref.on('value', snapshot => {
      const dbState = snapshot.val()
      console.log(`db snap: ${dbState}`)
      if (dbState) {
        setArray(dbState)
      }
    })
  }
  useEffect(() => {
      Firebase.initializeApp(config)
      getUserData()
    }, [])

  useEffect(() => {
    console.log(commentArray)
    const writeUserData = () => {
      Firebase.database().ref('/').set(commentArray)
      console.log('DATA SAVED')
    }
    if (commentArray.length > 0) {
      writeUserData()
    }
  }, [commentArray])


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
    const time = timeStamp
    const text = commentValue
    const uid = new Date().getTime().toString()
    setArray([...commentArray, { time: time, text: text, uid: uid }])
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
