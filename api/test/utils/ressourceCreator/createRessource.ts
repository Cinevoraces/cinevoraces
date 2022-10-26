import type { Database } from '@src/types/Database';
import pgClient from '../pgClient';

export interface CreateRessource<T> {
  data: T,
  update: (params: unknown)=>Promise<CreateRessource<T>>,
  remove: ()=>void
};

export async function createRessource<T, CreateInput, UpdateInput>(data: CreateInput, model: Database.dataEnum): Promise<CreateRessource<T>> {
  // Define ressource creation
  const { rows } = await pgClient.query({
    text: `
    `,
    values: [],
  });

  // Define ressource updater
  const update = async (params: UpdateInput) => {
    const { rows } = await pgClient.query({
      text: `
      `,
      values: [],
    });
    return rows[0];
  };

  // Define ressource remover
  const remove = async () => {
    await pgClient.query({
      text: `
      `,
      values: [],
    });
  };
  
  return { data: rows[0], remove, update };
}
