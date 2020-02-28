import React, { useRef, useEffect, useState, useCallback } from 'react'
import Player from '@vimeo/player'
import Play from './Play.js'
import { videoStyle } from './styles.js'

export default function Video({ onPause, idValue, setTimeStamp, setCommentForm, addLike, commentArray, setCommentRoll, rollComments, setShowRoll, playing, setPlaying }) {
    const container = useRef(document.createElement('div'))
    const player = useRef()
    const [ready, setReady] = useState(false)

    const videoRef = useCallback(node => {
      if (node !== null) {
        node.appendChild(container.current)
      }
    }, [])

    useEffect(() => {
      if (idValue) {
        container.current = document.createElement('div')
        setReady(false)
      }
      (async () => {
         player.current = await new Player(container.current, {
            id: idValue,
            width: '500px',
            controls: false,
            autoplay: true,
            muted: true
          })
        setReady(true)
      })()
    }, [idValue])

    return (
      <div>
          {ready &&
            <>
            <div style={videoStyle} ref={videoRef}></div>
            <Play playing={playing} setPlaying={setPlaying} player={player} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm} addLike={addLike} commentArray={commentArray} setCommentRoll={setCommentRoll} rollComments={rollComments} setShowRoll={setShowRoll} />
            </>
          }
      </div>
    )
  }
