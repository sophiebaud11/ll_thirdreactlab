import React, { useEffect, useState } from 'react';
import ReactStopwatch from 'react-stopwatch';
import commentData from './dataModel'

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
// trigger this Stopwatch when you show saved comments
  useEffect(() => {
    const stopwatchInterval = setInterval(() => {
      //iterate w 2 for loops, check eacj second against eacj item in comment data
      setSeconds(seconds => seconds + 1)
      for (var i = 0; i < commentData.length; i++) {
        if (seconds = commentData[i].time) {
          console.log(commentData[i].timetime)
          console.log(seconds)
        }
      }
    }, 1000)
    return () => clearInterval(stopwatchInterval)

  }, [])
  return(
    <>
      <div>Stopwatch</div>
    </>
  )
}
