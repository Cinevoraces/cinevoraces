export default async function root(server: serverInstance) {

  server.get('/', async (request, reply) => {
    const client = await server.pg.connect()

    try { 
      const {rows} = await client.query(
        'SELECT * FROM movie'
      ); 
      return rows;

    } catch(err) { 
      throw new Error(err); 

    } finally {
      client.release()
    }
  });
}