"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import CenterSwitch from "./center-switch";
import { LocationIcon } from "../icons/icons";
import "./map.css";

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);
  const markers = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [isSelected, setIsSelected] = useState(true);

  const createMarker = (
    place: google.maps.places.PlaceResult,
    map: google.maps.Map,
    infoWindow: google.maps.InfoWindow
  ) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: place.geometry!.location!,
      title: place.name,
    });

    marker.addListener("click", () => {
      const service = new google.maps.places.PlacesService(map);
      service.getDetails(
        {
          placeId: place.place_id!,
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "rating",
            "opening_hours",
            "formatted_phone_number",
            "website",
          ],
        },
        (placeDetails, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            placeDetails
          ) {
            const contentString = `
              <div class="flex flex-col gap-2 text-base-color">
                <h2 class="text-xl font-bold mb-2 font-motivasans">${placeDetails.name}</h2>
                <p><strong class="font-bold">Dirección:</strong> ${placeDetails.formatted_address}</p>
                ${placeDetails.rating ? `<p><strong class="font-bold">Rating:</strong> ${placeDetails.rating}</p>` : ""}
                ${placeDetails.opening_hours ? `<p><strong class="font-bold">Horario:</strong><br> ${placeDetails.opening_hours.weekday_text!.join("<br>")}</p>` : ""}
                ${placeDetails.formatted_phone_number ? `<p><strong class="font-bold">Teléfono:</strong> ${placeDetails.formatted_phone_number}</p>` : ""}
                ${placeDetails.website ? `<p><strong class="font-bold">Sitio Web:</strong> <a href="${placeDetails.website}" target="_blank" class="text-blue-500 underline">${placeDetails.website}</a></p>` : ""}
              </div>
            `;
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
          }
        }
      );
    });

    markers.current.push(marker);
  };

  const clearMarkers = () => {
    markers.current.forEach((marker) => {
      marker.map = null;
    });
    markers.current = [];
  };

  useEffect(() => {
    const fetchApiKey = async () => {
      const response = await fetch("/api/maps");
      const data = await response.json();
      return data.apiKey;
    };

    const initializeMap = async () => {
      const apiKey = await fetchApiKey();
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places", "marker"],
      });

      loader
        .load()
        .then(async () => {
          if (!google.maps) {
            console.error("Google Maps script not loaded properly.");
            return;
          }

          const locationInMap = {
            lat: -33.4489,
            lng: -70.6693,
          };

          const mapOptions: google.maps.MapOptions = {
            zoom: 17,
            mapId: "13605448a0dcb21f",
            mapTypeControl: false,
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            rotateControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            streetViewControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            fullscreenControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP,
            },
            rotateControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM,
            },
          };

          const map = new google.maps.Map(
            mapRef.current as HTMLDivElement,
            mapOptions
          );
          mapInstance.current = map;

          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: locationInMap,
          });

          markers.current.push(marker);
          infoWindow.current = new google.maps.InfoWindow();

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                map.setCenter(pos);
                searchNearby(["hospital", "doctor", "clinic"], pos);
              },
              () => {
                handleLocationError(
                  true,
                  infoWindow.current!,
                  map.getCenter() as google.maps.LatLng,
                  map
                );
              }
            );
          } else {
            handleLocationError(
              false,
              infoWindow.current!,
              map.getCenter() as google.maps.LatLng,
              map
            );
          }

          const searchBox = new google.maps.places.SearchBox(
            searchRef.current as HTMLInputElement
          );
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            searchRef.current as HTMLInputElement
          );

          searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (!places || places.length === 0) {
              return;
            }

            const bounds = new google.maps.LatLngBounds();
            clearMarkers();
            places.forEach((place) => {
              if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
              }

              createMarker(place, map, infoWindow.current!);

              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
          });
        })
        .catch((error) => {
          console.error("Error loading Google Maps script:", error);
        });
    };

    initializeMap();
  }, []);

  const handleLocationError = (
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng,
    map: google.maps.Map
  ) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: El servicio de geolocalización falló."
        : "Error: Tu navegador no soporta geolocalización."
    );
    infoWindow.open(map);
  };

  const searchNearby = (types: string[], pos: google.maps.LatLngLiteral) => {
    if (!mapInstance.current) return;

    const service = new google.maps.places.PlacesService(mapInstance.current);

    clearMarkers();

    types.forEach((type) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location: pos,
        radius: 6000,
        type,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            createMarker(place, mapInstance.current!, infoWindow.current!);
          });
        }
      });
    });
  };

  const centerLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstance.current!.setCenter(pos);
          mapInstance.current!.setZoom(17);
        },
        () => {
          console.log("Error: El servicio de geolocalización falló.");
        }
      );
    }
  };

  const handleSwitchChange = (selected: boolean) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          searchNearby(
            selected ? ["hospital", "doctor", "clinic"] : ["pharmacy"],
            pos
          );
        },
        () => {
          console.log("Error: El servicio de geolocalización falló.");
        }
      );
    }
  };

  return (
    <div className="relative h-full">
      <div className="py-5 flex items-center">
        <div className="flex items-center w-full gap-5">
          <h2 className="text-base sm:text-2xl font-bold text-base-color-h dark:text-base-color-dark">
            Consulta centros de salud o farmacias cercanas
          </h2>
          <CenterSwitch
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            onSwitchChange={handleSwitchChange}
          />
        </div>
      </div>
      <div
        ref={mapRef}
        className="w-full h-96 sm:h-[600px] rounded-xl overflow-hidden shadow-medium !focus:outline-0"
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Buscar por nombre o ubicación"
          className="w-56 sm:w-96 h-[38px] px-4 bg-white placeholder:text-xs lg:placeholder:text-sm placeholder:text-base-color-m text-sm text-black p-2 mt-[10px] ms-[10px] rounded-full outline-none ring-0 focus:ring-base-dark-50 focus:shadow-[0_1px_10px_rgba(0,_0,_0,_0.3)] border-0 shadow-[0_1px_4px_rgba(0,_0,_0,_0.3)] transition"
        />
      </div>
      <button
        title="Centrar"
        className="group flex items-center justify-center absolute top-52 sm:top-72 right-[21px] size-[29px] rounded-lg z-50 bg-white shadow-[0_1px_4px_rgba(0,_0,_0,_0.3)]"
        onClick={centerLocation}
      >
        <div className="relative size-full">
          <LocationIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-5 text-[#525252] group-hover:text-[#333333]" />
        </div>
      </button>
    </div>
  );
}
