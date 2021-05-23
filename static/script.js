JIOCOORDS = [35.6920427, 139.7079936];
// マップ
let map
// マーカーのレイヤー
let markerLayer;
// マーカのフラグ
let isMarkerDisplayed = false;
// 初期化のフラグ
let isInitialize = false;


$(function() {
    makeMap();
})

function makeMap() {
    // const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    // const MB_ATTR = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    
    const os_map = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    const std_map = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    const seamlessphoto_map = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    });
    
    const myMaps = {
        "OpenStreetMap": os_map,
        "地理院地図 標準": std_map,
        "地理院地図 写真": seamlessphoto_map,
    };

    map = L.map('leaflet-map', {
        center: JIOCOORDS,
        zoom: 17,
        layers: [os_map]
        });

    L.control.layers(myMaps).addTo(map);

    // スケールコントロールを最大幅200px、右下、m単位で地図に追加
    L.control.scale({ maxWidth: 200, position: 'bottomright', imperial: false }).addTo(map);
}


var mk = new Vue ({
    el: "#markerBtn",
    data: {
        marker: document.getElementById("markerBtn").value
    },
    methods: {
        clickMarker: function(event){
            this.marker = event.target.value;
            if (!isMarkerDisplayed) {
                // マーカーとポップアップの表示
                markerLayer = L.marker(JIOCOORDS).addTo(map);
                markerLayer.bindPopup("<p>jioworks</p>").openPopup();
                isMarkerDisplayed = true;
            }
        }
    }
});

var ini = new Vue ({
    el: "#initializeBtn",
    data: {
        initialize: document.getElementById("initializeBtn").value
    },
    methods: {
        clickInitialize: function(event){
            this.initialize = event.target.value;
            if (isMarkerDisplayed) {
                // マーカーの削除
                map.removeLayer(markerLayer)
                isMarkerDisplayed = false;
            }
        }
    }
});
