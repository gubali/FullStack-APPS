import { Button } from "react-bootstrap";
import "./Card.css";
import { addToCart } from "../../redux/CartSlice";
import {useDispatch } from "react-redux";
interface Product {
  id: number;
  title: string;
  description: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductCardProps {
  product: Product & { image: string };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isOutOfStock = product.stock === 0;
const handleAddToCart = () => {
    dispatch(addToCart());
  };
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
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
          onClick={() => alert(`Product ${product.name} details`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
