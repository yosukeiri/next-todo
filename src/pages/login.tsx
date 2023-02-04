import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormArea from "../components/organism/FormArea";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { UserContext } from "../providers/userProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const router = useRouter();

  //最初に開いた時にuserInfoがあるときはトップに遷移させる
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const onClickLogin = async () => {
    try {
      //firebase宛にemail、passwordを送り、ログイン認証をする。
      await signInWithEmailAndPassword(auth, email, password);
      //Context宛にemail、passwordを送り、ユーザー情報を保管する。
      setUserInfo({ email: email, password: password });
      //ログイン画面からTODO一覧に自動遷移させる
      router.push("/");
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        alert(e);
      }
    }
  };
  return (
    <Layout title="ログイン">
      <FormArea
        name="LOGIN"
        onClick={onClickLogin}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </Layout>
  );
};

export default Login;
