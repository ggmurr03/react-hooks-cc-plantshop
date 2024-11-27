import React, { useState } from "react";

function PlantCard({plant, plants, setPlants}) {
  const [isInStock, setIsInStock] = useState(true)
  function handleClick(){
    setIsInStock(p=>!p)
  }

  function handleDelete(){
    setPlants(plants.filter(p=> p.id !== plant.id))

    fetch(`http://localhost:6001/plants/${plant.id}`,{method: "DELETE"})
    .catch(error => console.error("could not delete"))
  }
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      {/* <button onClick={}>Update Price</button> */}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
