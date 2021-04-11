function spy(func) {

  function wrapper(...args) {
    // usiamo ...args invece di arguments per memorizzare un vero array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
