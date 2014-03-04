getHighestSpender();
drawPopularGenresChart();
drawMostPlayedGamesChart();
drawMostOwnedGamesChart();

function drawPopularGenresChart() {

  var margin = {top: 30, right: 20, bottom: 30, left: 200},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#popular-genres-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.text("results/popular_genres.csv", function(text) {

    var input = d3.csv.parseRows(text).map(function(row) {

      return {"name": row[0], "value": +row[1]}; 

    });

    input = input.splice(0,5);

    x.domain(input.map(function(d) { return d.name; }));
    y.domain([0, d3.max(input, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "popular-genres-x popular-genres-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y popular-genres-axis")
        .call(yAxis)
      .append("text")
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Average Hours Played");

    svg.selectAll(".popular-genres-bar")
        .data(input)
      .enter().append("rect")
        .attr("class", "popular-genres-bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

  });

}

function drawMostPlayedGamesChart() {

  var margin = {top: 30, right: 20, bottom: 30, left: 200},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#most-played-games-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.text("results/most_played_games.csv", function(text) {

    var input = d3.csv.parseRows(text).map(function(row) {

      return {"name": row[0], "value": +row[1]};

    });

    input = input.splice(0,5);

    x.domain(input.map(function(d) { return d.name; }));
    y.domain([0, d3.max(input, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "most-played-games-x most-played-games-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y most-played-games-axis")
        .call(yAxis)
      .append("text")
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Average Hours Played");

    svg.selectAll(".most-played-games-bar")
        .data(input)
      .enter().append("rect")
        .attr("class", "most-played-games-bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
    
  });

}

function drawMostOwnedGamesChart() {

  var margin = {top: 30, right: 20, bottom: 30, left: 200},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#most-owned-games-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.text("results/most_owned_games.csv", function(text) {

    var input = d3.csv.parseRows(text).map(function(row) {

      return {"name": row[0], "value": +row[1]}; 

    });

    input = input.splice(0,5);

    x.domain(input.map(function(d) { return d.name; }));
    y.domain([0, d3.max(input, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "most-owned-games-x most-owned-games-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y most-owned-games-axis")
        .call(yAxis)
      .append("text")
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("No. of players");

    svg.selectAll(".most-owned-games-bar")
        .data(input)
      .enter().append("rect")
        .attr("class", "most-owned-games-bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
    
  });

}

function getHighestSpender() {

  d3.text("results/total_spent_by_players.csv", function(text) {

    var input = d3.csv.parseRows(text).map(function(row) {

      return {"name": row[0], "value": +row[1]};

    });

    var sum = 0;
    for(var i = 0; i < input.length; i++) {
      sum += input[i].value;
    }

    console.log(sum);
    console.log(input.length);

    var highest = parseFloat(input[0].value) / 100;
    var average = (sum / parseFloat(input.length)) / 100;

    document.getElementById("highest-spender").innerHTML = 'USD' + highest;
    document.getElementById("average-spent").innerHTML = 'USD' + average;

  });


}