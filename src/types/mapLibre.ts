import type { RefObject } from 'react';
import type maplibregl from 'maplibre-gl';

export interface MapLibreInstanceValue {
    mapContainerRef: RefObject<HTMLDivElement | null>;
    mapInstance: RefObject<maplibregl.Map | null>;
    mapReady: boolean;
}

export interface ParkMarkerPayload {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    description?: string;
    status?: string;
    admin_notes?: string;
    submit_date?: string;
    submitted_by?: string;
    approved_at?: string | null;
    approved_by?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface UseMapMarkersParams {
    onMarkerOpen: (payload: ParkMarkerPayload) => void;
}

export interface SubmitParkImage {
    file?: File;
    [key: string]: unknown;
}

export interface SubmitParkParams {
    name: string;
    description?: string;
    latitude?: string | number;
    longitude?: string | number;
    address?: string;
    submitted_by?: string | null;
    images?: SubmitParkImage[];
    equipment_ids?: number[];
}
