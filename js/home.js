$(document).ready(function(){

var n = 48,
    random = d3.random.normal(1, .22),
    data = d3.range(n).map(random);
 
var width = $("#waves").width() + 500;
var height = $("#waves").height();
 
var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);
 
var y = d3.scale.linear()
    .domain([0, 1.5])
    .range([height, 0]);
 
var line = d3.svg.line()
    .x(function(d, i) { return x(i) * i; })
    .y(function(d, i) { return y(d) -10; });
 
var svg = d3.select("#waves").append("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");
 
svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);
 
 
var path = svg.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
 
tick();
 
function tick() {
 
  // push a new data point onto the back
  data.push(random());
 
  // redraw the line, and slide it to the left
  path
    .transition()
      .duration(3000)
      .attr("d", line)
      .attr("stroke-width", function(d,i){ return d * i; })
      .ease("ease-in-out")
      //.attr("transform", "translate(" + x(0) + ",0)")
      .each("end", tick);
 
  // pop the old data point off the front
  data.shift();
 
}


});
