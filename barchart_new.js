var type = $("#type").val();
barChart(type);
$("#type").change(function(){
    type = $("#type").val();
    $("svg").remove();
    barChart(type);
});


function barChart(type){
    alert(type);
    if(type === ""){
        return;
    }
    var margin = {top:70,right :20,bottom:30,left:40},
        w = 1500-margin.left-margin.right,
        h = 500-margin.top-margin.bottom;

    var color = d3.scale.category10();

    var x = d3.scale.ordinal()
            .rangeRoundBands([0,w],.1);

    var y = d3.scale.linear()
            .range([h,0]);

    //var formatPercent = d3.format(".0%");

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);

    var yGrid = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-w,0,0)
            .tickFormat("");

    var svg = d3.select("body").append("svg")
            .attr("width",w+margin.left+margin.right)
            .attr("height",h+margin.top+margin.bottom)
            .append("g")
            .attr("transform","translate("+margin.left+","+margin.top+")");

    d3.csv("hw1_q2.csv",function(error,data){

        x.domain(data.map(function(d){return d.state;}));
        if(type === "HSGOM"){
            y.domain([0,d3.max(data,function(d){return d.HSGOM;})]);
        }else if(type === "BDOM"){
            y.domain([0,d3.max(data,function(d){return d.BDOM;})]);
        }else{
            y.domain([0,d3.max(data,function(d){return d.ADOM;})]);
        }


        svg.append("g")
                .attr("class","x axis")
                .attr("transform","translate(0,"+h+")")
                .call(xAxis);

        svg.append("g")
                .attr("class","y axis")
                .call(yAxis);

        svg.append("g")
                .attr("class","grid")
                .call(yGrid);

        var labels = svg.append("g")
                .attr("class","labels");

        labels.append("text")
                .attr("transform","rotate(-90)")
                .attr("y",6)
                .attr("dy",".71em")
                .style("text-anchor","end")
                .text("Percentage [%]");

        var title = svg.append("g")
                .attr("class","title");
        
        title.append("text")
                .attr("x",(w/2))
                .attr("y",-30)
                .attr("text-anchor","middle")
                .style("font-size","22px")
                .text("HOMEWORK1_QUESTION2_"+type);
		
        if(type === "HSGOM"){
            svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("class","bar")
                .attr("x",function(d) {return x(d.state);})
                .attr("width", x.rangeBand())
                .attr("y",function(d){return y(d.HSGOM);	})
                .attr("height",function(d){return h-y(d.HSGOM);})
                .attr("fill",function(d) {return color(d.country);})
		.on("mouseover", function(d) {
		    	d3.select(this).attr("fill", "orange");
					
			//Get this bar's x/y values, then augment for the tooltip
		    	var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand() / 2;
		    	var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

			//Update the tooltip position and value
			d3.select("#tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px")						
			.select("#value")
			.text(d.HSGOM);
			   
			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);
	    	})
		.on("mouseout", function() {
		    	d3.select(this)
			.transition()
			.duration(250)
			.attr("fill",function(d) {return color(d.country);});
					
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);		
		});
        }else if(type === "BDOM"){
            svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("class","bar")
                .attr("x",function(d) {return x(d.state);})
                .attr("width", x.rangeBand())
                .attr("y",function(d){return y(d.BDOM);	})
                .attr("height",function(d){return h-y(d.BDOM);})
                .attr("fill",function(d) {return color(d.country);})
	    	.on("mouseover", function(d) {
		    	d3.select(this).attr("fill", "orange");
					
			//Get this bar's x/y values, then augment for the tooltip
		    	var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand() / 2;
		    	var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

			//Update the tooltip position and value
			d3.select("#tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px")						
			.select("#value")
			.text(d.HSGOM);
			   
			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);
	    	})
		.on("mouseout", function() {
		    	d3.select(this)
			.transition()
			.duration(250)
			.attr("fill",function(d) {return color(d.country);});
					
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);		
		});
        }else{
            svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("class","bar")
                .attr("x",function(d) {return x(d.state);})
                .attr("width", x.rangeBand())
                .attr("y",function(d){return y(d.ADOM);	})
                .attr("height",function(d){return h-y(d.ADOM);})
                .attr("fill",function(d) {return color(d.country);})
	    	.on("mouseover", function(d) {
		    	d3.select(this).attr("fill", "orange");
					
			//Get this bar's x/y values, then augment for the tooltip
		    	var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand() / 2;
		    	var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

			//Update the tooltip position and value
			d3.select("#tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px")						
			.select("#value")
			.text(d.HSGOM);
			   
			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);
	    	})
		.on("mouseout", function() {
		    	d3.select(this)
			.transition()
			.duration(250)
			.attr("fill",function(d) {return color(d.country);});
					
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);		
		});
        }
    });
}		
