"use client";
import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function HomePage() {
  const initialPosition = { lat: 39.07741067123053, lng: 26.57082267793471 };
  const [open, setOpen] = useState(false);
  // State to store coordinates
  const [coordinates, setCoordinates] = useState(initialPosition);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://websocketa-52220f631af2.herokuapp.com/",
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { latitude, longitude } = message;
      console.log("Received coordinates:", latitude, longitude);

      // Update state with received coordinates
      setCoordinates({ lat: latitude, lng: longitude });
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#c9b4e6] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-center text-4xl font-bold">
          Welcome to the Next.js Starter
        </h1>
        <p className="text-center text-lg">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-800 p-2 font-mono text-sm">
            Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
          </code>
        </p>
        <APIProvider apiKey="AIzaSyAHHlDxmXhdeZeIlyMePQYsrC1F3lCzzFw">
          <div style={{ height: "80vh", width: "80%" }}>
            <Map center={coordinates} mapId={"2e7eb039b63b7c61"}>
              <AdvancedMarker
                position={coordinates}
                onClick={() => setOpen(true)}
              >
                <img src="/assets/images/moto.png" width={40} height={40} />
              </AdvancedMarker>

              {open && (
                <InfoWindow
                  position={coordinates}
                  onCloseClick={() => setOpen(false)}
                >
                  <p style={{ color: "black" }}>Delivery</p>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      </div>
    </main>
  );
}
