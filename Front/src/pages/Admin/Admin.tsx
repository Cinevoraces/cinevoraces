import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { 
  useAdminGetDataQuery,
  useAdminPublishMovieMutation,
  useAdminRevokeMovieMutation,
} from 'redux/api';
import { Button } from 'components/Inputs/InputsLib';
import { addToast } from 'redux/slices/global';
import AnimationLayout from 'components/AnimationLayout/AnimationLayout';
import Loader from 'components/Loader/Loader';
import Proposal from './Proposal';
import User from './User';
import styles from './Admin.module.scss';

function Admin () {
  const dispatch = useAppDispatch();
  const {data, isLoading} = useAdminGetDataQuery();
  const [publishProposition, {
    isSuccess: publishIsSuccess,
    reset: publishReset
  }] = useAdminPublishMovieMutation();
  const [deleteProposition, { 
    isSuccess: deleteIsSuccess,
    reset: deleteReset
  }] = useAdminRevokeMovieMutation();
  const [selectedMovieId, setSelectedMovieId] = useState<string>();

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => { 
    document.querySelector(`.${styles.selected}`)?.classList.remove(styles.selected);
    e.currentTarget?.classList.add(styles.selected);
    setSelectedMovieId(e.currentTarget.id);
  }; 
  const handlePublishProposition = async (e: any) => {
    e.preventDefault();
    try {
      if (selectedMovieId) {
        data && await publishProposition({ movieId: selectedMovieId, body: {isPublished: true}});
      } else { 
        throw new Error('Vous devez séléctionner un film.');
      }
    } catch (error: any) {
      dispatch(addToast({type: 'warn', text: error.message}));
    }};
  const handleDeleteProposition = async (e: any) => {
    e.preventDefault();
    try {
      if (selectedMovieId) {
        data && await deleteProposition({ movieId: selectedMovieId });
      } else {
        throw new Error('Vous devez séléctionner un film.');
      }
    } catch (error: any) {
      dispatch(addToast({type: 'warn', text: error.message}));
    }};

  useEffect(() => {
    if (publishIsSuccess) {
      setSelectedMovieId(undefined);
      dispatch(addToast({type: 'success', text: 'Film publié avec succés.'}));
      publishReset();
    }
    if (deleteIsSuccess) {
      dispatch(addToast({type: 'success', text: 'Film supprimé avec succés.'}));
      setSelectedMovieId(undefined);
      deleteReset();
    }}, [deleteIsSuccess, publishIsSuccess]);

  return(
    <AnimationLayout>
      <section className={styles['admin-panel']}>
        {isLoading &&
          <Loader/>
        }
        {!isLoading &&
        <>
          { data!.propositions &&
            <form className={styles['proposal-form']}>
              <div className={styles['proposals-container']}>
                { data!.propositions.map((proposition: any) => 
                  <Proposal
                    key={proposition.id}
                    movie={proposition}
                    handleSelect={handleSelect}
                  ></Proposal>
                )}
              </div>
              <div className={styles['button-container']}>
                { selectedMovieId &&
                  <>
                    <Button
                      styleMod='rounded-fill'
                      handler={handlePublishProposition}
                    >Publier</Button>
                    <Button
                      styleMod='rounded-fill'
                      handler={handleDeleteProposition}
                    >Supprimer</Button>
                  </>
                }
                { !selectedMovieId &&
                  <>
                    <Button
                      styleMod='rounded-fill-white'
                      handler={handlePublishProposition}
                    >Publier</Button>
                    <Button
                      styleMod='rounded-fill-white'
                      handler={handleDeleteProposition}
                    >Supprimer</Button>
                  </>
                }  
              </div>
            </form>
          }
          { !data!.propositions &&
            <div>y'a R frere</div>
          }
          <form className={styles['user-form']}>
            <div>
              <table>
                <thead>
                  <tr>
                    <th className={styles['table-case']}>Id</th>
                    <th className={styles['table-case']}>Username</th>
                    <th className={styles['table-case']}>Email</th>
                    <th className={styles['table-case']}>Rôle</th>
                    <th className={styles['table-case']}>Date de création</th>
                    <th className={styles['table-case']} colSpan={2}>Interaction</th>
                  </tr>
                </thead>
                <tbody>
                  { data!.users.map((user) => 
                    <User
                      key={user.id}
                      user={user}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </form>
        </>
        }
      </section>
    </AnimationLayout>
  );
};

export default Admin;