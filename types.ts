export interface ListsRoom {
  __typename: "Room";
  id: string;
  owner: string | null;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  posts: {
    __typename: "ModelPostConnection";
    nextToken: string | null;
  } | null;
}

export interface GetRoom {
  __typename: "Room";
  id: string;
  owner: string | null;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  posts: {
    __typename: "ModelPostConnection";
    items: Array<{
      __typename: "Post";
      id: string;
      owner: string | null;
      roomID: string;
      content: string;
      createdAt: string | null;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
}
export interface Post {}

export interface NewRoom {
  title: string;
  description?: string;
}

export interface NewPost {
  roomID: string;
  content: string;
}
