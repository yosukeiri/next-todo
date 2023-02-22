import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Button, Heading, Text, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { UserContext } from "../providers/userProvider";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Layout from "../components/Layout";

type DetailTodo = {
  id: string;
  title: string;
  status: string;
  content: string;
};

const Detail = () => {
  const { userInfo } = useContext(UserContext);
  const [todoDetail, setTodoDetail] = useState<DetailTodo>({
    id: "",
    title: "",
    status: "",
    content: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    setTodoDetail(router.query as DetailTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query, userInfo]);

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todos", todoDetail.id));
  };
  return (
    <Layout title="タスクの詳細">
      <Box bg="gray.100" p={10} mb={10}>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            タスクID
          </Heading>
          <Text>{todoDetail.id}</Text>
        </Box>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            タスク名
          </Heading>
          <Text>{todoDetail.title}</Text>
        </Box>
        <Box mb={10}>
          <Heading as="h3" fontSize={20} mb={5}>
            ステータス
          </Heading>
          <Text>{todoDetail.status}</Text>
        </Box>
        <Box>
          <Heading as="h3" fontSize={20} mb={5}>
            タスク内容
          </Heading>
          <Text>{todoDetail.content}</Text>
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
          as={`/editor/${todoDetail.id}`}
          href={{ pathname: `/editor`, query: todoDetail }}
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
