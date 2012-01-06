var vie = new VIE();

Backbone.sync = function(method, model, options) {
  console.log(method, model);
};

var filer = new Filer();
filer.init({
    persistent: false, 
    size: 1024 * 1024
  }, function(filesystem) {
    console.log("Filesystem is ready");
  }, function(e) {
    console.log(e);
  }
);

jQuery(document).ready(function() {
  jQuery('body').midgardCreate({
    vie: vie
  });
  jQuery('input[type="file"]').bind('change', function(event) {
    importFiles(event);
  });
});

var addFileToVIE = function(file) {
  var fs = vie.entities.get('filesystem');
  console.log(file);

  var reader = new FileReader();
  reader.onload = function(event) {
    fs.get('file').add({
      '@subject': file.fileName,
      'filename': file.fileName,
      'content': markdown.toHTML(event.target.result)
    });
  };
  reader.readAsText(file);
};

var importFile = function(file) {
  var parts = file.fileName.split('.');
  switch (parts[parts.length - 1]) {
    case 'md':
    case 'markdown':
      addFileToVIE(file);
      break;
    default:
      return;
  }
};

var importFiles = function(event) {
  var files = event.target.files;
  if (files.length === 0) {
    return;
  }
  Util.toArray(files).forEach(importFile);
};
