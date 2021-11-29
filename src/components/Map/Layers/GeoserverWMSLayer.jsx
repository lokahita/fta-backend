import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import { ImageWMS as ImageWMSSource } from 'ol/source';
import { Image as ImageLayer } from 'ol/layer';
import Config from '../../../config.json';

const GeoserverWMSLayer = ({ filename }) => {
  const { map } = useContext(MapContext);

  
  const workspace = 'fta';

  /*
  useEffect(() => {
    if (!map) return;
    var esriSource = new ImageArcGISRest({
        //Config.proxy_domain + 
        ratio: 1,
        params: {},
        url: url
    });
    var esriLayer = new ImageLayer({
        source: esriSource
    })
   
    map.addLayer(esriLayer)

    
    return () => {
      if (map) {
        map.removeLayer(esriLayer);
      }
    };
  }, [map]);
  */

  useEffect(() => {
    if (!map) return;
 

    let main = Config.geoserver_domain + workspace+"/wms"
    let layer = workspace+":"+filename.replace(".shp","")

    var wmsSource = new ImageWMSSource({
      //Config.proxy_domain + 
      url: main,
      params: { 'LAYERS': layer },
      ratio: 1,
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });
    var wmsLayer = new ImageLayer({
      source: wmsSource
    })

    map.addLayer(wmsLayer);
    map.updateSize();
    //let layers = map.getLayers().getArray();
    //console.log(layers);
    //console.log(layers[5])
    //var idx = 1;
    //console.log(layers)


    return () => {
      if (map) {
        map.removeLayer(wmsLayer);
      }
    };

   
    //var source = layers[idx].getSource();
    //source.clear();
    //layers[idx].setVisible(visible);
    //layers[1].setSource(getBasemap());
  }, [filename]);

  return null;
};
export default GeoserverWMSLayer;