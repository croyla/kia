import * as React from "react";
import Map from "../components/map";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import { BUS_DATA } from "../utils/constants";
import Sidebar from "../components/sidebar";
import MapLocationInput from "../components/map-location-input";
import { getSuggestedBus } from "../utils";
import SideMenu from "../components/side-menu";

const InitialScreen = ({
  googleScriptStatus,
  loadGoogleMapsScript,
  selectedTab,
  setSelectedTab,
  userLocation,
  inputLocation,
  setCurrentScreen,
  inputLocationMetadata,
  setLang,
  bodyHeight,
}) => {
  const mapRef = useRef();
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);
  const [liveBusData, setLiveBusData] = useState(null)
  const selectedTabData = selectedTab === "ta" ? BUS_DATA.to : BUS_DATA.from;

  const suggestedBus = getSuggestedBus(selectedTabData, inputLocation);
  const suggestedBusDetails = _.find(selectedTabData, { name: suggestedBus });

  useEffect(() => {
    if (suggestedBus) {
      setHighlightedSuggestion(suggestedBus);
    }
  }, [suggestedBus, inputLocation]);

  return (
    <>
      <Sidebar
        mapRef={mapRef}
        suggestedBusDetails={suggestedBusDetails}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        highlightedSuggestion={highlightedSuggestion}
        selectedBus={selectedBus}
        setSelectedBus={setSelectedBus}
        selectedStop={selectedStop}
        setSelectedStop={setSelectedStop}
        suggestedBus={suggestedBus}
        sortedTabData={selectedTabData}
        bodyHeight={bodyHeight}
        liveBusData={liveBusData}
        setLiveBusData={setLiveBusData}
      />
      <Map
        mapRef={mapRef}
        inputLocation={inputLocation}
        busData={selectedTabData}
        userLocation={userLocation}
        selectedBus={selectedBus}
        setSelectedBus={setSelectedBus}
        selectedStop={selectedStop}
        setSelectedStop={setSelectedStop}
        selectedTab={selectedTab}
        liveBusData={liveBusData}
        setLiveBusData={setLiveBusData}
      />
      <MapLocationInput
        googleScriptStatus={googleScriptStatus}
        loadGoogleMapsScript={loadGoogleMapsScript}
        setCurrentScreen={setCurrentScreen}
        inputLocation={inputLocation}
        inputLocationMetadata={inputLocationMetadata}
      />
      <SideMenu setLang={setLang} />
    </>
  );
};

export default InitialScreen;
