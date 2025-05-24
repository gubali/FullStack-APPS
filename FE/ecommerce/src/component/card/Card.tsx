import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Card.css";
import { addToCart } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";

interface Product {
  id: number;
  title: string;
  description: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    dispatch(addToCart()); // ✅ Make sure product is passed
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <div className="product-price">₹{product.price}</div>
          <div
            className={`product-stock ${
              isOutOfStock ? "text-danger" : "text-success"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
          </div>
        </div>
        <div
          className="d-flex justify-content-center mt-2 gap-2"
          style={{ marginBottom: "10px" }}
        >
          <Button
            variant="primary"
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => setShowModal(true)} // ✅ Show modal
          >
            Details
          </Button>
        </div>
      </div>

      {/* Large Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column flex-md-row gap-4">
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <div>
              <h5>Name: {product.name}</h5>
              <strong>Description:</strong> <small>{product.description}</small>
              <div><strong>Price:</strong> ₹{product.price}</div>
              <div><strong>Stock: {product.stock}</strong></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
