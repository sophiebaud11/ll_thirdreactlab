import React, { useState, useEffect } from 'react'
import like from './likeshadow.png'
import Player from '@vimeo/player'
import Roll from './Roll.js'
import commentData from './dataModel.js'
import { buttonStyle, p4, r3 } from './styles.js'

export default function Play (props) {
  const { playing, setPlaying, player, setTimeStamp, setCommentForm, addLike, commentArray, setCommentRoll, rollComments } = props
  const buttonText = playing ? 'Pause' : 'Play'
  const [matchComments, setMatch] = useState([])
  const [videoDuration, setDuration] = useState(0)
  const [mode, setMode] = useState("")
  const [currentTime, setCurrentTime] = useState(0)

  const getTimestamp = () => {
    player.current.getCurrentTime().then(function(seconds) {
      setTimeStamp(seconds)
    })
  }

  var stopwatchInterval
  function commentButton() {
    getTimestamp()
    setCommentForm(true)
  }
  function saveComment() {
    setCommentRoll(commentArray)
  }
  useEffect(() => {
    const timer = setInterval(() => {
      player.current.getCurrentTime().then( secs => setCurrentTime(secs))
    }, 200)
    if (!playing) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [currentTime, player, playing])


// put stopwatch interval into a useeffect tripped by mode

  //
  // function showRoll(type) {
  //   player.current.getDuration().then(function(duration){
  //     setDuration(duration)
  //   })
  //
  //   var stopwatchSeconds = 0
  //   console.log(playing)
  //   stopwatchInterval = setInterval(() => {
  //       if (playing) {
  //         stopwatchSeconds++
  //         console.log(stopwatchSeconds)
  //         for (const comment in commentData) {
  //           console.log(comment)
  //           if (stopwatchSeconds === Math.round(comment)) {
  //             setMatch(matchComments => [...matchComments, {time: comment, text: commentData[comment]}])
  //           }
  //         }
  //         if (stopwatchSeconds === Math.round(videoDuration)) {
  //           clearInterval(stopwatchInterval)
  //           return
  //         }
  //       }
  //     }, 1000)

  const playPause = (mode) => {
    if (mode === "showComments") {
      console.log("showComments")
      switch (playing) {
        case false:
          player.current.play()
          setPlaying(true)
          break
        case true:
          player.current.pause()
          setPlaying(false)
          break
        default:
          break
      }
    }
    else if (mode === 'initial') {
        console.log("initial")
        setPlaying(false)
        switch (playing) {
          case false:
            player.current.play()
            setPlaying(true)
            break
          case true:
            player.current.pause()
            setPlaying(false)
            break
          default:
            break
      }
    }
  }
  return (
    <>
      <div style={p4}>
        <button style={buttonStyle} onClick={() => playPause(mode)}>{buttonText}</button>
        <button style={buttonStyle} onClick={() => addLike()}><img src={like} width="20px" alt="like"/>Like!</button>
        <button style={buttonStyle} onClick={commentButton}>Leave a Comment</button>
        <button style={buttonStyle} onClick={saveComment}>Save Comments</button>
      </div>
      <div style={r3}>
        <Roll matchComments={matchComments} currentTime={currentTime} playing={playing} player={player} setMode={setMode} setMatch={setMatch} commentArray={commentArray} rollComments={rollComments} />
      </div>
    </>

)}
