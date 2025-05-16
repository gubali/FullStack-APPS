import axiosIstances from "../../../component/instances/AxiosInstances";
import { useState, useEffect, useRef } from "react";
import ProductCard from "../../../component/card/Card";
import { Col, Pagination, Row, Form, Button } from "react-bootstrap";

interface Product {
  id: number;
  title: string;
  description: string;
  name: string;
  price: number;
  image?: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    [product.name, product.title, product.description]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosIstances.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div style={{ margin: "3% 0" }}>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form>
        <div ref={gridRef}>
          <Row className="gx-1 gy-2">
            {paginatedProducts.map((product) => (
              <Col key={product.id} md={4} sm={6} lg={3}>
                <div className="border rounded p-2 h-100 d-flex flex-column justify-content-between">
                  <ProductCard
                    product={{
                      ...product,
                      image: product.image || "https://via.placeholder.com/150",
                    }}
                  />

                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2 w-100"
                    onClick={() => alert(`Added ${product.name} to cart!`)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </div>
    </>
  );
};

export default ProductList;
