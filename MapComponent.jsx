import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { circle } from 'leaflet';

const customMarkerIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [1, 1]
});

const MapComponent = ({ zones }) => {
    const [loading, setLoading] = useState(true);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [circleZone, setCircleZone] = useState({
        // center: [59.218541, 10.922170],
        // center: [59.217541, 10.923116],
        // center: [59.217541, 10.924116],
        center: [59.217713, 10.922533],
        radius: 7.5
    });

    const moveCircleZone = () => {
        setCircleZone((prevZone) => ({
            ...prevZone,
            center: [prevZone.center[0], prevZone.center[1] - 0.00001]
        }));
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLoading(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                // ADD Location access denied handler
                setLoading(false); 
            }
        );
    }, []);

    const zoneCoordinates = [
        [59.218128, 10.922543],
        [59.218128, 10.922496],
        [59.218395, 10.922496],
        [59.218395, 10.922543]
    ];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            () => {
                // ADD handle location access denied
            }
        );
    }, []);

    useEffect(() => {
        if (currentPosition && isUserInCircleZone(currentPosition, circleZone)) {
            alert("You've entered a zone!");
        }
    }, [currentPosition, circleZone]);

    const isUserInZone = (position, zone) => {
        // ADD logic to check if the position is in a zone
    };

    const isUserInCircleZone = (position, circleZone) => {
        const toRadians = (degree) => degree * (Math.PI / 180);
        const earthRadiusInMeters = 6371000;

        const dLat = toRadians(circleZone.center[0] - position.lat);
        const dLng = toRadians(circleZone.center[1] - position.lng);

        const lat1 = toRadians(position.lat);
        const lat2 = toRadians(circleZone.center[0]);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadiusInMeters * c;
        return distance <= circleZone.radius;
    };

    return (
        <>
        {!loading && currentPosition ? (
            <MapContainer center={loading ? [51.505, -0.09] : [currentPosition.lat, currentPosition.lng]} zoom={17} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                {!loading && currentPosition && (
                    <Marker position={[currentPosition.lat, currentPosition.lng]} icon={customMarkerIcon}></Marker>
                )}
                <Circle
                    center={circleZone.center}
                    radius={circleZone.radius}
                    pathOptions={{ color: 'lightblue', fillColor: 'lightblue', fillOpacity: 0.5 }}    
                    />
            </MapContainer>
        ) : (
            <h1>Loading...</h1>
        )}
        </>
    )
}

export default MapComponent
