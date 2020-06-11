var Handlebars = require('handlebars');
var fs = require('fs');
var Q = require('q');
var path = require('path');

var getTemplate = function (templateName) {
  var d = Q.defer();
  fs.readFile(path.join(__dirname, '..', 'templates', templateName + '.hbs'), 'utf8', function (error, result) {
    if (error) return d.reject(error);
    return d.resolve(result);
  });
  return d.promise;
};

var render = function (templateName, data) {
  return getTemplate(templateName).then(function (template) {
    return Handlebars.compile(template)(data);
  }).catch(function (err) {
    throw err;
  });
};

module.exports = render;
