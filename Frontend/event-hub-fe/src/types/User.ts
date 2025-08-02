export type User = {
  id: number;
  username: string;
  nickname: string;
  password?: string;
  email: string;
  profilePictureUrl?: string;
  proffesion?: string;
  about?: string;
  followToken?: string;
  pinned?: boolean;
};
