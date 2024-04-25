import L, { LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEvent, LocationEvent } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import {
    MapContainer,
    MapContainerProps,
    Marker,
    Polyline,
    Popup,
    TileLayer,
    TileLayerProps,
    useMap,
    useMapEvent,
    useMapEvents,
    GeoJSON,
} from 'react-leaflet';

interface MarkerProps {
    id: number;
    position: LatLngExpression;
}
function Map() {
    const [markers, setMarkers] = useState<MarkerProps[]>([]);
    const [polylines, setPolylines] = useState<any[]>([]);

    const handleMapClick = (e: LeafletMouseEvent) => {
        const newMarker: MarkerProps = {
            id: markers.length + 1,
            position: e.latlng,
        };
        setMarkers([...markers, newMarker]);
    };

    useEffect(() => {
        const newPolylines = markers.map((marker: MarkerProps) => {
            const { lat, lng } = marker.position as L.LatLng;

            return [lat, lng];
        });
        setPolylines(newPolylines);
    }, [markers]);

    if (markers.length >= 2) {
        console.log((markers[0].position as L.LatLng).distanceTo(markers[1].position as L.LatLng));
    }
    return (
        <>
            {markers.map((marker: MarkerProps, idx: number) => {
                const { lat, lng } = marker.position as L.LatLng;

                return (
                    <React.Fragment key={marker.id}>
                        <Marker draggable={true} key={marker.id} position={marker.position}>
                            <Popup key={marker.id}>
                                <p>위도 : {lat}</p>
                                <p>경도 : {lng}</p>
                            </Popup>
                        </Marker>
                        {polylines.length > 1 && (
                            <Polyline
                                key={`polyline-${marker.id}`}
                                pathOptions={{ color: 'red' }}
                                positions={polylines}
                                eventHandlers={{ add: (e) => console.log(e) }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
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
    const position = { lat: 37.49, lng: 127.031 };
    const $ref = useRef(null);

    console.log($ref);
    return (
        <div className="flex justify-center">
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-[500px] w-full" ref={$ref}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Map />
            </MapContainer>
        </div>
    );
}
