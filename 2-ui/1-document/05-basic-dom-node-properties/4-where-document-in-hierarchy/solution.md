
Possiamo visualizzare a quale classe appartiene esaminandola in questo modo:

```js run
alert(document); // [object HTMLDocument]
```

Oppure:

```js run
alert(document.constructor.name); // HTMLDocument
```

Quindi `document` è un'istanza della classe `HTMLDocument`.

Qual è il suo posto nella gerarchia DOM?

Certo, potremmo sfogliare la specifica, ma sarebbe più veloce scoprirlo manualmente.

Attraversiamo la catena dei prototipi tramite `__proto__`.

Come sappiamo i metodi di una classe sono nel `prototype` del costruttore. Per esempio `HTMLDocument.prototype` ha i metodi per i documenti.

C'è inoltre un riferimento al costruttore all'interno di `prototype`:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Per ricavare la stringa con il nome della classe possiamo usare `constructor.name`. Facciamolo per l'intera catena prototipale `document` fino alla classe` Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Questa è la gerachia.

Potremmo anche esaminare l'oggetto usando `console.dir(document)` e visualizzare gli stessi nomi aprendo `__proto__`. La console li ricava internamente da `constructor`.
