import React, { useState, useEffect } from 'react'
import { buttonStyle, commentStyle, titleStyle, showButton } from './styles.js'
import commentData from './dataModel.js'


export default function Roll({ matchComments, currentTime, playing, player, setMode, setMatch, commentArray, rollComments, mode }) {

  useEffect(() => {
    for (const comment in commentData) {
      if (currentTime + .1 >= comment && currentTime - .1 <= comment) {
        if (matchComments.length > 0) {
          console.log("first if")
          if (comment.text === matchComments[matchComments.length - 1].text) {
            break
          }
        }
        console.log("match!")
        setMatch(matchComments => [...matchComments, {time: comment, text: commentData[comment]}])
        }
      }
    }, [currentTime])

  function findMatch() {
    console.log("searching for match")
    for (var i = 0; i < commentArray.length; i++) {
        commentData[rollComments[i].time] = rollComments[i].text
      }
    console.log(commentData)
  }
  function showSaved () {
    setMode("showComments")
    let commentData = {}
    setMatch([])
    console.log("showing saved")
    player.current.setCurrentTime(0).then(function(seconds) {
      player.current.play()
    })
    findMatch()
  }
  const items = matchComments.map( (comment, i) => {
    return <p key={i}>{comment.text}</p>
  })

    return (
      <div>
        <div style={showButton}>
          <button style={buttonStyle} onClick={showSaved}>Show Saved Comments</button>
        </div>
          { mode === "showComments" && matchComments &&
            <>
            <div style={titleStyle}>
              Comments:
            </div>
            <div style={commentStyle}>
              {items}
            </div>
            </>
          }
      </div>
  )
}
