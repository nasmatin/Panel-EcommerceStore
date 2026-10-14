import {  useNavigate } from "react-router-dom";

function ProductItem({ product, onDelete }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/dashboard/product/productdetail/${product.id}`);
  };
  return (
    <div className="item-body">
      {/* <Link to={`/dashboard/product/productdetail/${product.id}`}> */}
        <table className="item-table-pro">
          <thead>
            <tr>
              <th className="item-productname">{product.name}</th>
              <th>{Number(product.price).toLocaleString("fa-IR")} تومان</th>
              <th>{product.category}</th>
              <th  className="item-action">
                <button onClick={handleEdit} className="button-item-edit">
                  ویرایش
                </button>
              </th>
              <th  className="item-action">
                <button
                  onClick={() => {onDelete(product.id)}}
                  className="button-item-delete"
                >
                  حذف
                </button>
              </th>
            </tr>
          </thead>
        </table>
      {/* </Link> */}
    </div>
  );
}
export default ProductItem;
