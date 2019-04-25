<<<<<<< HEAD
# The Modern JavaScript Tutorial in Italian

In questa repository viene pubblicata la traduzione italiana di <https://javascript.info>.
=======
# The Modern JavaScript Tutorial

This repository hosts the English content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Vi chiediamo di aiutarci a rendere il processo di traduzione il più semplice possibile.

<<<<<<< HEAD
- Leggete tra gli [issue](https://github.com/javascript-tutorial/it.javascript.info/issues) quello denominato "Translate Progress".
- Scegliete l'articolo che desiderate tradurre e mettete la spunta.
- Create un issue per informare il gestore della repository sull'articolo scelto.
- Procedete con il fork della repository, traducete e infine infine inviate una PR (Pull Request).

🎉 Grazie!

Il vostro nome e la quantità dei contributi forniti apparirà nella pagina "About project" quando la traduzione verrà pubblicata.

P.S. Potete trovare la lista completa delle traduzioni a questo link: <https://github.com/javascript-tutorial/translate>.

## Struttura

Ogni capitolo, articolo o esercizio appartiene ad una cartella.

Il nome della cartella è `N-url`, dove `N` – è il numero per l'ordinamento (gli articoli sono ordinati), e `url` è il prefisso dell'URL sul sito.

Una cartella possiede uno di questi tipi di file:

- `index.md` per una sezione,
- `article.md` per un articolo,
- `task.md` per gli esercizi(+`solution.md` con la soluzione ed eventuale spiegazione).
=======
We'd like to make the tutorial available in many languages. Please help us to translate.

See <https://github.com/javascript-tutorial/translate> for the details.

## Contributions

We'd also like to collaborate on the tutorial with other people.

Something's wrong? A topic is missing? Explain it to people, add as PR 👏

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.  

The list of contributors is available at <https://javascript.info/about#contributors>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Un file inizia con `# Title Header`, e il testo è in formato Markdown, che può esserre modificato con un semplice editor di testo. 

Eventuali risorse aggiuntive ed esempi utili per un articolo o esercizio, risiedono nella stessa cartella.

## Consigli per la traduzione

La traduzione non deve necessariamente essere fatta parola per parola. Dovrebbe essere tecnicamente corretta ed esplicativa.

Se avete dei suggerimenti per migliorare anche la versione Inglese - ottimo, inviatemi una PR e valuterò la vostra proposta.

<<<<<<< HEAD
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

## Controllo locale

Potete eseguire il tutorial localmente, per vedere immediatamente i cambiamenti.

Qui trovate il server: <https://github.com/javascript-tutorial/server>. 
=======
Each of these files starts from the `# Main header`.

It's very easy to add something new.

---
💓  
Ilya Kantor @iliakan
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
