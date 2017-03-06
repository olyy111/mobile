;var css = function (){
		/**
	 * 设置（三个参数）或者(读取)元素的css样式值 可以设置元素的transform
	 * @param {Object} element 要修改样式的元素
	 * @param {Object} attr	修改元素的那个样式
	 * @param {Object} val 修改样式的目标值
	 */
	
	function css(element, attr , val){
		
		//如果传入的是transform 的属性名 调用cssTransform函数
		if(css.attr.indexOf(attr)>=0) {
			return cssTransform(element, attr, val);
		}
		
		//读取值
		if(arguments.length == 2){
			var val = getComputedStyle(element)[attr];
			
			if(attr=='opacity'){
				val = Math.round(val*100);
			}
			return parseFloat(val);
		} 
		
		//设置值
		if(attr == "opacity") {
			element.style.opacity= val/100;
		} else {
			element.style[attr]= val + "px";	
		}
	}
	
	//transform的样式名
	css.attr = ["scale", "scaleX","scaleY", "scaleZ",  "rotateX", "rotateY", "rotateZ", "rotate", "skewX", "skewY", "translateX", "translateY", "translateZ" ]
	
	/**
	 * 设置元素的transform样式
	 * @param {Object} element 对哪个元素进行设置
	 * @param {Object} attr	需要设置那个transform值
	 * @param {Object} val	目标值 不带单位
	 */
	function cssTransform(element, attr, val){
		if(!element.transform){
			element.transform = {};
		}
		
		//没有传入第三个参数，读取值
		if(typeof val === "undefined"){ 
			if(typeof element.transform[attr] === "undefined"){
				switch(attr){
					case "scale":
					case "scaleX":
					case "scaleY":
					case "scaleZ":
						element.transform[attr] = 100;
						break;
					default:
						element.transform[attr] = 0;	
				}
			} 
			
			//返回属性名对应的值
			return element.transform[attr]; 
		} else {
			
		//传入第三个参数，设置值
			element.transform[attr] = val;
			var transformVal  = "";
			
			for(var s in element.transform){
				switch(s){
					case "scale":
					case "scaleX":
					case "scaleY":
					case "scaleZ":
						transformVal += " " + s + "("+(element.transform[s]/100)+")";
						break;
					case "rotate":
					case "rotateX":
					case "rotateY":
					case "rotateZ":
					case "skewX":
					case "skewY":
						transformVal += " " + s + "("+element.transform[s]+"deg)";
						break;
					default:
						transformVal += " " + s + "("+element.transform[s]+"px)";				
				}
			}
			
			//设置
			element.style.WebkitTransform = element.style.transform = transformVal;
		}
	}
	return css;
}();
