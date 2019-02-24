importance: 5

---

# Traducete border-left-width in borderLeftWidth

Scrivete una funzione `camelize(str)` che cambia trasforma le parole seprate da trattino come "la-mia-stringa", nella notazione a cammello "laMiaStringa".

Quindi: rimuove tutti i trattini, ogni parola dopo un trattino diventerà con una lettera maiuscola.

Esempi:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Suggerimento: usate `split` per divider una stringa in array, trasformatela e infinite riunite tutto con `join`.
