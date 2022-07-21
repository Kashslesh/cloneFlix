import NextAuth from 'next-auth/next';

import {connectToDataBase} from '../../../lib/db';
import {verifyPassword} from '../../../lib/auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDataBase();
        const userCollection = client.db().collection('users');
        const user = await userCollection.findOne({email: credentials.email});

        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          client.close();
          throw new Error(' No user Found');
        }
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Password is not same');
        }
        client.close();
        return {email: user.email};
      },
    }),
  ],
});
