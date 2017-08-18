
const ejs = require('ejs');
const fse = require('fs-extra');

module.exports = function(path, docS) {
  let template = fse.readFileSync('./templates/opf.ejs','utf-8');
  let dist = ejs.render(template, docS);
  fse.writeFileSync(path, dist);
};