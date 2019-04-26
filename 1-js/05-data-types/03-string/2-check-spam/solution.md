<<<<<<< HEAD
Per far si che la ricerca non si preoccupi del timbro delle lettere, portiamo l'intera stringa a lettere minuscole e poi eseguiamo la ricerca:
=======
To make the search case-insensitive, let's bring the string to lower case and then search:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

