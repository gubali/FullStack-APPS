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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);

  const PRICE_MIN = 200;
  const PRICE_MAX = 30000;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);

  const itemsPerPage = 8;
  const gridRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  // Flag to avoid showing toast repeatedly on the same empty filter result
  const [noDataToastShown, setNoDataToastShown] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosIstancesP.get("/products");
        setProducts(response.data);

        const uniqueCategories = [
          "All",
          ...Array.from(new Set(response.data.map((p: IProduct) => p.category))) as string[],
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setNoDataToastShown(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    setNoDataToastShown(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = [product.name, product.title, product.description]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  useEffect(() => {
    // Show toast only if no data after filtering, and only once per empty state
    if (filteredProducts.length === 0 && !noDataToastShown) {
      if (searchTerm.trim()) {
        showToast("No products found matching your search", "warning");
      } else if (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX) {
        showToast(
          `No products found in the price range ${priceRange[0]} - ${priceRange[1]}`,
          "warning"
        );
      } else {
        showToast("No products available", "warning");
      }
      setNoDataToastShown(true);
    }
    // Reset toast flag if data exists
    if (filteredProducts.length > 0 && noDataToastShown) {
      setNoDataToastShown(false);
    }
  }, [filteredProducts, searchTerm, priceRange, noDataToastShown, showToast]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div style={{ margin: "3% 0" }}>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchEvent}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Label>
            Price Range: {priceRange[0]} - {priceRange[1]}
          </Form.Label>
          <Form.Range
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={priceRange[1]}
            onChange={(e) => {
              const value = Number(e.target.value);
              setPriceRange([PRICE_MIN, Math.max(value, PRICE_MIN)]);
              setCurrentPage(1);
              setNoDataToastShown(false);
            }}
          />
        </Col>
      </Row>

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
