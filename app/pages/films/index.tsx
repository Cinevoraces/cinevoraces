import React, { useState, useEffect } from 'react';
import { Interaction } from '@components/Input';

export default function Films() {
  const [isClickedBookmark, setIsClickedBookmark] = useState(false);
  const [isClickedLike, setIsClickedLike] = useState(false);
  const [isClickedStar, setIsClickedStar] = useState(false);
  const [rating, setRating] = useState(null);
  const [isClickedView, setIsClickedView] = useState(false);

  return (
    <main className="container mx-auto my-16 px-4 flex flex-col gap-8">
      <Interaction
        type="bookmark"
        counter={125}
        isClicked={isClickedBookmark}
        onClick={() => {
          console.log('Coucou je viens juste de bookmark !!');
          setIsClickedBookmark(!isClickedBookmark);
        }}
      />
      <Interaction
        type="like"
        counter={125}
        isClicked={isClickedLike}
        onClick={() => {
          console.log('Coucou je viens juste de like !!');
          setIsClickedLike(!isClickedLike);
        }}
      />
      <Interaction
        type="starButton"
        counter={125}
        isClicked={isClickedStar}
        onClick={() => {
          console.log('Coucou je viens juste de star !!');
          setIsClickedStar(!isClickedStar);
        }}
      />
      <Interaction
        type="view"
        counter={125}
        isClicked={isClickedView}
        onClick={() => {
          console.log('Coucou je viens juste de view !!');
          setIsClickedView(!isClickedView);
        }}
      />
    </main>
  );
}
