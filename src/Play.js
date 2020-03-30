import React, { useState, useEffect } from 'react'
import like from './likeshadow.png'
import Player from '@vimeo/player'
import Roll from './Roll.js'
import commentData from './dataModel.js'
import { buttonStyle, p4, r3 } from './styles.js'

export default function Play (props) {
  const { playing, setPlaying, player, setSaved, setTimeStamp, setCommentForm, addLike, commentArray, setCommentRoll, rollComments, setCurrentTime, currentTime, mode } = props
  const buttonText = playing ? 'Pause' : 'Play'
  const [videoDuration, setDuration] = useState(0)

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
    setSaved(true)
  }
  useEffect(() => {
    const timer = setInterval(() => {
      player.current.getCurrentTime().then( secs => setCurrentTime(secs))
    }, 200)
    if (!playing) {
      console.log("pause")
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [currentTime, player, playing])

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
    </>

)}
