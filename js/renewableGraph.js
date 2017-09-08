// Guide: https://bl.ocks.org/DimsumPanda/689368252f55179e12185e13c5ed1fee
makeGraph("data/renewable_wales.csv");


function makeGraph(dataName){

var svg = d3.select("#stacked");
svg.selectAll("*").remove();

var margin = {top: 10, right: 0, bottom: 30, left: 30};
var width = document.getElementById("stacked").clientWidth - margin.left - margin.right;
var height = document.getElementById("stacked").clientHeight - margin.top - margin.bottom;
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.3);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal(d3.schemeCategory20);
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var stack = d3.stack();

d3.csv(dataName, type, function(error, data) {
  if (error) throw error;

//  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.Type; }));
  if (dataName === 'data/renewable_wales.csv'){
    y.domain([0, 20000]);
  } else {
    y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
  }

  z.domain(data.columns.slice(1));

  g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(1))(data))
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.Type); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
    .on('mouseenter', function(d){
      console.log(d.data)
      var tooltip = d3.select('#tooltip')
      tooltip.select('h2').text(d.data.Type)
      var info = "Hydro: " + d.data.Hydro + "<br />" +
               "Landfill Gas: " + d.data["Landfill Gas"] + "<br />" +
               "Other biomass: " + d.data["Other biomass"] + "<br />" +
               "Sewage digestion: " + d.data["Sewage sludge digestion"] + "<br />" +
               "Solar: " + d.data["Solar"] + "<br />" +
               "Wind: " + d.data["Wind"] + "<br />" +
               "TOTAL: " + (d.data.Hydro + d.data["Landfill Gas"] + d.data["Other biomass"] +d.data["Sewage sludge digestion"] +d.data["Solar"] +d.data["Wind"])
      tooltip.select('p').html(info)

      var mouseCoords = d3.mouse(this)
      tooltip.style('top', mouseCoords[1] + 'px')
      tooltip.style('left', mouseCoords[0] + 'px')
      tooltip.style('display', 'inline-block')



    })
    .on('mouseout', function(d){
      var tooltip = d3.select('#tooltip')
      tooltip.style('display', 'none')
    });

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".5em")
            .attr("transform", "rotate(-45)" )
            .call(wrap, 100);;

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks(2).pop()))
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .attr("fill", "#000")
      .text("GWh");

  /*var legend = g.selectAll(".legend")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .style("font", "10px sans-serif");

  legend.append("rect")
      .attr("x", width -100)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width -80)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text(function(d) { return d; }); */
});

function type(d, i, columns) {
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


    // LINE CHART
    if(dataName === 'data/renewable_wales.csv'){
    var line = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.value); });

    d3.csv("data/energy_consumption.csv", function(error, data) {
      if (error) throw error;


      g.append("path")
        .datum(data)
        .attr("transform", "translate(30,0)")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

        svg.selectAll("dot")
          .data(data)
      .enter().append("circle")
          .attr("r", 5)
          .attr("cx", function(d) { return x(d.year); })
          .attr("cy", function(d) { return y(d.value); })
          .attr("transform", "translate(58,10)")
          .on('mouseenter', function(d){
            console.log(d.value)
            var tooltip = d3.select('#tooltip')
            tooltip.select('h2').text("Consumption")
            tooltip.select('p').text(d.value)

            var mouseCoords = d3.mouse(this)
            tooltip.style('top', mouseCoords[1] + 'px')
            tooltip.style('left', mouseCoords[0] + 'px')
            tooltip.style('display', 'inline-block')



          })
          .on('mouseout', function(d){
            var tooltip = d3.select('#tooltip')
            tooltip.style('display', 'none')
          })



    });
  };




}
