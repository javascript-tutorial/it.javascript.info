importance: 5

---

# decorator ritardante

Crea il decorator `delay(f, ms)` che ritarda ogni chiamata ad `f` di `ms` millisecondi.

Ad esempio:

```js
function f(x) {
  alert(x);
}

// crea i wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // visualizza "test" dopo 1000ms
f1500("test"); // visualizza "test" dopo 1500ms
```

In altre parole, `delay(f, ms)` ritorna una variante di `f` ritardata di `ms`.

Nel codice sopra, `f` è una funzione con un solo argomento, ma la tua soluzione potrebbe passare molti argomenti ed il contesto `this`.
