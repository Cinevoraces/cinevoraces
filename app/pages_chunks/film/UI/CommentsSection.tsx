import { forwardRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@store/store';
import { user } from '@store/slices/user';
import PostCard from '@components/PostCard';
import Button from '@components/Input/Button';
import { RefTextArea } from '@components/Input';
import SendLogo from '@public/icons/send-icon.svg';
import cutText from '@utils/cutText';
import { useTrail, animated } from '@react-spring/web';
import RichText from '@components/RichText';
import type { Comment } from 'models/custom_types/movies';
import type { FormEventHandler } from 'react';

import { backgroundColorStyles } from '@components/PostCard';

interface CommentsSectionProps {
  comments: Comment[];
  onSubmit: FormEventHandler;
}

const CommentsSection = forwardRef<HTMLTextAreaElement, CommentsSectionProps>(({ comments, onSubmit }, ref) => {
  CommentsSection.displayName = 'CommentsSection';
  // Internal params
  const maxDisplayChar = 650;
  // const backgroundColorStyles = [
  //   'bg-lime-800',
  //   'bg-white',
  //   'bg-purple',
  // ];
  // Special state to handle form rendering
  const [isCommentFormOpened, setIsCommentFormOpened] = useState(false);
  const [isEditionFormOpened, setIsEditionFormOpened] = useState(false);
  const { pseudo } = useAppSelector(user);
  const id = Number(useAppSelector(user).id) || undefined;

  const toggleCommentForm = () => {
    setIsCommentFormOpened(!isCommentFormOpened);
  };
  const toggleEditionForm = () => {
    setIsEditionFormOpened(!isEditionFormOpened);
  };

  const reorderComments = (id: number | undefined = undefined, comments: Comment[]) => {
    if (!id) return comments;
    const connectedUserComment = comments.filter((c) => c.author_id === id);
    if (connectedUserComment.length === 0) return comments;
    const otherComments = comments.filter((c) => c.author_id !== id);
    return [connectedUserComment[0], ...otherComments];
  };

  // Using state to renew expansionState and allow freshly posted comment (just in cache) to be expanded as well as the others from API
  const [orderedComments, setOrderedComments] = useState<Comment[]>([]);
  const [cutComments, setCutComments] = useState<(string | boolean)[][]>([]);
  const [commentsExpansionStates, setCommentsExpansionStates] = useState(comments.map((c: Comment) => false));
  useEffect(() => {
    setOrderedComments(reorderComments(id, comments));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, comments]);
  useEffect(() => {
    setCutComments(orderedComments.map((c: Comment) => cutText(c.comment, maxDisplayChar)));
    setCommentsExpansionStates(orderedComments.map((c: Comment) => false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, orderedComments]);
  const toggleCommentExpansion = (index: number) => {
    const newState = commentsExpansionStates.map((ces: boolean, i: number) => (index === i ? !ces : ces));
    setCommentsExpansionStates(newState);
  };

  // Animation section
  const trail = useTrail(cutComments.length, {
    config: { mass: 1, tension: 300, friction: 36 },
    from: { opacity: 0, y: 50 },
    to: { opacity: 100, y: 0 },
  });

  return (
    <section
      id="comments-section"
      className="w-full flex flex-col gap-4 ">
      <h2 className="text-2xl font-semibold lg:text-3xl text-center">{`Commentaires (${comments.length})`}</h2>
      {
        // Add Comment button
        id && comments.filter((c) => c.author_id === id).length === 0 && !isCommentFormOpened && (
          <div className="flex justify-center">
            <Button
              customStyle="empty"
              onClick={toggleCommentForm}>
              Ajouter un commentaire
            </Button>
          </div>
        )
      }
      {
        // Comment form on top of any comment
        isCommentFormOpened && (
          <PostCard
            type="form"
            author_pseudo={pseudo!}
            author_id={id!}
            publishing_date={new Date().toISOString()}>
            <form
              id="comment-form"
              action="submit"
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                onSubmit(e);
                toggleCommentForm();
              }}>
              <RefTextArea
                id="comment-form"
                ref={ref}
              />
              <div
                id="comment-send-cancel"
                className="flex justify-end gap-4">
                <Button customStyle="rounded">
                  <Image
                    src={SendLogo}
                    alt=""
                    width={16}
                    height={16}
                  />
                  Poster
                </Button>
                <Button
                  onClick={toggleCommentForm}
                  customStyle="rounded">
                  Annuler
                </Button>
              </div>
            </form>
          </PostCard>
        )
      }
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 justify-start  ">
        {
          // Displaying all published comments
          cutComments.length === 0 ? (
            <p className="text-center lg:col-span-2">Aucun commentaire pour ce film.</p>
          ) : (
            <>
              {trail.map((props, index) => (
                <animated.div
                  style={props}
                  key={index}>
                  <PostCard
                    // Dual key is necessary as animation key and postcard keys allow to reorder cards without bugs such as misplaced avatars
                    key={orderedComments[index].author_pseudo}
                    type="comment"
                    {...orderedComments[index]}
                    backgroundColorStyle={backgroundColorStyles[index % backgroundColorStyles.length]}>
                    {
                      // Go into edition mode
                      isEditionFormOpened && id === orderedComments[index].author_id ? (
                        <form
                          id="comment-form"
                          action="submit"
                          className="flex flex-col gap-4"
                          onSubmit={(e) => {
                            onSubmit(e);
                            toggleEditionForm();
                          }}>
                          <RefTextArea
                            id="comment-form"
                            ref={ref}
                            defaultValue={orderedComments[index].comment}
                          />
                          <div
                            id="comment-send-cancel"
                            className="flex justify-end gap-4">
                            <Button customStyle="rounded">
                              <Image
                                src={SendLogo}
                                alt=""
                                width={16}
                                height={16}
                              />
                              Confirmer
                            </Button>
                            <Button
                              onClick={toggleEditionForm}
                              customStyle="rounded">
                              Annuler
                            </Button>
                          </div>
                        </form>
                      ) : (
                        // If not, just display the comment, expanded or not
                        <>
                          <RichText>
                            {
                              // If the comment has a cut version & expanding state is true
                              cutComments[index][1] && commentsExpansionStates[index]
                                ? (orderedComments[index].comment as string)
                                : (cutComments[index][0] as string)
                            }
                          </RichText>
                          {
                            // Adding button PostCard buttons
                            <div className="flex justify-end gap-4">
                              {id === orderedComments[index].author_id && (
                                <Button
                                  onClick={toggleEditionForm}
                                  customStyle="rounded">
                                  Éditer
                                </Button>
                              )}
                              {orderedComments[index].comment.length > maxDisplayChar && (
                                <Button
                                  onClick={() => toggleCommentExpansion(index)}
                                  customStyle="rounded">
                                  {!commentsExpansionStates[index] ? 'Voir plus...' : 'Réduire'}
                                </Button>
                              )}
                            </div>
                          }
                        </>
                      )
                    }
                  </PostCard>
                </animated.div>
              ))}
            </>
          )
        }
      </div>
    </section>
  );
});

export default CommentsSection;
