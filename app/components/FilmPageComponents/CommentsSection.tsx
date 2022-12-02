import type { FormEventHandler, ForwardedRef } from 'react';
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
  onSubmit: FormEventHandler;
}

const CommentsSection = React.forwardRef<HTMLTextAreaElement, CommentsSectionProps>(({ comments, onSubmit }, ref) => {
  CommentsSection.displayName = 'CommentsSection';
  // Special state to handle form rendering
  const [isCommentFormOpened, setIsCommentFormOpened] = useState(false);
  const [isEditionFormOpened, setIsEditionFormOpened] = useState(false);
  const { pseudo, avatar_url } = useAppSelector(user);
  const id = Number(useAppSelector(user).id) || undefined;

  const toggleCommentForm = () => {
    setIsCommentFormOpened(!isCommentFormOpened);
  };
  const toggleEditionForm = () => {
    setIsEditionFormOpened(!isEditionFormOpened);
  };

  const reorderComments = (id: number | undefined = undefined, comments: Comment[]) => {
    if (!id) return comments;
    const connectedUserComment = comments.filter((c) => (c.author_id === id));
    if (connectedUserComment.length === 0) return comments;
    const otherComments = comments.filter((c) => (c.author_id !== id));
    return [connectedUserComment[0], ...otherComments];
  };

  const orderedComments = reorderComments(id, comments);

  console.log(id, typeof id);
  console.log(orderedComments.filter((c) => (c.author_id == id)).length === 0);

  return (
    <section id='comments-section' className='w-full flex flex-col gap-4'>
      <h2 className='text-2xl font-semibold lg:text-3xl text-center'>{`Commentaires (${comments.length})`}</h2>
      {
        (id && orderedComments.filter((c) => (c.author_id === id)).length === 0 && !isCommentFormOpened) && 
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
          author_pseudo={pseudo!}
          author_avatar={avatar_url!}
          publishing_date={(new Date()).toISOString()}>
          <form id="comment-form" action="submit" className='flex flex-col gap-4'
            onSubmit={(e) => {
              onSubmit(e); toggleCommentForm(); 
            }}
          >
            <TextAreaRef id='comment-form' ref={ref}/>
            <div id='comment-send-cancel' className='flex justify-end gap-4'>
              <Button customStyle='rounded'>
                <Image
                  src={SendLogo}
                  alt=""
                  width={16}
                  height={16}
                />
                Poster</Button>
              <Button onClick={toggleCommentForm} customStyle='rounded'>Annuler</Button>
            </div>
          </form>
        </PostCard>
      }
      { 
        orderedComments.length === 0 ? 
          (<p className='text-center'>Aucun commentaire pour ce film.</p>)
          : (
            <>
              {
                orderedComments.map((c) => (
                  <PostCard 
                    key={c.author_pseudo} 
                    type='comment' 
                    {...c} >
                    {
                      (!isEditionFormOpened) &&
                        ( <>
                          <p>{c.comment}</p>
                          {
                            (id === c.author_id) &&
                          <div className='flex justify-end'>
                            <Button 
                              onClick={toggleEditionForm}
                              customStyle='rounded'>
                                  Éditer
                            </Button>
                          </div>
                          }
                        </>)
                    }
                    {
                      (isEditionFormOpened && id === c.author_id) &&
                        <form id="comment-form" action="submit" className='flex flex-col gap-4'
                          onSubmit={(e) => {
                            onSubmit(e); toggleEditionForm(); 
                          }}
                        >
                          <TextAreaRef id='comment-form' ref={ref} defaultValue={c.comment}/>
                          <div id='comment-send-cancel' className='flex justify-end gap-4'>
                            <Button>
                              <Image
                                src={SendLogo}
                                alt=""
                                width={16}
                                height={16}
                              />
                              Confirmer
                            </Button>
                            <Button onClick={toggleEditionForm}>Annuler</Button>
                          </div>
                        </form>
                    }
                  </PostCard>
                ))
              }
            </>
          )
      }
    </section>
  );
});

export default CommentsSection;
