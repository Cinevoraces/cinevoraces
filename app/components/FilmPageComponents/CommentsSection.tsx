import { forwardRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import PostCard from '@components/PostCard';
import Button from '@components/Input/Button';
import { TextAreaRef } from '@components/Input';
import SendLogo from '@public/icons/send-icon.svg';
import cutText from '@utils/cutText';
import type { Comment } from '@custom_types/movies';
import type { FormEventHandler } from 'react';

interface CommentsSectionProps {
  comments: Comment[];
  onSubmit: FormEventHandler;
}

const CommentsSection = forwardRef<HTMLTextAreaElement, CommentsSectionProps>(({ comments, onSubmit }, ref) => {
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

  // Using Ref to renew expansionState and allow freshly posted comment (just in cache) to be expanded as well as the others from API
  const orderedComments = useRef<Comment[]>([]);
  const cutComments = useRef<(string|boolean)[][]>([]);
  useEffect(()=> {
    orderedComments.current = reorderComments(id, comments);
    cutComments.current = orderedComments.current.map((c: Comment) => cutText(c.comment, 700));
    setCommentsExpansionStates(orderedComments.current.map((c: Comment)=> false));
  }, [id, comments]);
  const [commentsExpansionStates, setCommentsExpansionStates] = useState(orderedComments.current.map((c: Comment)=> false));

  const toggleCommentExpansion = (index: number) => {
    const newState = commentsExpansionStates.map((ces: boolean, i: number) => (index === i)? !ces : ces);
    setCommentsExpansionStates(newState);
  };
  console.log(orderedComments.current, commentsExpansionStates, cutComments.current);

  return (
    <section id='comments-section' className='w-full flex flex-col gap-4 '>
      <h2 className='text-2xl font-semibold lg:text-3xl text-center'>{`Commentaires (${comments.length})`}</h2>
      { // Add Comment button
        (id && orderedComments.current.filter((c) => (c.author_id === id)).length === 0 && !isCommentFormOpened) && 
            <div className='flex justify-center'>
              <Button 
                customStyle='empty' 
                onClick={toggleCommentForm}>
                Ajouter un commentaire
              </Button>
            </div>
      }
      { // Comment form on top of any comment
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
      <div className='grid grid-cols-1 gap-4 auto-rows-auto md:gap-6 lg:gap-8 lg:grid-cols-2  '>
        { // Displaying all published comments
          orderedComments.current.length === 0 ? 
            (<p className='text-center lg:col-span-2'>Aucun commentaire pour ce film.</p>)
            : (
              <>
                {
                  orderedComments.current.map((c, i) => (
                    <PostCard 
                      key={c.author_pseudo} 
                      type='comment' 
                      {...c} >
                      {
                        (!isEditionFormOpened) &&
                        ( <>
                          <p>
                            {
                              (cutComments.current[i][1] && commentsExpansionStates[i]) ?
                                c.comment
                                : cutComments.current[i][0]
                            }
                          </p>
                          {
                            (id === c.author_id || cutComments.current[i][1]) &&
                            <div className='flex justify-end gap-4'>
                              {
                                (id === c.author_id) &&
                                  <Button 
                                    onClick={toggleEditionForm}
                                    customStyle='rounded'>
                                        Éditer
                                  </Button>
                              }
                              { (c.comment.length > 700) &&
                                <Button onClick={() => toggleCommentExpansion(i)} customStyle='rounded'>
                                  {
                                    (!commentsExpansionStates[i]) ? 'Voir plus...' : 'Réduire'
                                  }
                                </Button>
                              }
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
                            <Button customStyle='rounded'>
                              <Image
                                src={SendLogo}
                                alt=""
                                width={16}
                                height={16}
                              />
                              Confirmer
                            </Button>
                            <Button onClick={toggleEditionForm} customStyle='rounded'>Annuler</Button>
                          </div>
                        </form>
                      }
                    </PostCard>
                  ))
                }
              </>
            )
        }
      </div>
      
    </section>
  );
});

export default CommentsSection;
