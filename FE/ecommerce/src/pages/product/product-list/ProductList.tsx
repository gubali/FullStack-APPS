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
import { useToast } from "../../../component/toast/ToastProvider";
import { BASE_URL_P } from "../../../component/constant/Constant";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  descriptions: { id: number; feature: string }[];
}

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

const ProductList = ({ user }: { user: User }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL_P}products`);
      setProducts(res.data);
    } catch (err: unknown) {
      showToast(
        err instanceof Error ? err.message : "Failed to fetch products.",
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

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setSaveError(null);
    setShowModal(true);
  };

  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL_P}/${productToDelete.id}`);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      showToast("Product deleted successfully!", "success");
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
    if (!currentProduct) return;
    setLoading(true);
    try {
      await axios.put(
        `${BASE_URL_P}/${currentProduct.id}`,
        currentProduct
      );
      setShowModal(false);
      showToast("Product updated successfully!", "success");
      fetchProducts();
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
      <h2 className="mb-4">Product Management</h2>

      <Table striped bordered hover responsive className="shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Features</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Image</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>
                <ul className="mb-0">
                  {p.descriptions.map((d) => (
                    <li key={d.id}>{d.feature}</li>
                  ))}
                </ul>
              </td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <OverlayTrigger overlay={renderTooltip("Edit product")}>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={renderTooltip("Delete product")}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => confirmDelete(p)}
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
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={currentProduct.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Features</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={currentProduct.descriptions
                    .map((d) => d.feature)
                    .join("\n")}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      descriptions: e.target.value
                        .split("\n")
                        .map((feature, idx) => ({
                          id: idx + 1, // You may want to handle real IDs
                          feature,
                        })),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={currentProduct.category}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      category: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
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
                <Spinner as="span" animation="border" size="sm" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete product{" "}
          <strong>{productToDelete?.name}</strong>?
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
          <Button variant="danger" onClick={deleteProduct} disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" /> Deleting...
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

export default ProductList;
