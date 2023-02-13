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
  { value: "all", label: "ステータスで絞り込み" },
  { value: "Waiting", label: "Waiting" },
  { value: "Working", label: "Working" },
  { value: "Completed", label: "Completed" },
];
const sortList = [
  { value: "todoId", label: "初期状態" },
  { value: "todoTitle", label: "タスク名" },
  { value: "todoStatus", label: "ステータス" },
];
export default function Home() {
  const [todosData, setTodosData] = useState<any>([]);
  const [todos, setTodos] = useState<any>([]);
  const [deleteTodo, setDeleteTodo] = useState<any>();
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    } else {
      const todosCollectionRef = collection(db, "todos");
      getDocs(todosCollectionRef).then((querySnapshot) => {
        // 同じuseEffect内でuseStateで参照した変数を参照せずに取得したデータを変数に格納してそれを利用する
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodosData(data);
        setTodos(data.filter((todo: any) => todo.todoUser === userInfo.email));
      });
    }
  }, []);
  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    getDocs(todosCollectionRef).then((querySnapshot) => {
      // 同じuseEffect内でuseStateで参照した変数を参照せずに取得したデータを変数に格納してそれを利用する
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodosData(data);
      setTodos(data.filter((todo: any) => todo.todoUser === userInfo.email));
    });
  }, [deleteTodo]);
  const onChangeStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setTodos(
        todosData.filter((todo: any) => todo.todoUser === userInfo.email)
      );
    } else {
      setTodos(
        todosData.filter((todo: any) => {
          return (
            todo.todoUser === userInfo.email &&
            todo.todoStatus === e.target.value
          );
        })
      );
    }
  };
  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if (e.target.value === "todoId") {
      console.log("go todoId");
      const newTodo = todos.sort((a: any, b: any) => {
        if (a.todoId > b.todoId) return 1;
        if (a.todoId < b.todoId) return -1;
      });
      console.log(newTodo);
      setTodos(
        todos.sort((a: any, b: any) => {
          if (a.todoId > b.todoId) return 1;
          if (a.todoId < b.todoId) return -1;
        })
      );
    }
    if (e.target.value === "todoTitle") {
      const newTodo = todos.sort((a: any, b: any) => {
        if (a.todoTitle > b.todoTitle) return 1;
        if (a.todoTitle < b.todoTitle) return -1;
      });
      console.log(newTodo);
      setTodos(
        todos.sort((a: any, b: any) => {
          if (a.todoTitle > b.todoTitle) return 1;
          if (a.todoTitle < b.todoTitle) return -1;
        })
      );
    }
    if (e.target.value === "todoStatus") {
      setTodos(
        todos.sort((a: any, b: any) => {
          if (a.todoStatus > b.todoStatus) return 1;
          if (a.todoStauts < b.todoStatus) return -1;
        })
      );
    }
  };
  return (
    <Layout title="TODO一覧">
      <Box>
        {todos
          ? todos.map((todo: any) => {
              return (
                <TodoItem
                  title={todo.todoTitle}
                  status={todo.todoStatus}
                  content={todo.todoContent}
                  key={todo.id}
                  id={todo.id}
                  setDeleteTodo={setDeleteTodo}
                />
              );
            })
          : "タスクはありません"}
      </Box>
      <Flex justify="space-between">
        <Select
          w="30%"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChangeSort(e)
          }
        >
          {sortList.map((sort) => (
            <option value={sort.value} key={sort.value}>
              {sort.label}
            </option>
          ))}
        </Select>
        <Select
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
