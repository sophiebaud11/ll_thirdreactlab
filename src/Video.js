import React, { useRef, useEffect, useState, useCallback } from 'react'
import Player from '@vimeo/player'
import Play from './Play.js'
import { videoStyle, videoTitle, titleStyle } from './styles.js'

export default function Video({ onPause, idValue, setTimeStamp, setCommentForm, addLike, commentArray, setCommentRoll, rollComments, setShowRoll, player, playing, setPlaying, setDuration }) {
    const container = useRef(document.createElement('div'))
    const [ready, setReady] = useState(false)
    const [theTitle, setTitle] = useState("")

    const videoRef = useCallback(node => {
      if (node !== null) {
        node.appendChild(container.current)
      }
    }, [])

    function getTitle() {
      player.current.getVideoTitle().then(function(title) {
        console.log(title)
        setTitle(title)
      }
    )}

    useEffect(() => {
      if (idValue) {
        container.current = document.createElement('div')
        setReady(false)
      }
      (async () => {
         player.current = await new Player(container.current, {
            id: idValue,
            maxWidth: '1000px',
            controls: false,
            autoplay: true,
            muted: true
          })
        setReady(true)
        getTitle()
      })()
    }, [idValue])


    return (
      <div>
          {ready &&
            <>
            <div style={videoStyle} ref={videoRef}></div>
            <p style={videoTitle}>{theTitle}</p>
            </>
          }
      </div>
    )
  }
