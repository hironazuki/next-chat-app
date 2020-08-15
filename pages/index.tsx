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
import { RoomFormValues } from "../components/AddRoomModal/AddRoomForm";
import {
  useStateValue,
  setRoomsList,
  createRoomSubscription,
} from "../src/state";

import AddRoomModal from "../components/AddRoomModal";

import GenericTemplate from "../components/templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Link from "../components/templates/Link";

type RoomSubscriptionEvent = { value: { data: OnCreateRoomSubscription } };

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  AddIcon: {
    "& > *": {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
      color: "#ffffff",
    },
  },
});

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const [{ rooms }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
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

  const createNewRoom = async (values: RoomFormValues) => {
    try {
      const [title, description] = [values.title, values.description];
      const newRoom: CreateRoomMutationVariables = {
        input: {
          title,
          description,
        },
      };
      closeModal();
      await API.graphql(graphqlOperation(createRoom, newRoom));
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
    // if (input.title === "") return;
    // const newRoom: CreateRoomMutationVariables = {
    //   input: {
    //     title: input.title,
    //     description: input.description,
    //   },
    // };
    // setInput({ title: "", description: "" });
    // closeModal();
    // await API.graphql(graphqlOperation(createRoom, newRoom));
  };
  return (
    <GenericTemplate title="チャットルーム">
      {auth && (
        <>
          <AddRoomModal
            modalOpen={modalOpen}
            onSubmit={createNewRoom}
            error={error}
            onClose={closeModal}
          />
          <div className={classes.AddIcon}>
            <Fab color="secondary" aria-label="add" onClick={() => openModal()}>
              <AddIcon />
            </Fab>
          </div>
        </>
      )}
      {rooms.length > 0 ? (
        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item xs={12} md={6}>
              <Card className={classes.card}>
                <Link href="/rooms/[id]" as={`/rooms/${room.id}`}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      createby {room.owner}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {room.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {room.description}
                    </Typography>
                  </CardContent>
                </Link>

                {auth?.accessTokenData?.username === room.owner && (
                  <CardActions>
                    <IconButton edge="end" aria-label="delete">
                      <CreateIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
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
