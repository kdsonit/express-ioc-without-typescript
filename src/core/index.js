function decorate(decorators, target, key, desc) {
  const c = arguments.length;
  let r =
    c < 3
      ? target
      : desc === null
      ? (desc = Object.getOwnPropertyDescriptor(target, key))
      : desc;
  r = Reflect.decorate(decorators, target, key, desc);

  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function metadata(k, v) {
  return Reflect.metadata(k, v);
}

function param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}

module.exports = {
  decorate,
  metadata,
  param,
};
