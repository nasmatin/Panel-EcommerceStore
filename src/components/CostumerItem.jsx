import { useNavigate } from "react-router-dom";

function CostumerItem({costumer}) {
     const navigate=useNavigate();
  const handleDetail = () => {
    navigate(`/dashboard/costumer/costumerdetail/${costumer.id}`);
  };
  return (
    <div className="item-body" onClick={handleDetail}>
      {/* <Link to={`/dashboard/costumer/costumerdetail/${costumer.id}`}> */}
        <table className="item-table-cos">
          <thead>
            <tr>
              <th>{costumer.username}</th>
              <th>{costumer.mobile}</th>
            </tr>
          </thead>
        </table>
      {/* </Link> */}
    </div>
  );
}
export default CostumerItem;
