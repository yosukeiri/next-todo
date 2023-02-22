import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Center, Button, Input, Textarea } from "@chakra-ui/react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Layout from "../components/Layout";
import { UserContext } from "../providers/userProvider";

const Create = () => {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!userInfo.id) {
      router.push("/login");
    }
  }, [userInfo]);
  const createTodo = async () => {
    const collectionRef = collection(db, "todos");
    const data = {
      todoUser: userInfo.id,
      todoTitle: title,
      todoContent: content,
      todoStatus: "Waiting",
    };
    addDoc(collectionRef, data)
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle("");
    setContent("");
  };

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <Layout title="タスク作成">
      <Box mb={10}>
        <dl>
          <dt>タイトル</dt>
          <dd>
            <Input
              bg={"#F0FFF4"}
              rounded={40}
              px={5}
              py={3}
              onChange={onChangeTitle}
              value={title}
              placeholder="タスク名を入力してください"
            />
          </dd>
        </dl>
      </Box>
      <Box mb={10}>
        <dl>
          <dt>内容</dt>
          <dd>
            <Textarea
              bg={"#F0FFF4"}
              rounded={20}
              px={5}
              py={3}
              onChange={onChangeContent}
              value={content}
              placeholder="タスク内容を入力してください"
            />
          </dd>
        </dl>
      </Box>
      <Center>
        <Button
          bg={"#28ADCA"}
          rounded={50}
          w={"204px"}
          h={"54px"}
          color={"#F0FCFF"}
          fontSize="24px"
          onClick={createTodo}
        >
          TODOを登録
        </Button>
      </Center>
    </Layout>
  );
};

export default Create;
