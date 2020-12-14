# Pattern e flag

<<<<<<< HEAD
Una espressione regolare (regular expression,  "regexp" o solo "reg") è formata da una sequenza di caratteri (*pattern*) e da eventuali *flag*.

Esistono due tipi di sintassi per creare un oggetto di tipo "regular expression".

La versione più lunga:
=======
Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.

## Regular Expressions

A regular expression (also "regexp", or just "reg") consists of a *pattern* and optional *flags*.

There are two syntaxes that can be used to create a regular expression object.

The "long" syntax:
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

```js
regexp = new RegExp("pattern", "flags");
```

<<<<<<< HEAD
...e la più corta, usando gli slash `"/"`:
=======
And the "short" one, using slashes `"/"`:
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

```js
regexp = /pattern/; // senza flag
regexp = /pattern/gmi; // con le flag g,m e i (da approfondire a breve)
```

<<<<<<< HEAD
Gli slash `"/"` comunicano a JavaScript che stiamo creando una espressione regolare. Hanno lo stesso ruolo delle virgolette per le stringhe.

## Uso

Per cercare in una stringa, possiamo usare il metodo [search](mdn:js/String/search).

Qui un esempio:

```js run
let str = "I love Javascript!"; // cercherà qui
=======
Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp` is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:

```js
let tag = prompt("What tag do you want to find?", "h2");
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

<<<<<<< HEAD
Il metodo `str.search` cerca la sequenza `pattern:/love/` e restituisce la sua posizione all'interno della stringa. Come si può immaginare, il pattern `pattern:/love/` è la sequenza più semplice possibile. Quel che fa è la semplice ricerca di una sottostringa.

Il codice qui sopra fa lo stesso di:

```js run
let str = "I love JavaScript!"; // cercherà qui
=======
## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first match is returned.

<<<<<<< HEAD
Quindi se cerchiamo la sequenza `pattern:/love/` avremo lo stesso risultato che otteniamo cercando `"love"`.

Questo vale solo per il momento. Presto creeremo espressioni regolari più complesse e con maggiore potere di ricerca.
=======
`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full Unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

```smart header="Colors"
Da qui in avanti, lo schema di colori è il seguente:

- espressione regolare -- `pattern:rosso`
- stringa (all'interno della quale cerchiamo) -- `subject:blu`
- risultato -- `match:verde`
```

## Searching: str.match

<<<<<<< HEAD
Quando usiamo la sintassi `new RegExp`?
Usualmente usiamo la sintassi più breve `/.../`. Ma non supporta inserimenti di variabili con `${...}`.

Tuttavia, `new RegExp` permette di costruire dinamicamente una sequenza da una stringa, quindi è più flessibile.

Qui un esempio di un'espressione regolare generata dinamicamente:

```js run
let tag = prompt("Quale tag vuoi cercare?", "h2");
let regexp = new RegExp(`<${tag}>`);

// trova <h2> di default
alert( "<h1> <h2> <h3>".search(regexp));
```
=======
As mentioned previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

<<<<<<< HEAD

## Flag

Le espressioni regolari possono avere flag che modificano la ricerca.

Ce ne sono solo 6 in JavaScript:

`i`
: Con questa flag la ricerca non è sensibile all'uso di maiuscole (è case-insensitive) : non ci sono differenze tra `A` e `a` (vedi esempio in basso).

`g`
: Con questa flag la ricerca trova tutte le corrispondenze, senza la flag troverà solo la prima corrispondenza (ne vedremo gli usi nel prossimo capitolo).

`m`
: Modalità multilinea (multiline mode) (approfondita nel capitolo <info:regexp-multiline-mode>).

`s`
: Modalità "dotall", permette a `.` di ottenere le corrispondenze per le andate a capo (approfondito nel capitolo <info:regexp-character-classes>).

`u`
: Attiva il pieno supporto unicode. La flag consente di processare correttamente le coppie surrogate. Di più a proposito nel capitolo <info:regexp-unicode>.

`y`
: "Sticky mode" (approfondita nel capitolo <info:regexp-sticky>)

Approfondiremo tutte queste flag successivamente nel tutorial.

Per ora, la flag più semplice è `i`, qui un esempio:
=======
    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to always be an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).

For instance:

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

<<<<<<< HEAD
alert( str.search(/LOVE/i) ); // 2 (trovata in minuscolo)

alert( str.search(/LOVE/) ); // -1 (non trova niente senza la flag 'i')
```

Quindi la flag `i` già rende le espressioni regolari più potenti rispetto alla semplice ricerca di una sottostringa. Ma c'è molto di più. Parleremo delle altre flag e caratteristiche nei prossimi capitoli.
=======
The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864

Full information about the methods is given in the article <info:regexp-methods>.

## Riepilogo

<<<<<<< HEAD
- Una espressione regolare è formata da una sequenza e eventualmente da alcune flag: `g`, `i`, `m`, `u`, `s`, `y`.
- Senza flag e simboli speciali che studieremo in seguito, cercare con una regexp è lo stesso di cercare con una sottostringa.
- Il metodo `str.search(regexp)` restituisce l'indice dove viene trovata la corrispondenza, oppure `-1` se non ci sono corrispondenze. Nel prossimo capitolo vedremo altri metodi.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> 872cc6adedac4ff3ebec73916bf435f1d72f2864
