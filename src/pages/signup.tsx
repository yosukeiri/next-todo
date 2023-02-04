import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormArea from "../components/organism/FormArea";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { UserContext } from "../providers/userProvider";

const Signup = () => {
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
  const onClickSignUp = async () => {
    try {
      //firebase宛にemail、passwordを送り、新規ユーザー登録をする。
      await createUserWithEmailAndPassword(auth, email, password);
      //Context宛にemail、passwordを送り、ユーザー情報を保管する。
      setUserInfo({ email: email, password: password });
      //サインアップ画面からTODO一覧に自動遷移させる
      router.push("/");
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        alert(e);
      }
    }
  };
  return (
    <Layout title="ユーザー登録">
      <FormArea
        name="SIGN UP"
        onClick={onClickSignUp}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </Layout>
  );
};

export default Signup;
