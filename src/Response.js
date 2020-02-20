import React, { useState } from 'react'
import like from './like.png'
import { buttonStyle } from './styles.js'

export default function Response({ setShowForm, addLike }) {

  return (
    <>
    <div>
      <button style={buttonStyle} onClick={() => setShowForm(true)}>Back</button>
    </div>
    <div>
      <button style={buttonStyle} onClick={() => addLike()}><img src={like} width="20px" alt="like"/>Like!</button>
    </div>
    </>
 )
}
