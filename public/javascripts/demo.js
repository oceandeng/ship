/* 
* @Author: ocean
* @Date:   2015-09-15 11:06:02
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-15 18:37:54
*/

'use strict';

var arr = [1, 2, 3, 4, 5, 6, 7];
var sArr = ['one', 'two', 'three'];
var obj = {'one': 1, 'two': 2, 'thr': 3};
var dyadicArr = [[0, 1], [2, 3], [4, 5], [7, 6], [8, [9, 10]]];
var json = [{
	"year": "1918",
	"newsroom": "The New York Times",
	"reason": "For its public service in publishing in full so many official reports,documents and speeches by European statesmen relating to the progress and conduct of the war."
	},{
	"year": "1919",
	"newsroom": "The London Times",
	"reason": "For its public service in publishing in full so many official reports, documents and speeches by European statesmen relating to the progress and conduct of the war."
	},{
	"year": "1920",
	"newsroom": "The Beijing Times",
	"reason": "For its public service in publishing in full so many official reports, documents and speeches by European statesmen relating to the progress and conduct of the war."
	}
];
var stooges = [
	{
		name: 'moe',
		age: 40
	},
	{
		name: 'larry',
		age: 50
	},
	{
		name: 'curly',
		age: 60
	}
];
var decimalArr = [1.2, 2.1, 2.4];
var booleanArr = [false, 1, 2, true, null, undefined, 'string'];
var diffArr = [2, 5, 10];
var chaosArr = [1, 2, 1, 3, 1, 4, 2, 6, 1];

/************************************************************
*	集合函数（数组或对象）
*************************************************************/
// each 遍历list每个选项，并为其执行回调函数 like foreach 没有返回值
	// _.each(arr, function(num){
	// 	var result = num + 1;
	// 	console.log(result);
	// });

// map 为list每项执行回调函数，返回执行完的list
	// var result = _.map(arr, function(num){
	// 	return num + 2;
	// });
	// var result = _.map(obj, function(num, key){
	// 	return num + 2;
	// });
	// var result = _.map(dyadicArr, _.first);

// reduce 
	/*
		_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl 
		别名为 inject 和 foldl, reduce方法把list中元素归结为一个单独的数值。
		Memo是reduce函数的初始值，reduce的每一步都需要由iteratee返回。
		这个迭代传递4个参数：memo,value 和 迭代的index（或者 key）和最后一个引用的整个 list。

		如果没有memo传递给reduce的初始调用，iteratee不会被列表中的第一个元素调用。第一个元素将取代 传递给列表中下一个元素调用iteratee的memo参数。
	*/

	// var result = _.reduce(arr, function(memo, num){
	// 	return memo + num;
	// }, 0);

// reduceRight
	// var result = _.reduceRight(dyadicArr, function(a, b){
	// 	return a.concat(b)
	// }, []);

// find 返回第一个符合回调函数的值
	// var num = _.find(arr, function(num){
	// 	return num%2 == 0;
	// });

// filter 返回所有符合条件的值
	// var num = _.filter(arr, function(num){
	// 	return num%2 ==0;
	// });

// where _.where(list, properties) 返回查询 list 中匹配properties的项
	// var listofplays = [
	// 	{title: "Cymbeline", author: "Shakespeare", year: 1611},
 //    	{title: "The Tempest", author: "Shakespeare", year: 1611},
 //    	{title: "The custom", author: "Shakespeare", year: 2015},
 //    ];

	// var result = _.where(listofplays, {
	// 	 author: "Shakespeare",
	// 	 year: 1611
	// });

// findWhere 遍历json对象， 返回第一个符合条件的值
	// var result = _.findWhere(json, {"newsroom": "The New York Times"});

// reject 为list中每项执行回调函数，返回相反的值，与filter相反
	// var result = _.reject(arr, function(num){
	// 	return num%2 == 0;
	// });

// every list每项执行回调函数都返回true，则返回true
	// var booleanArr = [true, 1, 'string', undefined];
	// var result = _.every(booleanArr, _.identity);

// some list每一项执行回调函数，其中有一项返回true，则返回true
	// var booleanArr = [false, 0, null, undefined];
	// var result = _.some(booleanArr, _.identity);

// contains _.contains(list, value, [fromIndex])  list中如果包含value 则返回true
	// var result = _.contains(arr, 3);

// invoke 
// 在list的每个元素上执行methodName方法。任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。返回执行过后的值
	// var result = _.invoke(dyadicArr, 'sort');

// pluck 取得对象中指点的属性的值， 返回一个数组
	// var result = _.pluck(stooges, 'name');

// max _.max(list, iterate)返回list中的最大值。如果传递iteratee(迭代)参数，iteratee将作为list中每个值的排序依据
	// var result = _.max(stooges, function(stooge){
	// 	return stooge.age;
	// });

// min _.min(list, iterate) 返回list中的最大值。如果传递iteratee(迭代)参数，iteratee将作为list中每个值的排序依据
	// var result = _.min(stooges, function(stooge){
	// 	return stooge.age;
	// });

// sortBy 排序
	// var result = _.sortBy(arr, function(num){
	// 	console.log(Math.sin(num));
	// 	return Math.sin(num);
	// });

	// var result = _.sortBy(stooges, 'name');

// groupBy 按ierrate返回值分组，或者按传入的字符串
	// var result = _.groupBy(decimalArr, function(num){
	// 	return Math.floor(num);
	// });
	// var result = _.groupBy(sArr, 'length');

// indexBy
	// var result = _.indexBy(stooges, function(stooge){
	// 	return stooge.age;
	// })

// countBy
	// var result = _.countBy(arr, function(num){
	// 	return num%2 == 0 ? 'even' : 'odd';
	// });

// shuffle 随机洗牌
	// var result = _.shuffle(sArr);

