import { IoIosArrowDown } from "react-icons/io";
import dressCategories from "../../data/dressCategories";

const CategoryDropdown = ({
  selectedCategory,
  setSelectedCategory,
  isCategoryDropdownOpen,
  setIsCategoryDropdownOpen,
}) => {
  return (
    <div className="relative">
      <button
        className="relative w-48 px-4 py-2 rounded bg-primary-white text-sm text-left font-medium text-secondary-black"
        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
      >
        {selectedCategory}
        <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
      </button>

      {/* Dropdown List */}
      <div
        className={`w-full mt-2 absolute z-10 ${
          isCategoryDropdownOpen ? "h-80" : "h-0"
        } overflow-hidden transition-height ease-out duration-200`}
      >
        <div className="rounded shadow flex flex-col divide-y text-sm font-medium text-secondary-black bg-primary-white">
          {dressCategories?.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-left ${
                selectedCategory === category
                  ? "bg-primary-black text-primary-white"
                  : "hover:bg-white"
              } ${index === 0 ? "rounded-t" : ""} ${
                index === dressCategories.length ? "rounded-b" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setIsCategoryDropdownOpen(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;