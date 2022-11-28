import React, { useState } from 'react';
import { Interaction } from '@components/Input';
import type { Metrics } from '@custom_types/types';

interface InteractionsProps {
  watchlist_count: number;
  views_count: number;
  likes_count: number;
  ratings_count: number;
};

export default function Interactions({ watchlist_count, likes_count, ratings_count, views_count }: InteractionsProps) {
  // Temp states to delete later
  const [isClickedBookmark, setIsClickedBookmark] = useState(false);
  const [isClickedLike, setIsClickedLike] = useState(false);
  const [isClickedStar, setIsClickedStar] = useState(false);
  const [rating, setRating] = useState(null);
  const [isClickedView, setIsClickedView] = useState(false);
  return (
    <div
      id="interactions"
      className="flex flex-col gap-6 ">
      <Interaction
        type="bookmark"
        counter={watchlist_count}
        isClicked={isClickedBookmark}
        onClick={() => {
          console.log('Coucou je viens juste de bookmark !!');
          setIsClickedBookmark(!isClickedBookmark);
        }}
      />
      <Interaction
        type="view"
        counter={views_count}
        isClicked={isClickedView}
        onClick={() => {
          console.log('Coucou je viens juste de view !!');
          setIsClickedView(!isClickedView);
        }}
      />
      <Interaction
        type="like"
        counter={likes_count}
        isClicked={isClickedLike}
        onClick={() => {
          console.log('Coucou je viens juste de like !!');
          setIsClickedLike(!isClickedLike);
        }}
      />
      <Interaction
        type="starButton"
        counter={ratings_count}
        isClicked={isClickedStar}
        onClick={() => {
          console.log('Coucou je viens juste de star !!');
          setIsClickedStar(!isClickedStar);
        }}
      />
    </div>
  );
}
