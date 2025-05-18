import React, { useState } from "react";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";

interface User {
  role?: string;
}

const ProductList = ({ user }: { user: User }) => {
  // Only show if user is admin
  if (user?.role !== "admin") return null;

  // Initial product data
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: 100, stock: 10 },
    { id: 2, name: "Product B", price: 200, stock: 5 },
    { id: 3, name: "Product C", price: 150, stock: 20 },
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showModal, setShowModal] = useState(false);
  interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Open modal to edit
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      setProducts(products.filter((prod) => prod.id !== id));
    }
  };

  // Save changes from modal
  const handleSave = () => {
    if (!currentProduct) return;
    setProducts(products.map((prod) =>
      prod.id === currentProduct.id ? currentProduct : prod
    ));
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Admin Product List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price ($)</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.stock}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(prod)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(prod.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                    setCurrentProduct({ ...currentProduct, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, price: +e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, stock: +e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
