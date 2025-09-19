import { useEffect, useState } from "react";
import { Card, Avatar, Text, Center, Stack, Container } from "@mantine/core";
import Service from "../../utils/http";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const service = new Service();
    const getData = async () => {
      const response = await service.get("user/me");
      console.log(response);
      setUserData(response.data);
    };
    getData();
  }, []);

  if (!userData) return <Center style={{ height: "100vh" }}>Loading...</Center>;

  return (
    <Container size="sm" style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Card shadow="md" padding="xl" radius="md" withBorder style={{ width: "100%" }}>
        <Center>
          <Avatar
            src={userData.avatar}
            alt={userData.name}
            size={140}
            radius="50%" // circle
          />
        </Center>

        <Stack align="center" mt="lg">
          <Text size="xl" fw={700}>
            {userData.name}
          </Text>
          <Text size="sm" c="dimmed">
            {userData.email}
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default Profile;
