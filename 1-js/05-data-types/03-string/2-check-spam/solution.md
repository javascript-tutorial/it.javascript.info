Per far si che la ricerca sia case-insensitive (non distingue lettere minuscole da quelle maiuscole), portiamo l'intera stringa a lettere minuscole e poi eseguiamo la ricerca:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

