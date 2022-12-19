import type { Query } from '../../types/_index';

/**
 * **findUserByPseudoOrMail**
 * @description Find a user by pseudo or mail, returns only those fields.
 * @param pseudo user pseudo
 * @param mail user mail
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
 * @description Create a new user.
 * @param values Object containing *pseudo, mail, password*.
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
 * **getPrivateUser**
 * @description Find a user by id or pseudo and return object for token construction.
 * @param value object containing *id or pseudo*
*/
export const getPrivateUser = (
  value: { id: number } | { pseudo: string } | { mail: string },
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
