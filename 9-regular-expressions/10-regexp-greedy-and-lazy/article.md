# Modalità greedy e lazy dei quantificatori

I quantificatori sono molto semplici a prima vista, ma in realtà possono riverlarsi complicati.

Dovremmo comprendere appieno come funziona la ricerca se intendiamo cercare qualcosa di più complesso di `pattern:/\d+/`.

Prendiamo ad esempio la seguente esercitazione.

Abbiamo bisogno di rimpiazzare tutti i doppi apici `"..."` in un testo con le virgolette basse: `«...»`, che sono preferite nella tipografia di molti paesi.

Ad esempio: `"Hello, world"` dovrebbe diventare `«Hello, world»`. Esistono altre virgolette, come `„Witam, świat!”` (in Polonia) o `「你好，世界」` (in Cina), in questo caso, tuttavia, scegliamo `«...»`.

Innanzitutto dobbiamo individuare le stringhe tra doppi apici per poi sostituirli.

Un'espressione regolare come `pattern:/".+"/g` (una stringa di lunghezza variabile racchiusa da doppi apici) può sembrare efficace, ma non lo è!

Verifichiamo:

```js run
let regexp = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch" and her "broom"
```

...Non funziona come desideravamo!

Invece di trovare i due riscontri `match:"witch"` e `match:"broom"`, ne trova solo uno: `match:"witch" and her "broom"`.

Questo fenomeno può essere descritto così: "l'avidità è la causa di tutti i mali".

## La ricerca in modalità greedy (avida)

Per trovare un riscontro, il motore dell'espressione regolare usa il seguente algoritmo:

- Per ogni posizione nella stringa
    - Prova a trovare un riscontro del pattern in quella posizione.
    - Se non c'è un riscontro, passa alla posizione successiva.

Questa procedura generica non ci spiega con evidenza perché l'espressione regolare fallisca, quindi approfondiamo come funziona la ricerca per il pattern `pattern:".+"`.

1. Il primo carattere del pattern è un doppio apice `pattern:"`.

    Il motore dell'espressione regolare prova a trovarlo nella posizione zero della stringa `subject:a "witch" and her "broom" is one`, ma in quel punto trova `subject:a`, pertanto non c'è immediata corrispondenza.

    Quindi procede: passa alle successive posizioni nella stringa sorgente e prova a trovare lì il primo carattere del pattern, prima fallisce nuovamente, e poi trova finalmente il doppio apice nella terza posizione:

    ![](witch_greedy1.svg)

2. Rilevato il doppio apice, il motore tenta di trovare riscontro per il resto del pattern. Verifica se il resto della stringa sia conforme a `pattern:.+"`.

    Nel nostro esempio il successivo carattere del pattern è `pattern:.` (un punto) che indica "qualsiasi carattere tranne una nuova riga". Trova pertanto corrispondenza nel carattere successivo della stringa `match:'w'`:

    ![](witch_greedy2.svg)

3. Successivamente il punto trova ulteriori riscontri per via del quantificatore `pattern:.+`. Il motore dell'espressione regolare aggiunge un carattere dopo l'altro.

    ...Fino a quando? Tutti i caratteri corrispondono al punto, quindi si ferma solo quando raggiunge la fine della stringa:

    ![](witch_greedy3.svg)

4. A questo punto il motore cessa di ripetere `pattern:.+` e prova a trovare il prossimo carattere del pattern. Si tratta del doppio apice `pattern:"`. C'è un problema però: la stringa è finita, non ci sono più caratteri!

    Il motore dell'espressione regolare capisce che ha preso troppi caratteri per `pattern:.+` e comincia a *retrocedere*.

    In other words, it shortens the match for the quantifier by one character:

    ![](witch_greedy4.svg)

    Now it assumes that `pattern:.+` ends one character before the string end and tries to match the rest of the pattern from that position.

    If there were a quote there, then the search would end, but the last character is `subject:'e'`, so there's no match.

5. ...So the engine decreases the number of repetitions of `pattern:.+` by one more character:

    ![](witch_greedy5.svg)

    The quote `pattern:'"'` does not match `subject:'n'`.

6. The engine keep backtracking: it decreases the count of repetition for `pattern:'.'` until the rest of the pattern (in our case `pattern:'"'`) matches:

    ![](witch_greedy6.svg)

7. The match is complete.

8. So the first match is `match:"witch" and her "broom"`. If the regular expression has flag `pattern:g`, then the search will continue from where the first match ends. There are no more quotes in the rest of the string `subject:is one`, so no more results.

That's probably not what we expected, but that's how it works.

**In the greedy mode (by default) a quantified character is repeated as many times as possible.**

The regexp engine adds to the match as many characters as it can for `pattern:.+`, and then shortens that one by one, if the rest of the pattern doesn't match.

For our task we want another thing. That's where a lazy mode can help.

## Lazy mode

The lazy mode of quantifiers is an opposite to the greedy mode. It means: "repeat minimal number of times".

We can enable it by putting a question mark `pattern:'?'` after the quantifier, so that it becomes  `pattern:*?` or `pattern:+?` or even `pattern:??` for `pattern:'?'`.

To make things clear: usually a question mark `pattern:?` is a quantifier by itself (zero or one), but if added *after another quantifier (or even itself)* it gets another meaning -- it switches the matching mode from greedy to lazy.

The regexp `pattern:/".+?"/g` works as intended: it finds `match:"witch"` and `match:"broom"`:

