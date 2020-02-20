import React, { useState } from 'react'

export default function Play (props) {
  const { player, setTimeStamp, setCommentForm } = props
  const [ playing, setPlaying ] = useState(false)
  const buttonText = playing ? 'pause' : 'play'

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
    <div>
      <button onClick={playPause}>{buttonText}</button>
    </div>
    <div>
      <button onClick={commentButton}>Leave a Comment</button>
    </div>
    </>

  )
}
