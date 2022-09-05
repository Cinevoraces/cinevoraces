import { Button } from 'components/Inputs/InputsLib';
import { useAdminPutUserMutation, useAdminDeleteUserMutation } from 'redux/api';
import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { addToast } from 'redux/slices/global';
import styles from './Admin.module.scss';

function User({user}: {[key: string]: any}) {
  const dispatch = useAppDispatch();
  const [setAdminRole,  {
    isSuccess: setAdminRoleSuccess,
    reset: setAdminRoleReset,
  }] = useAdminPutUserMutation();
  const [deleteUser,  {
    isSuccess: deleteUserSuccess,
    reset: deleteUserReset,
  }] = useAdminDeleteUserMutation();

  const setAdminRoleHandler = async (e: any) => {
    e.preventDefault();
    let newRole = '';
    if (user.role === 'user') newRole = 'admin';
    if (user.role === 'admin') newRole = 'admin';
    await setAdminRole({ userId: user.id, body: { role: newRole }});
  };
  const deleteUserHandler = async (e: any) => {
    e.preventDefault();
    await deleteUser({ userId: user.id });
  };
  
  useEffect(() => {
    if (setAdminRoleSuccess) {
      dispatch(addToast({type: 'success', text: 'Rôle mis a jour.'}));
      setAdminRoleReset();
    }
    if (deleteUserSuccess) {
      dispatch(addToast({type: 'success', text: 'Utilisateur supprimé.'}));
      deleteUserReset();
    }}, [deleteUserSuccess, setAdminRoleSuccess]);

  return(
    <tr>
      <td className={styles['table-case']}>{user.id}</td>
      <td className={styles['table-case']}>{user.pseudo}</td>
      <td className={styles['table-case']}>{user.mail}</td>
      <td className={styles['table-case']}>{user.role}</td>
      <td className={styles['table-case']}>{user.created_at.slice(0, 10)}</td>
      <td className={styles['table-case']}>
        <Button
          styleMod='rounded-fill'
          handler={setAdminRoleHandler}
        >Passer admin</Button>
      </td>
      <td className={styles['table-case']}>
        <Button
          styleMod='rounded-fill'
          handler={deleteUserHandler}
        >Supprimer</Button>
      </td>
    </tr>
  );
}

export default User;