import styled from "styled-components";
import { fromLonLat } from "ol/proj";
import { Layers, BasemapLayer, GeoserverWMSLayer } from "./Map/Layers";
import { Controls, ZoomControl } from "./Map/Controls";
import { Interactions } from "./Map/Interactions";

import Map from "./Map";

export default function MapDataPreview({ center, zoom, basemap, filename, type }) {

  return (
    <Map center={fromLonLat(center)} zoom={zoom} >
      <Layers>
        <BasemapLayer basemap={basemap} zIndex={0} />
        <GeoserverWMSLayer filename={filename} />

      </Layers>
      <Controls>
        <ZoomControl />
      </Controls>
      <Interactions>
      </Interactions>

    </Map>
  )
}