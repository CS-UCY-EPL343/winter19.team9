import React, {Component} from 'react';
import L from "leaflet";

const style = {
    width: "100%",
    height: "300px"
};

class LeafletMap extends Component {

    componentDidMount() {

        // create map
        this.map = L.map("map", {
            center: [this.props.markerPosition[0].lat, this.props.markerPosition[1].lng],
            zoom: this.props.zoom,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });

        // add marker
        const pos = [this.props.markerPosition[0].lat, this.props.markerPosition[1].lng];
        this.marker = L.marker(pos).addTo(this.map);
    }

    render() {
        return (
            <div id="map" style={style}/>
        );
    }
}

export default LeafletMap;