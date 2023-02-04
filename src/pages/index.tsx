import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import { UserContext } from "../providers/userProvider";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const { userInfo } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, []);
  return (
    <Layout title="TODO一覧">
      <h1>TOP</h1>
      <p>{userInfo ? userInfo.email : ""}</p>
    </Layout>
  );
}
