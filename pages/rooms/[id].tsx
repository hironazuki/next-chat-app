import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { API, graphqlOperation } from "aws-amplify";

import { useAuth } from "../../auth";

import { createPost, deletePost } from "../../src/graphql/mutations";
import { onCreatePost, onDeletePost } from "../../src/graphql/subscriptions";
import { getRoom } from "../../src/graphql/queries";

import {
  GetRoomQuery,
  OnCreatePostSubscription,
  CreatePostMutationVariables,
} from "../../src/API";
import {
  useStateValue,
  showRoom,
  createPostSubscription,
} from "../../src/state";
useStateValue;

import GenericTemplate from "../../components/templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
type PostSubscriptionEvent = { value: { data: OnCreatePostSubscription } };
type FormState = {
  content: string;
};

const useStyles = makeStyles({
  current: {
    justifyContent: "center",
    "& > *": {
      marginBottom: "0.5rem",
    },
    textAlign: "right",
  },
  other: {
    justifyContent: "center",
    "& > *": {
      marginBottom: "1rem",
    },
  },
});

const Home = () => {
  const auth = useAuth(null);
  const [{ room }, dispatch] = useStateValue();
  const [input, setInput] = useState<FormState>({
    content: "",
  });
  const [id, setId] = useState<string>();

  const router = useRouter();
  const classes = useStyles();
  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      if (typeof router.query.id === "string") setId(router.query.id);
    }
  }, [router]);
  useEffect(() => {
    async function fetchData() {
      try {
        const roomData = await API.graphql({
          query: getRoom,
          variables: { id },
          // @ts-ignore
          authMode: "API_KEY",
        });
        if ("data" in roomData && roomData.data) {
          const room = roomData.data as GetRoomQuery;
          if (room.getRoom) {
            dispatch(showRoom(room));
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const subscription = API.graphql({
      query: onCreatePost,
      // @ts-ignore
      authMode: "API_KEY",
    });
    if ("subscribe" in subscription) {
      subscription.subscribe({
        next: ({ value: { data } }: PostSubscriptionEvent) => {
          if (data.onCreatePost) {
            dispatch(createPostSubscription(data));
          }
        },
      });
    }
  }, []);
  const onFormChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const createNewPost = async () => {
    if (input.content === "") return;
    const newRoom: CreatePostMutationVariables = {
      input: {
        roomID: id,
        content: input.content,
      },
    };
    setInput({ content: "" });
    await API.graphql(graphqlOperation(createPost, newRoom));
  };

  const deletePost = (id: string): any => {
    console.log("aaa");
    // if (input.content === "") return;
    // const newRoom: CreatePostMutationVariables = {
    //   input: {
    //     roomID: id,
    //     content: input.content,
    //   },
    // };
    // setInput({ content: "" });
    // await API.graphql(graphqlOperation(createPost, newRoom));
  };
  return (
    <GenericTemplate title={"チャットルーム"}>
      {room ? (
        <div>
          {room.posts.items.map((post) => {
            if (auth?.accessTokenData?.username === post.owner) {
              return (
                <div className={classes.current} key={post.id}>
                  <span>{post.owner}</span>
                  <Chip label={post.content} />
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <br />
                </div>
              );
            } else {
              return (
                <div className={classes.other} key={post.id}>
                  <span>{post.owner}</span>
                  <Chip label={post.content} />
                  <br />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <p>Add some Posts!</p>
      )}
      {auth && (
        <>
          <div>
            <TextField
              value={input.content}
              label="チャット"
              name="content"
              onChange={onFormChange}
            />
          </div>
          <Button onClick={createNewPost} variant="contained" color="primary">
            追加
          </Button>
        </>
      )}
    </GenericTemplate>
  );
};

export default Home;
