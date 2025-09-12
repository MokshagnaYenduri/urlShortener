import { useState } from "react";
import { TextInput, Center, Stack, Text, Button, Anchor } from "@mantine/core";
import Service from "../utils/http";
import {QRCodeSVG} from 'qrcode.react';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [title, setTitle] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [shortUrlData, setShortUrlData] = useState(null);

  const service = new Service();

  const getShortUrl = async () => {
    const response = await service.post("s", {
      customUrl,
      originalUrl,
      expiryDate,
      title,
    });
    setShortUrlData(response);
  };

  return (
    <Center style={{ height: "90vh" }}>
      <Stack gap="sm">
        {!shortUrlData ? (
          <>
            <Text
              variant="gradient"
              gradient={{ from: "pink", to: "indigo", deg: 90 }}
            size="30px"
            fw={700}
          >
            Shorten your URL here
          </Text>

          <TextInput
            label="Original link:"
            withAsterisk
            placeholder="Enter your link here"
            onChange={(e) => setOriginalUrl(e.target.value)}
            value={originalUrl}
          />

          <TextInput
            label="Custom link (Optional):"
            placeholder="Enter your custom link here"
            onChange={(e) => setCustomUrl(e.target.value)}
            value={customUrl}
            radius="md"
          />

          <TextInput
            label="Title (Optional):"
            placeholder="Enter your title here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <TextInput
            label="Expiry Date (Optional):"
            placeholder="Enter your expiry date here"
            onChange={(e) => setExpiryDate(e.target.value)}
            value={expiryDate}
            type="date"
          />

          <Button
            variant="outline"
            disabled={!originalUrl}
            onClick={getShortUrl}
            color="violet"
          >
            Shorten URL
          </Button>
        </>
      ) : (
        <>
          <Anchor href={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`} target="_blank">
            {`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`}
          </Anchor>
          <center marginTop="20px">
            <QRCodeSVG value={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`} />
          </center>
        </>
      )}
      </Stack>
    </Center>
  );
};

export default UrlShortener;