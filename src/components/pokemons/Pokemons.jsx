import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { PokemonService } from "../../core/service/PokemonService";
import "./Pokemons.css";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([1, 2, 3]);
  const [pokemonsBuffer, setPokemonsBuffer] = useState([1, 2, 3]);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Ordenar A-Z", value: "name" },
    { label: "Ordenar Z-A", value: "!name" },
  ];

  const pokemonService = new PokemonService();

  useEffect(() => {
    pokemonService.getAllPokemons().then((data) => {
      setPokemonsBuffer(data);
      return setPokemons(data);
    });
  }, []);

  const onSortChange = (event) => {
    const value = event.value;
    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const searchByName = (event) => {
    setPokemons(() => pokemonsBuffer.filter((e) => e.name.includes(event.toLowerCase())));
  };

  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="grid pt-3 align-items-center">
          <div>
            <img
              className="col w-4"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                data.url ? data.url.split("/")[6] : ""
              }.png`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
          </div>
          <div className="col">
            <div className="pokemon-name">{data.name}</div>
          </div>
          <div className="col">
            <Link to={`/pokemon/${data.url ? data.url.split("/")[6] : ""}`}>
              <Button icon="pi pi-info-circle" label="Detalle"></Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-4">
        <div className="pokemon-grid-item card">
          <div className="pokemon-grid-item-content">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                data.url ? data.url.split("/")[6] : ""
              }.png`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="pokemon-name">{data.name}</div>
          </div>
          <div className="pt-2 align-items-center">
            <Link to={`/pokemon/${data.url ? data.url.split("/")[6] : ""}`}>
              <Button icon="pi pi-info-circle" label="Detalle"></Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderHeader = () => {
    return (
      <div>
        <div className="grid">
          <div className="col" style={{ textAlign: "left" }}>
            <Dropdown
              options={sortOptions}
              value={sortKey}
              optionLabel="label"
              placeholder="Ordenar alfabeticamente"
              onChange={onSortChange}
            />
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            <DataViewLayoutOptions
              layout={layout}
              onChange={(e) => setLayout(e.value)}
            />
          </div>
        </div>
        <div className="grid">
          <div className="col" style={{ textAlign: "left" }}>
            <InputText
              onChange={(e) => searchByName(e.target.value)}
              placeholder="Buscar por nombre"
            />
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="dataview">
      <div className="card">
        <DataView
          value={pokemons}
          layout={layout}
          header={header}
          itemTemplate={itemTemplate}
          paginator
          rows={9}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </div>
  );
};
export default Pokemons;
