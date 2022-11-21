import React, { useState } from 'react';
import { Interaction } from '@components/Input';

export default function Films() {
  const [isClickedBookmark, setIsClickedBookmark] = useState(false);
  const [isClickedLike, setIsClickedLike] = useState(false);
  const [isClickedStar, setIsClickedStar] = useState(false);
  const [isClickedView, setIsClickedView] = useState(false);

  return (
    <main className="container mx-auto my-16 px-4 flex gap-8">
      <Interaction
        type="bookmark"
        isClicked={isClickedBookmark}
        onClick={() => {
          console.log('Coucou je viens juste de bookmark !!');
          setIsClickedBookmark(!isClickedBookmark);
        }}
      />
      <Interaction
        type="like"
        isClicked={isClickedLike}
        onClick={() => {
          console.log('Coucou je viens juste de like !!');
          setIsClickedLike(!isClickedLike);
        }}
      />
      <Interaction
        type="star"
        isClicked={isClickedStar}
        onClick={() => {
          console.log('Coucou je viens juste de star !!');
          setIsClickedStar(!isClickedStar);
        }}
      />
      <Interaction
        type="view"
        isClicked={isClickedView}
        onClick={() => {
          console.log('Coucou je viens juste de view !!');
          setIsClickedView(!isClickedView);
        }}
      />
    </main>
  );
}
