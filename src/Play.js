import React, { useState } from 'react'
import like from './likeshadow.png'
import Player from '@vimeo/player'
import commentData from './dataModel.js'
import { buttonStyle, p4 } from './styles.js'

export default function Play (props) {
  const { playing, setPlaying, player, setTimeStamp, setCommentForm, addLike, commentArray, setCommentRoll, rollComments, setShowRoll, setDuration } = props
  const buttonText = playing ? 'Pause' : 'Play'

  function commentButton() {
    getTimestamp()
    setCommentForm(true)
  }
  function saveComment() {
    setCommentRoll(commentArray)
// save comment array to a new state variable - log that new state variable to see if how it's structured
// have a roll past comments button that rolls thru that data as the video plays, showing comments in sync
  }
  function showRoll() {
    player.current.getDuration().then(function(duration){
      console.log(duration)
      setDuration(duration)
    })
    setShowRoll(true)
    setPlaying(true)
    console.log(rollComments)
    for (var i = 0; i < commentArray.length; i++) {
      commentData[rollComments[i].time] = rollComments[i].text
    }
    console.log(commentData)
    player.current.setCurrentTime(0).then(function(seconds) {
      player.current.play()
    }).catch(function(error) {
        switch (error.name) {
          case 'RangeError':
              // The time is less than 0 or greater than the video's duration
              break;

          default:
              // Some other error occurred
              break;
        }
      })

  }
  function hideRoll() {
    setShowRoll(false)
  }
  const playPause = () => {
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
  const getTimestamp = () => {
    player.current.getCurrentTime().then(function(seconds) {
      setTimeStamp(seconds)
    })
  }
  return (
    <>
      <div style={p4}>
        <button style={buttonStyle} onClick={playPause}>{buttonText}</button>
        <button style={buttonStyle} onClick={() => addLike()}><img src={like} width="20px" alt="like"/>Like!</button>
        <button style={buttonStyle} onClick={commentButton}>Leave a Comment</button>
        <button style={buttonStyle} onClick={saveComment}>Save Comments</button>
        <button style={buttonStyle} onClick={showRoll}>Show Saved Comments</button>
        <button style={buttonStyle} onClick={hideRoll}>Hide Saved Comments</button>
      </div>
    </>

  )
}
