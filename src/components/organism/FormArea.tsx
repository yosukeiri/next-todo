import React, { useEffect, useState } from "react";
import { Box, Center, Button, Input } from "@chakra-ui/react";

const FormArea = (props: any) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const onChangeEmail = (e: any) => {
    setEmailValue(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPasswordValue(e.target.value);
  };
  useEffect(() => {
    props.setEmail(emailValue);
    props.setPassword(passwordValue);
  }, [emailValue, passwordValue]);

  return (
    <>
      <Box mb={10}>
        <dl>
          <dt>メールアドレス</dt>
          <dd>
            <Input
              bg={"#F0FFF4"}
              rounded={40}
              px={5}
              py={3}
              onChange={onChangeEmail}
              value={emailValue}
            />
          </dd>
        </dl>
      </Box>
      <Box mb={10}>
        <dl>
          <dt>パスワード</dt>
          <dd>
            <Input
              bg={"#F0FFF4"}
              rounded={40}
              px={5}
              py={3}
              onChange={onChangePassword}
              value={passwordValue}
            />
          </dd>
        </dl>
      </Box>
      <Center>
        <Button
          bg={"#28ADCA"}
          rounded={50}
          w={"204px"}
          h={"54px"}
          color={"#F0FCFF"}
          fontSize="24px"
          onClick={props.onClick}
        >
          {props.name}
        </Button>
      </Center>
    </>
  );
};

export default FormArea;
