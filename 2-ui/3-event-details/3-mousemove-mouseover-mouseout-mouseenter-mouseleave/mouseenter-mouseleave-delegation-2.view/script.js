// <td> sotto il mouse proprio adesso (ove previsto)
let currentElem = null;

table.onmouseover = function(event) {
  // prima di entrare su un nuovo elemento, il mouse abbandona quello precedente
  // se currentElem e' impostato, non abbiamo abbandonato il precedente <td>,
  // il mouse è ancora dentro, ignoriamo l'evento
  if (currentElem) return;

  let target = event.target.closest('td');

  // ci siamo spostati ma non dentro un td <td> - ignoriamo
  if (!target) return;

  // ci siamo spostati dentro un <td>, ma fuori dalla nostra tabella (possibile in casi di tabelle annidate)
  // ignoriamo
  if (!table.contains(target)) return;

  // evviva! siamo entrati dentro un nuovo <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // se adesso siamo fuori da qualunque <td>, ignoriamo l'evento
  // si tratta probabilemente di un movimento dentro la tabella, ma fuori dal <td>,
  // ad esempio da un <tr> a un altro <tr>
  if (!currentElem) return;

  // stiamo abbandonando l'elemento – verso dove? Forse un nodo discendente?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // risale la "catena" dei nodi genitori e controlla - se siamo ancora dentro currentElem
    // si tratta di uno spostamento interno - lo ignoriamo
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // abbiamo lasciato il <td>. per davvero.
  onLeave(currentElem);
  currentElem = null;
};

// qualsiasi funzione per gestire l'entrata e l'uscita da un elemento
function onEnter(elem) {
  elem.style.background = 'pink';

  // lo mostra nella textarea
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // lo mostra nella textarea
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
