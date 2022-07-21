import {MongoClient} from 'mongodb';
export async function connectToDataBase() {
  const client = await MongoClient.connect(
    'mongodb+srv://cloneflixDb:40pQBJS45LNPxGAw@cluster0.ebnmq.mongodb.net/?retryWrites=true&w=majority',
  );
  return client;
}
