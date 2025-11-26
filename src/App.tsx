import { useEffect, useState } from "react";

import { HeaderBar } from "./components/headerbar";
import { SearchBar } from "./components/searchbar";
import { SelectInput } from "./components/select";

import { getAllSpaces } from "./services/space";

import { type Space } from "./services/space/Space";
import { SpaceCard } from "./components/cards/space";
import { AnalyticsCards } from "./components/cards/analytics";
import { useSocket } from "./context/socket/context";
import type { SpaceSocketMessage } from "./types/SpaceMessage";

enum SearchFilterOptions {
  NONE = -1,
  ALL = 0,
  AVAILABLE = 1,
  OCCUPIED = 2,
}

const App = () => {
  const socket = useSocket();

  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<number>(-1);

  const [spacesData, setSpacesData] = useState<Space[]>([]);

  const filteredData = spacesData.filter((space) => {
    if (selectedFilter === SearchFilterOptions.NONE && searchText.length < 1) {
      return true;
    }

    switch (selectedFilter) {
      case SearchFilterOptions.AVAILABLE:
        return searchText.length > 0
          ? space.id.includes(searchText) && !space.status
          : !space.status; // false -> true
      case SearchFilterOptions.OCCUPIED:
        return searchText.length > 0
          ? space.id.includes(searchText) && space.status
          : space.status;
      default:
        return searchText.length > 0 ? space.id.includes(searchText) : true;
    }
  });

  useEffect(() => {
    const onSocketMessage = (message: MessageEvent) => {
      const event = JSON.parse(message.data) as SpaceSocketMessage;

      console.log("Received a message from the server: ", event);

      switch (event.type) {
        case "SPACE_UPDATED":
          setSpacesData((prevSpaces) => {
            
            console.log(
              "The space that got updated exists in the index: ",
              spaceIndex,
            );

            return prevSpaces;
          });
          break;
      }
    };

    const setupSpaces = async () => {
      const result = await getAllSpaces();

      if (result.left) {
        if (result.left.code === "SPACE_NOT_FOUND") {
          return console.log("Nenhuma vaga foi registrada no momento.");
        }

        return console.error(result.left);
      }

      setSpacesData(result.right!);

      socket.addEventListener("message", onSocketMessage);
    };

    setupSpaces().catch((error) => console.error(error));

    return () => {
      console.log("App component unmounted");
      socket.removeEventListener("message", onSocketMessage);
    };
  }, [socket]);

  return (
    <div className="page-container">
      <HeaderBar />
      <div className="page-content">
        <div className="inputs-wrapper">
          <div className="search-wrapper">
            <SearchBar
              placeholder="Buscar por número de vaga ou observações"
              onChangeText={setSearchText}
            />
          </div>
          <div className="filter-select-wrapper">
            <SelectInput
              placeholder="Filtrar o status"
              onValueChange={setSelectedFilter}
              options={[
                {
                  label: "Todas",
                  value: SearchFilterOptions.ALL,
                },
                {
                  label: "Ocupadas",
                  value: SearchFilterOptions.OCCUPIED,
                },
                {
                  label: "Desocupadas",
                  value: SearchFilterOptions.AVAILABLE,
                },
              ]}
            />
          </div>
        </div>
        <AnalyticsCards
          totalSpace={spacesData.length}
          avaliableSpace={spacesData.filter((space) => !space.status).length}
        />
        <div className="spaces-card-wrapper">
          {filteredData.map((space) => {
            return <SpaceCard key={space.id} {...space} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
