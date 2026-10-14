import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import API_BASE_URL from "../../api/api.jsx";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function GetProduct() {
      try {
        setloading(true);

        const response = await fetch(`${API_BASE_URL}/products/list`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("خطا در دریافت محصول");
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    }

    GetProduct();
  }, []);
  async function DeleteProductItem(id) {
       try {
      const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("خطا در حذف محصول");
      }
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } 
    catch (error) {
      setError(error.message);
    }
    
  }
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  return (
    <>
      <div className="header-dashboard">
        <h2>لیست محصولات :</h2>
        {/* <table className="item-table-pro">
          <tr>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>دسته</th>
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </table> */}
        <div className="products-container">
           {products.map((product)=>(
          <ProductItem 
          key={product.id} 
          product={product}
           onDelete={DeleteProductItem}/>
        ))}
        </div>     
      </div>
    </>
  );
}
export default ProductList;
