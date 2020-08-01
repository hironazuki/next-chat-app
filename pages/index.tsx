import React, { useEffect, useReducer } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetServerSideProps } from "next";
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth,
} from "../auth";

import { createRoom } from "../src/graphql/mutations";
import { onCreateRoom } from "../src/graphql/subscriptions";
import { listRooms } from "../src/graphql/queries";

const QUERY = "QUERY";
const SUBSCRIPTION = "SUBSCRIPTION";

const initialState = {
  rooms: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return { ...state, rooms: action.rooms };
    case SUBSCRIPTION:
      return { ...state, rooms: [...state.rooms, action.room] };
    default:
      return state;
  }
};

async function createNewRoom() {
  const room = {
    title: "Use AWS AppSync",
    description: "RealTime and Offline",
  };
  await API.graphql(graphqlOperation(createRoom, { input: room }));
}

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const { login, logout } = useAuthFunctions();
  const [state, dispatch] = useReducer(reducer, initialState);

  // const signOut = () => {
  //   Auth.signOut().catch((error) => console.log("サインアウト失敗: ", error));
  // };
  useEffect(() => {
    async function fetchData() {
      try {
        const roomData = await API.graphql({
          query: listRooms,
          // @ts-ignore
          authMode: "API_KEY",
        });
        //   // graphqlOperation(listPosts, {
        //   //   filter: { username: { eq: "rukoshio" } },
        //   // })
        // );
        console.log("rooms: ", roomData.data.listRooms.items);
        dispatch({ type: QUERY, rooms: roomData.data.listRooms.items });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    const subscription = API.graphql({
      query: onCreateRoom,
      // @ts-ignore
      authMode: "API_KEY",
    }).subscribe({
      next: (eventData) => {
        const room = eventData.value.data.onCreateRoom;
        dispatch({ type: SUBSCRIPTION, room });
      },
    });

    return () => subscription.unsubscribe();
  }, []);
  // const getLocalStorageIdToken = async () => {
  //   const resp = await Auth.currentSession();
  //   const accessToken = resp.getAccessToken().getJwtToken();
  //   const data = await Auth.currentUserInfo();
  //   console.log("getLocalStorageIdToken -> data", resp);
  //   console.log("トークン: ", accessToken);
  // };
  // getLocalStorageIdToken();
  return (
    <React.Fragment>
      {auth ? (
        <>
          <button type="button" onClick={() => logout()}>
            sign out
          </button>
          <div>
            My App
            <button onClick={createNewRoom}>Add Room</button>
            <div>
              {state.rooms.length > 0 ? (
                state.rooms.map((room) => (
                  <p key={room.id}>
                    {room.owner} : {room.title} | {room.description} |{" "}
                    {room.createdAt}
                  </p>
                ))
              ) : (
                <p>Add some posts!</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <React.Fragment>
          <button type="button" onClick={() => login()}>
            sign in
          </button>
        </React.Fragment>
      )}
      {auth ? (
        <React.Fragment>
          <h4>IdTokenData</h4>
          <div>
            <React.Fragment>
              <p>{auth.idTokenData.email}</p>
              <p>{auth.idTokenData["cognito:username"]}</p>
            </React.Fragment>
          </div>
          <h4>AccessTokenData</h4>
          <div>{auth.accessTokenData.username}</div>
        </React.Fragment>
      ) : (
        <p>
          <small>
            Your email address will not be shared. You will not get any spam. It
            is only needed for the example.
          </small>
        </p>
      )}
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);

  return { props: { initialAuth } };
};

export default Home;
