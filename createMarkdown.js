var filer = new Filer();
filer.init({
    persistent: false, 
    size: 1024 * 1024
  }, function(filesystem) {
    console.log("Opened", filesystem.name);

    filer.ls('/', function(entries) {
      console.log(entries);
    });
  }, function(e) {
    console.log(e);
  }
);
