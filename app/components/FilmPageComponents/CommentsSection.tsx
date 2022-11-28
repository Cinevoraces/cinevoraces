import React from 'react';
import type { Comment } from '@custom_types/types';
import PostCard from '@components/PostCard';

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  console.log(comments);
  return (
    <section id='comments-section' className='w-full flex flex-col gap-4'>
      { 
        comments.length === 0 ? 
          (<p className='text-center'>Aucun commentaire pour ce film</p>)
          : (
            <>
              <h2 className='text-2xl font-semibold lg:text-3xl text-center'>{`Commentaires (${comments.length})`}</h2>
              {
                comments.map((c) => (
                  <PostCard key={c.author_pseudo} type='comment' {...c}/>
                ))
              }
            </>
          )
      }
    </section>

  );
}
