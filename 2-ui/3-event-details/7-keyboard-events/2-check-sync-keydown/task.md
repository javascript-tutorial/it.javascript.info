importance: 5

---

# Tasti di scelta rapida estesi

Create una funzione `runOnKeys(func, code1, code2, ... code_n)` che viene eseguita `func` premendo contemporaneamente sui tasti con i codici `code1`, `code2`, ..., `code_n`.

Ad esempio, il seguente codice mostra un `alert` quando vengono premuti `"Q"` e `"W"` insieme (in qualunque lingua, con o senza il CapsLock)

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
