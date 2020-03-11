import React, { useState, useEffect } from 'react'
import { buttonStyle } from './styles.js'
import commentData from './dataModel.js'

export default function Roll({ matchComments, currentTime, playing, player, setMode, setMatch, commentArray, rollComments }) {
  //query getcurrenttime to check if things match
  useEffect(() => {
    for (const comment in commentData) {
      console.log(comment)
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
    }, [currentTime, commentData])

  function findMatch() {
    console.log("searching for match")
    for (var i = 0; i < commentArray.length; i++) {
        commentData[rollComments[i].time] = rollComments[i].text
      }
    console.log(commentData)
  }
  function showSaved () {
    setMode("showComments")
    console.log("showing saved")
    console.log(currentTime)
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
        <p>{currentTime}</p>
        <button style={buttonStyle} onClick={showSaved}>Show Saved Comments</button>
        Comments:
          { matchComments &&
            <>
            {items}
            </>
          }
      </div>
  )
}
