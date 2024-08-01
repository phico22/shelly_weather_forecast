# Shelly Weather Forecast
Abhängig von der Uhrzeit, der aktuellen Kesselthemperatur und der Wettervorhersage soll ein Tauschsieder eingeschaltet werden. 

## Hardware
- Shelly Plus 2PM
- Shelly Plus Add-On für Themperatursensoren

## Grober Prozessablauf

```mermaid
flowchart TD
  A[Start Programmschleife] --> B{Ist die aktuelle Uhrzeit zwischen 6:00 und 8:00 Uhr?}
  B -->|Ja| C{Ist die Wassertemperatur im Kessel unter 55°C?}
  C -->|Ja| D{Wird in den nächste 6 Stunden min. 3 Stunden Sonnenschein erwartet?}
  D --> |Ja| E[Shelly Relais einschalten]
  E--> F[Warten]
  B -->|Nein| F
  C -->|Nein| F
  D -->|Nein| F
  F --> G{10 min Wartezeit um?}
  G --> |Nein| F
  G --> |Ja| B
```


## Fragen
- Tauchsieder schaltet automatisch ab?
