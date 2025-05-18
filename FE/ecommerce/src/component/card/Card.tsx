
import { Button } from 'react-bootstrap';
import './Card.css';
interface Product {
  id: number;
  title: string;
  description: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product & { image: string };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
      </div>
       <div className="d-flex justify-content-center mt-2 gap-2" style={{ marginBottom: "10px" }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => alert(`Added ${product.name} to cart!`)}
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
