import type { Query } from '@src/types/Query';

/**
 * **findUserByPseudoOrMail**
 * @param pseudo user pseudo
 * @param mail user mail
 * @description
 * Find a user by pseudo or mail, returns only those fields.
 * @returns SQL query object
*/
export const findUserByPseudoOrMail = (
  pseudo: string, 
  mail: string
): Query.preparedQuery => {
  return {
    text: ` SELECT pseudo, mail
            FROM "user"
            WHERE pseudo = $1 OR mail = $2;`,
    values: [pseudo, mail]
  };
};

/**
 * **createUser**
 * @param values - Object containing *pseudo, mail, password*.
 * @description
 * Create a new user.
 * @returns SQL query object
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
 * **getTokenObject**
 * @description 
 * Find a user by id or pseudo and return object for token construction.
 * @param value object containing *id or pseudo*
*/
export const getTokenObject = (
  value: { id: number } | { pseudo: string },
): Query.preparedQuery => {
  const column: string = Object.keys(value)[0];
  return {
    text: ` SELECT 
              id, pseudo, mail,
              password, role, avatar_url
            FROM "user"
            WHERE ${Object.keys(value)[0]} = $1;`,
    values: [(value[column as keyof typeof value])],
  };
};