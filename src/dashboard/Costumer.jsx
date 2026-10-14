import { useEffect, useState } from "react";
import CostumerItem from "../components/CostumerItem";
import API_BASE_URL from "../api/api";
function Costumer() {
  const [costumers, setcostumers] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function GetCostumer() {
      try {
        setloading(true);

        const response = await fetch(`${API_BASE_URL}/customers/list`, {
          method: "GET",
         headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("خطا در دریافت مشتریان");
        }
        const result = await response.json();
        setcostumers(result);
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
    <>
      <div className="header-dashboard">
        <h2>لیست مشتریان :</h2>
        <table className="item-table-cos">
          <tr>
            <th>نام مشتری </th>
            <th>موبایل</th>
          </tr>
        </table>
        <div className="category-container">
          {costumers.map((costumer) => (
            <CostumerItem
             key={costumer.id} 
             costumer={costumer} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Costumer;
