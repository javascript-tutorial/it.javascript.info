First, let's make HTML/CSS.

Each component of the time would look great in its own `<span>`:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Also we'll need CSS to color them.

The `update` function will refresh the clock, to be called by `setInterval` every second:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

In the line `(*)` we every time check the current date. The calls to `setInterval` are not reliable: they may happen with delays.

The clock-managing functions:

```js
let timerId;

function clockStart() { // run the clock  
  if (!timerId) { // only set a new interval if the clock is not running
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Nota che la chiamata a `update()` non è programmata solo in `clockStart()`, ma immediatamente dopo l'esecuzione della linea `(*)`. Altrimenti il visitatore dovrebbe aspettare fino alla prima esecuzione di `setInterval`. E l'orologio sarebbe vuoto fino ad allora. 

E' altresì importante impostare il nuovo intervallo in `clockStart()` solo quando l'orologio non sta andando. Altrimenti cliccare il bottone start svariate volte imposterebbe multipli intervali concorrenti. Ancora peggio: terremmo solo il `timerID` dell'ultimo intervallo, perdendo la referenza a tutti gli altri. Così non potremmo più fermare l'orologio! Nota che dobbiamo rimuovere il `timerID` quando l'orologio viene fermato alla linea `(**)`, in modo da permettergi di ricominciare eseguendo `clockStart()`.