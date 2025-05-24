import React, { useState, type JSX } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useToast } from "../../../component/toast/ToastProvider";

interface ProductDescription {
  feature: string;
}

interface Product {
  name: string;
  price: string;
  description: string;
  category: string;
  stock: number | "";
  image: string;
  descriptions: ProductDescription[];
}

const isValidUrl = (urlString: string) => {
  try {
    if (!urlString) return true; // allow empty
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

const AddProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
    descriptions: [{ feature: "" }],
  });

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setProduct((prev) => ({
      ...prev,
      stock: val === "" ? "" : parseInt(val, 10),
    }));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...product.descriptions];
    newDescriptions[index].feature = value;
    setProduct((prev) => ({ ...prev, descriptions: newDescriptions }));
  };

  const addDescriptionField = () => {
    setProduct((prev) => ({
      ...prev,
      descriptions: [...prev.descriptions, { feature: "" }],
    }));
  };

  const validateForm = (): boolean => {
    if (!product.name.trim()) {
      showToast("Product name is required.", "danger");
      return false;
    }
    if (
      !product.price ||
      isNaN(Number(product.price)) ||
      Number(product.price) <= 0
    ) {
      showToast("Price must be a number greater than 0.", "danger");
      return false;
    }
    if (
      product.stock === "" ||
      isNaN(Number(product.stock)) ||
      Number(product.stock) < 0
    ) {
      showToast("Stock must be a number equal or greater than 0.", "danger");
      return false;
    }
    if (!isValidUrl(product.image)) {
      showToast("Image URL is invalid.", "danger");
      return false;
    }
    if (!product.descriptions.some((desc) => desc.feature.trim() !== "")) {
      showToast("Please add at least one feature.", "danger");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        ...product,
        price: parseFloat(product.price.toString()),
        stock:
          typeof product.stock === "string"
            ? parseInt(product.stock, 10)
            : product.stock,
        descriptions: product.descriptions.filter(
          (desc) => desc.feature.trim() !== ""
        ),
      };

      const response = await fetch("http://localhost:9000/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
        descriptions: [{ feature: "" }],
      });

      showToast("Product added successfully!", "success");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      showToast(errorMessage, "danger");
    }
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h4 className="text-center mb-4">Add New Product</h4>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formProductName">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formProductPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formProductStock">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter stock quantity"
                        name="stock"
                        value={product.stock}
                        onChange={handleStockChange}
                        min={0}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formProductImage">
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <Form.Group controlId="formProductDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter product description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formProductCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Label>Additional Features</Form.Label>
                {product.descriptions.reduce<JSX.Element[]>(
                  (rows, desc, idx) => {
                    if (idx % 2 === 0) {
                      const secondDesc = product.descriptions[idx + 1];
                      rows.push(
                        <Row key={idx} className="mb-2">
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder={`Feature ${idx + 1}`}
                              value={desc.feature}
                              onChange={(e) =>
                                handleDescriptionChange(idx, e.target.value)
                              }
                              required
                            />
                          </Col>
                          <Col>
                            {secondDesc ? (
                              <Form.Control
                                type="text"
                                placeholder={`Feature ${idx + 2}`}
                                value={secondDesc.feature}
                                onChange={(e) =>
                                  handleDescriptionChange(
                                    idx + 1,
                                    e.target.value
                                  )
                                }
                                required
                              />
                            ) : null}
                          </Col>
                        </Row>
                      );
                    }
                    return rows;
                  },
                  []
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  className="mb-3"
                  onClick={addDescriptionField}
                  type="button"
                >
                  + Add Another Feature
                </Button>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Add Product
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductForm;
