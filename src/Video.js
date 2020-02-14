import React, { useRef, useEffect, useState, useCallback } from 'react'
import Player from '@vimeo/player'

export default function Video({ onPause, idValue }) {
    const container = useRef(document.createElement('div'))
    const player = useRef()
    const [ready, setReady] = useState(false)

    const videoRef = useCallback(node => {
      if (node !== null) {
        node.appendChild(container.current)
      }
    }, [])

    useEffect(() => {
      if (player.current) {
        container.current = document.createElement('div')
        setReady(false)
      }
      (async () => {
         player.current = await new Player(container.current, {
            id: idValue,
            width: '1000px',
            height: '600px',
            controls: true,
            autoplay: false,
            muted: true
          })
        setReady(true)
      })()
    }, [idValue])

    return (
      <div>
          {ready &&
            <>
            <div ref={videoRef}></div>
            </>
          }
      </div>
    )
  }
