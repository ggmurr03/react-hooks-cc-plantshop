import React, {useState, useEffect} from "react";

function NewPlantForm({plants, setPlants}) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  function changeName(e){
    setName(e.target.value)
  }
  function changeImage(e){
    setImage(e.target.value)
  }
  function changePrice(e){
    setPrice(e.target.value)
  }

  
  function onSubmitPlants(e){
    e.preventDefault()
    console.log(e.target.value)
    const newPlant = {id: plants.length +`${name}`, name: name, image: image, price: price}
    setPlants([...plants, newPlant])

    fetch("http://localhost:6001/plants",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newPlant)
    })
    .then(response=> response.json())
    .then(data => console.log(data))
    .catch(error=>console.error("error"))

   
  }
  // const POSTPlant = {id: plants.length +`${name}`, name: name, image: image, price: price}

  // useEffect(()=>{
  //   fetch("http://localhost:6001/plants",{
  //     method: "POST",
  //     headers: {"Content-Type" : "application/json"},
  //     body: JSON.stringify(POSTPlant)
  //   })
  //   .then(response=> response.json())
  //   .then(data => console.log(data))
  //   .catch(error=>console.error("error"))
  //   },[onSubmitPlants])

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onSubmitPlants}>
        <input onChange={changeName} value={name} type="text" name="name" placeholder="Plant name" />
        <input onChange={changeImage} value={image} type="text" name="image" placeholder="Image URL" />
        <input onChange={changePrice} value={price} type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
