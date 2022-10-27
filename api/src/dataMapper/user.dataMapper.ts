import type { Database } from '@src/types/Database';
import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **createUser**
 * @param values - Object containing *pseudo, mail, password*.
 */
export const createUser = (
  values: Record<'pseudo' | 'mail' | 'password', string>
): Query.preparedQuery => {
  const { pseudo, mail, password } = values;
  return {
    text: ` INSERT INTO "user" (pseudo, mail, password)
            VALUES ($1, $2, $3);`,
    values: [pseudo, mail, password],
  };
};

/**
 * **findUserByPseudoOrMail**
 * @param values object of filters - *'pseudo' or 'mail'*
 * @description
 * Find a user by pseudo or mail, returns only those fields.
*/
export const findUserByPseudoOrMail = (
  values: Record<keyof Pick<Database.user, 'pseudo' | 'mail'>, string>
): Query.preparedQuery => {
  const WHERE = queryBuilder([
    { columns: values, operator: 'WHERE', join: 'OR' }
  ]);
  return {
    text: ` SELECT pseudo, mail
            FROM "user"
            ${WHERE[0]};`,
    values: Object.values(values),
  };
};

/**
 * **getUsers**
 * @description 
 * Find a user by any field.
 * @param values object of filters
 * @param publicData default to true, if false it will return hashed password.
*/
export const getUsers = (
  values?: Partial<Record<keyof Database.user, unknown>>,
  publicData=true
): Query.preparedQuery => {
  let WHERE: ReturnType<typeof queryBuilder>;
  if (values) WHERE = queryBuilder([
    { columns: values, operator: 'WHERE', join: 'AND' }
  ]);
  
  return {
    text: ` SELECT 
              id,
              pseudo,
              mail,
              ${publicData ? '' : 'password,'}
              role,
              avatar_url,
              created_at
            FROM "user"
            ${WHERE ? WHERE[0] : ''};`,
    values: WHERE ? Object.values(values) : [],
  };
};
