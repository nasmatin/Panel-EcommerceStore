import { useEffect, useState } from "react";
import CategoryItem from "../../components/CategoryItem";
import API_BASE_URL from "../../api/api.jsx";
function CategoryList() {
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function GetCategory() {
      try {
        setloading(true);

        const response = await fetch(`${API_BASE_URL}/categories/list`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("خطا در دریافت دسته ");
        }
        const result = await response.json();
        setcategories(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    }

    GetCategory();
  }, []);

  async function DeleteCategoryItem(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("خطا در حذف دسته");
      }
      setcategories((prev) => prev.filter((category) => category.id !== id));
    } 
    catch (error) {
      setError(error.message);
    }
  }

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  return (
    <>
      <div className="header-dashboard"></div>
      <h2>لیست دسته بندی :</h2>
      {/* <table className="item-table-cat">
        <tr>
          <th>نام دسته</th>
          <th>دسته اصلی</th>
          <th>وضعیت</th>
          <th>ویرایش</th>
          <th>حذف</th>
        </tr>
      </table> */}
      <div className="category-container">
        {categories.map((category) => (
          <CategoryItem 
          key={category.id} 
          category={category} 
           onDelete={DeleteCategoryItem}/>
        ))}
      </div>
    </>
  );
}
export default CategoryList;
