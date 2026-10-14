import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CostomerOrderItem from "./CostomerOrderItem";
import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";
import DROPDOWN from "./DropDown";
import OrderSummaryItems from "./OrderSummaryItems";

function OrderDetail() {
  const { ordernumber } = useParams();
  const navigate = useNavigate();
   
  const categorystatus = [
    { value: "0", label: "در انتظار بررسی" },
    { value: "1", label: "در حال آماده‌سازی" },
    { value: "2", label: "در حال ارسال" },
    { value: "3", label: "تحویل داده شده" },
  ];
  const [orders, setorders] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);

  const ordersubmit = async (e) => {
    e.preventDefault();
    UpdateStatus();
  };

  
  useEffect(() => {
    async function GetOrderUser(ordernumber) {

      setloading(true);
      seterror("");
      try {
        const response = await fetch(
          `${API_BASE_URL}/orders/detail/${ordernumber}`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error("خطا در دریافت جزییات سفارش کاربر");
        }
        const result = await response.json();
        setorders(result);
        // وضعیت فعلی سفارش را برای DROPDOWN قرار می‌دهیم
        setOrderStatus(
          result.status !== null && result.status !== undefined
            ? String(result.status)
            : "",
        );
      } catch (error) {
        seterror(error.message || "");
      } finally {
        setloading(false);
      }
    }
     console.log("ordernumber1:",ordernumber);
    GetOrderUser(ordernumber);
  }, [ordernumber]);

  async function UpdateStatus() {
    setloading(true);
    seterror("");
    setsuccess("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/edit/${orders.id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: Number(orderStatus),
          }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "ثبت ناموفق");
      }

      setsuccess("تغییر وضعیت با موفقیت بروز شد");
        setorders((prev) => ({
        ...prev,
        status: String(orderStatus),
      }));
      navigate("/dashboard/order");
    } catch (error) {
      seterror(error.message || "خطا در تغییر وضعیت سفارش");
    } finally {
      setloading(false);
    }
  }
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  {
    success && <p style={{ color: "green" }}>{success}</p>;
  }
  return (
    <div onSubmit={ordersubmit}>
      <div  className="body-order">

    <h2>جزئیات سفارش:</h2>

      {/* اطلاعات سفارش */}
      <div className="detail-costumer-detail">
        <div>
          <p>شماره :</p>
          <p>{orders.ordernumber}</p>
        </div>

    
      </div>
 <div className="detail-costumer-detail">
       
        <div>
          <p>تاریخ :</p>
          <p>{orders.date}</p>
        </div>
      </div>
      {/* اطلاعات مشتری */}
      <div className="detail-costumer-detail">
        <div>
          <p> کاربر :</p>
          <p>
            {orders.name} {orders.familyname}
          </p>
        </div>

        <div>
          <p>موبایل :</p>
          <p>{orders.mobile}</p>
        </div>
      </div>

      {/* اطلاعات ارسال */}
      <div className="detail-costumer-detail">
       
        <div>
          <p>کد پستی :</p>
          <p>{orders.postalcode}</p>
        </div>
         <div>
          <p>تعداد کالا :</p>
          <p>{orders.total_products}</p>
        </div>

      </div>

    

      {/* وضعیت سفارش */}
      <div className="detail-costumer-detail">
        
          {/* آدرس */}
      <div className="detail-costumer-address">
        <p>آدرس :</p>
        <p>{orders.address}</p>
      </div>

      </div>
         <div className="status-container">

      
                 <label className="lable-container">وضعیت: </label>

          <DROPDOWN
            name="orderstatus"
            options={categorystatus}
            value={orderStatus}
            onChange={setOrderStatus}
            placeholder="وضعیت سفارش را انتخاب کنید"
          />
          
      </div>
      </div>
  
  {/* <table className="item-table-ordercostumer">
          <tr>
            <th> نام محصول </th>
            <th>قیمت</th>
            <th>تعداد</th>
            <th>تخفیف</th>
            <th>قیمت نهایی</th>
          </tr>
        </table> */}
        {orders.items?.map((order) => (
        <CostomerOrderItem key={order.product_id} order={order} />
      ))}
      <OrderSummaryItems orders={orders} />
       {success && (
        <p style={{ color: "green" }}>
          {success}
        </p>
      )}
     
      
    <button
            type="button"
            onClick={UpdateStatus}
            className="button-container"
          >
            ثبت وضعیت
          </button>
    </div>
  );
}

export default OrderDetail;
