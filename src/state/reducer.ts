import { State } from "./state";
import {
  ListRoomsQuery,
  OnCreateRoomSubscription,
  OnUpdateRoomSubscription,
  OnDeleteRoomSubscription,
  GetRoomQuery,
  OnCreatePostSubscription,
  OnDeletePostSubscription,
} from "../API";

export type Action =
  | {
      type: "SET_ROOMS_LIST";
      payload: ListRoomsQuery;
    }
  | {
      type: "ON_CREATE_ROOM_SUBSCRIPTION";
      payload: OnCreateRoomSubscription;
    }
  | {
      type: "ON_UPDATE_ROOM_SUBSCRIPTION";
      payload: OnUpdateRoomSubscription;
    }
  | {
      type: "ON_DELETE_ROOM_SUBSCRIPTION";
      payload: OnDeleteRoomSubscription;
    }
  | {
      type: "SHOW_ROOM";
      payload: GetRoomQuery;
    }
  | {
      type: "ON_CREATE_POST_SUBSCRIPTION";
      payload: OnCreatePostSubscription;
    }
  | {
      type: "ON_DELETE_POST_SUBSCRIPTION";
      payload: OnDeletePostSubscription;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ROOMS_LIST":
      return { ...state, rooms: action.payload.listRooms.items };
    case "ON_CREATE_ROOM_SUBSCRIPTION":
      return { ...state, rooms: [action.payload.onCreateRoom, ...state.rooms] };
    case "ON_UPDATE_ROOM_SUBSCRIPTION":
      return { ...state, room: action.payload.onUpdateRoom };
    case "ON_DELETE_ROOM_SUBSCRIPTION":
      return { ...state, room: null };
    case "SHOW_ROOM":
      return { ...state, room: action.payload.getRoom };
    case "ON_CREATE_POST_SUBSCRIPTION":
      return {
        ...state,
        room: {
          ...state.room,
          posts: {
            ...state.room.posts,
            items: [...state.room.posts.items, action.payload.onCreatePost],
          },
        },
      };
    case "ON_DELETE_POST_SUBSCRIPTION":
      return {
        ...state,
        room: {
          ...state.room,
          posts: {
            ...state.room.posts,
            items: state.room.posts.items.filter(
              (post) => post.id !== action.payload.onDeletePost.id
            ),
          },
        },
      };
    default:
      return state;
  }
};

export const setRoomsList = (rooms: ListRoomsQuery): Action => {
  return {
    type: "SET_ROOMS_LIST",
    payload: rooms,
  };
};

export const createRoomSubscription = (
  room: OnCreateRoomSubscription
): Action => {
  return {
    type: "ON_CREATE_ROOM_SUBSCRIPTION",
    payload: room,
  };
};

export const updateRoomSubscription = (
  room: OnUpdateRoomSubscription
): Action => {
  return {
    type: "ON_UPDATE_ROOM_SUBSCRIPTION",
    payload: room,
  };
};

export const deleteRoomSubscription = (
  room: OnDeleteRoomSubscription
): Action => {
  return {
    type: "ON_DELETE_ROOM_SUBSCRIPTION",
    payload: room,
  };
};

export const showRoom = (room: GetRoomQuery): Action => {
  return {
    type: "SHOW_ROOM",
    payload: room,
  };
};

export const createPostSubscription = (
  post: OnCreatePostSubscription
): Action => {
  return {
    type: "ON_CREATE_POST_SUBSCRIPTION",
    payload: post,
  };
};
export const deletePostSubscription = (
  post: OnDeletePostSubscription
): Action => {
  return {
    type: "ON_DELETE_POST_SUBSCRIPTION",
    payload: post,
  };
};
