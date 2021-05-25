//JIOCOORDS = [35.6920427, 139.7079936];
JIOCOORDS = [43.383107, -103.250056];
// マップ
let map
// マーカーのレイヤー
let markerLayer;
// マーカのフラグ
let isMarkerDisplayed = false;
// 初期化のフラグ
let isInitialize = false;
// ポリゴン情報1
const polygonList1 = [
    [-104.05, 48.99],
    [-97.22,  48.98],
    [-96.58,  45.94],
    [-104.03, 45.94],
    [-104.05, 48.99]
];
// ポリゴン情報2
const polygonList2 = [
    [-109.05, 41.00],
    [-102.06, 40.99],
    [-102.03, 36.99],
    [-109.04, 36.99],
    [-109.05, 41.00]
];

$(function() {
    makeMap();

    // カウントイベント
    $('#select-count').change(function() {
        var selectCount = $('#select-count option:selected').val();
        //postFlask(selectCount);
    });
})

function makeMap() {
    
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
        zoom: 5,
        layers: [os_map]
        });

    L.control.layers(myMaps).addTo(map);

    // スケールコントロールを最大幅200px、右下、m単位で地図に追加
    L.control.scale({ maxWidth: 200, position: 'bottomright', imperial: false }).addTo(map);

    var states = [{
        "type": "Feature",
        "properties": {"party": "Republican"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                polygonList1
            ]
        }
    }, {
        "type": "Feature",
        "properties": {"party": "Democrat"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                polygonList2
            ]
        }
    }];
    
    L.geoJSON(states, {
        color: "black",
        fill: true,
        opacity: 1,
        weight: 1,
        fillOpacity: 0.6,
        onEachFeature: onEachFeature
    }).addTo(map);
}

// ポリゴン内イベント定義
function onEachFeature(feature, layer) {
    layer.on({
        click: whenClick,
        mouseover: whenMouseover,
        mouseout: whenMouseout
    });
}
// クリックイベント
// 色を赤に変えるだけ
function whenClick(e) {
    // ポリゴン色変更
    this.setStyle({
        'fillColor': 'red'
    });
}
// マウスオーバーイベント
function whenMouseover(e) {
    // 濃淡変更
    this.setStyle({
        'fillOpacity': 0.8
    });
}
// マウスアウトイベント
function whenMouseout(e) {
    // 濃淡変更
    this.setStyle({
        'fillOpacity': 0.6
    });
}

// Vue.js
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
                markerLayer.bindPopup(`<p>${JIOCOORDS}</p>`).openPopup();
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

// var select = new Vue ({
//     el: "#select-count",
//     data: {
//         number: 0
//     },
//     methods: {
//         mathsqrt: function(e){
//             this.number = e.target.value;
//             console.log(this.number);
//             rt.view(this.number);
//         }
//     }
// });

// var rt = new Vue ({
//     el: "#square-root",
//     data: {
//         sqrt: "平方根:",
//         number: 1
//     },
//     methods: {
//         view: function(number){
//             var num = 0;
//             let numberJSON = JSON.stringify(number);

//             // サーバー送受信
//             var root = $.ajax({
//                 type: "POST",
//                 url: "/count",
//                 data: numberJSON,
//                 contentType: 'application/json',
//                 dataType: "json",    
//                 success: function(obj) {
//                     console.log("Ajax success");
//                     console.log(obj)
//                     return obj.responseJSON
//                 },
//                 error: function(err) {
//                     console.log("error!");
//                     console.log(err);
//                 }
//             });
//             console.log(root)
//             this.sqrt = `平方根: ${root} `
//         }
//     }
// });
