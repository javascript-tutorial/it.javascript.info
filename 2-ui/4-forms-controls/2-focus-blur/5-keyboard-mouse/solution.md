
Possiamo usare `mouse.onclick` per gestire il click e rendere il mouse "spostabile" con `position:fixed`, quindi `mouse.onkeydown` per gestire i tasti freccia.

L'unica trappola è che `keydown` viene scaturito solo su elementi con il focus. Quindi dovremmo aggiungere `tabindex`  all'elemento. Visto che ci è vietato modificare l'HTML, possiamo usare la proprietà `mouse.tabIndex` allo scopo.

P.S.: Possiamo sostituire `mouse.onclick` con `mouse.onfocus`.
