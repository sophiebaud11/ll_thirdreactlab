import React, { useState } from 'react';
import Panel from './Panel'

export default function Response() {
  const [likeValue, setLike] = useState(false)

  console.log(likeValue)
  return (
    <>
    <div>
      <button onClick={() => setLike(true)}><img src="https://www.iconfinder.com/icons/1565103/like_like_button_liked_likes_thumbs_up_icon" /><br />Like!</button>
    </div>
    <div>
    <Panel likeValue={likeValue}/>
    </div>
    </>
 )
}
