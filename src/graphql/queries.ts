/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
      }
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: SearchablePostSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
      }
      nextToken
      total
    }
  }
`;
