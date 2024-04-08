import { LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEvent, LocationEvent } from 'leaflet';
import React, { useEffect, useState } from 'react';
import L, {
    MapContainer,
    MapContainerProps,
    Marker,
    Popup,
    TileLayer,
    TileLayerProps,
    useMap,
    useMapEvent,
    useMapEvents,
} from 'react-leaflet';

interface MarkerProps {
    id: number;
    position: LatLngExpression;
}
function Map() {
    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    const handleMapClick = (e: LeafletMouseEvent) => {
        const newMarker: MarkerProps = {
            id: markers.length + 1,
            position: e.latlng,
        };
        setMarkers([...markers, newMarker]);
    };

    return (
        <>
            {markers.map((marker: MarkerProps) => (
                <Marker key={marker.id} position={marker.position}>
                    <Popup>{marker.position.toString()}</Popup>
                </Marker>
            ))}
            <ClickHandler handleMapClick={handleMapClick} />
        </>
    );
}

interface ClickHandlerProps {
    handleMapClick: (e: LeafletMouseEvent) => void;
}
function ClickHandler({ handleMapClick }: ClickHandlerProps) {
    useMapEvents({
        click: (e) => {
            handleMapClick(e);
        },
    });
    return null;
}

export default function MapExam() {
    return (
        <div className="flex justify-center">
            <MapContainer center={[37.49, 127.031]} zoom={13} scrollWheelZoom={false} className="h-[500px] w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Map />
            </MapContainer>
        </div>
    );
}
