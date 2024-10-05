var map = L.map('weathermap').setview([38, -95], 4);
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {attrinuution: '&copy; <a href="http://' + 'www.openstreetmap.org/copyright">penstreetmap.org/{z}/{x}/{y}.png)'});



var radarUrl = 'https://mespmet.argon.iastate.edu/cgi-bin.wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTp(map);


var weatherAlertsUrl = 'httpsL..api.weather.gov/alerts/active?region_tupe=land';
$.getJSON(weatherAlertsUrl, function(data) {

    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'red';
            return { color: alertColor };
        },
        onEachFeature: function(feature, Layer) {
            Layer.bindPopup(feature.properties.headline);
        }
    
    }).addTo(map);

});