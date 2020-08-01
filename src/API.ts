/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRoomInput = {
  id?: string | null,
  owner?: string | null,
  title: string,
  description?: string | null,
};

export type ModelRoomConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelRoomConditionInput | null > | null,
  or?: Array< ModelRoomConditionInput | null > | null,
  not?: ModelRoomConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateRoomInput = {
  id: string,
  owner?: string | null,
  title?: string | null,
  description?: string | null,
};

export type DeleteRoomInput = {
  id?: string | null,
};

export type CreatePostInput = {
  id?: string | null,
  owner?: string | null,
  roomID: string,
  content: string,
  createdAt?: string | null,
};

export type ModelPostConditionInput = {
  roomID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  owner?: string | null,
  roomID?: string | null,
  content?: string | null,
  createdAt?: string | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type ModelRoomFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelRoomFilterInput | null > | null,
  or?: Array< ModelRoomFilterInput | null > | null,
  not?: ModelRoomFilterInput | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  roomID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type SearchablePostFilterInput = {
  id?: SearchableIDFilterInput | null,
  owner?: SearchableStringFilterInput | null,
  roomID?: SearchableIDFilterInput | null,
  content?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array< SearchablePostFilterInput | null > | null,
  or?: Array< SearchablePostFilterInput | null > | null,
  not?: SearchablePostFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchablePostSortInput = {
  field?: SearchablePostSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchablePostSortableFields {
  id = "id",
  owner = "owner",
  roomID = "roomID",
  content = "content",
  createdAt = "createdAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type CreateRoomMutationVariables = {
  input: CreateRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type CreateRoomMutation = {
  createRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateRoomMutationVariables = {
  input: UpdateRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type UpdateRoomMutation = {
  updateRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteRoomMutationVariables = {
  input: DeleteRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type DeleteRoomMutation = {
  deleteRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListRoomsQueryVariables = {
  filter?: ModelRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoomsQuery = {
  listRooms:  {
    __typename: "ModelRoomConnection",
    items:  Array< {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetRoomQueryVariables = {
  id: string,
};

export type GetRoomQuery = {
  getRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      owner: string | null,
      roomID: string,
      content: string,
      createdAt: string | null,
      updatedAt: string,
      room:  {
        __typename: "Room",
        id: string,
        owner: string | null,
        title: string,
        description: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SearchPostsQueryVariables = {
  filter?: SearchablePostFilterInput | null,
  sort?: SearchablePostSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchPostsQuery = {
  searchPosts:  {
    __typename: "SearchablePostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      owner: string | null,
      roomID: string,
      content: string,
      createdAt: string | null,
      updatedAt: string,
      room:  {
        __typename: "Room",
        id: string,
        owner: string | null,
        title: string,
        description: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
    total: number | null,
  } | null,
};

export type OnCreateRoomSubscription = {
  onCreateRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateRoomSubscription = {
  onUpdateRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteRoomSubscription = {
  onDeleteRoom:  {
    __typename: "Room",
    id: string,
    owner: string | null,
    title: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
    posts:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        owner: string | null,
        roomID: string,
        content: string,
        createdAt: string | null,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost:  {
    __typename: "Post",
    id: string,
    owner: string | null,
    roomID: string,
    content: string,
    createdAt: string | null,
    updatedAt: string,
    room:  {
      __typename: "Room",
      id: string,
      owner: string | null,
      title: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
      posts:  {
        __typename: "ModelPostConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
