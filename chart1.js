    var width = document.getElementById("gas").clientWidth,
    height = document.getElementById("gas").clientHeight,
    radius = Math.min(width, height) / 1.4;
////////console.log(height);



var color = d3.scaleOrdinal()
    .range(["#00ff00", "#0000ff","#ff0000", "#ffa500", "#d3d3d3"]);
    


var opacityScale = d3.scaleLinear()
                    .domain([0, 1500])
                    .range([0,1])

var arc = d3.arc()
    .outerRadius(radius/2)
    .innerRadius(radius / 2 - 50);

var labelArc = d3.arc()
    .outerRadius(radius/2)
    .innerRadius(radius/2);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { 

                        var values = d["2015"];
                        ////////console.log(values)
                        return values });



function makePie(year){
    //////console.log("hi")
    document.getElementById("gas").innerHTML = "";

    var svg = d3.select("#gas").append("svg").attr("width", width).attr("height", height)  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
var dataB = "data/ghg_wales.csv"
//////console.log(dataB)

d3.csv(dataB, function(data){
    //svg.innerHTML = ""
    /*
    //////console.log(data);

// CODE FOR INITIAL OUTER DONUT CHART WITH INDIVIDUAL EMISSION CATEGORIES
        
    var agriculture = 0;
    var business = 0;
    var energy = 0;
    var transport = 0;
    var other = 0;

    
    for (var i=0;i<data.length;i++){
        
        if (data[i].category === "Agriculture"){
          
            var amount = data[i][year]; 
            amount = amount.replace(/,/g, "");

            
            agriculture += parseFloat(amount);
            } else if (data[i].category === "Business"){
            var amount = data[i][year]; 
            amount = amount.replace(/,/g, "");
       
            business += parseFloat(amount);
                
            } else if (data[i].category === "Energy Supply"){
            var amount = data[i][year]; 
            amount = amount.replace(/,/g, "");

            
            energy += parseFloat(amount);
                
            } else if (data[i].category === "Transport"){
            var amount = data[i][year]; 
            amount = amount.replace(/,/g, "");

            
            transport += parseFloat(amount);
                
            } else {
                
            var amount = data[i][year]; 
            amount = amount.replace(/,/g, "");
            other += parseFloat(amount);
                
            };
    }
    var total = agriculture + business + energy + transport + other;

    
/* ==============================================================================

                OUTER CHART 
                
                
=================================================================================*/
    
   /* svg.append("text")
        .attr("x", (width / 12))             
        .attr("y", (-200) )
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Greenhous Gas Emissions in Wales"); 
    




  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");
    
function makeOuter(){
  g.append("path")
      .attr("d", arc)
      //.style("fill", function(d) { return color(d.data.value); })
      .style("fill", function (d) {
          if(d.data.category === "Agriculture"){
              return "#00ff00"
          } else if (d.data.category === "Business") {
              return "#0000ff"
          } else if (d.data.category === "Energy Supply"){
              return "#ff0000"
          } else if (d.data.category === "Transport"){
              return "#ffa500"
          } else if (d.data.category === "Industrial Process") {
              return "#9933ff"
          } else if (d.data.category === "Public") {
              return "#ff33f6"
          } else if (d.data.category === "Residential") {
              return "#fffc33"
          } else if (d.data.category === "Waste Management") {
              return "#33ffff"
          }
      })
        .on("mouseover", function(d){////console.log(d)})
        .style("fill-opacity", function(d,i){
      
        if (d.data.category === "Agriculture"){
            
            return opacityScale(d[year])
                
        } else if (d.data.category === "Business"){
            //////console.log((d.data.value / agriculture) * 10 )
           return opacityScale(d[year])
                
        } else if (d.data.category === "Energy Supply"){
            //////console.log((d.data.value / agriculture) * 10 )
            return opacityScale(d[year])
                
        } else if (d.data.category === "Transport"){
            //////console.log((d.data.value / agriculture) * 10 )
            return opacityScale(d[year])
                
        } else  {
            //////console.log((d.data.value / agriculture) * 10 )
            return opacityScale(d[year])
                
        }
            
        
      
  })
      ;};

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data; }); */
    
    
    
    
/* ==============================================================================

                INNER CHART 
                
                
================================================================================= */

    
   // var data1 = [agriculture, business, energy, transport, other];
    
    var maxRadius = radius / 2 - 60
    ////console.log(maxRadius)

    var radiusScale = d3.scaleSqrt().domain([0, 60120]). range([0, maxRadius]);
    
    var arcInner = d3.arc()
    .outerRadius(100)
    .innerRadius(0);
    
    ////console.log(radiusScale)

    var pieInner = d3.pie()
    .sort(null)
    .value(function(d) { return d[year]; });
    
      var gInner = svg.selectAll(".arcInner")
      .data(pieInner(data))
    .enter().append("g")
      .attr("class", "arcInner");

  gInner.append("path")
      .attr("d", arcInner)
      .style("fill", function (d) {
          if(d.data.category === "Agriculture"){
              return "#00ff00"
          } else if (d.data.category === "Business") {
              return "#0000ff"
          } else if (d.data.category === "Energy Supply"){
              return "#ff0000"
          } else if (d.data.category === "Transport"){
              return 'grey'//"#ffa500"
          } else if (d.data.category === "Industrial Process") {
              return 'grey'//"#9933ff"
          } else if (d.data.category === "Public") {
              return 'grey'//"#ff33f6"
          } else if (d.data.category === "Residential") {
              return 'grey'//"#fffc33"
          } else if (d.data.category === "Waste Management") {
              return 'grey'//"#33ffff"
          }
      })
    .on("mouseover", function(d){
      //detailGHG(d);
      ////console.log(d)
  })
  .on("click", function(d){
    console.log(d)
      //document.getElementById("chartage").style.backgroundColor = "yellow";
      makeOuter()
      //////console.log(d3.mouse(this));
    /*d3.zoom.extent([[0, 0], [width, height]])
    .scaleExtent([1, 40])
    .translateExtent([[0, 0], [width, height]])
      svg.attr("transform", d3.event.transform); */
      //svg.attr("transform", "translate(-"+ d3.mouse(this)[0] + ",-" + d3.mouse(this)[1] + ")scale(1.5,1.5)")
      
      
  })
  ;//.on("mouseover", function(d){////console.log(d.data.category, d)});

  
    
  

/*       svg.append("text")
	   .attr("text-anchor", "middle")
		 .attr('font-size', '4em')
		 .attr('y', 20)
	   .text(parseInt(total)); */
    
 
})

}

// THIS ANONYMOUS FUNCTION RUNS AT ONE SECOND INTERVALS ONCE PLAY HAS BEEN CLICKED AND ON SCREEN LOAD TO GO THROUGH 1998-2015 GHG FIGURES
function piePlay(){

(function(count) {
    if (count < 2016) {
        // call the function.
        makePie(count); 

        // The currently executing function which is an anonymous function.
        var caller = arguments.callee; 
        window.setTimeout(function() {
            // the caller and the count variables are
            // captured in a closure as they are defined
            // in the outside scope.
            caller(count + 1);
        }, 1000);    
    }

})(1998);

};
piePlay();




function detailGHG(data){
    
    ////console.log("Hi")
    
    
}

