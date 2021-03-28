Differenze:

1. `clientWidth` è un valore numerico, `getComputedStyle(elem).width` invece restituisce una stringa con `px` alla fine.
2. `getComputedStyle` può restituire una larghezza non numerica come `"auto"` per un elemento inline.
3. `clientWidth` è l'area del contenuto interna di un elemento più i padding, mentre la proprietà width dei CSS (con il valore predefinito di `box-sizing`) è l'area del contenuto interna *senza i padding*.
4. Se c'è una barra di scorrimento ed il browser le riserva uno spazio, alcuni browser sottraggono quello spazio dalla larghezza impostata tramite CSS (perché non è più disponibile per i contenuti), e altri invece no. La proprietà `clientWidth` è sempre la stessa: se la barra di scorrimento ha uno spazio riservato viene sottratto all'area del contenuto.
