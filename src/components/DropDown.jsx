
const DROPDOWN = ({
  options = [],
  value,
  onChange,
  name,
  disabled = false,
}) => {
  return (
    <div className="dropdown-container">

      <select
      className="select-container"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
       

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    <span className="dropdown-arrow"><i className="fa-solid fa-caret-down"></i>
</span>
    </div>
  );
};

export default DROPDOWN;