import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import { ImageArcGISRest } from 'ol/source';
import { Image as ImageLayer } from 'ol/layer';

const ArcgisWMSLayer = ({ url }) => {
  const { map } = useContext(MapContext);

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
    var esriSource = new ImageArcGISRest({
      //Config.proxy_domain + 
      ratio: 1,
      params: {},
      url: url
    });
    var esriLayer = new ImageLayer({
      source: esriSource
    })

    map.addLayer(esriLayer);
    map.updateSize();
    //let layers = map.getLayers().getArray();
    //console.log(layers);
    //console.log(layers[5])
    //var idx = 1;
    //console.log(layers)


    return () => {
      if (map) {
        map.removeLayer(esriLayer);
      }
    };

   
    //var source = layers[idx].getSource();
    //source.clear();
    //layers[idx].setVisible(visible);
    //layers[1].setSource(getBasemap());
  }, [url]);

  return null;
};
export default ArcgisWMSLayer;