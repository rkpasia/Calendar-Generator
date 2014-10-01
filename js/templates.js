var view = {
  title: "Joe"
};

var output = Mustache.to_html("{{ title }}", view);
//$('body').html(output);