
function CostomerOrderItem({order}) {
  return (
    <div className="item-body">
        <table className="item-table-ordercostumer">
          <thead>
            <tr>
              <th>{order.product_name} </th>
              <th> {Number(order.price).toLocaleString("fa-IR")} تومان</th>
              <th>{order.quantity}</th>
                <th>
              {Number(order.sale_price || 0).toLocaleString("fa-IR")} 
            </th>
            <th>
              {(
                Number(order.price || 0) * Number(order.quantity || 0)
              ).toLocaleString("fa-IR")} تومان
            </th>
            </tr>
          </thead>
        </table>
    </div>
  );
}
export default CostomerOrderItem;
