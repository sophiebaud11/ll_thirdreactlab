import React from 'react';

export default function Panel({ likeValue, commentArray }) {

  const commentsList = commentArray ? <div>
    {commentArray.map((item,i) => <p key={i}>{commentArray[i]}</p>)}
  </div> : <p>No comments yet!</p>

  return (
    <>
    <h1>Likes:</h1>
    <p> {likeValue}</p>
    <h1>Comments: </h1>
    {commentsList}
    </>
    )
}
// {commentArray && <div>
//   {commentArray.map((item,i) => <p key={i}>{commentArray[i]}</p>)}
// </div>}
// {!commentArray && <p>No comments yet!</p>}
