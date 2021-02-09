importance: 5

---

# Aggiungi il metodo "f.defer(ms)" alle funzioni

Aggiungi al prototype di tutte le funzioni il metodo `defer(ms)`, che si occupa di eseguire la funzione dopo `ms` millisecondi.

Una volta fatto, il seguente codice dovrebbe funzionare:

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // mostra "Hello!" dopo 1 secondo
```
