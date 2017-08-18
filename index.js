/**
 * 结构化文档 docStrucured
 *  {
 *    title,
 *    author,
 *    lang,
 *    cover,
 *    chpters: [
 *      {
 *        title,
 *        content
 *      }
 *    ]
 *  }
 */

const fse = require('fs-extra');
const path = require('path');

const config = require('./config');
const txt2html = require('./lib/txt2html');
const txt2opf = require('./lib/txt2opf');
const txt2ncx = require('./lib/txt2ncx');

function Translator(docS) {
 this.docS = docS || null;
};

Translator.prototype = {
  constructor: Translator,
  gen(docS) {
    if (!docS && !this.docS) {
      return console.log('[txt2mobi] 请提供结构化文档作为输入');
    } else {
      if (!docS) docS = this.docS;
    }
    // 建立工作文件夹
    let workDir = path.join(config.genDir, docS.title);
    fse.mkdirsSync(workDir);
    // 拷贝图像文件
    if (docS.cover) {
      fse.copySync(docS.cover, path.join(workDir, path.basename(docS.cover)));
    }
    docS.cover = path.basename(docS.cover);
    docS.publisher = 'Ping';
    docS.lang = docS.lang || 'zh-cn';
    // TODO 生成html/opf/ncx保存到文件夹
    txt2opf(path.join(workDir, 'book.opf'), docS);
    txt2ncx(path.join(workDir, 'book.ncx'), docS);
    txt2html(path.join(workDir, 'book.html'), docS);


    // TODO 调用kindlegen编译

  }
};

module.exports = Translator;
