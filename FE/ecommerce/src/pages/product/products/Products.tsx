import { useState, useEffect, useRef } from "react";
import { Col, Pagination, Row, Form } from "react-bootstrap";
import ProductCard from "../../../component/card/Card";
import { axiosIstancesP } from "../../../component/instances/AxiosInstances";
import { useToast } from "../../../component/toast/ToastProvider";
import type { IProduct } from "../../../interface/IProduct";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const gridRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosIstancesP.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);

    const filtered = products.filter((product) =>
      [product.name, product.title, product.description]
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    if (value.trim() && filtered.length === 0) {
      showToast("No products found", "warning");
    }
  };

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

  return (
    <div style={{ margin: "3% 0" }}>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchEvent}
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
                    stock: product.stock,
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default Products;
