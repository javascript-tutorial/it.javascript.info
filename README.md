# The Modern JavaScript Tutorial in Italian

In questa repository viene pubblicata la traduzione italiana di [https://javascript.info](https://javascript.info).

Ci piacerebbe rendere questo tutorial disponibile in molte lingue. Aiutaci a tradurlo.

Guarda il link <https://github.com/javascript-tutorial/translate> per maggiori dettagli.

## Contributi

Ci piacerebbe anche avere la vostra collaborazione nel tutorial.

Hai trovato un errore? Manca un argomento? Createlo voi, e inviate un PR 👏

**Puoi modificare i file con un qualsiasi editor di testo.** Il tutorial sfrutta il formato "markdown", molto facile da utilizzare. Potete anche testare in tempo reale le modifiche, utilizzando il server locale presente a questo link <https://github.com/javascript-tutorial/server>.  

E' disponibile una lista di chi ha contribuito: <https://javascript.info/about#contributors>.

Un file inizia con `# Title Header`, e il testo è in formato Markdown, che può esserre modificato con un semplice editor di testo. 

Eventuali risorse aggiuntive ed esempi utili per un articolo o esercizio, risiedono nella stessa cartella.

## Consigli per la traduzione

Se volete tradurre un articolo vi chiedo di seguire questi semplici passi:

- Leggete tra gli [issue](https://github.com/javascript-tutorial/it.javascript.info/issues) quello denominato "Translate Progress".
- Scegliete l'articolo che desiderate tradurre e mettete la spunta.
- Create un issue per informare il gestore della repository sull'articolo scelto.
- Procedete con il fork della repository, traducete e infine infine inviate una PR (Pull Request).

Il vostro nome apparirà nella pagina "About project" quando la traduzione verrà pubblicata.

### Esempi ed Esercizi

- I commenti possono essere tradotti
- Le variabili, classi o identificatori non devono essere assolutamente tradotte
- Assicuratevi che il codice funzioni dopo averlo tradotto

Esempio:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ GIUSTO (traduzione commento):

```js
// Esempio
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ SBAGLIATO (traduzione classi):

```js
// Esempio
const testo = 'Ciao mondo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### Link esterni

Se trovate dei link esterni verso Wikipedia, esempio `https://en.wikipedia.org/wiki/JavaScript`, ed esiste la versione italiana, accertatevi che questa sia di qualità prima di cambiare il link.

Esempio:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> it):

```md
[JavaScript](https://it.wikipedia.org/wiki/JavaScript) è un linguaggio di programmazione.
```

Per i link verso MDN, che sono tradotti solo parzialmente, conviene utilizzare quelli originali.

Se un articolo linkato non possiede una versione italiana, allora mantenete quello originale.

### Glossario dei termini

Alcuni termini utilizzati spesso:

- 'Summary' viene tradotto con 'Riepilogo'
- Il nome dei tipi come: 'primitives', 'string', 'object' viene tradotto ('primitivi', 'stringhe', 'oggetto') mantenendo tra parentesi la versione in lingua originale

---
💓  
Ilya Kantor @iliakan
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
