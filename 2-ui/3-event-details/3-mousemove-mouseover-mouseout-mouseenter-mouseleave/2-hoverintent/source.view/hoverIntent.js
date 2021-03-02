'use strict';

// Ecco una bozza
// con le cose di cui avrete bisogno comunque
class HoverIntent {

  constructor({
    sensitivity = 0.1, // una velocità inferiore a 0.1px/ms indica "hovering su un elemento"
    interval = 100, // misura la velocita' del mouse ogni 100ms
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // si assicura che "this" sia l'oggetto nei gestori evento.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // assegna i gestori
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // continua da questo punto

  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }


  destroy() {
    /* il tuo codice per "disattivare" la funzionalità, che rimuove tutti i gestori  */
    /* è necesario per fare funzionare i test */
  }

}
