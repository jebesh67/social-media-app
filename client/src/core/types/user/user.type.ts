type Count = {
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export type ClientUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string
  avatarPublicId: string;
  bio: string;
  counts: Count;
  createdAt: Date,
  updatedAt: Date,
}