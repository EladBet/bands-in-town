import { useState } from "react";
import { ReactComponent as StarIcon } from "./star.svg";

export default function Search({
  events,
  band,
  isLoading,
  isError,
  favoites,
  onSearch,
  onEventSelect
}) {
  const [search, setSearch] = useState("");

  function getIsFavorite(id) {
    return favoites.filter((item) => item.id === id).length > 0;
  }

  return (
    <div style={{ height: "97vh", overflowY: "auto" }}>
      <div className="input-group sticky-top mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="input-group-append ">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => onSearch(search)}
          >
            Search
          </button>
        </div>
      </div>
      {isError && "Error loading band info"}
      {isLoading && "Loading..."}
      {band && (
        <div className="list-group">
          <img className="card-img-top" src={band.image_url} alt="" />
          <div className="list-group-item list-group-item-action active">
            {band.name}
          </div>
          <>
            {events.map((event, index) => (
              <button
                onClick={() => onEventSelect(index)}
                key={event.id}
                className="list-group-item list-group-item-action text-truncate"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="w-75 text-truncate">
                    {event.title || event.venue.name}
                  </div>
                  <div>{getIsFavorite(event.id) && <StarIcon />}</div>
                </div>
              </button>
            ))}
          </>
        </div>
      )}
    </div>
  );
}
