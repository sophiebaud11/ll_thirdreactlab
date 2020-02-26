import React, { useState } from 'react'
import like from './likeshadow.png'
import { buttonStyle, p4 } from './styles.js'

export default function Play (props) {
  const { player, setTimeStamp, setCommentForm, addLike, commentArray } = props
  const [ playing, setPlaying ] = useState(true)
  const buttonText = playing ? 'Pause' : 'Play'

  function commentButton() {
    getTimestamp()
    setCommentForm(true)
  }
  function saveComment() {
// save comment array to a new state variable - log that new state variable to see if how it's structured
// have a roll past comments button that rolls thru that data as the video plays, showing comments in sync
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
      </div>
    </>

  )
}
