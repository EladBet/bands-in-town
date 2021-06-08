import "./styles.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Search from "./Search";
import CardInfo from "./CardInfo";
import Favorites from "./Favorites";
import { APP_ID, URL, fetchData, saveFavorites, getFavorites } from "./utils";

function loadEvents(band) {
  return fetchData(`${URL}/artists/${band}/events?app_id=${APP_ID}`);
}

function loadBandInfo(band) {
  return fetchData(`${URL}/artists/${band}?app_id=${APP_ID}`);
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [band, setBand] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState();
  const [favoites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  async function handleSearch(text) {
    try {
      setIsLoading(true);
      setEvents([]);
      setBand(null);
      const bandInfo = await loadBandInfo(text);
      const events = await loadEvents(text);
      setEvents(events);
      setBand(bandInfo);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function addToFavorites(id, title) {
    const newFavorites = [...favoites, { id, title, band: band.name }];
    saveFavorites(newFavorites);
    setFavorites(newFavorites);
  }

  function removeFromFavorites(id) {
    setFavorites(favoites.filter((event) => event.id !== id));
  }

  function getIsFavorite(id) {
    return favoites.filter((item) => item.id === id).length > 0;
  }

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-sm-4 mb-2">
          <Search
            onSearch={handleSearch}
            isLoading={isLoading}
            isError={isError}
            events={events}
            band={band}
            favoites={favoites}
            onEventSelect={(eventIndex) => setSelectedEventIndex(eventIndex)}
          />
        </div>
        <div className="col-sm-4 mb-2">
          {events[selectedEventIndex] && (
            <CardInfo
              id={events[selectedEventIndex].id}
              title={
                events[selectedEventIndex].title ||
                events[selectedEventIndex].venue.name
              }
              subtitle={new Date(
                events[selectedEventIndex].datetime
              ).toLocaleDateString(undefined, "en-US")}
              description={events[selectedEventIndex].description}
              location={events[selectedEventIndex].venue.location}
              offers={events[selectedEventIndex].offers}
              isFavorite={getIsFavorite(events[selectedEventIndex].id)}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
        </div>
        <div className="col-sm-4">
          <Favorites
            list={favoites}
            removeFromFavorites={removeFromFavorites}
          />
        </div>
      </div>
    </div>
  );
}
