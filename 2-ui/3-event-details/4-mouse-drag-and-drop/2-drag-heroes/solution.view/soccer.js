let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // all'inizio del trascinamento:
  //   memorizza lo spostamento iniziale
  //   sposta l'elemento con position:fixed come diretto figlio del body
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // cambia su coordinate absolute alla fine, per fissare l'elemento nel docuemnto
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // nuove coordinate relative alla window
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // controlla se le nuove coordinate sono sotto il bordo della finestra
    let newBottom = newY + dragElement.offsetHeight; // nuovo bottom

    // sotto la finestra? scrolliamo la pagina
    if (newBottom > document.documentElement.clientHeight) {
      // coordinate relative alla window della fine del documento
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // lo scrolling del documento giù di 10px porta il problema che
      // può scrollare oltre la fine del document
      // Math.min(quanto a sinistra dall fine, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // i calcoli sono imprecisi, perché potrebbero esserci errori di arrotondamento che portano a scollare in su
      // la cui cosa dovrebbe essere impossibile, e quindi lo aggiustiamo
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // un movimento rapido del mouse porta il cursore oltre la fine del documento
      // se succede
      // limitiamo la nuova Y al massimo possibile (giusto poco sopra il documento)
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // controlla se le nuove coordinate sono sopra i bordi superiori (logica simile)
    if (newY < 0) {
      // scrolla in alto
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // controlla la precisione degli errori

      window.scrollBy(0, -scrollY);
      // un movimento rapido del mouse porta il cursore oltre l'inizio del documento
      newY = Math.max(newY, 0); // newY non dovrebbe essere meno di 0
    }


    // limita la nuova X all'interno dei limiti della finestra
    // qui non abbiamo scrolling quindi è semplice
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});
