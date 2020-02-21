import React, { useState } from 'react'
import like from './like.png'
import { buttonStyle, p4 } from './styles.js'

export default function Play (props) {
  const { player, setTimeStamp, setCommentForm, addLike } = props
  const [ playing, setPlaying ] = useState(true)
  const buttonText = playing ? 'Pause' : 'Play'

  function commentButton() {
    getTimestamp()
    setCommentForm(true)
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
      </div>
    </>

  )
}
