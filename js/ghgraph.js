var svg = d3.select("#ghg")
var margin = {top: 10, right: 70, bottom: 60, left: 30};
var width = document.getElementById("ghg").clientWidth - margin.left - margin.right;
var height = document.getElementById("ghg").clientHeight - margin.top - margin.bottom;
var count = 0;
//console.log(width, height)





// Guide: https://bl.ocks.org/DimsumPanda/689368252f55179e12185e13c5ed1fee


var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var xGraph = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.3);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal(d3.schemeGreens[9]);
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var stack = d3.stack();

/*var referenceAgri = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(4115.238); });
 */

d3.csv("data/ghgSector.csv",type, function(error, data) {
    
  if (error) throw error;
  //console.log(data);
  //data.sort(function(a, b) { console.log( b.total , a.total); });

  xGraph.domain(data.map(function(d) { return d.Year; }));

   y.domain([0, 60000]);

  z.domain(data.columns.slice(1));

  g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(1))(data))
    .enter().append("g")
    

      .attr("class", "serie")

      
      .attr("fill", function(d) { return z(d.key); })
      .attr("class", function(d){  return d.key })
      
    .selectAll("rect")
    .data(function(d) {return d; })
    .enter().append("rect")

    
      .attr("class", "show")


      .attr("x", function(d) { return xGraph(d.data.Year); })
      .attr("y", function(d) {  return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", xGraph.bandwidth())
      .style("opacity", 0)
 
      /*.on("mouseover", function(d){
        var title = document.getElementById("sector_title");
        title.innerHTML =  d.data.Year

        var para1 = document.getElementById("firstPara")
        para1.innerHTML = "During " + d.data.Year + ", " + Math.round(d.data.total) + " KiloTonnes of CO2 equivalents were emmitted in Wales."


      })*/
      .on("click", function(d){
        //console.log(this.parentElement)
        var topic = this.parentElement.classList.value;
        sectorDetail(data, topic)

      })
      .transition().delay(300).duration(800).style("opacity", 1);



  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xGraph))
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".5em")
            .attr("transform", "rotate(-45)" )
            .call(wrap, 100);

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks(2).pop()))
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .attr("fill", "#000");

 var legend = g.selectAll(".legend")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(55," + i * 19 + ")"; })
      .style("font", "10px sans-serif");

  legend.append("rect")
      .attr("x", width )
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", z)
            .on("click", function(d){

        var topic = d;
        sectorDetail(data, topic)

      });



  legend.append("text")
      .attr("x", width -60)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text(function(d) { return d; })
            .on("click", function(d){
        //console.log(this.parentElement)

        var topic = d;
        sectorDetail(data, topic)

      });

     /* g1.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 6)
          .attr("d", referenceAgri);*/






});

function type(d, i, columns) {
  //console.log(d, i, columns);
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}


//FROM http://stackoverflow.com/questions/13765012/multiline-svg-text-axis-ticks-in-d3 TO MAKE AXIS TEXT NICER
    function wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }



    ////////// ************ SLIDER
/*


    var x = d3.scaleLinear()
        .domain([1995, 2015])
        .range([0, width])
        .clamp(true);

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + (height/12) + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { hue(x.invert(d3.event.x)); }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(x.ticks(10))
      .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    slider.transition() // Gratuitous intro!
        .duration(750)
        .tween("hue", function() {
          var i = d3.interpolate(0, 70);
          return function(t) { hue(i(t)); };
        });

    function hue(h) {
      handle.attr("cx", x(h));
      //svg.style("background-color", d3.hsl(h, 0.8, 0.8));
      //document.getElementsByClassName("show")[0].setAttribute("style", "border: 1px solid red;")
    }


*/







