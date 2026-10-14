function OrderSummaryItems({ orders }) {
  return (
    <div className="order-summary-items">
      <h3>جمع مبالغ</h3>

      <div className="order-summary-row">
        <p>قیمت کل کالاها :</p>
        <p>
          {Number(orders.pricefull || 0).toLocaleString("fa-IR")} تومان
        </p>
      </div>

      <div className="order-summary-row">
        <p>هزینه ارسال :</p>
        <p>
          {Number(orders.shippingcost || 0).toLocaleString("fa-IR")} تومان
        </p>
      </div>

      <div className="order-summary-row">
        <p>هزینه بسته‌بندی :</p>
        <p>
          {Number(orders.packagingcost || 0).toLocaleString("fa-IR")} تومان
        </p>
      </div>

      <div className="order-summary-row">
        <p>مالیات :</p>
        <p>
          {Number(orders.tax || 0).toLocaleString("fa-IR")} تومان
        </p>
      </div>

      <div className="order-summary-row">
        <p>مبلغ پرداخت‌شده :</p>
        <p>
          {Number(orders.pricepaid || 0).toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </div>
  );
}

export default OrderSummaryItems;