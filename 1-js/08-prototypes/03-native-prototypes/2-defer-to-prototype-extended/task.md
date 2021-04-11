importance: 4

---

# Aggiungi il decorator "defer()" alle funzioni

Aggiungi al prototype di tutte le funzioni il metodo `defer(ms)`, il quale ritorna un wrapper (contenitore), che si occupa di invocare la funzione dopo `ms` millisecondi.

Qui vediamo un esempio di come dovrebbe funzionare:

```js
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // mostra 3 dopo 1 secondo
```

Da notare che gli argomenti devono essere passati alla funzione originale.
