
var w = 1000;
var h = 1000;

var projection = d3.geo.albersUsa()
					.translate([w/2, h/2])
					.scale([500]) //default scale is 1000


var path = d3.geo.path().projection(projection);


var color = d3.scale.quantize()
                    .range(["rgb(237,248,233)", "rgb(186,228,179)",
                     "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"]);

d3.csv("citytest.csv", function(data) {
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
	   .attr("d",path)
	   .style("fill",function(d) { 

	   			var value = d.properties.value;
	   			if (value) {
	   				return color(value)
	   			}
	   			else {
	   				return #ccc;
	   			}


	   	})

	})

});


