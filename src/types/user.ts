export interface Session {
  user: {
    id?: string | null;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface User extends Record<string, any> {
  id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
}

export interface Profile {
  username?: string | null;
  email?: string | null;
}

export interface JWT {
  username?: string | null;
  email?: string | null;
}
