import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Button, Heading, Text, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { UserContext } from "../providers/userProvider";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Layout from "../components/Layout";

const Detail = () => {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  const todo = router.query;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    console.log(todo);
  }, []);

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  return (
    <Layout title="タスクの詳細">
      <Box bg="gray.100" p={10} mb={10}>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            タスクID
          </Heading>
          <Text>{todo.id}</Text>
        </Box>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            タスク名
          </Heading>
          <Text>{todo.title}</Text>
        </Box>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            ステータス
          </Heading>
          <Text>{todo.status}</Text>
        </Box>
        <Box>
          <Heading as="h3" fontSize={20} mb={5}>
            タスク内容
          </Heading>
          <Text>{todo.content}</Text>
        </Box>
      </Box>
      <Flex justify="center">
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
            onClick={deleteTodo}
          >
            削除
          </Button>
        </Link>
        <Spacer />
        <Link
          as={`/editor/${todo.id}`}
          href={{ pathname: `/editor`, query: todo }}
        >
          <Button as="a" bg={"#28ADCA"} rounded={10} color="#fff">
            編集
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
};

export default Detail;
