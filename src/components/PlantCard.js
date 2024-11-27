// import { updateSelectionOnFocus } from "@testing-library/user-event/dist/cjs/event/selection/updateSelectionOnFocus.js";
import React, { useState } from "react";

function PlantCard({plant, plants, setPlants}) {
  const [isInStock, setIsInStock] = useState(true)
  const [newPrice, setNewPrice] = useState("")
  

  function handleClick(){
    setIsInStock(p=>!p)
  }

  function handleDelete(){
    setPlants(plants.filter(p=> p.id !== plant.id))

    fetch(`http://localhost:6001/plants/${plant.id}`,{method: "DELETE"})
    .catch(error => console.error("could not delete"))
  }

  function handlePrice(e){
    setNewPrice(e.target.value)
    


  }
  
  function submitPrice(e){
    e.preventDefault()
  
    

    fetch(`http://localhost:6001/plants/${plant.id}`, {method: "PATCH", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({price: newPrice})})
    .then(response=>response.json())
    .then((data) => {
      if (data.id === plant.id) {const updatedPlants = plants.map((p) => p.id === plant.id ? { ...p, price: data.price } : p
        )
        setPlants(updatedPlants)  
      }
    })
    .catch(error => console.error("could not patch price"))

    

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
      <button onClick={handleDelete}>Delete</button>
      <form onSubmit={submitPrice}>
        <input onChange={handlePrice} value={newPrice} type="number" name="price" step="0.01" placeholder="Update Price" />
        <button type="submit">Submit Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
