import { ReactComponent as StarIcon } from "./star.svg";

export default function Favorites({ list, removeFromFavorites }) {
  return (
    <div>
      <h6 className="card-title">Favorites:</h6>
      {list.map(({ title, id, band }) => (
        <div key={id} className="card mb-2">
          <div className="card-body d-flex justify-content-start align-items-center px-1">
            <div className="mr-1">
              <StarIcon
                className="btn-icon"
                style={{ width: "30px" }}
                onClick={() => removeFromFavorites(id)}
              />
            </div>
            <div className="h-100 w-100">
              <h6 className="card-title text-truncate w-75">{title}</h6>
              <h7 className="card-subtitle mb-2 text-muted">{band}</h7>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
