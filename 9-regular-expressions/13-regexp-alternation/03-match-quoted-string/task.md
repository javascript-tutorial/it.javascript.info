# Trovate le stringhe tra doppi apici

Create una regexp per trovare le stringhe tra doppi apici `subject:"..."`.

<<<<<<< HEAD
Le stringhe dovrebbero supportare l'escape allo stesso modo delle stringhe JavaScript. Per esempio, i doppi apici possono essere inseriti come `subject:\"` una nuova linea come `subject:\n`, e lo stesso slash come `subject:\\`.
=======
The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let str = "Just like \"here\".";
```

Si noti che, in particolare, un doppio apice con escape `subject:\"` non termina una stringa.

Noi dovremmo cercare, pertanto, da un doppio apice fino all'altro ignorando quelli con escape tra i due.

Questo è la parte fondamentale dell'esercitazione, altrimenti diventerebbe banale.

Ecco degli esempi di stringhe che corrispondono:
```js
.. *!*"test me"*/!* ..  
<<<<<<< HEAD
.. *!*"Say \"Hello\"!"*/!* ... (contiene doppi apici con escape)
.. *!*"\\"*/!* ..  (contiene un doppio slash)
.. *!*"\\ \""*/!* ..  (contiene un doppio slash e un doppio apice con escape)
```

In JavaScript abbiamo bisogno di raddoppiare lo slash per passarli correttamente all'interno della stringa, in questo modo:
=======
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// la stringa in memoria
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
