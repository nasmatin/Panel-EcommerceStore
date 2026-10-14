import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";
function Home() {
    const [count, setcounts] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
     useEffect(() => {
    async function GetCostumer() {
      try {
        setloading(true);

        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("خطا در دریافت شمارنده ");
        }
        const result = await response.json();
        setcounts(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    }

    GetCostumer();
  }, []);
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  return (
    <div className="home-body">
      <table className="home-table">
        <th className="home-th">
          <h3> محصولات</h3>
          <h3> {count.ProductsCount}</h3>
        </th>

        <th className="home-th">
          <h3> دسته </h3>
          <h3>  {count.CategoriesCount}</h3>
        </th>
      </table>

      <table className="home-table">
        <th className="home-th">
          <h3> مشتریان</h3>
          <h3>  {count.CustomersCount}</h3>
        </th>
        <th className="home-th">
          <h3> سفارشات</h3>
          <h3>  {count.OrdersCount}</h3>
        </th>
      </table>
    </div>
  );
}
export default Home;
