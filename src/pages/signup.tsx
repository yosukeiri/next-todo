import React, { useContext, useState } from "react";
import FormArea from "../components/organism/FormArea";
import Layout from "../components/Layout";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../providers/userProvider";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const onClickSignUp = async () => {
    console.log(email);
    console.log(password);
    await createUserWithEmailAndPassword(auth, email, password);
    setUserInfo({ email: email, password: password });
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

export default signup;
