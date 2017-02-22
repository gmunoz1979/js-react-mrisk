function findReact(dom) {
  for (var key in dom) {
    if (key.startsWith("__reactInternalInstance$")) {
      const compInternals = dom[key]._currentElement;
      const compWrapper   = compInternals._owner;
      const comp          = compWrapper._instance;
      return comp;
    }
  }
  return null;
}

function isArray(o) {
  const types = 'Array Object String Date Function Boolean Number Null Undefined'.split(' ');

  const type = function() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }

  return types[0] === type.call(o);
}

export default {
  findReact: findReact,
  isArray:   isArray
}
