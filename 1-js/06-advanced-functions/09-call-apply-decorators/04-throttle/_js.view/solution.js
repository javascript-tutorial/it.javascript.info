function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // memorizza gli ultimi argomenti per la chiamata dopo il cooldown
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // altrimenti imposta stato di cooldown
    func.apply(this, arguments);

    isThrottled = true;

    // pianifica il reset isThrottled dopo il ritardo
    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        // se ci sono state chiamate, savedThis/savedArgs ha l'ultima
        // la chiamata ricorsiva esegue la funzione e reimposta il cooldown
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}