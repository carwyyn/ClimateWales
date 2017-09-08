var mapwidth = document.getElementById("map").offsetWidth;
var mapheight = document.getElementById("map").offsetHeight;

mapboxgl.accessToken = 'pk.eyJ1Ijoicml2ZXJtYXBzIiwiYSI6ImNpeGdraWxxMjAwMGwydHAzbjJtN2hqdG4ifQ.bIigaZZRBCzYqW70_ivtGA';



var map = new mapboxgl.Map({
    container: 'map',
    zoom: 6.5,
    center: [-3.5, 52.5],
    style: 'mapbox://styles/mapbox/satellite-v9',
    hash: false
});

map.on('load', function(){

	d3.csv("juneRenewableDatabase.csv", function(error, data){
		console.log(data);

		for (var i=0; i<data.length; i++){

			var popup = new mapboxgl.Popup({offset: 25})
    			.setText(data[i]['Technology-Type']);

			//console.log(data[i].lat);

			var marker = new mapboxgl.Marker()
  				.setLngLat([data[i].lng, data[i].lat])
  			
  				.setPopup(popup)
  			
  				.addTo(map);

			//map.marker([data[i].lat, data[i].lng]).addTo(map)
    		//	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    		//	.openPopup();
		}

	});
    
    
    
})  



/*

var mapLeaflet = L.mapbox.map('map', 'mapbox.light')
  .setView([37.8, -96], 4);

L.marker([38.913184, -77.031952]).addTo(mapLeaflet);
L.marker([37.775408, -122.413682]).addTo(mapLeaflet);

mapLeaflet.scrollWheelZoom.disable();


var projection = d3.geoAlbers()
    .center([-1, 54.5])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(13000)
    .translate([100 / 2, -200]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select( "#map" )

d3.json("wales.topojson", function(error, us) {
  if (error) throw error;
    console.log(us)
  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.eer).features)
    .enter().append("path")
      .attr("d", path);

  svg.append("path")
      .attr("class", "county-borders")
      .attr("d", path(topojson.mesh(us, us.objects.eer, function(a, b) { return a !== b; })));
    


    d3.csv("juneRenewableDatabase.csv", function(error, data){
    
svg.selectAll(".pin")
    .data(data)
  .enter().append("circle", ".pin")
    .attr('r', function(d){
          return (Math.sqrt(d["Installed Capacity (MWelec)"]*2 /Math.PI));
        })
    .attr("transform", function(d) {
      return "translate(" + projection([
        d.lng,
        d.lat
      ]) + ")"
    })
    .style("fill", function(d){
    if (d["Technology-Type"] === "Wind Onshore"){
        return "red"
    } else if (d["Technology-Type"] === "Solar Photovoltaics"){
        return "yellow"
    }
    })
    .on("mouseover", function(d){
        var divBox = document.getElementById("mapLedgend")
        var info = document.createTextNode(d["Site Name"] + ".   Capacity: " + d["Installed Capacity (MWelec)"])
        var para = document.createElement('p');
            para.appendChild(info)
            divBox.appendChild(para);
        
   
    })

});

    
});

*/


/* INITIAL TEST ONE
  
              d3.csv("juneRenewableDatabase.csv", function(error, data){

            console.log(data)
            var listing = []
            for(var i=0; i < data.length; i++){
                listing.push([data[i].lng, data[i].lat])
            }
                console.log(listing)
                // add circles to svg
                svg.selectAll("circle")
                    .data(listing).enter()
                    .append("circle")
                .attr("cx", function (d) {    console.log(d);          return projection(d)[0]; })
                .attr("cy", function (d) {             return projection(d)[1]; })
                    .attr("r", "4px")
                    .attr("fill", "red")    
        
    });

LOGOS AS SYMBOLS

svg.selectAll("img")
    .data(data)
  .enter().append("svg:image")
    .attr("xlink:href", function(d){
    console.log(d["Technology-Type"])
    if (d["Technology-Type"] === "Wind Onshore"){
        return "/lib/images/wind.png"
    } else if (d["Technology-Type"] === "Solar Photovoltaics"){
        return "/lib/images/solar.png"
    }
    


*/