```js run
let regexp = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

To clearly understand the change, let's trace the search step by step.

1. The first step is the same: it finds the pattern start `pattern:'"'` at the 3rd position:

    ![](witch_greedy1.svg)

2. The next step is also similar: the engine finds a match for the dot `pattern:'.'`:

    ![](witch_greedy2.svg)

3. And now the search goes differently. Because we have a lazy mode for `pattern:+?`, the engine doesn't try to match a dot one more time, but stops and tries to match the rest of the pattern  `pattern:'"'` right now:

    ![](witch_lazy3.svg)

    If there were a quote there, then the search would end, but there's `'i'`, so there's no match.
4. Then the regular expression engine increases the number of repetitions for the dot and tries one more time:

    ![](witch_lazy4.svg)

    Failure again. Then the number of repetitions is increased again and again...
5. ...Till the match for the rest of the pattern is found:

    ![](witch_lazy5.svg)

6. The next search starts from the end of the current match and yield one more result:

    ![](witch_lazy6.svg)

In this example we saw how the lazy mode works for `pattern:+?`. Quantifiers `pattern:*?` and `pattern:??` work the similar way -- the regexp engine increases the number of repetitions only if the rest of the pattern can't match on the given position.

**Laziness is only enabled for the quantifier with `?`.**

Other quantifiers remain greedy.

For instance:

```js run
alert( "123 456".match(/\d+ \d+?/) ); // 123 4
```

1. The pattern `pattern:\d+` tries to match as many digits as it can (greedy mode), so it finds  `match:123` and stops, because the next character is a space `pattern:' '`.
2. Then there's a space in the pattern, it matches.
3. Then there's `pattern:\d+?`. The quantifier is in lazy mode, so it finds one digit `match:4` and tries to check if the rest of the pattern matches from there.

    ...But there's nothing in the pattern after `pattern:\d+?`.

    The lazy mode doesn't repeat anything without a need. The pattern finished, so we're done. We have a match `match:123 4`.

```smart header="Optimizations"
Modern regular expression engines can optimize internal algorithms to work faster. So they may work a bit differently from the described algorithm.

But to understand how regular expressions work and to build regular expressions, we don't need to know about that. They are only used internally to optimize things.

Complex regular expressions are hard to optimize, so the search may work exactly as described as well.
```

## Alternative approach

With regexps, there's often more than one way to do the same thing.

In our case we can find quoted strings without lazy mode using the regexp `pattern:"[^"]+"`:

```js run
let regexp = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

The regexp `pattern:"[^"]+"` gives correct results, because it looks for a quote `pattern:'"'` followed by one or more non-quotes `pattern:[^"]`, and then the closing quote.

When the regexp engine looks for `pattern:[^"]+` it stops the repetitions when it meets the closing quote, and we're done.

Please note, that this logic does not replace lazy quantifiers!

It is just different. There are times when we need one or another.

**Let's see an example where lazy quantifiers fail and this variant works right.**

For instance, we want to find links of the form `<a href="..." class="doc">`, with any `href`.

Which regular expression to use?

The first idea might be: `pattern:/<a href=".*" class="doc">/g`.

Let's check it:
```js run
let str = '...<a href="link" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link" class="doc">
```

It worked. But let's see what happens if there are many links in the text?

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Whoops! Two links in one match!
alert( str.match(regexp) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
```

Now the result is wrong for the same reason as our "witches" example. The quantifier `pattern:.*` took too many characters.

The match looks like this:

```html
<a href="....................................." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

Let's modify the pattern by making the quantifier `pattern:.*?` lazy:

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

Now it seems to work, there are two matches:

```html
<a href="....." class="doc">    <a href="....." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

...But let's test it on one more text input:

```js run
let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Wrong match!
alert( str.match(regexp) ); // <a href="link1" class="wrong">... <p style="" class="doc">
```

Now it fails. The match includes not just a link, but also a lot of text after it, including `<p...>`.

Why?

That's what's going on:

1. First the regexp finds a link start `match:<a href="`.
2. Then it looks for `pattern:.*?`: takes one character (lazily!), check if there's a match for `pattern:" class="doc">` (none).
3. Then takes another character into `pattern:.*?`, and so on... until it finally reaches `match:" class="doc">`.

But the problem is: that's already beyond the link `<a...>`, in another tag `<p>`. Not what we want.

Here's the picture of the match aligned with the text:

```html
<a href="..................................." class="doc">
<a href="link1" class="wrong">... <p style="" class="doc">
```

So, we need the pattern to look for `<a href="...something..." class="doc">`, but both greedy and lazy variants have problems.

The correct variant can be: `pattern:href="[^"]*"`. It will take all characters inside the `href` attribute till the nearest quote, just what we need.

A working example:

```js run
let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href="[^"]*" class="doc">/g;

// Works!
alert( str1.match(regexp) ); // null, no matches, that's correct
alert( str2.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

## Riepilogo

Quantifiers have two modes of work:

Greedy
: By default the regular expression engine tries to repeat the quantified character as many times as possible. For instance, `pattern:\d+` consumes all possible digits. When it becomes impossible to consume more (no more digits or string end), then it continues to match the rest of the pattern. If there's no match then it decreases the number of repetitions (backtracks) and tries again.

Lazy
: Enabled by the question mark `pattern:?` after the quantifier. The regexp engine tries to match the rest of the pattern before each repetition of the quantified character.

As we've seen, the lazy mode is not a "panacea" from the greedy search. An alternative is a "fine-tuned" greedy search, with exclusions, as in the pattern `pattern:"[^"]+"`.
