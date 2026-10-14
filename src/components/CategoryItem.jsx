import {  useNavigate } from "react-router-dom";

function CategoryItem({ category,onDelete }) {
   const navigate=useNavigate();
  const handleEdit = () => {
    navigate(`/dashboard/category/categorydetail/${category.id}`);
  };
    const getStatus = (status) => {
  switch (Number(status)) {
    case 0:
      return "غیر فعال  ";
    case 1:
      return "  فعال";
    default:
      return "نامشخص";
  }
};
  return (
    <div className="item-body">
        <table className="item-table-cat">
          <thead>
            <tr>
              <th className="item-catname">{category.name}</th>
              <th className="item-parent-catname">{category.parentname ||"-"} </th>
              <th>{getStatus(category.status)} </th>
                  <th>
                <button onClick={handleEdit} className="button-item-edit">
                  ویرایش
                </button>
              </th>
              <th>
                <button onClick={()=>onDelete(category.id)} className="button-item-delete">
                  حذف
                </button>
              </th>
            </tr>
          </thead>
        </table>
    </div>
  );
}
export default CategoryItem;
