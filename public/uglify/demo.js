"use strict";var arr=[1,2,3,4,5,6,7],sArr=["one","two","three"],obj={one:1,two:2,thr:3},dyadicArr=[[0,1],[2,3],[4,5],[7,6],[8,[9,10]]],json=[{year:"1918",newsroom:"The New York Times",reason:"For its public service in publishing in full so many official reports,documents and speeches by European statesmen relating to the progress and conduct of the war."},{year:"1919",newsroom:"The London Times",reason:"For its public service in publishing in full so many official reports, documents and speeches by European statesmen relating to the progress and conduct of the war."},{year:"1920",newsroom:"The Beijing Times",reason:"For its public service in publishing in full so many official reports, documents and speeches by European statesmen relating to the progress and conduct of the war."}],stooges=[{name:"moe",age:40},{name:"larry",age:50},{name:"curly",age:60}],decimalArr=[1.2,2.1,2.4],booleanArr=[!1,1,2,!0,null,void 0,"string"],diffArr=[2,5,10],chaosArr=[1,2,1,3,1,4,2,6,1],func=function(a){return a+": "+this.name};func=_.bind(func,{name:"moe"},"hi"),console.log(func());var random=_.random(0,100);console.log(random);var cache={};$.data(cache,"key","value"),$.data(cache,"aa","bb"),console.log($.data(cache,"key")),console.log($.data(cache,"aa")),console.log(cache),$("#password").keyup(function(a){var b=new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$","g"),c=new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g"),d=new RegExp("(?=.{6,}).*","g"),e=$("#passstrength");return 0==d.test($(this).val())?e.html("More Characters"):b.test($(this).val())?(e.className="ok",e.html("Strong!")):c.test($(this).val())?(e.className="alert",e.html("Medium!")):(e.className="error",e.html("Weak!")),!0});