import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Input,
  Textarea,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { db } from "../firebase";
import { Firestore, doc, updateDoc } from "firebase/firestore";
import Layout from "../components/Layout";
import { UserContext } from "../providers/userProvider";
import Link from "next/link";

const statusList = [
  { value: "Waiting", label: "Waiting" },
  { value: "Working", label: "Working" },
  { value: "Completed", label: "Completed" },
];

type Todo = {
  todoTitle: string;
  todoStatus: string;
  todoContent: string;
};

const Editor = () => {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  const todo = router.query;
  const [title, setTitle] = useState(todo.title);
  const [status, setStatus] = useState(todo.status);
  const [content, setContent] = useState(todo.content);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, []);

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  const onChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };
  const onClickEdit = async () => {
    const todoDocumentRef = doc(db, "todos", todo.id);
    await updateDoc(todoDocumentRef, {
      todoTitle: title,
      todoStatus: status,
      todoContent: content,
    });
  };

  return (
    <Layout title="タスクの編集">
      <Box bg="gray.100" p={10} mb={10}>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            タスクID
          </Heading>
          <Text>{router.query.id}</Text>
        </Box>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            タスク名
          </Heading>
          <Input
            bg={"#FFF"}
            rounded={10}
            px={5}
            py={3}
            onChange={onChangeTitle}
            value={title}
            placeholder="タスク名を入力してください"
          />
        </Box>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            ステータス
          </Heading>
          <Select
            bg={"#FFF"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onChangeStatus(e)
            }
          >
            {statusList.map((item) => {
              if (item.value === status) {
                return (
                  <option value={item.value} key={item.value} selected>
                    {item.label}
                  </option>
                );
              } else {
                return (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                );
              }
            })}
          </Select>
        </Box>
        <Box>
          <Heading as="h3" fontSize={20} mb={5}>
            タスク内容
          </Heading>
          <Textarea
            bg={"#FFF"}
            rounded={10}
            px={5}
            py={3}
            onChange={onChangeContent}
            value={content}
            placeholder="タスク内容を入力してください"
          />
        </Box>
      </Box>
      <Flex>
        <Link href="/">
          <Button as="a" bg={"#28ADCA"} rounded={10} color="#fff">
            一覧に戻る
          </Button>
        </Link>
        <Spacer />
        <Link href="/">
          <Button
            as="a"
            bg={"#28ADCA"}
            rounded={10}
            color="#fff"
            onClick={onClickEdit}
          >
            登録
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
};

export default Editor;
