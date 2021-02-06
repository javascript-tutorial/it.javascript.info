importance: 5

---

# decorator spia

Crea un decorator `spy(func)` che restituisca un wrapper che salva tutte le chiamate alla funzione nella sua proprietà `calls`.

Ogni chiamata viene salvata come un array di argomenti.

Ad esempio:

```js
function work(a, b) {
  alert( a + b ); // work è una funzione o un metodo arbitrario
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

P.S. Questo decorator a volte è utile per fare *unit-testing*. La sua forma avanzata è `sinon.spy` nella libreria [Sinon.JS](http://sinonjs.org/).
