aa/* 
* @Author: ocean
* @Date:   2015-11-02 13:48:04
* @Last Modified by:   ocean
* @Last Modified time: 2015-11-06 13:28:43
*/

'use strict';

/**********************************************
// - d3选择器
**********************************************/
d3.select("body").style("color", "red").transition().style("color", "green");

function helloworld(){
	d3.select("h2").html('hello world!!!');
}

helloworld();


/**********************************************
// - 添加SVG画布
**********************************************/

var sWidth = 400;
var sHeight = 400;

var svg = d3.select('body').append('svg').attr('width', sWidth).attr('height', sHeight);

/**********************************************
// - 做一个简单的图表！
**********************************************/

// var dataset = [250, 210, 170, 130, 90]; //数据（表示矩形的宽度）
// var rectHeight = 25; //每个矩形所占的像素高度（包括空白）

// var rect = svg.selectAll("rect").data(dataset).enter().append("rect");

// rect.attr("x", 20).attr("y", function(d, i){
// 	return i * rectHeight;
// }).attr("width", function(d){
// 	return d;
// }).attr("height", rectHeight - 2).attr("fill", "steelblue");

/**********************************************
// - 比例尺（scale）！
**********************************************/

// d3.scale.linear(); //线性比例尺；

// var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];

// var min = d3.min(dataset);
// var max = d3.max(dataset);

// // var linear = d3.scale.linear().domain([min, max]).range([0, 300]);
// var linear = d3.scale.linear().domain([0, max]).range([0, 250]);
// var axis = d3.svg.axis().scale(linear).orient('bottom').ticks(7);

// var rectHeight = 25;

// var rect = svg.selectAll("rect").data(dataset).enter().append('rect');

// rect.attr("x", 20).attr("y", function(d, i){
// 	return i * rectHeight;
// }).attr("width", function(d){
// 	return linear(d);
// }).attr("height", rectHeight - 2).attr("fill", "steelblue");

// svg.append("g").attr("class","axis").attr("transform","translate(20,130)").call(axis);


/**********************************************
// - 完整的柱形图
**********************************************/

//画布周边的空白
var padding = {top: 20, right: 30, bottom: 20, left: 30};

//定义一个数组
var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

//x轴的比例尺
var xScale = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([0, sWidth - padding.left - padding.right]);
 
//y轴的比例尺
var yScale = d3.scale.linear().domain([0, d3.max(dataset)]).range([sHeight - padding.top - padding.bottom, 0]);

//定义x轴
var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

//定义y轴
var yAxis = d3.svg.axis().scale(yScale).orient('left');

//矩形之间的空白
var rectPadding = 4;

//添加矩形元素
var rects = svg.selectAll('.MyRect')
			.data(dataset)
			.enter()
			.append('rect');
	rects.attr('class', 'MyRect');
	rects.attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');
	rects.attr('x', function(d, i){
		return xScale(i) + rectPadding / 2;
	});
	rects.attr('y', function(d){
		return yScale(d);
	});
	rects.attr('width', xScale.rangeBand() - rectPadding);
	rects.attr('height', function(d){
		return sHeight - padding.top - padding.bottom - yScale(d);
	});

//添加文字元素
var texts = svg.selectAll('.MyText').data(dataset).enter().append('text');

	texts.attr('class', 'MyText');
	texts.attr('transform', 'translate(' + padding.left + ',' + padding.top + ')');
	texts.attr('x', function(d, i){
		return xScale(i) + rectPadding / 2;
	});
	texts.attr('y', function(d){
		return yScale(d);
	});
	texts.attr('dx', function(){
		return (xScale.rangeBand() - rectPadding) / 2;
	})
	texts.attr('dy', function(d){
		return 20;
	});
	texts.text(function(d){
		return d;
	});

//添加x轴
svg.append('g').attr('class', 'axis').attr('transform', 'translate(' + padding.left + ',' + (sHeight - padding.bottom) + ')').call(xAxis);

//添加y轴
svg.append('g').attr('class', 'axis').attr('transform', 'translate(' + padding.left + ',' + padding.top + ')').call(yAxis);


function foo(somthing){
	console.log(this.a, somthing);
}
function bind(fn, obj){
	return function(){
		return fn.apply(obj, arguments);
	}
}

var obj = {
	a: 2
}
var bar = bind(foo, obj);
var b = bar(3); // 2, 3

