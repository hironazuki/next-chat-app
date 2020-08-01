/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
