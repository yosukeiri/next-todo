import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Center, Button, Input, Textarea } from "@chakra-ui/react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Layout from "../components/Layout";
import { UserContext } from "../providers/userProvider";

const Editor = () => {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, []);

  return <Layout title="タスクの編集"></Layout>;
};

export default Editor;
