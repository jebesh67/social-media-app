export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type ExistingUsernameResponse = {
  __typename?: "ExistingUsernameResponse";
  username: UsernameStatusType;
};

export type LoginUserInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: UserResponse;
  loginUser: UserResponse;
  logoutUser: Scalars["Boolean"]["output"];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};

export type OtherUserResponse = {
  __typename?: "OtherUserResponse";
  user: SafeUserType;
};

export type Query = {
  __typename?: "Query";
  currentUser: UserResponse;
  otherUserProfile: OtherUserResponse;
  verifyUsername: ExistingUsernameResponse;
};


export type QueryOtherUserProfileArgs = {
  username: Scalars["String"]["input"];
};


export type QueryVerifyUsernameArgs = {
  input: UsernameInput;
};

export type SafeUserType = {
  __typename?: "SafeUserType";
  avatar: Scalars["String"]["output"];
  bio: Scalars["String"]["output"];
  counts: UserCountType;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type UserCountType = {
  __typename?: "UserCountType";
  followersCount: Scalars["Int"]["output"];
  followingCount: Scalars["Int"]["output"];
  postsCount: Scalars["Int"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  token: Scalars["String"]["output"];
  user: SafeUserType;
};

export type UsernameInput = {
  username: Scalars["String"]["input"];
};

export type UsernameStatusType = {
  __typename?: "UsernameStatusType";
  isAvailable: Scalars["Boolean"]["output"];
  message: Scalars["String"]["output"];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = {
  __typename?: "Query",
  currentUser: {
    __typename?: "UserResponse",
    token: string,
    user: {
      __typename?: "SafeUserType",
      username: string,
      name: string,
      email: string,
      id: string,
      createdAt: any,
      updatedAt: any
    }
  }
};
