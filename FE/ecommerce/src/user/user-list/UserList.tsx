import { useEffect, useState } from "react";
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  Alert,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL_U } from "../../component/constant/Constant";
import type { IUser } from "../../interface/IUser";
import { axiosIstancesU } from "../../component/instances/AxiosInstances";
import { useToast } from "../../component/toast/ToastProvider";

interface User {
  role?: string;
}

const loaderStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
};

const UserList = ({ user }: { user: User }) => {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosIstancesU.get("getAllUser");
      setUserList(response.data);
    } catch (err: unknown) {
      // you can optionally show a toast here on fetch error
      showToast(
        err instanceof Error ? err.message : "Failed to fetch users.",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") return null;

  if (loading) {
    return (
      <div style={loaderStyle}>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  const handleEdit = (u: IUser) => {
    setCurrentUser({ ...u });
    setSaveError(null); // reset error when opening modal
    setShowModal(true);
  };

  const confirmDelete = (u: IUser) => {
    setUserToDelete(u);
    setDeleteError(null); // reset delete error
    setShowDeleteModal(true);
  };

  const deleteUser = async () => {
    if (!userToDelete) return;
    setLoading(true);
    setDeleteError(null);
    try {
      await axios.delete(`${BASE_URL_U}deleteUser/${userToDelete.id}`);
      setUserList(userList.filter((u) => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      showToast("User deleted successfully!", "success");
    } catch (err: unknown) {
      setDeleteError(
        err instanceof Error
          ? "Delete failed: " + err.message
          : "Delete failed: An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setLoading(true);
    setSaveError(null);
    try {
      await axios.put(`${BASE_URL_U}updateUser/${currentUser.id}`, currentUser);
      setShowModal(false);
      showToast("User updated successfully!", "success");
      fetchUsers();
    } catch (err: unknown) {
      setSaveError(
        err instanceof Error
          ? "Update failed: " + err.message
          : "Update failed: An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderTooltip = (msg: string) => <Tooltip>{msg}</Tooltip>;

  return (
    <Container className="mt-5">
      <h2 className="mb-4">User Management</h2>

      <Table striped bordered hover responsive className="shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.emailId}</td>
              <td>{u.userName}</td>
              <td>{u.password ? "••••••••" : "-"}</td>
              <td>{u.role}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <OverlayTrigger overlay={renderTooltip("Edit user")}>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={renderTooltip("Delete user")}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => confirmDelete(u)}
                    >
                      Delete
                    </Button>
                  </OverlayTrigger>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                disabled={true}
                  value={currentUser.role}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
          {/* Save error shown here only */}
          {saveError && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setSaveError(null)}
            >
              {saveError}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user{" "}
          <strong>{userToDelete?.userName}</strong>?
          {deleteError && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setDeleteError(null)}
              className="mt-3"
            >
              {deleteError}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteUser} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