function sectorDetail(data, topic){

	
        document.getElementById("sectorTitle").innerHTML = topic;
    
    for (var i=0; i<data.length;i++){
        if (data[i].Year === "target 2020" || data[i].Year === "target 2050"){
            data.splice(i, 2);
            //delete data[i]
        }
    }
    
    var svgLine = d3.select("#ghgSector");
    var margin = {top: 0, right: 0, bottom: 5, left: 70};
    var width1 = document.getElementById("ghgSector").clientWidth - margin.left - margin.right;
    var height1 = document.getElementById("ghgSector").clientHeight - margin.top - margin.bottom;
    var gLine = svgLine.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
   //console.log(data)
    
    var x = d3.scaleBand()
    .rangeRound([0, width1])
    .padding(0.1)
    .align(0.3);

    var y = d3.scaleLinear()
    .rangeRound([height1, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d[topic]); });
    
    var movingAverageLine = d3.line()
      .x(function(d,i) { return x(d.Year); })
      .y(function(d,i) {
          if (i == 0) {
              prevPrevVal  = y(d[topic]);
              prevVal = y(d[topic]);
              curVal =  y(d[topic]);
          } else if (i == 1) {
              prevPrevVal = prevVal;
              prevVal = curVal;
              curVal = (prevVal + y(d[topic])) / 2.0;
          } else {
              prevPrevVal = prevVal;
              prevVal = curVal;
              curVal = (prevPrevVal + prevVal + y(d[topic])) / 3.0;
          }
          return curVal;
      })
      .curve(d3.curveBasis);
    
if (count === 0){
    
    x.domain(data.map(function(d) { return d.Year; }));
    y.domain([0, d3.max(data, function(d) { return d[topic]; })]).nice();
    
  gLine.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr('class', 'line')
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr('opacity', 0)
      .attr("d", line).transition().delay(100).duration(800).style("opacity", 1);
        count = count + 1;
    
     svgLine.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(" + margin.left + "," + height1 + ")")
    .call( d3.axisBottom (x) );
    
    svgLine.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y).ticks(5));
    
    

    gLine.append("path")
        .datum(data)
        .attr("class", "average")
        .attr("opacity", 0)
        .attr("d", movingAverageLine).transition().delay(100).duration(200).style("opacity", 1);
    
    
    }
    
    
    
    else{
        
        
        
    x.domain(data.map(function(d) { return d.Year; }));
    y.domain([0, d3.max(data, function(d) { return d[topic]; })]).nice();
        
        
        
    //var svg = d3.select("body").transition();

    // Make the changes
        svgLine.select(".line")// change the line
            .datum(data).transition().duration(800)
            .attr("d", line);
        
        svgLine.select(".yaxis").transition().duration(800) // change the y axis
            .call(d3.axisLeft(y).ticks(5));
        
          svgLine.select(".average")
          .datum(data).transition().duration(1500)
        .attr("d", movingAverageLine);
        
    }

    //console.log(data)

    for (var i=0;i<data.length;i++){
    	if (data[i].Year === '1990') {
    		var ninety = data[i][topic];
    	}
    	if (data[i].Year === '2005') {
    		var noughties = data[i][topic];
    	}
    	if (data[i].Year === '2014') {
    		var last = data[i][topic];
    	}
    	if (data[i].Year === '2015') {
    		var recent = data[i][topic];
    	}
    }

    //console.log(recent, ninety)

    var firstArrow = document.getElementById("since1990Arrow")
    var secondArrow = document.getElementById("since2005Arrow")
    var thirdArrow = document.getElementById("since2014Arrow")
    var firstTitle = document.getElementById("since1990")
    var secondTitle = document.getElementById("since2005")
    var thirdTitle = document.getElementById("since2014")

    if (recent > ninety){
    	//console.log(firstArrow.className)
    	firstArrow.className = "glyphicon logo-arrow glyphicon-arrow-up";
    	
    	
    } else {
    	firstArrow.className += "glyphicon logo-arrow glyphicon-arrow-down";
    }

    if (recent > noughties){
    	//console.log(firstArrow.className)
    	secondArrow.className = "glyphicon logo-arrow glyphicon-arrow-up";
    } else {
    	secondArrow.className += "glyphicon logo-arrow glyphicon-arrow-down";
    }

    if (recent > last){
    	//console.log(firstArrow.className)
    	thirdArrow.className = "glyphicon logo-arrow glyphicon-arrow-up";
    } else {
    	thirdArrow.className += "glyphicon logo-arrow glyphicon-arrow-down";
    }

    var change = ((recent - ninety)/ninety) * 100;
    firstTitle.innerHTML = change.toFixed(2) + "% since 1990";
    secondTitle.innerHTML = (((recent - noughties)/noughties) * 100).toFixed(2) + "% since 2005";
    thirdTitle.innerHTML = (((recent - last)/last) * 100).toFixed(2) + "% since the previous year, 2014";
    

    
    
    
    
}