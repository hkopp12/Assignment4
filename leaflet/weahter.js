var map = L.map('weathermap').setview([38, -95], 4);
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href="http:/' + 'www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});



var radarUrl = 'https://mesonet.argon.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTp(map);


var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
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