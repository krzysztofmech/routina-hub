import React from "react";
import { trpc } from "./utils/trpc";
import { Button, Text } from "react-native";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const userQuery = trpc.getAllUsers.useQuery();
  const userCreator = trpc.createUser.useMutation({
    onError: ({ message }) => console.log("error", message),
  });
  return (
    <>
      {userQuery.data?.map(({ id, email, username }) => (
        <Text key={id}>{JSON.stringify({ id, email, username }, null, 2)}</Text>
      ))}

      <Button
        onPress={() =>
          userCreator.mutate({ email: "email@email.com", username: "bob123" })
        }
        title="Create user"
      />
    </>
  );
};
