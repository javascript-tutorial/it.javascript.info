La soluzione viene divisa in due parti distinte.

1. Inglobare ogni nodo rapopresentante il titolo dentro uno `<span>` e su questo elemento modificare gli i CSS per l'`:hover`; gestire i click esattamente sul testo, dato che la larghezza dello `<span>` è esattamente la larghezza del testo (unlike without it).
2. Impostare un gestore sul nodo radice dell'`albero` e gestire i click su questi titoli `<span>`.
