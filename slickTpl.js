//DATA FOR TEMPLATE
String.prototype.slickTpl = function(data){
	
    //PARSE JSON IF NEEDED
    if(typeof data == 'string'){
      	try{ data = JSON.parse(data); } catch {
        	try {
            	var tmpData = JSON.parse(this.valueOf());
                return data.slickTpl(tmpData);
            } catch {
            	throw new Error("Invalid data provided. The data must be either an object or a json string");
            }
        }
    }
    
    //MAKE SURE THE DATA IS AN OBJECT OR ARRAY
    if(typeof data != 'object') throw new Error("Invalid data provided. The data must be either an object, an array of objects or a json string");
    
    //IF THE DATA IS AN ARRAY THEN LOOP THROUGH THE ARRAY AND BUILD THE TEMPLATE FOR EACH
    if(Array.isArray(data)){
      	var res = "";
      	var templateString = this.valueOf();
      	data.forEach(item => { res += item.slickTpl(templateString) });
    	return res;
    }
    
    //PARSE THE TEMPLATE AND POPULATE THE VALUES
    return this.replace(/\{([\w\.]*)\}/g, (str, key) => {
        var keys = key.split("."), v = data[keys.shift()];
        for(var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    })
};

//TEMPLATE FOR ARRAY
Array.prototype.slickTpl = function(template){
  if(typeof template != 'string') throw new Error("Invalid template. The template must be a string");
  var res = [];
  this.forEach((ele, index) => { res[index] = template.slickTpl(ele); });
  return res;
};

//TEMPLATE FOR OBJECT
Object.prototype.slickTpl = function(template){
  if(typeof template != 'string') throw new Error("Invalid template. The template must be a string");
  return template.slickTpl(this);
};
