import React, { useContext } from "react";
import { UserContext } from "../../providers/userProvider";
import Link from "next/link";
import { Flex, Button, Spacer, Text, Box } from "@chakra-ui/react";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo({ id: "" });
  };

  return (
    <header>
      <Flex p={10} bg="#eee">
        <Text fontSize="2xl">TODO</Text>
        <Spacer />
        {userInfo.id ? (
          <Flex align="center">
            <Box mr={5}>
              <Link href="/">タスク一覧</Link>
            </Box>
            <Box mr={5}>
              <Link href="/create">タスク作成</Link>
            </Box>

            <Button bg="#141414" color="#fff" onClick={logout}>
              ログアウト
            </Button>
          </Flex>
        ) : (
          <Flex>
            <Box mr={5}>
              <Link href="/login">ログイン</Link>
            </Box>
            <Box>
              <Link href="/signup">サインアップ</Link>
            </Box>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

export default Header;
