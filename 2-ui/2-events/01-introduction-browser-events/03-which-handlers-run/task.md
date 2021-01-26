importance: 5

---

# Quale gestore verrà eseguito?

Nella variabile c'è un pulsante e non vi sono gestori assegnati.

Dopo aver eseguito questo codice, quali gestori verranno eseguiti al click sul pulsante? Quale alert verrà mostrato?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
