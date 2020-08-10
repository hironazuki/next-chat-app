import React from "react";
import { API, graphqlOperation } from "aws-amplify";
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

import { ListRoomsQuery, OnCreateRoomSubscription } from "../src/API";
import {
  useStateValue,
  setRoomsList,
  createRoomSubscription,
} from "../src/state";
useStateValue;
import GenericTemplate from "../components/templates/GenericTemplate";

const MyPage = () => {
  const auth = useAuth(null);
  return (
    <GenericTemplate title="マイページ">
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
          <small>ログインしてください。</small>
        </p>
      )}
    </GenericTemplate>
  );
};

export default MyPage;
