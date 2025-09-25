import React, { useEffect, useState } from 'react';
import Service from "../utils/http";
import { Anchor, Table, Text, Modal, TextInput, Button, Switch, Group, ActionIcon, Tooltip, Checkbox, Pagination } from '@mantine/core';
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { notifications } from '@mantine/notifications';

const MyUrls = () => {
  const service = new Service();
  const [data, setData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10; // show 10 per page
  const totalPages = Math.ceil(data.length / limit);

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUrl, setEditUrl] = useState(null);
  const [editOriginalUrl, setEditOriginalUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState(true);
  const [editLoading, setEditLoading] = useState(false);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState(null);
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getData = async () => {
    try {
      const response = await service.get("user/my/urls");
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ------------------- Edit Handlers -------------------
  const handleEditClick = (urlObj) => {
    setEditUrl(urlObj);
    setEditOriginalUrl(urlObj.originalUrl || "");
    setEditTitle(urlObj.title || "");
    setEditStatus(urlObj.isActive ?? true);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditUrl(null);
    setEditOriginalUrl("");
    setEditTitle("");
    setEditStatus(true);
  };

  const handleEditSave = async () => {
    if (!editUrl) return;
    setEditLoading(true);
    try {
      await service.put(`s/${editUrl.shortCode}`, {
        originalUrl: editOriginalUrl,
        title: editTitle,
        isActive: editStatus,
      });
      notifications.show({
        title: 'URL Updated',
        message: 'Short URL updated successfully!',
        color: 'teal'
      });
      handleEditClose();
      getData();
    } catch (error) {
      notifications.show({
        title: 'Update Failed',
        message: 'Could not update the URL.',
        color: 'red'
      });
    } finally {
      setEditLoading(false);
    }
  };

  // ------------------- Delete Handlers -------------------
  const handleDeleteClick = (urlObj) => {
    setDeleteUrl(urlObj);
    setDeleteChecked(false);
    setDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
    setDeleteUrl(null);
    setDeleteChecked(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUrl) return;
    setDeleteLoading(true);
    try {
      await service.delete(`s/${deleteUrl.shortCode}`);
      notifications.show({
        title: 'URL Deleted',
        message: 'Short URL deleted successfully!',
        color: 'red'
      });
      handleDeleteClose();
      getData();
    } catch (error) {
      notifications.show({
        title: 'Delete Failed',
        message: 'Could not delete the URL.',
        color: 'red'
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Slice data for pagination
  const paginatedData = data.slice((page - 1) * limit, page * limit);

  return (
    <div style={{ margin: '2rem' }}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Short URL</Table.Th>
            <Table.Th>Expiry</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedData && paginatedData.map((d) => (
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
              <Table.Td>
                <Group spacing="xs">
                  <Tooltip label="Edit">
                    <ActionIcon color="blue" onClick={() => handleEditClick(d)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Delete">
                    <ActionIcon color="red" onClick={() => handleDeleteClick(d)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Group position="center" mt="md">
          <Pagination value={page} onChange={setPage} total={totalPages} />
        </Group>
      )}

      {/* Edit Modal */}
      <Modal opened={editModalOpen} onClose={handleEditClose} centered size="sm">
        <TextInput
          label="Original URL"
          value={editOriginalUrl}
          onChange={e => setEditOriginalUrl(e.target.value)}
          required
        />
        <TextInput
          label="Title"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
        <Switch
          checked={editStatus}
          onChange={e => setEditStatus(e.currentTarget.checked)}
          label={editStatus ? "Active" : "Inactive"}
        />
        <Group position="right" mt="md">
          <Button variant="default" onClick={handleEditClose}>Cancel</Button>
          <Button loading={editLoading} onClick={handleEditSave}>Update</Button>
        </Group>
      </Modal>

      {/* Delete Modal */}
      <Modal opened={deleteModalOpen} onClose={handleDeleteClose} centered size="sm">
        <Text>Are you sure you want to delete this URL?</Text>
        <Text><b>Short URL:</b> {deleteUrl?.shortCode}</Text>
        <Text><b>Original URL:</b> {deleteUrl?.originalUrl}</Text>
        <Checkbox
          checked={deleteChecked}
          onChange={e => setDeleteChecked(e.currentTarget.checked)}
          label="I am sure I want to delete this URL"
          required
        />
        <Group position="right" mt="md">
          <Button variant="default" onClick={handleDeleteClose}>Cancel</Button>
          <Button loading={deleteLoading} disabled={!deleteChecked} color="red" onClick={handleDeleteConfirm}>Delete</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default MyUrls;
