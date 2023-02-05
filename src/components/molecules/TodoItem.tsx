import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
const TodoItem = (props: any) => {
  const onClickDetail = () => {};
  return (
    <Flex
      py={2}
      px={5}
      align="center"
      justify="space-between"
      bg="gray.100"
      mb={5}
    >
      <Box w="20%">{props.title}</Box>
      <Box w="10%">{props.status}</Box>
      <Button
        onClick={onClickDetail}
        w="10%"
        bg={"#28ADCA"}
        rounded={10}
        color="#fff"
      >
        詳細
      </Button>
    </Flex>
  );
};

export default TodoItem;
