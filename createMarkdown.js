var vie = new VIE();

var entries = {};

Backbone.sync = function(method, model, options) {
  if (method === 'update') {
    var fileEntry = entries[model.getSubjectUri()];
    filer.write(fileEntry, toMarkdown(model.get('content')), function(fileEntry, fileWriter) {
      console.log(toMarkdown(model.get('content')));
      options.success(model);
    }, function(error) {
      console.log(error);
      options.error(model);
    });
  }
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

var addFileToVIE = function(file, fileEntry) {
  var fs = vie.entities.get('filesystem');

  entries[file.webkitRelativePath] = fileEntry

  var reader = new FileReader();
  reader.onload = function(event) {
    fs.get('file').add({
      '@subject': file.webkitRelativePath,
      'filename': file.fileName,
      'content': markdown.toHTML(event.target.result),
    });
  };
  reader.readAsText(file);
};

var isMarkdown = function(fileName) {
  var parts = fileName.split('.');
  switch (parts[parts.length - 1]) {
    case 'md':
    case 'markdown':
      return true;
      break;
  }
  return false;
};

var importFile = function(file) {
  if (!isMarkdown(file.fileName)) {
    return;
  }
  filer.write(file.fileName, {
      data: file, 
      type: file.type
    },
    function(fileEntry, fileWriter) {
      addFileToVIE(file, fileEntry);
    }
  );
};

var importFiles = function(event) {
  var files = event.target.files;
  if (files.length === 0) {
    return;
  }
  Util.toArray(files).forEach(importFile);
};
