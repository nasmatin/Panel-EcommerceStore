import { useEffect, useState } from "react";
import CostumerOrderItem from "../components/CostomerOrderItem";
import DROPDOWN from "./DropDown";
import { useParams } from "react-router-dom";

function CostumerOrder() {
   const { id } = useParams();
  const orderstatus = [
    { value: "1", label: "در انتظار بررسی" },
    { value: "2", label: " در حال آماده سازی " },
    { value: "3", label: "در حال ارسال" },
    { value: "4", label: "تحویل داده شده" },
  ];
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState("");
  const [selectedorderstatus, setsselectedorderstatus] = useState("");
  const [detailorders, setdetailorders] = useState([]);

  useEffect(() => {
      async function GetOrderDetail() {
        setloading(true);
        seterror("");
        try {
          const response = await fetch(`/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) {
            throw new Error("خطا در نمایش جزییات سفارش!");
          }
          const result = await response.json();
          setdetailorders(result);
        } catch (error) {
          seterror(error.message);
        } finally {
          setloading(false);
        }
      }
      GetOrderDetail();
  }, [id]);

  const submitdetail = (e) => {
    e.preventDefault();
    FetchUpdateDetail();
  };
  async function FetchUpdateDetail() {
    setloading(true);
    seterror("");
    try {
      const response = await fetch(`....../${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: selectedorderstatus,
        }),
      });
      if (!response.ok) {
        throw new Error("خطا در بروزرسانی سفارش");
      }
    } catch (error) {
      seterror(error.message);
    } finally {
      setsuccess("صفارش با موفقیت اپدیت شد.");
    }
  }
  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  return (
    <>
      <div className="header-dashboard">
        <h2>جزییات سفارش:</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div className="detail-costumer-header">
          <p>شماره سفارش:123</p>
          <p>جمع فاکتور :1500000</p>
        </div>
        <div className="detail-costumer-header">
          <p>نام مشتری : نسترن متین نجاتی</p>

          <p>شماره موبایل :09121234567</p>
        </div>
        <div className="detail-costumer-status">
          <div>
            <label className="lable-container"> وضعیت دسته:</label>
            <DROPDOWN
              name="statusorder"
              options={orderstatus}
              value={selectedorderstatus}
              onChange={setsselectedorderstatus}
              placeholder=" وضعیت را انتخاب کنید"
            />
          </div>
          <div>
            <p>تاریخ ثبت سفارش: 1405/06/16</p>
          </div>
        </div>
        <table className="item-table-ordercostumer">
            <thead>

          <tr>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>تعداد</th>
          </tr>
          </thead>
        </table>
        <div className="ordercostumer-container">
          {detailorders.map((detailorder) => (
            <CostumerOrderItem key={detailorder.id} product={detailorder} />
          ))}
        </div>
        <button
          type="submit"
          className="button-container"
          disabled={loading}
          onSubmit={submitdetail}
        >
          {loading ? "در حال ویرایش وضعیت..." : "ویرایش    "}
        </button>{" "}
      </div>
    </>
  );
}
export default CostumerOrder;
