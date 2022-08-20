import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//img
import yes from "./assets/yes.svg";
import no from "./assets/no.svg";

function App() {
  const [product, setProduct] = useState([]); //usuario
  const [data, setData] = useState([]); //tabla usu
  const [search, setSearch] = useState(""); //busqueda

  //GET productos
  const get = async () => {
    await axios
      .get("http://localhost:4000/api/products")
      .then((resp) => {
        setProduct(resp.data);
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (searchItem) => {
    let item = searchItem.toLowerCase();
    var result = data.filter((e) => {
      let productName = e.productName.toString().toLowerCase();
      if (productName.includes(item)) {
        return e;
      }
    });
    setProduct(result);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      ></link>

      <h1 className="title">¿Qué va en la Botella De Amor?</h1>
      <div className="containerInput">
        <input
          className="form-control searchInput"
          value={search}
          placeholder="Búsqueda por nombre del producto"
          onChange={handleChange}
        ></input>
      </div>
      <div>
        {search
          ? product &&
            product.map((p) => <p key={p.productName}>{p.productName}</p>)
          : null}
      </div>
      <div className="gridContainer containerInput">
        <div className="isRecyclableContainer">
          {search
            ? product &&
              product.map((p) => (
                <img key={p.img} height="250px" src={p.img}></img>
              ))
            : null}
        </div>
        <div className="isRecyclableContainer">
          {search
            ? product &&
              product.map((p) =>
                p.isRecyclable ? <img src={yes}></img> : <img src={no}></img>
              )
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
