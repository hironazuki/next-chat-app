import React, { useEffect, useState } from "react";
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

import {
  ListRoomsQuery,
  OnCreateRoomSubscription,
  CreateRoomMutationVariables,
} from "../src/API";
import {
  useStateValue,
  setRoomsList,
  createRoomSubscription,
} from "../src/state";

import GenericTemplate from "../components/templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "../components/templates/Link";

type RoomSubscriptionEvent = { value: { data: OnCreateRoomSubscription } };
type FormState = {
  title: string;
  description: string;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const [{ rooms }, dispatch] = useStateValue();
  const [input, setInput] = useState<FormState>({
    title: "",
    description: "",
  });

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const roomsData = await API.graphql({
          query: listRooms,
          // @ts-ignore
          authMode: "API_KEY",
        });
        if ("data" in roomsData && roomsData.data) {
          const rooms = roomsData.data as ListRoomsQuery;
          if (rooms.listRooms) {
            dispatch(setRoomsList(rooms));
          }
        }
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
      next: ({ value: { data } }: RoomSubscriptionEvent) => {
        if (data.onCreateRoom) {
          dispatch(createRoomSubscription(data));
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  const onFormChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const createNewRoom = async () => {
    if (input.title === "") return;
    const newRoom: CreateRoomMutationVariables = {
      input: {
        title: input.title,
        description: input.description,
      },
    };
    setInput({ title: "", description: "" });
    await API.graphql(graphqlOperation(createRoom, newRoom));
  };
  return (
    <GenericTemplate title="チャットルーム">
      {auth && (
        <>
          <div>
            <TextField
              value={input.title}
              label="ルーム名"
              name="title"
              onChange={onFormChange}
            />
          </div>
          <div>
            <TextField
              value={input.description}
              label="説明"
              name="description"
              onChange={onFormChange}
            />
          </div>
          <Button onClick={createNewRoom} variant="contained" color="primary">
            追加
          </Button>
        </>
      )}
      {rooms.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="justify">ルーム名</TableCell>
                <TableCell>説明</TableCell>
                <TableCell>作成者</TableCell>
                {/* <TableCell>作成日</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell component="th" scope="room">
                    <Link href="/rooms/[id]" as={`/rooms/${room.id}`}>
                      {room.title}
                    </Link>
                  </TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>{room.owner}</TableCell>
                  {/* <TableCell>{room.createdAt}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Add some Rooms!</p>
      )}
    </GenericTemplate>
  );
};

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens;
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req);

  return { props: { initialAuth } };
};

export default Home;
