importance: 5

---

# Troncate il testo

Create una funzione `truncate(str, maxlength)` che controlla la lunghezza di `str` e, se questa eccede `maxlength` -- rimpiazzate la fine di `str` con il carattere `"…"`, in modo tale da ottenere una lunghezza pari a `maxlength`.

Come risultato la funzione dovrebbe troncare la stringa (se ce n'è bisogno).

Ad esempio:

```js
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
```
