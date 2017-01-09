let config = {
  Url:        document.location.href,
  Context:    "",
  Handler:    "Services",
  Namespaces: [],
  setValue: function(key, value) {
    this[key] = value;
  }
}

export default config;
