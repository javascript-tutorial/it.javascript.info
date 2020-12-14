La lunghezza massima deve essere `maxlength`, quindi abbiamo bisgnono di troncare la stringa, per fare spazio al carattere "..."

<<<<<<< HEAD
Da notare che esiste un codice che identifica il simbolo "...". Quindi non vengono contati come tre punti.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
