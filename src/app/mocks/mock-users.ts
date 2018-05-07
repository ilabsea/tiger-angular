import { User } from './../models/user';

export const USERS: User[] = [
  { id: 1, email: 'admin@ilabsea.org',password: '123456', authentication_token: '', role: 'publisher', status: 'active' },
  { id: 2, email: 'test@example.com',password: '123456', authentication_token: '', role: 'publisher', status: 'active' },
  { id: 3, email: 'test@ilabsea.org',password: '123456', authentication_token: '', role: 'publisher', status: 'active' },
  { id: 4, email: 'thyda@instedd.org',password: '123456', authentication_token: '', role: 'publisher', status: 'active' }
];
