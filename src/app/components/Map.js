// "use client"

// import { useState, useCallback, memo } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// const Map = ({ locations }) => {
//     const containerStyle = {
//         width: "100%",
//         height: "90%"

//     }

//     const center = {
//         lat: locations[0].latitude,
//         lng: locations[0].longitude
//     }

//     const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
//     })

//     const [ map, setMap ] = useState(null);

//     const onLoad = useCallback(map => {
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds);
//         setMap(map);
//     }, []);

//     const onUnmount = useCallback(map => {
//         setMap(null);
//     }, []);

//     return (
//         isLoaded ? (
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={10}
//                 onLoad={onLoad}
//                 onUnmount={onUnmount}
//             >
//                 {locations.map((location, _index) => {
//                     <Marker
//                         key={_index}
//                         position={{
//                             lat: location.latitude,
//                             lng: location.longitude
//                         }}
//                         icon={{
//                             url: image,
//                             anchor: new window.google.maps.Point(5, 58)
//                         }}
//                     />
//                 })}
//             </GoogleMap>
//         ) : <></>
//     );
// }

// export default Map;

"use client";

import { useEffect, useRef } from "react";

const Map = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google || !locations.length) return;

      const center = {
        lat: locations[0]?.latitude,
        lng: locations[0]?.longitude,
      };

      // Initialize the map
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 10,
      });

      // Add markers for each location
      locations.forEach((location) => {
        new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
        });
      });
    };

    // Define `initMap` globally so Google Maps API can call it
    window.initMap = initMap;

    // Suppress specific errors related to the external script
    window.onerror = function (message, source, lineno, colno, error) {
      if (message.includes("Cannot read properties of undefined (reading 'EC')")) {
        console.warn("Suppressed map error:", message);
        return true; // Suppresses the error
      }
      return false; // Allows other errors to propagate
    };

    // Dynamically load the Google Maps API script
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@latest/mapsJavaScriptAPI.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // If Google Maps is already loaded, initialize the map directly
      initMap();
    }

    return () => {
      // Clean up the `initMap` function and the global error handler to avoid memory leaks
      delete window.initMap;
      window.onerror = null;
    };
  }, [locations]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "80vh",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  );
};

export default Map;
