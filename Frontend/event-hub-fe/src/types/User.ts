export type User = {
  id: number;
  username: string;
  password?: string;
  email: string;
  profile_picture_url?: string;
  proffesion?: string;
  about?: string;
  follow_token: string;
};
