importance: 5

---

# Posizionate la nota all'interno (position:absolute)

Estendete l'esercizio precedente <info:task/position-at-absolute>: fate in modo che la funzione `positionAt(anchor, position, elem)` inserisca `elem` all'interno di `anchor`.

Nuovi valori per `position`:

- `top-out`, `right-out`, `bottom-out` -- funzionano come prima, inseriscono `elem` sopra/a destra/sotto `anchor`.
- `top-in`, `right-in`, `bottom-in` -- inseriscono `elem` all'interno di `anchor`: posizionandolo nel bordo superiore/a destra/inferiore.

Per esempio:

```js
// mostra la nota sopra blockquote
positionAt(blockquote, "top-out", note);

// mostra la nota all'interno di blockquote, nel bordo superiore
positionAt(blockquote, "top-in", note);
```

Ecco il risultato:

[iframe src="solution" height="310" border="1" link]

Prendete la soluzione dell'esercizio <info:task/position-at-absolute> come codice sorgente.
