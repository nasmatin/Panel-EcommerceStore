import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../api/api";
function CostumerDetail() {
  const { id } = useParams();

  const [costumers, setcostumers] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function GetCostumer(id) {
      try {
        setloading(true);

        const response = await fetch(`${API_BASE_URL}/customers/detail/${id}`, {
          method: "GET",
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

    GetCostumer(id);
  }, [id]);
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  return (
    <div>
      <h2>جزئیات مشتری:</h2>
      <div className="detail-costumer-detail">
        <div>
          <p> نام:</p>
          <p>{costumers.name} {costumers.familyname}</p>
        </div>
  
      </div>
 <div className="detail-costumer-detail">
      <div>
          <p> موبایل : </p>
          <p>{costumers.mobile}</p>
        </div>
 </div>
      <div className="detail-costumer-address">
        <p>آدرس :</p>
        <p>
   {costumers.addresses?.length > 0
    ? `${costumers.addresses[0].province || ""}، ${costumers.addresses[0].city || ""}، ${costumers.addresses[0].address || ""}، کد پستی: ${costumers.addresses[0].postalCode || "-"}`
    : "-"}
        </p>
      </div>
      
   
    </div>
  );
}

export default CostumerDetail;
