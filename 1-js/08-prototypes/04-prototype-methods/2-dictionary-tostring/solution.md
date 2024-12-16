
Il metodo `Object.keys` mostra tutte le proprietà enumerabili di un oggetto.

Per rendere `toString` non-enumerable, dobbiamo definirlo utilizzando un property descriptor. La sintassi che ci permette di farlo è `Object.create`, che ci consente di fornire dei property descriptors come secondo argomento.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // definiamo la proprietà toString
    value() { // il valore è una funzione
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple e __proto__ appaiono nel ciclo
for(let key in dictionary) {
  alert(key); // "apple", poi "__proto__"
}  

// vengono elencate le proprietà separate da una virgola
alert(dictionary); // "apple,__proto__"
```

Possiamo crare una proprietà utilizzando un descriptor. Di default i flag vengono impostati a `false`. Quindi nel codice sopra, `dictionary.toString` è non-enumerable.

<<<<<<< HEAD
Vedi il capitolo [property descriptors](info:property-descriptors) se hai bisogno di ripassare l'argomento.
=======
See the chapter [](info:property-descriptors) for review.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
