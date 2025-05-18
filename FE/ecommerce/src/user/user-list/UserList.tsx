import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  Alert,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL_U } from "../../component/constant/Constant";
import type { IUser } from "../../interface/IUser";

interface User {
  role?: string;
}

const UserList = ({ user }: { user: User }) => {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(BASE_URL_U + "getAllUser")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong");
      });
  };

  if (user?.role !== "admin") return null;

  const handleEdit = (user: IUser) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const confirmDelete = (user: IUser) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const deleteUser = () => {
    if (!userToDelete) return;
    axios
      .delete(`${BASE_URL_U}deleteUser/${userToDelete.id}`)
      .then(() => {
        setUserList(userList.filter((u) => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      })
      .catch((error) => {
        alert("Delete failed: " + error.message);
        setShowDeleteModal(false);
      });
  };

  const handleSave = () => {
    if (!currentUser) return;

    axios
      .put(`${BASE_URL_U}update/${currentUser.id}`, currentUser)
      .then(() => {
        fetchUsers();
        setShowModal(false);
        setShowToast(true); // Show toast on success
      })
      .catch((error) => {
        alert("Update failed: " + error.message);
      });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.emailId}</td>
              <td>{u.userName}</td>
              <td>{u.password}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => confirmDelete(u)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={currentUser.firstName}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, firstName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={currentUser.lastName}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, lastName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currentUser.emailId}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, emailId: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={currentUser.userName}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, userName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentUser.password}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, password: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userToDelete && (
            <p>
              Are you sure you want to delete user{" "}
              <strong>{userToDelete.userName}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Update Successful</strong>
          </Toast.Header>
          <Toast.Body className="text-white">User updated successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default UserList;
