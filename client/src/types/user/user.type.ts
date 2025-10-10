type Count = {
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  counts: Count;
  createdAt: Date,
  updatedAt: Date,
}