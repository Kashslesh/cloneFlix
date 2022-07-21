import {connectToDataBase} from '../../../lib/db';
import {hashPassword} from '../../../lib/auth';

async function Handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const {email, password} = data;
  if (!email && !password) {
    res.status(422).json({message: 'invalid data'});
    return;
  }
  const client = await connectToDataBase();

  const db = client.db();
  const existingUser = await db.collection('users').findOne({email: email});
  if (existingUser) {
    res.status(422).json({message: 'Users exists already'});
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({message: 'Created user'});
}
export default Handler;
