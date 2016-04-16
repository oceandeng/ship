var Tools = function(){};

Tools.delHtmlTag = function(str){
	return str.replace(/<[^<]*>/g, "");
	return str.replace(/<[^<]+>/gi, "");
}

module.exports = Tools;