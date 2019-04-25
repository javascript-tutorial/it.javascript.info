La lunghezza massima deve essere `maxlength`, quindi abbiamo bisgnono di troncare la stringa, per fare spazio al carattere "..."

Da notare che esiste un codice che identifica il simbolo "...". Quindi non vengono contati come tre punti.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
