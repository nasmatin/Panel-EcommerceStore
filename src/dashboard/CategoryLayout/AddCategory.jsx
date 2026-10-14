import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api.jsx";
import DROPDOWN from "../../components/DropDown";

function AddCategory() {
    const navigate = useNavigate();

  const categoriesstatus = [
    { value: "1", label: "فعال" },
    { value: "2", label: "غیر فعال " },
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
  const [selectedparentCategory, setselectedparentCategory] = useState("");

  const [selectedCategory, setselectedCategory] = useState("");

  const categorychange = (e) => {
    const { name, value } = e.target;
    setformcategory((prevcat) => ({
      ...prevcat,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchparentcategory();
  }, []);

  const categorysubmit = async (e) => {
    e.preventDefault();
    FetchSubmitCategory();
  };
  async function fetchparentcategory() {
    try {
      const response = await fetch( `${API_BASE_URL}/categories/catparents`);
            if (!response.ok) {
      throw new Error(`خطای دریافت دسته‌بندی: ${response.status}`);
    }

      const result = await response.json();
         console.log("Categories:", result);
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
  async function FetchSubmitCategory( ){
        setloading(true);
    seterror("");
    setsuccess("");
    try{
       const formData = new FormData();
       
            formData.append("name", formcategory.categoryname);
      formData.append("parent_id", selectedparentCategory);
      formData.append("status", selectedCategory);
      const response= await fetch(`${API_BASE_URL}/categories/add`,{
        method:'POST',
        headers:{"Content-Type":"application/json",},
          body:JSON.stringify({
        name: formcategory.categoryname,
        parentid: selectedparentCategory
          ? Number(selectedparentCategory)
          : null,
        status: selectedCategory
          ? Number(selectedCategory)
          : 1,
      }),
      })
    const result=await response.json();
    if(!response.ok){
  throw new Error(result.message || "ثبت ناموفق");      
    }
  setsuccess("دسته با موفقیت ثبت شد");
        setTimeout(() => {
  navigate("/dashboard/category/categorylist");
}, 1000);
    }
    catch(error){
      seterror(error.message);
    }
    finally{
      setloading(false);
    }

  }
  return (
    <>
      <div className="header-dashboard">
        <h2>ثبت دسته بندی :</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
      <form className="form-container" onSubmit={categorysubmit}>
       <label className="lable-container">نام دسته :</label>
        <input
          name="categoryname"
          className="input"
          placeholder="نام دسته   "
          required
          onChange={categorychange}
        ></input>
          <label className="lable-container">دسته والد :</label>
           <DROPDOWN
          name="categoryparent"
          options={parentCategory}
          value={parentCategory.value}
          onChange={setselectedparentCategory}
          placeholder="دسته‌بندی  را انتخاب کنید"
          required
        />
                <label className="lable-container">  وضعیت دسته:</label>
        <DROPDOWN
          name="categorystatus"
          options={categoriesstatus}
          value={categoriesstatus.label}
          onChange={setselectedCategory}
          placeholder=" وضعیت را انتخاب کنید"
        />
        
         <button type="submit" className="button-container" disabled={loading}>
            {loading ? "در حال ثبت دسته..." : "ثبت دسته بندی"}
          </button>
      </form>
    </>
  );
}
export default AddCategory;
