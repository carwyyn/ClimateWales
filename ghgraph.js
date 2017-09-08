var svgLine = d3.select("#ghg");
var margin = {top: 10, right: 0, bottom: 5, left: 70};
var width1 = document.getElementById("ghg").clientWidth - margin.left - margin.right;
var height1 = document.getElementById("ghg").clientHeight - margin.top - margin.bottom;
var gLine = svgLine.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var x = d3.scaleBand()
    .rangeRound([0, width1])
    .padding(0.1)
    .align(0.3);

var y = d3.scaleLinear()
    .rangeRound([height1, 0]);

var line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.amount); });

var reference = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(34074.492); });

    var reference2050 = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(11358.164); });

d3.csv("data/greenhouse_gas.csv", function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]).nice();

  gLine.append("g")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".5em")
            .attr("transform", "rotate(-45)" )
            .call(wrap, 100)
    .select(".domain")
      .remove();

  gLine.append("g")
      .call(d3.axisLeft(y).ticks(5, "s"))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90) translate(10,-35)")

      .attr("y", y(y.ticks(10).pop()))
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("CO2 equivalent (KiloTonnes)");

  gLine.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

      gLine.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", reference);

          gLine.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "black")
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("d", reference2050);
    
    
var curtain = svgLine.append('rect')
    .attr('x', -1 * width)
    .attr('y', -1 * height)
    .attr('height', height)
    .attr('width', width)
    .attr('class', 'curtain')
    .attr('transform', 'rotate(180)')
    .style('fill', '#f6f6f6');
    
  /* Optionally add a guideline */
  var guideline = svgLine.append('line')
    .attr('stroke', '#333')
    .attr('stroke-width', 0)
    .attr('class', 'guide')
    .attr('x1', 1)
    .attr('y1', 1)
    .attr('x2', 1)
    .attr('y2', height)
    
  /* Create a shared transition for anything we're animating */
  var t = svgLine.transition()
    .delay(750)
    .duration(6000)
    .ease(d3.easeLinear)
    .on('end', function() {
      d3.select('line.guide')
        .transition()
        .style('opacity', 0)
        .remove()
    });
  
  t.select('rect.curtain')
    .attr('width', 0);
  t.select('line.guide')
    .attr('transform', 'translate(' + width + ', 0)')

  d3.select("#show_guideline").on("change", function(e) {
    guideline.attr('stroke-width', this.checked ? 1 : 0);
    curtain.attr("opacity", this.checked ? 0.75 : 1);
  })



});


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
