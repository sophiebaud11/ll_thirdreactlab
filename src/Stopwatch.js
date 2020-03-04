import React, { useEffect, useState } from 'react';
import ReactStopwatch from 'react-stopwatch';
import commentData from './dataModel'
import Roll from './Roll'

export default function Stopwatch({ playing, videoDuration }) {
  const [matchComments, setMatch] = useState([])
// keep checking on tihs logic, see if you can get to the point where you remove the buttons
  console.log(videoDuration)
  console.log(matchComments)
  var seconds = 0
  var stopwatchInterval = null
  function checkSeconds() {
      seconds++
      console.log(seconds)
      for (const comment in commentData) {
        if (seconds === Math.round(comment)) {
          setMatch([...matchComments, {time: comment, text: commentData[comment]}])
        }
      }
      if (seconds === Math.round(videoDuration)) {
        clearInterval(stopwatchInterval)
        return
      }
    }

  function startStopwatch() {
    stopwatchInterval = setInterval(checkSeconds, 1000)
  }
  function stopStopwatch() {
    clearInterval(stopwatchInterval)
  }

  return(
    <>
    <Roll matchComments={matchComments} />
    <button onClick={startStopwatch}>start</button>
    <button onClick={stopStopwatch}>stop</button>
    </>
  )
}
