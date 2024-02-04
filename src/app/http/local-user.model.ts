import { HttpUser } from './http-user.model';

export type LocalUser = {
  remoteId?: string;
  name: string | null;
  mail: string | null;
  age: number | null;
};
