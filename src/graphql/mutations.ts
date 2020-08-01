/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
      owner
      title
      description
      createdAt
      updatedAt
      posts {
        items {
          id
          owner
          roomID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
      id
      owner
      title
      description
      createdAt
      updatedAt
      posts {
        items {
          id
          owner
          roomID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
      id
      owner
      title
      description
      createdAt
      updatedAt
      posts {
        items {
          id
          owner
          roomID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      owner
      roomID
      content
      createdAt
      updatedAt
      room {
        id
        owner
        title
        description
        createdAt
        updatedAt
        posts {
          nextToken
        }
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      owner
      roomID
      content
      createdAt
      updatedAt
      room {
        id
        owner
        title
        description
        createdAt
        updatedAt
        posts {
          nextToken
        }
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      owner
      roomID
      content
      createdAt
      updatedAt
      room {
        id
        owner
        title
        description
        createdAt
        updatedAt
        posts {
          nextToken
        }
      }
    }
  }
`;
