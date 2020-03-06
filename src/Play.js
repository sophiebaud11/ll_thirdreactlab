import React, { useState } from 'react'
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

  var stopwatchInterval
  function commentButton() {
    getTimestamp()
    setCommentForm(true)
  }
  function saveComment() {
    setCommentRoll(commentArray)
  }
// put stopwatch interval into a useeffect tripped by mode 


  function showRoll(type) {
    player.current.getDuration().then(function(duration){
      setDuration(duration)
    })
    for (var i = 0; i < commentArray.length; i++) {
      commentData[rollComments[i].time] = rollComments[i].text
    }
    var stopwatchSeconds = 0
    console.log(playing)
    stopwatchInterval = setInterval(() => {
        if (playing) {
          stopwatchSeconds++
          console.log(stopwatchSeconds)
          for (const comment in commentData) {
            console.log(comment)
            if (stopwatchSeconds === Math.round(comment)) {
              setMatch(matchComments => [...matchComments, {time: comment, text: commentData[comment]}])
            }
          }
          if (stopwatchSeconds === Math.round(videoDuration)) {
            clearInterval(stopwatchInterval)
            return
          }
        }
      }, 1000)
  function showSaved () {
    setMode("showComments")
    console.log("showing saved")
    player.current.setCurrentTime(0).then(function(seconds) {
      player.current.play()
    })
    showRoll(playing)
  }

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
          showRoll("clear")
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
  const getTimestamp = () => {
    player.current.getCurrentTime().then(function(seconds) {
      setTimeStamp(seconds)
    })
  }
  return (
    <>
      <div style={p4}>
        <button style={buttonStyle} onClick={() => playPause(mode)}>{buttonText}</button>
        <button style={buttonStyle} onClick={() => addLike()}><img src={like} width="20px" alt="like"/>Like!</button>
        <button style={buttonStyle} onClick={commentButton}>Leave a Comment</button>
        <button style={buttonStyle} onClick={saveComment}>Save Comments</button>
        <button style={buttonStyle} onClick={showSaved}>Show Saved Comments</button>
      </div>
      <div style={r3}>
        <Roll matchComments={matchComments} />
      </div>
    </>

)}
