importance: 5

---

# Crea un oggetto con lo stesso costruttore

Immagina di avere un oggetto arbitrario `obj`, creato da un costruttore -- non sappiamo quale, ma vorremmo poter creare un nuovo oggetto utilizzandolo.

Possiamo farlo in questo modo?

```js
let obj2 = new obj.constructor();
```

Fornite un esempio di costruttore per `obj` che permetta a questo codice di funzionare correttamente. Ed un esempio che non lo farebbe funzionare.
