import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import PostCard from '@components/PostCard';
import Button from '@components/Input/Button';
import { TextAreaRef } from '@components/Input';
import type { Comment } from '@custom_types/types';
import SendLogo from '@public/icons/send-icon.svg';

interface CommentsSectionProps {
  comments: Comment[];
  userId?: number;
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  const [isCommentFormOpened, setIsCommentFormOpened] = useState(false);
  const toggleCommentForm = () => {
    setIsCommentFormOpened(!isCommentFormOpened);
  };
  const connectedUser = useAppSelector(user);
  const commentFormRef = useRef<HTMLTextAreaElement>(null);
  return (
    <section id='comments-section' className='w-full flex flex-col gap-4'>
      <h2 className='text-2xl font-semibold lg:text-3xl text-center'>{`Commentaires (${comments.length})`}</h2>
      {
        (connectedUser.id && comments.filter((c) => c.author_id === connectedUser.id).length === 0 && !isCommentFormOpened) && 
        <div className='flex justify-center'>
          <Button 
            customStyle='empty' 
            onClick={toggleCommentForm}>
              Ajouter un commentaire
          </Button>
        </div>
      }
      {
        (isCommentFormOpened) &&
        <PostCard type='form'
          author_pseudo={connectedUser.pseudo!}
          author_avatar={connectedUser.avatar_url!}
          publishing_date={(new Date()).toISOString()}>
          <form id="comment-form" action="submit" className='flex flex-col gap-4'
            onSubmit={(e) => { 
              e.preventDefault();
              console.log(commentFormRef.current.value);
            }}
          >
            <TextAreaRef id='comment-form' ref={commentFormRef}/>
            <div id='comment-send-cancel' className='flex justify-end gap-4'>
              <Button>
                <Image
                  src={SendLogo}
                  alt=""
                  width={16}
                  height={16}
                />
                Poster</Button>
              <Button onClick={toggleCommentForm}>Annuler</Button>
            </div>
          </form>
        </PostCard>
      }
      { 
        comments.length === 0 ? 
          (<p className='text-center'>Aucun commentaire pour ce film.</p>)
          : (
            <>
              {
                comments.map((c) => (
                  <PostCard 
                    key={c.author_pseudo} 
                    type='comment' 
                    {...c} >
                    <p>c.comment</p>
                  </PostCard>
                ))
              }
            </>
          )
      }
    </section>

  );
}
