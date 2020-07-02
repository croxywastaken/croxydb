const fs = require("fs");

module.exports.set = function (path, value, obj) {
    var schema = obj;
    var pList = path.split(".");
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[parseInt(i)];
        if( typeof schema[elem] !== "object" ) {
          schema[elem] = {};
        }
        schema = schema[elem];
    }
    schema[pList[parseInt(len-1)]] = value
};

Object.prototype.find = function() {
    try {
      return Array.prototype.slice.call(arguments).reduce(function(acc, key) {
        return acc[key];
      }, this);
    } catch(e) {
      return ;
    }
};

module.exports.delete = function(obj, path) {

    if (!obj || !path) {
      return;
    }
  
    if (typeof path === "string") {
      path = path.split(".");
    }
  
    for (var i = 0; i < path.length - 1; i++) {
  
      obj = obj[path[parseInt(i)]];
  
      if (typeof obj === "undefined") {
        return;
      }
    }
  
    delete obj[path.pop()];
};

module.exports.fetchFiles = function(dbFolder, dbName) {

    if (!fs.existsSync(dbFolder)){

        fs.mkdirSync(dbFolder);
        if(!fs.existsSync(`${dbFolder}/${dbName}.json`)) {
            fs.writeFileSync(`${dbFolder}/${dbName}.json`, "{}");
            return;
        }

    } else {
        if(!fs.existsSync(`${dbFolder}/${dbName}.json`)) {
            fs.writeFileSync(`${dbFolder}/${dbName}.json`, "{}");
        }

    }

};

module.exports.removeEmptyData = function (obj) {

  var remove = function(obj) {
    Object.keys(obj).forEach(function(key) {
      if (obj[key] && typeof obj[key] === "object") { 
        remove(obj[key]);
      } else if (obj[key] === null || obj[key]=== "") { 
        delete obj[key];
      }
      if (typeof obj[key] === "object" && Object.keys(obj[key]).length === 0) {
       delete obj[key];
      }
    });
  };

  Object.keys(obj).forEach(function(key) {
    if (obj[key] && typeof obj[key] === "object") {
      remove(obj[key]);
    } else if (obj[key] === null || obj[key]=== "") {
      delete obj[key];
    }
    if (typeof obj[key] === "object" && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  });

};
