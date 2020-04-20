import React, { useState, useContext, useRef, useEffect } from 'react'
import Video from './Video'
import Play from './Play'
import Search from './Search'
import Roll from './Roll'
import Panel from './Panel'
import Firebase from 'firebase'
import Comment from './Comment.js'
import commentData from './dataModel.js'
import { updateSessionData, SessionData } from './Context.js'
import { config } from './config.js'
import Context from './Context.js'

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
  const [sessionID, setSessionID] = useState('')
  const [data, setData] = useState([])
  const [username, setUser] = useState('')
  const updateSession = useContext(updateSessionData)


  useEffect(() => {
      Firebase.initializeApp(config)
    }, [])

  function newVideo(formState) {
    updateSession({type: 'setSessionID'})
    updateSession({type: 'setUsername', name: formState.user})
    updateSession({type: 'setVideoID', id: formState.video})
    setId(formState.video)
  }
  function addLike() {
    setLike(likeValue + 1)
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
            <Comment timeStamp={timeStamp} commentValue={commentValue} setComment={setComment} commentArray={commentArray} setArray={setArray} setCommentForm={setCommentForm} />
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
