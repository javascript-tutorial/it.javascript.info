# Trovate le stringhe tra doppi apici

Create una regexp per trovare le stringhe tra doppi apici `subject:"..."`.

Le stringhe dovrebbero supportare l'escape allo stesso modo delle stringhe JavaScript. Per esempio, i doppi apici possono essere inseriti come `subject:\"` una nuova linea come `subject:\n`, e lo stesso slash come `subject:\\`.

```js
let str = "Just like \"here\".";
```

Si noti che, in particolare, un doppio apice con escape `subject:\"` non termina una stringa.

Noi dovremmo cercare, pertanto, da un doppio apice fino all'altro ignorando quelli con escape tra i due.

Questo è la parte fondamentale dell'esercitazione, altrimenti diventerebbe banale.

Ecco degli esempi di stringhe che corrispondono:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (contiene doppi apici con escape)
.. *!*"\\"*/!* ..  (contiene un doppio slash)
.. *!*"\\ \""*/!* ..  (contiene un doppio slash e un doppio apice con escape)
```

In JavaScript abbiamo bisogno di raddoppiare lo slash per passarli correttamente all'interno della stringa, in questo modo:

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// la stringa in memoria
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
