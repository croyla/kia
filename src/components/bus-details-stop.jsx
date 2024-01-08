import React, { useState } from "react";
import { floor as lFloor } from "lodash";

import BusItemTime from "./bus-item-time";

import IconStopDestination from "../assets/icon-stop-destination.svg";
import IconStopIntermediate from "../assets/icon-stop-intermediate.svg";
import IconStopSource from "../assets/icon-stop-source.svg";
import IconCollapseChevron from "../assets/icon-collapse-chevron.svg";

import IconOpenLink from "../assets/icon-open-link.svg";

import { withTranslation } from "react-i18next";
import { getHoursAndMinutes, timeTextDisplay } from "../utils";

const BusDetailsStop = ({
  stopDetails,
  totalDistance,
  timingsData,
  currentTime,
  selectedTimeIndex,
  setSelectedTimeIndex,
}) => {
  const isStart = stopDetails.distance === 0;
  const isEnd = stopDetails.distance === totalDistance;

  const [expanded, setExpanded] = useState(isStart || isEnd);

  let icon = IconStopIntermediate;
  if (isStart) {
    icon = IconStopSource;
  } else if (isEnd) {
    icon = IconStopDestination;
  }

  const distanceFractionCovered = stopDetails.distance / totalDistance;
  let selectedTime = null;
  if (selectedTimeIndex !== null && timingsData[selectedTimeIndex]) {
    const t = timingsData[selectedTimeIndex];
    const msm = t.start + lFloor(distanceFractionCovered * t.duration);
    selectedTime = getHoursAndMinutes(msm);
  }

  return (
    <div
      className={`sel-bus-stop-row-container ${isStart ? "start" : ""} ${
        isEnd ? "end" : ""
      } ${!(isEnd || isStart) ? "intermediate" : ""}`}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className={`sel-bus-stop-row ${expanded ? "expanded" : ""}`}
      >
        <img src={icon} alt="" className="sel-bus-stop-icon" />
        <div className="sel-bus-stop-row-text">{stopDetails.name}</div>
        {selectedTime && (
          <span className="sel-bus-stop-row-selected-time">
            {timeTextDisplay(selectedTime.hours)}:
            {timeTextDisplay(selectedTime.minutes)}
          </span>
        )}
        <img
          src={IconCollapseChevron}
          alt=""
          className={`sel-bus-stop-chevron ${expanded ? "expanded" : ""}`}
        />
      </div>
      {expanded && (
        <div className="sel-bus-stop-expanded-content">
          <a
            className="route-item-location"
            href={`https://www.google.com/maps/search/?api=1&query=${stopDetails.loc[0]},${stopDetails.loc[1]}`}
            target="_blank"
          >
            Open in Google maps
            <img src={IconOpenLink} alt="Open" />
          </a>
          {timingsData.map((t, index) => (
            <BusItemTime
              selected={index === selectedTimeIndex}
              index={index}
              setSelectedTimeIndex={setSelectedTimeIndex}
              key={t.start}
              msm={t.start + lFloor(distanceFractionCovered * t.duration)}
              currentTime={currentTime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default withTranslation()(BusDetailsStop);
