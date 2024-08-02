# Shelly Weather Forecast
Abhängig von der Uhrzeit, der aktuellen Kesselthemperatur und der Wettervorhersage soll ein Tauschsieder eingeschaltet werden. 

## Hardware
- Shelly Plus 2PM
- Shelly Plus Add-On für Themperatursensoren
- Heizstab mit 4 Stufen (1,5 kW)
- Röhren-Kollektor

## Grober Prozessablauf

```mermaid
flowchart TD
  A[Start Programmschleife] --> B{Ist die aktuelle Uhrzeit zwischen 6:00 und 8:00 Uhr?}
  B -->|Ja| C{Ist die Wassertemperatur im Kessel unter 55°C?}
  C -->|Ja| D{Wird in den nächste 6 Stunden min. 3 Stunden Sonnenschein erwartet?}
  D --> |Ja| E[Shelly Relais für Heizstab einschalten]
  E--> F[Warten]
  B -->|Nein| F
  C -->|Nein| F
  D -->|Nein| F
  F --> G{10 min Wartezeit um?}
  G --> |Nein| F
  G --> |Ja| B
```


## Offene Fragen
- Schaltet Tauchsieder automatisch ab bei gewünschter Temperatur?

## Hilfreiche Links
-  [Smart-heating-management-with-Shelly](https://github.com/LeivoSepp/Smart-heating-management-with-Shelly)
-  [PV Forecast ](https://toolkit.solcast.com.au/)
