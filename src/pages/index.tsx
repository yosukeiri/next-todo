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
    if (!userInfo.id) {
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
        setTodos(data.filter((todo: any) => todo.todoUser === userInfo.id));
      });
    }
  }, [userInfo]);
  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    getDocs(todosCollectionRef).then((querySnapshot) => {
      // 同じuseEffect内でuseStateで参照した変数を参照せずに取得したデータを変数に格納してそれを利用する
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodosData(data);
      setTodos(data.filter((todo: any) => todo.todoUser === userInfo.id));
    });
  }, [deleteTodo]);
  const onChangeStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      setTodos(todosData.filter((todo: any) => todo.todoUser === userInfo.id));
    } else {
      setTodos(
        todosData.filter((todo: any) => {
          return (
            todo.todoUser === userInfo.id && todo.todoStatus === e.target.value
          );
        })
      );
    }
  };
  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "todoId") {
      const copyTodos = [...todos];
      copyTodos.sort((a: any, b: any) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      setTodos(copyTodos);
    }
    if (e.target.value === "todoTitle") {
      const copyTodos = [...todos];
      copyTodos.sort((a: any, b: any) => {
        if (a.todoTitle > b.todoTitle) return 1;
        if (a.todoTitle < b.todoTitle) return -1;
        return 0;
      });
      setTodos(copyTodos);
    }
    if (e.target.value === "todoStatus") {
      const copyTodos = [...todos];
      copyTodos.sort((a: any, b: any) => {
        if (a.todoStatus > b.todoStatus) return 1;
        if (a.todoStatus < b.todoStatus) return -1;
        return 0;
      });
      setTodos(copyTodos);
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
