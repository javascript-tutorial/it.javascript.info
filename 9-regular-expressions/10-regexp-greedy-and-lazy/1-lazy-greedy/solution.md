
Il risultato è: `match:123 4`.

Inizialmente il quantificatore lazy `pattern:\d+?` prova a prendere il minor numero di cifre, ma deve raggiungere lo spazio, perciò include `match:123`.

Il secondo `\d+?` prende una cifra soltanto perché è sufficiente.
