const CategoryButton = ({children, categoryComponent, onCategoryClicked, style}) => {
  return (
    <div>
      <button
        onClick={() => onCategoryClicked(categoryComponent)}
        className={style}
      >
        {children}
      </button>
    </div>
  );
};

export default CategoryButton;
