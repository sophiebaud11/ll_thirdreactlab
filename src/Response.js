import React, { useState } from 'react'
import like from './like.png'

export default function Response({ setShowForm, addLike }) {

  return (
    <>
    <div>
      <button onClick={() => setShowForm(true)}>Back</button>
    </div>
    <div>
      <button onClick={() => addLike()}><img src={like} width="20px" alt="like"/>Like!</button>
    </div>
    <div>
    </div>
    </>
 )
}
