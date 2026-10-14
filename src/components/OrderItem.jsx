import { useNavigate } from "react-router-dom";

function OrderItem({order}) {
  const getOrderStatus = (status) => {
  switch (Number(status)) {
    case 0:
      return "در انتظار بررسی";
    case 1:
      return "در حال آماده‌سازی";
    case 2:
      return "در حال ارسال";
    case 3:
      return "تحویل داده شده";
    default:
      return "نامشخص";
  }
};

  const navigate=useNavigate();
  const handleDetail = () => {
    navigate(`/dashboard/order/orderdetail/${order.ordernumber}`);
               console.log("order.ordernumber:",order.ordernumber);

  };
  return (
    <div className="item-body" >
        <table className="item-table-order">
          <thead>
            <tr>
        
               <th> {order.ordernumber}</th>
              <th>{Number(order.pricepaid).toLocaleString("fa-IR")} تومان</th>
              <th>{getOrderStatus(order.status)}</th>
              <th>{order.date}</th>
              <th>
                <button onClick={handleDetail} className="button-item-edit">
                  ویرایش
                </button>
              </th>
            </tr>
          </thead>
        </table>
    </div>
  );
}
export default OrderItem;
