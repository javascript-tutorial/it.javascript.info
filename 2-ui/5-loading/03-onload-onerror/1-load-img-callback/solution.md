
L'algoritmo:
1. Fare un `img` per ogni sorgente.
2. Aggiungere `onload/onerror` ad ogni immagine.
3. Incrementa il contatore quando si aziona `onload` o `onerror`.
4. Quando il valore del contatore è uguale al numero delle sorgenti abbiamo finito: `callback()`.