// sample _.sample(list, [n]) 随机抽取 n 个元素，默认 n = 1;
	// var result = _.sample(arr, 3);

// toArray _.toArray(list) 把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。
	// var result;
	// (function(){
	// 	result = _.toArray(arguments).slice(0);
	// })(1, 2, 3, 4);

// size _.size(list) 返回 list 长度
	// var result = _.size(arr);

// partition 将一个数组按iterate拆分，第一个是符合iterate条件的，第二个是不符合的
	// function isOdd(num){
	// 	return num%2 != 0;
	// }
	// var result = _.partition(arr, isOdd);


/************************************************************
*	数组函数（Array Functions）
*************************************************************/

// first _.first(arr, [n])返回array（数组）的第一个元素。传递 n参数将返回数组中从第一个元素开始到n个元素
	// var result = _.first(arr, 3);

// initial _.initial(arr, [n]) 返回除了数组中最后一个元素其他所有的元素
	// var result = _.initial(arr, 3);

// last _.last(arr, [n]) 返回list的最后一个元素，传递n参数将返回数组中从最后一个到n个元素
	// var result = _.last(arr, 3);

// rest _.rest(arr, [n]) 返回除了数组中第一个元素其他所有元素
	// var result = _.rest(arr, 3);

// compact 返回一个除去所有false值的 array副本。 在javascript中, false, null, 0, "", undefined 和 NaN 都是false值.
	// var result = _.compact(booleanArr);

// flatten _.flatten(arr, [shallow]) 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。
	// var result = _.flatten(dyadicArr, true);

// without _.without(array, *value)
// 返回一个删除所有values值后的array副本。（愚人码头注：使用===表达式做相等测试。）
	// var result = _.without(arr, 0, 1);

// union_.union(*arrays)
// 返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays（数组）。
	// var result = _.union(arr, dyadicArr);

// intersection 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。
	// var result = _.intersection(arr, _.flatten(dyadicArr));

// difference _.difference(array, diffarray) 类似于without，但返回的值来自array参数数组，并且不存在于other 数组.
	// var result = _.difference(arr, diffArr);

// uniq _.uniq(array, [isSorted], [iteratee]) Alias: unique
// 返回 array去重后的副本, 使用 === 做相等测试. 如果您确定 array 已经排序, 那么给 isSorted 参数传递 true值, 此函数将运行的更快的算法. 如果要处理对象元素, 传递 iteratee函数来获取要对比的属性.
	// var result = _.uniq(chaosArr);

// zip _.zip(*arrays)
// 将每个arrays中相应位置的值合并在一起。在合并分开保存的数据时很有用. 如果你用来处理矩阵嵌套数组时, _.zip.apply 可以做类似的效果。
	// var result = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);

// unzip_.unzip(*arrays) 
// 与zip功能相反的函数，给定若干arrays，返回一串联的新数组，其第一元素个包含所有的输入数组的第一元素，其第二包含了所有的第二元素，依此类推。通过apply用于传递数组的数组。 （感谢 @周文彬1986、 @未定的终点 指出示例错误）
	// var result = _.unzip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]]);

// object _.object(list, 'values') 将数组转换为对象。传递任何一个单独[key, value]对的列表，或者一个键的列表和一个值得列表。 如果存在重复键，最后一个值将被返回。
	// var result = _.object(arr, chaosArr);

// indexOf_.indexOf(array, value, [isSorted]) 
// 返回value在该 array 中的索引值，如果value不存在 array中就返回-1。使用原生的indexOf 函数，除非它失效。如果您正在使用一个大数组，你知道数组已经排序，传递true给isSorted将更快的用二进制搜索..,或者，传递一个数字作为第三个参数，为了在给定的索引的数组中寻找第一个匹配值。
	// var result = _.indexOf(chaosArr, 1, 5);

// lastIndexOf_.lastIndexOf(array, value, [fromIndex]) 
// 返回value在该 array 中的从最后开始的索引值，如果value不存在 array中就返回-1。如果支持原生的lastIndexOf，将使用原生的lastIndexOf函数。传递fromIndex将从你给定的索性值开始搜索。
	// var result = _.lastIndexOf(chaosArr, 1, 6);

// sortedIndex  _.sortedIndex(list, value, [iteratee], [context]) 
// 使用二分查找确定value在list中的位置序号，value按此序号插入能保持list原有的排序。如果提供iterator函数，iterator将作为list排序的依据，包括你传递的value 。iterator也可以是字符串的属性名用来排序(比如length)。
	// var result = _.sortedIndex(arr, 5);
	// var result = _.sortedIndex(stooges, {
	// 	name: 'ocean',
	// 	age: 35
	// }, 'age')

// range _.range([start], stop, [step]) start 默认 0，step 默认 1
	// var result = _.range(100);

/************************************************************
*	与函数有关的函数（Function (uh, ahem) Functions）
*************************************************************/
// bind_.bind(function, object, *arguments) 
	// 绑定函数 function 到对象 object 上, 也就是无论何时调用函数, 函数里的 this 都指向这个 object.任意可选参数 arguments 可以传递给函数 function , 可以填充函数所需要的参数,这也被称为 partial application。对于没有结合上下文的partial application绑定，请使用partial。 
	// (愚人码头注：partial application翻译成“部分应用”或者“偏函数应用”。partial application可以被描述为一个函数，它接受一定数目的参数，绑定值到一个或多个这些参数，并返回一个新的函数，这个返回函数只接受剩余未绑定值的参数。参见：http://en.wikipedia.org/wiki/Partial_application。感谢@一任风月忆秋年的建议)。

	var func = function(greeting){
		return greeting + ': ' + this.name
	};

	func = _.bind(func, {name: 'moe'}, 'hi');
	console.log(func());

	// console.log(result);