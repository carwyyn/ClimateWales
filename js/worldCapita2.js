
// Mike Bostock "margin conventions"
var margin = {top: 20, right: 0, bottom: 30, left: 40},
    widthCapita = document.getElementById("worldCapita").clientWidth- margin.left - margin.right,
    heightCapita = document.getElementById("worldCapita").clientHeight- margin.top - margin.bottom;




// create an SVG element (appended to body)
// set size
// add a "g" element (think "group")
// annoying d3 gotcha - the 'svg' variable here is a 'g' element
// the final line sets the transform on <g>, not on <svg>
var svgCapita = d3.select("#worldCapita")
    .attr("width", widthCapita + margin.left + margin.right)
    .attr("height", heightCapita + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")

svg.append("g")
    .attr("class", "y axis")
  .append("text") // just for the title (ticks are automatic)
    .attr("transform", "rotate(-90)") // rotate the text!
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Kg"); */

// D3 scales = just math
// x is a function that transforms from "domain" (data) into "range" (usual pixels)
// domain gets set after the data loads
var xCapita = d3.scaleBand()
      .range([0, heightCapita])
        .padding(0.5);

var yCapita = d3.scaleLinear()
    .range([0, widthCapita]);

// D3 Axis - renders a d3 scale in SVG
var xAxis = d3.axisBottom().scale(xCapita);

var yAxis = d3.axisLeft();





function capita(){
// d3.tsv is a wrapper around XMLHTTPRequest, returns array of arrays (?) for a TSV file
// type function transforms strings to numbers, dates, etc.
d3.csv("data/worldCapita.csv", function(error, data) {
    console.log(data);


    
    
    var labels = svgCapita.selectAll(".label")
    .data(data);

labels.enter().append("text")
    .attr("class", "label")
    .attr("x", 40)   
    .attr("y", function(d, i) { return xCapita(i);} )
    .attr("dx", 0) // padding-right
    .attr("dy", ".6em") // vertical-align: middle
    .attr("text-anchor", "end") // text-align: right
    //.attr("text-size", "2em")
    .text(function(d) { return d.COU})
    .style("font-size", "0.9em");


    
  replay(data);
});

function type(d) {
  // + coerces to a Number from a String (or anything)
  d.frequency = +d.frequency;
  return d;
}

function replay(data) {
  var slices = [];
    var y2000 = [];
    var y2001 = [];
    var y2002 = [];
    var y2003 = [];
    var y2004 = [];
    var y2005 = [];
    var y2006 = [];
    var y2007 = [];
    var y2008 = [];
    var y2009 = [];
    var y2010 = [];
    var y2011 = [];
    var y2012 = [];
    var y2013 = [];
    var y2014 = [];
    var y2015 = [];
    
    
   // console.log(data)
  for (var i = 0; i < data.length; i++) {
    //slices.push(data.slice(0, i+1));
    if (data[i].Year === "2000"){
        y2000.push(data[i])
    } else if  (data[i].Year === "2001"){
        y2001.push(data[i])
    } else if  (data[i].Year === "2002"){
        y2002.push(data[i])
    } else if  (data[i].Year === "2003"){
        y2003.push(data[i])
    } else if  (data[i].Year === "2004"){
        y2004.push(data[i])
    } else if  (data[i].Year === "2005"){
        y2005.push(data[i])
    } else if  (data[i].Year === "2006"){
        y2006.push(data[i])
    } else if  (data[i].Year === "2007"){
        y2007.push(data[i])
    } else if  (data[i].Year === "2008"){
        y2008.push(data[i])
    } else if  (data[i].Year === "2009"){
        y2009.push(data[i])
    } else if  (data[i].Year === "2010"){
        y2010.push(data[i])
    } else if  (data[i].Year === "2011"){
        y2011.push(data[i])
    } else if  (data[i].Year === "2012"){
        y2012.push(data[i])
    } else if  (data[i].Year === "2013"){
        y2013.push(data[i])
    } else if  (data[i].Year === "2014"){
        y2014.push(data[i])
    } else if  (data[i].Year === "2015"){
        y2015.push(data[i])
    } 
  }
    
    slices.push(y2000);
    slices.push(y2001);
    slices.push(y2002);
    slices.push(y2003);
    slices.push(y2004);
    slices.push(y2005);
    slices.push(y2006);
    slices.push(y2007);
    slices.push(y2008);
    slices.push(y2009);
    slices.push(y2010);
    slices.push(y2011);
    slices.push(y2012);
    slices.push(y2013);
    slices.push(y2014);
    slices.push(y2015);
    
   

  slices.forEach(function(slice, index){
      slice.sort(function(a, b) {
    return parseFloat(b.Value) - parseFloat(a.Value);
}); 
    setTimeout(function(){
      draw(slice);
    },  index * 1000);
      
  });
    
}

function draw(data) {

  xCapita.domain(d3.range(0,43));
  yCapita.domain([30,0]);
//Put year of viz in text: 
    document.getElementById("capitaYear").textContent = data[0].Year;

//Go through data to find the OECD average for that year
for (var i=0;i<data.length; i++){
  if(data[i].COU === "OECD"){
    var OECDaverage = data[i].Value;
  }
}

  
    
    var bars = svgCapita.selectAll('.bar')
                    .data(data);
    
    bars.enter().append('rect')
                .classed('bar', true);
    
    bars.transition().duration(300)
        
 /*   .attr("x", function(d, i) { return x(i); }) // (d) is one item from the data array, x is the scale object from above
    .attr("width", x.bandwidth()) // constant, so no callback function(d) here
    .attr("y", function(d) {      return y(d.Value); })
    .attr("height", function(d) { return height - y(d.Value); })
    .style("fill", function(d){ if (d.COU === "WAL"){console.log("Wales");return "red"} });  */
    
    //bars.exit().remove()
    
    .attr("width",function(d) { return widthCapita - yCapita(d.Value); })
    .attr("height", xCapita.bandwidth()) 
    .attr("y", function(d, i) { return xCapita(i);})
     .attr("x", 20) 
    .style("fill", function(d){ 

      if (d.COU === "WAL")

        {return "darkviolet"} 

      else if (parseFloat(d.Value) < parseFloat(OECDaverage)) 

        { return "#669e3f"} 

      else 

        {return "#ff6666"} 

    });  
    
    bars.exit().remove()
    
        labels = svgCapita.selectAll(".label")
        .data(data, function(d) { return d.COU; });
    labels.transition()
        .duration(300)
        .attr("x", 20)   
        .attr("y", function(d, i) { return xCapita(i);} );  
    
    labels.exit().remove();


}
}

capita()