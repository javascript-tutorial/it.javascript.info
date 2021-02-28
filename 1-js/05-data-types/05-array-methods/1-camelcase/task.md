importance: 5

---

# Traducete border-left-width in borderLeftWidth

Scrivete una funzione `camelize(str)` che trasforma le parole separate da un trattino come "la-mia-stringa" nella notazione a cammello "laMiaStringa".

Quindi: rimuove tutti i trattini; ogni parola dopo un trattino avrà una lettera maiuscola.

Esempi:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Suggerimento: usate `split` per dividere una stringa in un array, trasformatela e infinite riunite tutto con `join`.
