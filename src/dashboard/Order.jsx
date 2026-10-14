import { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";
import API_BASE_URL from "../api/api";
function Order() {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function GetOrder() {
      try {
        setloading(true);

        const response = await fetch(`${API_BASE_URL}/orders/list`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("خطا در دریافت سفارش ");
        }
        const result = await response.json();
        setorders(result);
        console.log("result:", result);
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    }

    GetOrder();
  }, []);
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  return (
    <>
      <div className="header-dashboard">
        <h2>لیست سفارشات :</h2>
        {/* <table className="item-table-order">
          <tr>
            <th>شماره سفارش </th>
            <th>قیمت</th>
            <th>وضعیت</th>
            <th>تاریخ</th>
             <th>ویرایش</th>
          </tr>
        </table> */}
        <div className="order-container">
          {orders.map((order) => (
            <OrderItem key={order.numberorder} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Order;
