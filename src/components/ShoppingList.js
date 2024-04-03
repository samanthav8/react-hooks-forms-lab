import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [itemsList, setItemsList] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(text) {
    setSearchText(text);
  }

  function handleItemFormSubmit(newItem) {
    setItemsList([...itemsList, newItem]);
  }

  const itemsToDisplay = itemsList.filter((item) => {
    const nameMatches = item.name.toLowerCase().includes(searchText.toLowerCase());
    
    if (selectedCategory === "All") {
      return nameMatches;
    }

    return nameMatches && item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter 
        onCategoryChange={handleCategoryChange} 
        onSearchChange={handleSearchChange} 
        search={searchText} // Pass searchText as a prop named 'search'
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
