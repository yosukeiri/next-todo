import React from "react";
import { Button, Flex, Box, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
const TodoItem = (props: any) => {
  const todo = {
    id: props.id,
    title: props.title,
    status: props.status,
    content: props.content,
  };

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todos", todo.id));
    props.setDeleteTodo(true);
  };
  return (
    <Flex
      py={2}
      px={5}
      align="center"
      justify="space-between"
      bg="gray.100"
      mb={5}
      key={props.key}
    >
      <Box w="20%">{props.title}</Box>
      <Box w="10%">{props.status}</Box>
      <Flex w="20%" mr={5} justify="between">
        <Link
          as={`/detail/${props.id}`}
          href={{ pathname: `/detail`, query: todo }}
        >
          <Button as="a" bg={"#28ADCA"} rounded={10} color="#fff">
            詳細
          </Button>
        </Link>
        <Spacer />
        <Link
          as={`/editor/${props.id}`}
          href={{ pathname: `/editor`, query: todo }}
        >
          <Button as="a" bg={"#28ADCA"} rounded={10} color="#fff">
            編集
          </Button>
        </Link>
        <Spacer />
        <Button
          as="a"
          bg={"#28ADCA"}
          rounded={10}
          color="#fff"
          onClick={deleteTodo}
        >
          削除
        </Button>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
