import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { SharedServiceMapTableGraphs } from '../shared/services/SharedServiceMapTableGraphs.service';
import { addressPoints } from './10000points'
import { MatSidenav } from '@angular/material/sidenav';
declare var L: any;
declare var jquery: any;
declare var $: any;
declare var hamburch: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() chartWidth: number;

  @Input() chartHeight: number;
  @ViewChild('map') map: ElementRef;
  @ViewChild('lat') lat: ElementRef;
  @ViewChild('lng') lng: ElementRef;
  @ViewChild('latLngCurrValues') latLngCurrValues: ElementRef;
  @ViewChild('zoom') zoomText: ElementRef;
  @ViewChild('drawer') drawer: any;

  mapJs: any;
  popUpOpen: boolean;
  constructor(private _SharedServiceMapTableGraphs: SharedServiceMapTableGraphs) {
  }
  LayerSelected: any;



  pointList: any[]
  zoomMapCenterByLatLng() {
    this.popUpOpen = true;
    // this.mapJs.setView([32, 35], 8, { animation: true });
  }

  loadselectedfromtable() {

    this.LoadMapComponent()

    console.log(this._SharedServiceMapTableGraphs.tableToMap)
    this.LayerSelected = L.layerGroup();
    var greenIcon = L.icon({
      iconUrl: "assets/images/map/icon.png",
      //shadowUrl: 'leaf-shadow.png',

      iconSize: [38, 85], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    console.log(this._SharedServiceMapTableGraphs.ShapeOnMapType)
    if (this._SharedServiceMapTableGraphs.ShapeOnMapType === 'type1')
      this.makeEllipses();

    else if (this._SharedServiceMapTableGraphs.ShapeOnMapType === 'type2')
      this.printPolygon();


  }
  printPolygon() {


    this.mapJs.setView(new L.LatLng(this._SharedServiceMapTableGraphs.tableToMap[1][0]
      , this._SharedServiceMapTableGraphs.tableToMap[1][1]), 5);

    var firstpolyline = new L.Polyline(this._SharedServiceMapTableGraphs.tableToMap, {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
    });
    this.LayerSelected.addLayer(firstpolyline).addTo(this.mapJs);

  }
  checkValueEllipse(isChecked: any) {
    console.log(isChecked);
    if (isChecked === true) {
      this.LoadMapComponent();
      this.addEllipselayerGroup();
      this.addTextOnEllipselayerGroup();
      //this.addEllipseTooltiplayerGroup()
    }
    else {
      this.removeLayerGroup();
    }
  }
  checkValuePolygon(isChecked: any) {
    console.log(isChecked);
    if (isChecked === true) {
      this.LoadMapComponent();
      this.addPolygonlayerGroup();
    }
    else {
      this.removePolygonLayerGroup();
    }
  }
  checkValueLine(isChecked: any) {
    console.log(isChecked);
    if (isChecked === true) {
      this.LoadMapComponent();
      this.addLineslayerGroup();
    }
    else {
      this.removeLineslayerGroup();
    }
  }
  checkValuePoints(isChecked: any) {
    console.log(isChecked);
    if (isChecked === true) {
      this.LoadMapComponent();
      this.addLPointslayerGroup();
    }
    else {
      this.removeLineslayerGroup();
    }
  }
  checkValueAnnontation(isChecked: any) {
    console.log(isChecked);
    if (isChecked === true) {
      this.LoadMapComponent();
      //this.addLPointslayerGroup();
    }
    else {
      this.annotationlayerGrouppane.style.display = 'none';
      this.mapJs.remove(this.annotationlayerGroup)
    }
  }
  annotationlayerGrouppane: any;
  makeEllipses() {

    this.mapJs.setView(new L.LatLng(this._SharedServiceMapTableGraphs.tableToMap[0].lat
      , this._SharedServiceMapTableGraphs.tableToMap[0].lng), 5);
    for (let i = 0; i < this._SharedServiceMapTableGraphs.tableToMap.length; i++) {

      this.LayerSelected
        .addLayer(L.ellipse([this._SharedServiceMapTableGraphs.tableToMap[i].lat,
        this._SharedServiceMapTableGraphs.tableToMap[i].lng]
          , [this._SharedServiceMapTableGraphs.tableToMap[i].hMajor,
          this._SharedServiceMapTableGraphs.tableToMap[i].hMinor],
          this._SharedServiceMapTableGraphs.tableToMap[i].Angle))

    }
    this.LayerSelected.addTo(this.mapJs);
  }
  restMapZoom() {
    this.mapJs.setView([31.945775, 35.108228], 2, { animation: true });
  }

  LoadLasso() {
    const toggleLasso = document.querySelector("#toggleLasso");
    const lassoEnabled = document.querySelector("#lassoEnabled");
    const lassoResult = document.querySelector("#lassoResult");

    const lasso = L.lasso(this.mapJs);
    this.mapJs.on('lasso.finished', (event) => {
      lassoResult.innerHTML = `${event.layers.length} layers:<br>` +
        event.layers.map(layer => `${L.Util.formatNum(layer.getLatLng().lat)}, 
        ${L.Util.formatNum(layer.getLatLng().lng)}`).join('<br>');
    });
    this.mapJs.on('lasso.enabled', () => {
      lassoEnabled.innerHTML = 'Enabled';
      lassoResult.innerHTML = '';
    });
    this.mapJs.on('lasso.disabled', () => {
      lassoEnabled.innerHTML = 'Disabled';
    });

    toggleLasso.addEventListener('click', function () {
      if (lasso.enabled()) {
        lasso.disable();
      } else {
        lasso.enable();
      }
    });
  }
  addEllipseTooltiplayerGroup() {
    this.mapJs.setView(new L.LatLng(addressPoints[0][0]
      , addressPoints[0][1]), 8);

    this.layerGroup = L.layerGroup().addTo(this.mapJs); // test that also layers nested in groups can be selected

    console.log(addressPoints.length)
    for (let i = 0; i < 1000; i++) {
      let a = addressPoints[i];
      const ellipse = L.ellipse([a[0], a[1]], [1146, 2200], 89).bindTooltip("A", { permanent: true, opacity: 1 }).openTooltip();
      ellipse.addTo(this.layerGroup);

    }
  }
  annotationlayerGroup: any
  addAnnotationlayerGroup(lat, lng, text) {

    var createLabelIcon = function (labelClass, labelText) {
      return L.divIcon({
        className: 'textLabelclass',
        html: `<p style="color: yellow;  white-space:nowrap;
        font-weight: 300;
        text-shadow: 0 0 0.1em black, 0 0 0.1em black,
              0 0 0.1em black,0 0 0.1em black,0 0 0.1em;">` + labelText + '</p>'
      })
    }
    this.annotationlayerGroup = L.layerGroup({ pane: 'annotationlayerGrouppane' }).addTo(this.mapJs); // test that also layers nested in groups can be selected
    L.marker(new L.LatLng(lat, lng), { icon: createLabelIcon("textLabelclass", text) }).addTo(this.annotationlayerGroup);
  }
  layerGroup: any;
  addTextOnEllipselayerGroup() {


    var createLabelIcon = function (labelClass, labelText) {
      return L.divIcon({
        className: 'textLabelclass',
        html: `<p style="color: yellow;
        font-weight: 300;">` + labelText + '</p>'
      })
    }
    this.textLayerGroup = L.markerClusterGroup({ chunkedLoading: true, maxClusterRadius: 50, zoomToBoundsOnClick: true, showCoverageOnHover: true }).addTo(this.mapJs); // test that also layers nested in groups can be selected

    for (let i = 0; i < 10000; i++) {
      let a = addressPoints[i];
      L.marker(new L.LatLng(a[0], a[1]), { icon: createLabelIcon("textLabelclass", "A") }).addTo(this.textLayerGroup);

    }
  }

  addEllipselayerGroup() {


    this.mapJs.setView(new L.LatLng(addressPoints[0][0]
      , addressPoints[0][1]), 8);

    this.layerGroup = L.markerClusterGroup({ chunkedLoading: true, maxClusterRadius: 50, zoomToBoundsOnClick: true, showCoverageOnHover: true }).bindTooltip("A").addTo(this.mapJs); // test that also layers nested in groups can be selected
    this.layerGroup.on('clusterclick', function (e) {
      console.log(e);
      document.getElementById("log").innerHTML = "cluster";
    });

    console.log(addressPoints.length)
    for (let i = 0; i < 10000; i++) {
      let a = addressPoints[i];
      const ellipse = L.ellipse([a[0], a[1]], [400, 400], 89).bindTooltip("my tooltip text");
      ellipse.addTo(this.layerGroup);

    }

  }
  removeLineslayerGroup() {
    this.LineslayerGroup.remove();
  }
  LineslayerGroup: any;
  addLPointslayerGroup() {

    var greenIcon = L.icon({
      iconUrl: 'assets/images/map/marker-icon.png',
      iconSize: [38, 95], // size of the icon
    });

    this.mapJs.setView(new L.LatLng(addressPoints[0][0]
      , addressPoints[0][1]), 8);

    this.LineslayerGroup = L.layerGroup().addTo(this.mapJs); // test that also layers nested in groups can be selected


    console.log(addressPoints.length)

    var markers = L.markerClusterGroup({ disableClusteringAtZoom: 10 });

    for (let i = 0; i < addressPoints.length; i++) {
      var a = addressPoints[i];
      //var title = a[2];
      var marker = L.marker(L.latLng(a[0], a[1]));
      //marker.bindPopup(title);
      markers.addLayer(marker);
    }

    this.mapJs.addLayer(markers);

  }
  addLineslayerGroup() {
    this.mapJs.setView(new L.LatLng(addressPoints[0][0]
      , addressPoints[0][1]), 8);

    this.LineslayerGroup = L.layerGroup().addTo(this.mapJs); // test that also layers nested in groups can be selected


    console.log(addressPoints.length)
    for (let i = 0; i < addressPoints.length; i++) {
      let firstLatLng = addressPoints[i];

      var res = L.GeometryUtil.destination(new L.latLng(firstLatLng[0], firstLatLng[1]), 180, 40000000)
      const line = new L.Polyline([
        [firstLatLng[0], firstLatLng[1]],
        [res.lat, res.lng]
      ], {
          color: 'red',
          weight: 3,
          opacity: 1,
          smoothFactor: 1
        })
      line.bindPopup('startlat: ' + firstLatLng[0] + 'startlng: ' + firstLatLng[1]);
      line.addTo(this.LineslayerGroup);

    }

  }
  PolygonlayerGroup: any;
  markerClusterGroup: any;
  addPolygonlayerGroup() {

    this.PolygonlayerGroup = L.deflate({ minSize: 20, markerCluster: true }).addTo(this.mapJs);
    var l = L.geoJson(hamburch);
    l.bindPopup('aa ');

    // this.mapJs.setView(new L.LatLng(addressPoints[0][0]
    // , addressPoints[0][1]), 8);

    console.log(l)
    this.PolygonlayerGroup.addLayer(l);
    console.log(this.PolygonlayerGroup)
  }
  removePolygonLayerGroup() {
    console.log(this.PolygonlayerGroup)
    this.PolygonlayerGroup.clusterLayer.remove()
  }
  addlayerGroup() {
    const centerLatLng = [51.5, -0.09];
    const latDelta = 0.01;
    const lngDelta = latDelta * 2;
    const startLatLng = [centerLatLng[0] - latDelta, centerLatLng[1] - lngDelta];

    this.layerGroup = L.layerGroup().addTo(this.mapJs); // test that also layers nested in groups can be selected
    //const markerClusterGroup = L.markerClusterGroup().addTo(layerGroup);
    for (let i = 0; i < 9; i++) {
      const latLng = [startLatLng[0] + Math.floor(i / 3) * latDelta, startLatLng[1] + (i % 3) * lngDelta];
      L.marker(latLng).addTo(this.layerGroup);
    }
  }
  removeLayerGroup() {
    this.layerGroup.remove()
  }
  loadZoomBox() {
    var control = L.control.zoomBox({
      addToZoomControl: true,
      modal: true,
      className: "custom-content",
      content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="translate(0,0)"><path fill="rgba(0, 0, 0, 1)" d="M138.563 16.063C83.49 42.974 41.459 86.794 16.124 138.53l59.938 29.407c18.988-38.845 50.47-71.807 91.812-92l-29.313-59.874zm234.843.156L344 76.124c38.846 18.99 71.807 50.47 92 91.813l59.875-29.313c-26.913-55.073-70.732-97.073-122.47-122.406zm62.53 327.717c-18.982 38.865-50.53 71.673-91.873 91.875l29.437 60.125c55.116-26.925 97.085-70.76 122.375-122.562l-59.938-29.438zm-359.936.125l-60 29.375c26.928 55.097 70.776 97.082 122.563 122.375l29.406-59.937C129.122 416.885 96.192 385.4 76 344.062z"></path></g></svg>'
    });
    this.mapJs.addControl(control);
  }
  zoom: number
  AddAnnotation() {
    this.annotationlayerGrouppane = this.mapJs.createPane('annotationlayerGrouppane');

    //Right click on the map open menu
    let _map = this.mapJs

    this.mapJs.on('contextmenu', function (e, _map) {

      var annotation = prompt("Please enter annotation", "");
      console.log(e.target.attributionControl._map)

      var createLabelIcon = function (labelClass, labelText) {
        return L.divIcon({
          className: 'textLabelclass',
          html: `<p style="color: yellow;  white-space:nowrap;
    font-weight: 300;
    text-shadow: 0 0 0.1em black, 0 0 0.1em black,
          0 0 0.1em black,0 0 0.1em black,0 0 0.1em;">` + labelText + '</p>'
        })
      }
      var deleteAnnotation = function (e) {
        console.log(e)
      }
      console.log(this.annotationlayerGroup)
      if (this.annotationlayerGroup === undefined)
        this.annotationlayerGroup = L.layerGroup().addTo(e.target.attributionControl._map); // test that also layers nested in groups can be selected


      function markerOnClick(e) {
        if (confirm("Press a button!")) {
          console.log(e)
          //this.annotation.
          var leaflet_id = e.target._leaflet_id
          console.log(leaflet_id)
          e.target._map.annotationlayerGroup.eachLayer(function (layer) {
            if (layer._leaflet_id === leaflet_id) {
              e.target._map.annotationlayerGroup.removeLayer(layer)
            }
          });

        }
      }

      new L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: createLabelIcon("textLabelclass", annotation) })
        .on('click', markerOnClick)
        .addTo(this.annotationlayerGroup);
    });
  }
  ShowZoomInInfo() {
    this.mapJs.on('mousemove', (e) => {
      this.latLngCurrValues.nativeElement.innerHTML = JSON.stringify(e.latlng, null, 2);
      this.zoomText.nativeElement.innerHTML = 'zoom : ' + this.mapJs.getZoom()
    })
  }
  LoadMap() {
    this.LayerSelected = L.layerGroup();

    //wms layer from server
    var wmsLayer = L.tileLayer.wms('http://localhost:7777/geoserver/wms?', {
      layers: 'worldmap',

    });

    let bounds = new L.LatLngBounds(new L.LatLng(-180, -180),
      new L.LatLng(180, 180));
    this.mapJs = L.map(this.map.nativeElement, {
      center: [31.945775, 35.108228],
      zoom: 4,
      layers: [wmsLayer, this.LayerSelected],
      maxBounds: bounds,
      maxBoundsViscosity: 0.75,
      minZoom: 1
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.drawer !== undefined) {
      this.drawer.open()
    }
    if (this.mapJs !== undefined) {
      $(this.mapJs.nativeElement).height(this.chartHeight).width(this.chartWidth);
      this.mapJs.invalidateSize();
      console.log("chartWidth: " + this.chartWidth + " _chartHeight: " + this.chartHeight);
    }
  }
  ngAfterViewInit() {
    this.LoadMap()
  }
  LoadMapComponent() {
    if (this.mapJs === undefined) {

      this.LoadMap()

      // this.AddAnnotation()
      this.showInfo()

      //liat - do load lasso
      // this.LoadLasso()
      this.loadZoomBox()
    }
  }
  showInfo() {
    this.ShowZoomInInfo()
    this.showLatLng()

  }


  textLayerGroup: any;

  addTextLayers() {
    var data_points = {
      "type": "FeatureCollection",
      "name": "test-points-short-named",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": [
        { "type": "Feature", "properties": { "name": "1" }, "geometry": { "type": "Point", "coordinates": [-135.02507178240552, 60.672508785052223] } },
        { "type": "Feature", "properties": { "name": "6" }, "geometry": { "type": "Point", "coordinates": [-135.02480935075292, 60.672888247036376] } },
        { "type": "Feature", "properties": { "name": "12" }, "geometry": { "type": "Point", "coordinates": [-135.02449372349508, 60.672615176262731] } },
        { "type": "Feature", "properties": { "name": "25" }, "geometry": { "type": "Point", "coordinates": [-135.0240752514004, 60.673313811878423] } }
      ]
    };

    var pointLayer = L.geoJSON(null, {
      pointToLayer: function (feature, latlng) {
        let label = String(feature.properties.name) // .bindTooltip can't use straight 'feature.properties.attribute'
        return new L.CircleMarker(latlng, {
          radius: 1,
        }).bindTooltip(label, { permanent: true, opacity: 0.7 }).openTooltip();
      }
    });
    pointLayer.addData(data_points);
    this.mapJs.addLayer(pointLayer);
  }
  setLatLngString(e) {
    console.log(e)
    //this.latLngHeadline
  }
  latLngHeadline: string;
  showLatLng() {
    var self = this

    this.mapJs.on('click', function (this, e) {
      console.log(e.latlng, this)
      // this.latLngHeadline=e.latlng.lat
      // console.log(this.latLngHeadline)
      console.log(e.target.getZoom())
      //console.log(e.target.options.zoom)

      //event.stopPropagation();
    });
  }
  togglemeasureDistance: boolean;


  measureDistance() {
    if (this.togglemeasureDistance === true) {

    }
    var _firstLatLng, _firstPoint, _secondLatLng, _secondPoint, _distance, _length, _polyline, _angle;

    // add listeners to click, for recording two points
    this.mapJs.on('click', function (this, e) {
      console.log(e)
      if (!_firstLatLng) {
        _firstLatLng = e.latlng;
        _firstPoint = e.layerPoint;
        L.marker(_firstLatLng).addTo(this).bindPopup('Point A<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
      } else {
        _secondLatLng = e.latlng;
        _secondPoint = e.layerPoint;
        L.marker(_secondLatLng).addTo(this).bindPopup('Point B<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
      }

      if (_firstLatLng && _secondLatLng) {
        // draw the line between points
        L.polyline([_firstLatLng, _secondLatLng], {
          color: 'red'
        }).addTo(this);

        refreshDistanceAndLength(this);
      }
    })
    var _map = this.mapJs
    this.mapJs.on('zoomend', function (_map, e) {
      console.log(_map.getZoom())
      refreshDistanceAndLength(_map);

    })

    function refreshDistanceAndLength(_map) {
      //_distance = L.GeometryUtil.distance(_map, _firstLatLng, _secondLatLng);
      _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
      _angle = L.GeometryUtil.computeAngle(_firstPoint, _secondPoint)
      document.getElementById('length').innerHTML = _length / 1000 + ' (km) angle :' + _angle;
    }
  }


}
