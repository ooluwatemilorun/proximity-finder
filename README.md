# Fire Station Proximity Finder

This project uses Leaflet.js to create a map-based application that helps users find the nearest fire stations and estimate arrival times.

## Functionality

The application displays a map centered on a pre-defined location (initially 52.2, 21).  Users can click a "Locate" button to activate their browser's geolocation functionality. The map then centers on their current location.

GeoJSON data defines the locations of multiple fire stations.  These are displayed as markers on the map.  Clicking the "Fire" button triggers the following actions:

1. **Distance Calculation:** The application calculates the distance in kilometers between the user's location and each fire station using the `L.latLng().distanceTo()` method.

2. **ETA Estimation:**  Estimated arrival times are calculated based on the distance.

3. **Map Update:** The map centers on the nearest fire stations.  Polylines are drawn connecting the user's location to these stations.

4. **Tooltip Display:**  Tooltips appear on the markers of the closest fire stations.  These tooltips show the distance to the station and the estimated arrival time.

## Data

Fire station locations are stored in a GeoJSON file embedded within the JavaScript code. This GeoJSON features a `FeatureCollection` containing multiple `Feature` objects. Each `Feature` represents a fire station and includes its name and coordinates (longitude, latitude).


## Technologies Used

* **Leaflet.js:**  The core mapping library for displaying the map and markers.
* **GeoJSON:**  The data format for representing the fire station locations.
* **JavaScript:** The programming language used to implement the application's logic.
* **HTML:** Used for the map container.
1* **CSS:** Used for styling.

The code includes functionality to handle geolocation errors.  If geolocation fails, an alert will inform the user.

# Contributing
This is a personal project, but feel free to fork the repository and submit a pull request. I welcome any feedback, suggestions for improvement, or design ideas. Contributions are always appreciated!

# License
This project is licensed under the MIT License

# Contact
Oluwatemilorun Ojo - ooluwatemilorun@gmail.com
GitHub: https://github.com/ooluwatemilorun