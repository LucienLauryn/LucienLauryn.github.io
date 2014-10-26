
var w = 1000;
var h = 1000;

svg = d3.select("#chart")
		.append("svg")
		.attr("width",w)
		.attr("height",h);

var projection = d3.geo.albersUsa()
					.scale([750]) //default scale is 1000


var path = d3.geo.path().projection(projection);


var color = d3.scale.quantize()
                    .range(["rgb(237,248,233)", "rgb(186,228,179)",
                     "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)","rgb(100,200,44)"]);

d3.csv("statepopulation.csv", function(data) {
	color.domain([
                d3.min(data, function(d) { return d.value; }),
                d3.max(data, function(d) { return d.value; })
                ]);


d3.json("us-states.json", function(json) {

	//Merge the csv data and GeoJSON
    //Loop through once for each csv data value
    for (var i = 0; i < data.length; i++) {

        //Grab state name
        var dataState = data[i].state;

        //Grab data value, and convert from string to float
        var dataValue = parseFloat(data[i].value);

        //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

            var jsonState = json.features[j].properties.name;

            if (dataState == jsonState) {

                //Copy the data value into the JSON
                json.features[j].properties.value = dataValue;

                //Stop looking through the JSON
                break;
	            }
	        }
	    }

svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("d", path)
           .style("fill", function(d) {
                        //Get data value
                        var value = d.properties.value;
                        console.log(value)
                        if (value) {
                                //If value exists…
                                return color(value);
                        } else {
                                //If value is undefined…
                                return "#ccc";
                        }
           })
	  })
});


