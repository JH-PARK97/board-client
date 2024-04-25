import React, { useRef } from 'react';
import L from 'leaflet';
import { LeafletMap } from './map';

export default function MapExam2() {
    const $ref = useRef(null);
    const map = new LeafletMap();
    const $ele = useRef<HTMLDivElement>(null);

    map.intialize({
        $map: $ele,
        tileLayerOptions: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            detectRetina: false,
            maxNativeZoom: 19,
            maxZoom: 19,
            minZoom: 6,
            noWrap: false,
            opacity: 1,
            subdomains: 'abc',
            tms: false,
        },
    });

    return <div style={{ height: 500 }} id="map" ref={$ele}></div>;
}
