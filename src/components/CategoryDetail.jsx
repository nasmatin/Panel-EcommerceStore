import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/api";
import DROPDOWN from "./DropDown";

function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const categoriesstatus = [
    { value: "1", label: "فعال" },
    { value: "0", label: "غیر فعال " },
  ];
  const [formcategory, setformcategory] = useState({
    categoryname: "",
    categoryparent: "",
    categorystatus: "",
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [parentCategory, setParentCategory] = useState([]);

  const categorychange = (e) => {
    const { name, value } = e.target;
    setformcategory((prevcat) => ({
      ...prevcat,
      [name]: value,
    }));
  };
  const categorysubmit = async (e) => {
    e.preventDefault();
    UpdateCategory();
  };
  useEffect(() => {
    fetchparentcategory();
    async function GetCategoryDetail(id) {
      setloading(true);
      seterror("");
      try {
        const response = await fetch(`${API_BASE_URL}/categories/detail/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("خطا در نمایش جزییات دسته");
        }
        const result = await response.json();
        setformcategory({   
           categoryname: result.name,
          categoryparent: result.parentid !== null && result.parentid !== undefined
      ? String(result.parentid)
      : "",
          categorystatus: result.status,} 
      );
      } catch (error) {
        seterror(error.message);
      } finally {
        setloading(false);
      }
    }
    GetCategoryDetail(id);
  }, [id]);
  async function fetchparentcategory() {
    try {
    const response = await fetch(`${API_BASE_URL}/categories/catparents`);
      if (!response.ok) {
        throw new Error("خطا در دریافت دسته‌بندی‌ها");
      }
      const result = await response.json();
         const categoryOptions = result.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setParentCategory(categoryOptions);
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }
  async function UpdateCategory() {
    setloading(true);
    seterror("");
    setsuccess("");
    try {

      const response = await fetch(`${API_BASE_URL}/categories/edit/${id}`, {
        method: "PUT",
          headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({
      name: formcategory.categoryname,
      parentid: formcategory.categoryparent
        ? Number(formcategory.categoryparent)
        : null,
      status: Number(formcategory.categorystatus),
    }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "ثبت ناموفق");
      }
      setsuccess("دسته با موفقیت بروز شد");
      navigate("/dashboard/category/categorylist");
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }
  return (
    <div className="header-dashboard">
      {/* <p>ID: {id}</p> */}
      <h2>جزئیات دسته‌بندی</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form className="form-container" onSubmit={categorysubmit}>
        <label className="lable-container">نام محصول :</label>
        <input
          name="categoryname"
          className="input"
          placeholder="نام دسته   "
          value={formcategory.categoryname}
          required
          onChange={categorychange}
        ></input>
        <label className="lable-container">دسته والد :</label>
        <DROPDOWN
          name="parentCategory"
          options={parentCategory}
          value={formcategory.categoryparent}
          onChange={(value) =>
            setformcategory((prev) => ({ ...prev, categoryparent: value }))
          }
          placeholder="دسته‌بندی "
          required
        />
        <label className="lable-container"> وضعیت دسته:</label>
        <DROPDOWN
          name="statusCategory"
          options={categoriesstatus}
          value={formcategory.categorystatus}
          onChange={(value) =>
            setformcategory((prev) => ({ ...prev, categorystatus: value }))
          }
          placeholder=" وضعیت را انتخاب کنید"
        />

        <button type="submit" className="button-container" disabled={loading}>
          {loading ? "در حال بروزرسانی دسته..." : "بروزرسانی دسته‌بندی"}{" "}
        </button>
      </form>
    </div>
  );
}

export default CategoryDetail;
