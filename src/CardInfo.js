import { ReactComponent as StarIcon } from "./star.svg";
import { ReactComponent as StarEmptyIcon } from "./star-empty.svg";

export default function InfoCard({
  id,
  title,
  subtitle,
  description,
  location,
  offers,
  isFavorite,
  addToFavorites,
  removeFromFavorites
}) {
  return (
    <div>
      <h6 className="card-title">Selected event information:</h6>
      <div className="card h-100 mb-2">
        <div className="card-body h-100">
          <h5 className="card-title"> {title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
          {description && (
            <p className="card-text module line-clamp-10">{description}</p>
          )}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Location: {location}</li>
          {offers.map((offer, index) => (
            <li key={index} className="list-group-item">
              {offer.type}: {offer.status}
            </li>
          ))}
        </ul>
        <div className="card-body">
          {isFavorite ? (
            <StarIcon
              className="btn-icon"
              onClick={() => removeFromFavorites(id)}
            />
          ) : (
            <StarEmptyIcon
              className="btn-icon"
              onClick={() => addToFavorites(id, title)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
