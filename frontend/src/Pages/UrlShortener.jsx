import { TextInput } from "@mantine/core";
import {useState} from "react";
import { Center, Stack, Text } from "@mantine/core";
import { Button } from "@mantine/core";
const UrlShortener = () => {
    const[originalUrl, setOriginalUrl] = useState("");
    const[customUrl, setCustomUrl] = useState("");
    const[title, setTitle] = useState("");
    const[expiryDate, setExpiryDate] = useState("");
  return (
    <Center style ={{ height: "90vh" }}>
        <Stack >
            <Text size='30px'>Shorten your URL here</Text>
            <TextInput
                label = "Original link: "
                withAsterisk
                placeholder="Enter your link here"
                onChange={(e) => setOriginalUrl(e.target.value)}
                value={originalUrl}
            />
            <TextInput
                label = "Custom link (Optional): "
                placeholder="Enter your custom link here: "
                onChange={(e) => setCustomUrl(e.target.value)}
                value={customUrl}
            />
            <TextInput
                label = "Title (Optional): "
                placeholder="Enter your title here: "
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <TextInput
                label = "Expiry Date (Optional): "
                placeholder="Enter your expiry date here: "
                onChange={(e) => setExpiryDate(e.target.value)}
                value={expiryDate}
                type="date"
            />
            <Button variant="outline" disabled={!originalUrl}>Shorten URL</Button>
        </Stack>
        
    </Center>
  );
};

export default UrlShortener;
