importance: 2

---

# Sommare con un numero arbitrario di parentesi

Scrivete una funzione `sum` che funzioni in questo modo:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.S. Aiuto: potresti impostare una conversione "toPrimitive" del tuo oggetto.