import React from 'react';

export default function Panel({ likeValue }) {
  console.log(likeValue)
  if (likeValue === true) {
    return (
      <p>Liked!</p>
    )
  } else {
    return (
      <p>No likes yet.</p>
    )
  }
}
