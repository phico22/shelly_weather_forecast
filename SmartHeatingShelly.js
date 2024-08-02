/****** HEATING MODES, YOU CAN MODIFY OR CREATE YOUR OWN ******/
/* Heating schedulers with forecast */
let HEAT12H_FCST = { timePeriod: 12, heatingTime: 0, isFcstUsed: true };
let HEAT6H_FCST = { timePeriod: 6, heatingTime: 0, isFcstUsed: true };

/****** USER SETTINGS, START MODIFICATION ******/
let s = {
    heatingMode: HEAT6H_FCST,  // HEATING MODE. Different heating modes described above.
    relayID: 0,                 // Shelly relay ID
    defaultTimer: 5,           // Default timer duration, in minutes, for toggling the Shelly state.
}
/****** USER SETTINGS, END OF MODIFICATION ******/  

let _ = {
    openMeteo: "https://api.open-meteo.com/v1/forecast?hourly=apparent_temperature&timezone=auto&forecast_days=1&forecast_hours=" + s.heatingMode.timePeriod,
};
/**
Get Open-Meteo min and max "feels like" temperatures
TODO: replace this prediction with solcast.com.au
 */
function getForecast() {
    let lat = JSON.stringify(Shelly.getComponentConfig("sys").location.lat);
    let lon = JSON.stringify(Shelly.getComponentConfig("sys").location.lon);
    _.omUrl = _.openMeteo + "&latitude=" + lat + "&longitude=" + lon;
    print(_.pId, "Get forecast from: ", _.omUrl)
    try {
        Shelly.call("HTTP.GET", { url: _.omUrl, timeout: 5, ssl_ca: "*" }, fcstCalc);
    }
    catch (error) {
        print(_.pId, "Oh no, OpenMeteo ", error);
        print(_.pId, "Get forecast failed, checking again in ", _.loopFreq, " seconds.");
        _.loopRunning = false;
    }
}



