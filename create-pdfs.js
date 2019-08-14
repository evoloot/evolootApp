/* 
* Kino R
* Takes documentation from docs folder written in MD format and
* converts it to pdf format.
*/
const markdownpdf = require("markdown-pdf");
const fs = require("fs");
const path = require("path");
const documentationFolder = path.join(__dirname, "documentation");
console.log(documentationFolder);

/* 
* Reads documentationn directory.
* Change markdown files to pdf format for non-developers.
* Shows completion of file translation.
*/
fs.readdir(documentationFolder, (err, files) => {
  files.filter((file) => /.md/ig.test(file))
  .forEach(file => {
    const mdFile = path.join(documentationFolder, file);
    markdownpdf().from(mdFile).to(mdFile.replace(".md", ".pdf"), () => {
      console.log("Completed translation: ", mdFile.replace(".md", ".pdf"))
    });
  })
});