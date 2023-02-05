import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Select, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import { UserContext } from "../providers/userProvider";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import TodoItem from "../components/molecules/TodoItem";

const statusList = [
  { value: "Waiting", label: "Waiting" },
  { value: "Working", label: "Working" },
  { value: "Completed", label: "Completed" },
];

export default function Home() {
  const [todosData, setTodosData] = useState<any>([]);
  const [todos, setTodos] = useState<any>([]);
  const { userInfo } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    } else {
      const todosCollectionRef = collection(db, "todos");
      getDocs(todosCollectionRef).then((querySnapshot) => {
        setTodosData(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      setTodos(
        todosData.filter((todo: any) => {
          return todo.todoUser === userInfo.email;
        })
      );
    }
  }, []);
  const onChangeStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetOption = statusList.filter((status) => {
      return status.value === e.target.value;
    });
    setTodos(targetOption[0].label);
  };
  return (
    <Layout title="TODO一覧">
      <Box>
        {todos
          ? todos.map((todo: any) => {
              return (
                <TodoItem title={todo.todoTitle} status={todo.todoStatus} />
              );
            })
          : "タスクはありませんde"}
      </Box>
      <Flex justify="space-between">
        <Select placeholder="ソート" w="30%">
          <option value="title">タスク名</option>
          <option value="status">ステータス</option>
        </Select>
        <Select
          placeholder="ステータスで絞り込み"
          w="30%"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChangeStatusFilter(e)
          }
        >
          {statusList.map((status) => (
            <option value={status.value} key={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      </Flex>
    </Layout>
  );
}
