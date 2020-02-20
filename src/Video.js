import React, { useRef, useEffect, useState, useCallback } from 'react'
import Player from '@vimeo/player'
import Play from './Play.js'

export default function Video({ onPause, idValue, setTimeStamp, setCommentForm }) {
    const container = useRef(document.createElement('div'))
    const player = useRef()
    const [ready, setReady] = useState(false)

    const videoRef = useCallback(node => {
      if (node !== null) {
        node.appendChild(container.current)
      }
    }, [])

    useEffect(() => {
      (async () => {
         player.current = await new Player(container.current, {
            id: idValue,
            width: '1000px',
            height: '600px',
            controls: false,
            autoplay: false,
            muted: true
          })
        setReady(true)
      })()
    }, [])

    return (
      <div>
          {ready &&
            <>
            <div ref={videoRef}></div>
            <Play player={player} setTimeStamp={setTimeStamp} setCommentForm={setCommentForm}/>
            </>
          }
      </div>
    )
  }
