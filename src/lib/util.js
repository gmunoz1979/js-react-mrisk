import React  from "react"; 
import Config from "./config";

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

function isDate(o) {
  return this.hasValue(o.year)       &&
         this.hasValue(o.month)      &&
         this.hasValue(o.dayOfMonth) &&
         this.hasValue(o.hourOfDay)  &&
         this.hasValue(o.minute)     &&
         this.hasValue(o.second);
}

function hasValue(o) {
  return o !== undefined && o !== null;
}

function isType(c, o) {
  if (c === o) {
    return true;
  }
  if (c === React.Component) {
    return false;
  }

  return this.isType(c.__proto__, o);
}

export default {
  findReact: findReact,
  isArray:   isArray,
  isDate:    isDate,
  hasValue:  hasValue,
  isType:    isType
}
