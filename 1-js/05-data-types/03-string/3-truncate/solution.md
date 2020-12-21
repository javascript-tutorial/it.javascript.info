La lunghezza massima deve essere `maxlength`, quindi abbiamo bisgnono di troncare la stringa, per fare spazio al carattere "..."

<<<<<<< HEAD
Da notare che esiste un codice che identifica il simbolo "...". Quindi non vengono contati come tre punti.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
