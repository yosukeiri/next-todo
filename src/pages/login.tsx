import React, { useContext, useState } from "react";
import FormArea from "../components/organism/FormArea";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../providers/userProvider";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);

  console.log(context);
  const onClickLogin = async () => {
    console.log(email);
    console.log(password);
    await signInWithEmailAndPassword(auth, email, password);
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

export default login;
