import L, { Marker, TileLayer } from 'leaflet';
import type { Map, MapOptions, TileLayerOptions } from 'leaflet';
import { isString } from '@tiptap/react';

interface InitializeOption {
    $map: any;

    instance?: Map | null;

    options?: MapOptions | null;

    tileLayerOptions: TileLayerOptions;
}

export class LeafletMap {
    // 현재 map에 bind된 instance id
    private _$map: any;
    // map 인스턴스
    private _map: L.Map | null = null;
    // tileLayer를 생성합니다.
    private _tileLayer: L.TileLayer | null = null;
    // markers
    private _markers: Marker[] = [];

    get map() {
        return this._map;
    }

    // 인스턴스를 생성했는지 확인
    isInitialized() {
        return this._$map !== null && this._map !== null;
    }

    intialize(params: InitializeOption) {
        const { $map, options, instance, tileLayerOptions } = params;

        if (isString($map)) {
            const $ele = document.querySelector<HTMLElement>($map);
            if (!$ele) {
                const error = new Error();
                error.name = 'RouteTracking';
                error.message = 'map element is not found';
                throw error;
            }
            this._$map = $ele;
        } else {
            this._$map = $map;
        }

        if (instance) {
            this._map = instance;
        } else {
            this._map = L.map(this._$map, {});
        }

        this._makeTileLayer(tileLayerOptions);
    }
    private _makeTileLayer(tileLayerOptions: any) {
        if (!this._map) {
            const error = new Error();
            error.name = 'RouteTracking';
            error.message = 'map instance is required';
            throw error;
        }

        const { urlTemplate, ...opts } = tileLayerOptions;

        this._tileLayer = L.tileLayer(urlTemplate, opts);

        this._tileLayer.addTo(this._map);
    }
}
