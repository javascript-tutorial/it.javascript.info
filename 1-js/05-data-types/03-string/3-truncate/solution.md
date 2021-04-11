La lunghezza massima deve essere `maxlength`, quindi abbiamo bisogno di troncare la stringa, per fare spazio al carattere "..."

Da notare che esiste un carattere Unicode che identifica "...". Questo non è lo stesso che usare tre punti.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
