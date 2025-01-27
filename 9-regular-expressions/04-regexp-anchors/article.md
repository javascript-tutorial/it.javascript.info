# Inizio stringa ^ e fine $

L'accento circonflesso  `pattern:'^'` e il simbolo del dollaro `pattern:'$'` sono caratteri che hanno un significato speciale nelle regexp. Vengono chiamati "ancoraggi" (anchor).

Il simbolo `pattern:^` trova corrispondenza all'inizio del testo, e il dollaro `pattern:$` la trova alla fine del testo.

Per esempio, vediamo se il testo inizia con `Mary`:

```js run
let str1 = "Mary had a little lamb, it's fleece was white as snow";
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( /^Mary/.test(str1) ); // true
alert( /^Mary/.test(str2) ); // false
```

Il pattern `pattern:^Mary` vuol dire: "la stringa inizia e subito dopo c'è Mary".

Ora verifichiamo se il testo finisce con una email.

Per trovare corrispondenza con un'email, possiamo usare la regexp `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}`.

Per testare se la stringa finisca con una email, aggiungiamo `pattern:$` al pattern:

```js run
<<<<<<< HEAD
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;
=======
let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

let str1 = 'My email is mail@site.com';
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( reg.test(str1) ); // true
alert( reg.test(str2) ); // false
```

Possiamo utilizzare entrambi gli ancoraggi insieme per controllare che la stringa segua uno specifico pattern. È un metodo usato spesso per la validazione.

Per esempio vogliamo controllare che  `str` sia esattamente un colore nella forma `#` più 6 esadecimali. Il pattern per il colore è `pattern:#[0-9a-f]{6}`.

Per verificare che l'*intera stringa* vi corrisponda in modo esatto, aggiungiamo `pattern:^...$`:

```js run
let str = "#abcdef";

alert( /^#[0-9a-f]{6}$/i.test(str) ); // true
```

Il motore delle regexp cerca l'inizio del testo, successivamente il colore, e infine cerca immediatamente la fine del testo. Proprio ciò di cui abbiamo bisogno.

```smart header="Gli ancoraggi hanno lunghezza zero"
Gli ancoraggi, proprio come `\b`, sono test. Hanno larghezza zero.

In altre parole, non cercano corrispondenze per un carattere, piuttosto forzano il motore delle regexp a cercare la condizione specifica (inizio/fine del testo).
```

Il comportamento degli ancoraggi cambia se c'è la flag `pattern:m` (modalità multi linea). L'approfondiremo meglio nel prossimo capitolo.
