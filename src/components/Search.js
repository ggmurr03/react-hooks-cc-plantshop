import React, {useState} from "react";

function Search({plants, setPlants}) {
  const [searchTerm, setSearchTerm] = useState("")
  
  function handleSearch(e, plants){
    setSearchTerm(e.target.value)
    console.log(searchTerm)
    setPlants(plants.filter(plant=> plant.name.toLowerCase().includes(searchTerm.toLowerCase())))

  }
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={(e)=> handleSearch(e, plants)}
        value={searchTerm}
      />
    </div>
  );
}

export default Search;
