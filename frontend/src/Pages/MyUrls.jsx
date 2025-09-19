import React, { useEffect, useState } from 'react';
import Service from "../utils/http";
import { Anchor, Table, Text } from '@mantine/core';

const MyUrls = () => {
  const service = new Service();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await service.get("user/my/urls");
      console.log(response);
      // store only the shortURLs array
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Short URL</Table.Th>
            <Table.Th>Expiry</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data && data.map((d) => (
            <Table.Tr key={d._id}>
              <Table.Td>
                <Text>{d?.title || "NA"}</Text>
              </Table.Td>
              <Table.Td>
                <Anchor href={d?.originalUrl} target="_blank">
                  {d?.originalUrl}
                </Anchor>
              </Table.Td>
              <Table.Td>
                <Text>{d?.shortCode}</Text>
              </Table.Td>
              <Table.Td>
                <Text>{d?.expiresAt || "NA"}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default MyUrls;
