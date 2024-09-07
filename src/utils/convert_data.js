const fs = require("fs");

var content = "";

fs.readFile("./data.json", function (err, data) {
  if (err) throw err;
  content = data.toString();
  content = content.replace(/conjugation/g, "c");
  /*content = content.replace(/nameRu/g, "ru");
  content = content.replace(/nameRo/g, "ro");
  content = content.replace(/eu1/g, "7");
  content = content.replace(/tu1/g, "8");
  content = content.replace(/el1/g, "9");
  content = content.replace(/noi1/g, "10");
  content = content.replace(/voi1/g, "11");
  content = content.replace(/ei1/g, "12");*/
  content = content.replace(/participle/g, "p");
  content = content.replace(/\n/g, "");
  content = content.replace(/\r/g, "");
  content = content.replace(/,\s+"/g, ',"');
  content = content.replace(/{\s+"/g, '{"');
  content = content.replace(/"\s+}/g, '"}');
  content = content.replace(/:\s+"/g, ':"');
  content = content.replace(/:\s+{/g, ":{");
  content = content.replace(/:\s+\[/g, ":[");
  content = content.replace(/,\s+{/g, ",{");
  fs.writeFile("data_new.json", content, function (err) {
    if (err) throw err;
    console.log("It's saved!");
  });
});
