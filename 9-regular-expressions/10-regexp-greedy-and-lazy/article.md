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

    Il motore dell'espressione regolare capisce di aver preso troppi caratteri per `pattern:.+` e comincia a *retrocedere*.

    In altre parole accorcia di un carattere la corrispondenza per il quantificatore:

    ![](witch_greedy4.svg)

    A questo punto presume che `pattern:.+` finisca un carattere prima della fine della stringa e verifica la corrispondenza del resto del pattern da quella posizione.

    Se ci fosse stato un doppio apice, la ricerca sarebbe terminata, ma l'ultima carattere è una `subject:'e'`, nessun riscontro quindi.

5. ...Allora il motore diminuisce di un ulteriore carattere il numero delle ripetizioni di `pattern:.+`:

    ![](witch_greedy5.svg)

    Anche il carattere `subject:'n'` non soddisfa la ricerca di `pattern:'"'`.

6. Il motore continua a retrocedere: diminuisce le ripetizioni per `pattern:'.'` finché il resto del pattern (nel nostro caso `pattern:'"'`) non trova riscontro:

    ![](witch_greedy6.svg)

7. La ricerca è completa.

8. Il primo riscontro è quindi `match:"witch" and her "broom"`. Se l'espressione regolare ha il flag `pattern:g`, allora la ricerca proseguirà a partire dalla fine della prima corrispondenza. Non ci sono più doppi apici nel resto della stringa `subject:is one`e, pertanto, non c'è nessun altro risultato.

Probabilmente non è quello che ci aspettavamo, ma funziona così.

**In modalità greedy (quella predefinita) un quantificatore viene ripetuto quante più volte possibile.**

Il motore della regexp aggiunge quanti più caratteri possibili alla corrispondenza con `pattern:.+`, successivamente retrocede di un carattere alla volta se il resto del pattern non trova riscontro.

L'obiettivo della nostra esercitazione non è questo, proprio in questi casi viene in soccorso la modalità lazy.

## Modalità lazy (pigra)

La modalità lazy di un quantificatore è l'opposto della modalità greedy. Significa: "ripeti il minor numero di volte".

Possiamo abilitarla mettendo un punto interrogativo `pattern:'?'` dopo il quantificatore, così che diventi `pattern:*?` o `pattern:+?` o ancora `pattern:??` per `pattern:'?'`.

Ricapitoliamo per chiarezza: di norma il punto interrogativo `pattern:?` è di per sé un quantificatore (zero o un carattere), ma se aggiunto *dopo un altro quantificatore (anche dopo se stesso)* assume un altro significato: cambia la modalità di corrispondenza da greedy a lazy.

La regexp `pattern:/".+?"/g` soddisfa le nostre esigenze: trova `match:"witch"` e `match:"broom"`:

```js run
let regexp = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch", "broom"
```

Per comprendere distintamente cosa sia cambiato, seguiamo la ricerca passo dopo passo.

1. Il primo step non cambia: trova l'inizio del pattern `pattern:'"'` nella terza posizione:

    ![](witch_greedy1.svg)

2. Anche il secondo step è simile: il motore trova una corrispondenza per il punto `pattern:'.'`:

    ![](witch_greedy2.svg)

3. Da questo punto la ricerca procede in modo differente. Dal momento che il quantificatore è in modalità lazy `pattern:+?`, il motore non prova a cercare il punto più di una volta, si ferma e cerca subito la corrispondenza con il resto del pattern  `pattern:'"'`:

    ![](witch_lazy3.svg)

    Se ci fosse un doppio apice a questo punto la ricerca sarebbe già terminata, ma c'è una `'i'` e quindi nessuna corrispondenza.
4. Il motore della regexp allora aumenta il numero delle ripetizioni per il punto e riprova:

    ![](witch_lazy4.svg)

    Ancora nessun risultato. Il numero delle ripetizioni, pertanto, si accresce di volta in volta...
5. ...finché viene riscontrata la corrispondenza con il resto del pattern:

    ![](witch_lazy5.svg)

6. La ricerca successiva inizia dalla fine della corrispondenza corrente e produce un altro risultato:

    ![](witch_lazy6.svg)

In questo esempio abbiamo visto come funziona la modalità lazy per `pattern:+?`. I quantificatori `pattern:*?` e `pattern:??` operano in modo simile: il motore della regexp aumenta il numero delle ripetizioni solo se il resto del pattern non ha corrispondenza in una data posizione.

**La modalità lazy è abilitata unicamente per il quantificatore seguito da `?`.**

Gli altri quantificatori continuano ad operare in modalità greedy.

Per esempio:

```js run
alert( "123 456".match(/\d+ \d+?/) ); // 123 4
```

1. Il pattern `pattern:\d+` cerca quanti più caratteri gli è possibile (modalità greedy), e si ferma quindi dopo aver trovato `match:123`, perché il carattere successivo è una spaziatura `pattern:' '`.
2. Segue la corrispondenza dello spazio nel pattern.
3. A questo punto c'è `pattern:\d+?`. Il quantificatore è modalità lazy, perciò trova solo una cifra `match:4` e prova a verificare se il resto del pattern è soddisfatto.

    ...Nel pattern, tuttavia, non c'è niente dopo `pattern:\d+?`.

    La modalità lazy non ripete nulla se non c'è un motivo. Il pattern è finito e conclude la ricerca. La nostra corrispondenza è `match:123 4`.

```smart header="Ottimizzazioni"
I moderni motori delle regexp possono ottimizzare internamente i loro algoritimi per essere più rapidi. Potrebbero quindi operare in modo leggermente diverso da quanto abbiamo spiegato prima.

Ma per comprendere come funzionino le espressioni regolari e come implementarle non abbiamo bisogno di conoscere questi dettagli. Si tratta di meccanismi interni per ottimizzare il rendimento.

Del resto è difficile ottimizzare le espressioni regolari complesse, pertanto la ricerca potrebbe anche funzionare esattamente come indicato.
```

## Approccio alternativo

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
