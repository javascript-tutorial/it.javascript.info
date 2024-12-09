# Backtracking catastrofico

Alcune espressioni regolari appaiono semplici, ma possono richiedere tempi esecuzione moooooolto lunghi, e possono perfino "appendere" (nel senso di "mantenere impegnato senza esito") il motore JavaScript.  

Prima o poi la maggior parte degli sviluppatori incapperà in tale fenomeno. Il sintomo tipico - una espressione regolare funziona bene delle volte, ma per certe stringhe resta "appesa", consumando il 100% della CPU.

In tale evenienza un web-browser suggerisce di arrestare lo script e ricaricare la pagina. Non una buona soluzione, di certo.

Per JavaScript lato server, un'espressione regolare del genere può "appendere" il processo del server, che è ancora peggio. Così dovremmo definitivamente prestarvi attenzione.

## Esempio

Supponiamo di avere una stringa, ci piacerebbe verificare se essa è formata dalle parole `pattern:\w+` aventi ciascuna uno spazio opzionale `pattern:\s?` a seguito.

Un modo ovvio per costruire una espressione regolare sarebbe considerare una parola seguita da uno spazio opzionale `pattern:\w+\s?` e ripetere con `*`.

Ciò porta alla regexp `pattern:^(\w+\s?)*$`, essa specifica zero o più parole del genere, che cominciano all'inizio `pattern:^` e terminano alla fine `pattern:$` della riga.  

In azione:

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // vero
alert( regexp.test("Bad characters: $@#") ); // falso
```

La regexp sembra funzionare. Il risultato è corretto. Nonostante ciò, su certe stringhe prende molto tempo. Così tanto che il motore JavaScript si "appende" con un dispendio del 100% della CPU.

Se si esegue l'esempio in basso, probabilmente non si noterà nulla, poiché JavaScript semplicemente si "appenderà". Un web-browser smetterà di rispondere agli eventi, la UI smetterà di funzionare (la maggior parte dei browser permette solo lo scrolling). Dopo un po' di tempo verrà suggerito di ricaricare la pagina. Perciò siate cauti col seguente:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// richiederà molto tempo
alert( regexp.test(str) );
```

Ad essere onesti, notiamo che alcuni motori per espressioni regolari possono gestire tale ricerca efficacemente, per esempio le versioni del motore V8, a partire dalla 8.8, possono farlo (così Google Chrome 88 non resta appeso), mentre Firefox resta appeso.

## Esempio Semplificato

Qual è il problema? Perché l'espressione regolare resta appesa?

Per comprenderlo, semplifichiamo l'esempio: rimuoviamo gli spazi `pattern:\s?`. Quindi l'espressione diventa `pattern:^(\w+)*$`.

E, per rendere le cose più ovvie, sostituiamo `pattern:\w` con `pattern:\d`. Le espressioni regolari risultanti restano ancora appese, ad esempio

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// richiederà molto tempo (attenzione!)
alert( regexp.test(str) );
```

Allora, cosa non va con le regexp?

In primo luogo, uno può notare che la regexp `pattern:(\d+)*` è un po' strana. Il quantificatore `pattern:*` sembra estraneo. Se vogliamo un numero, possiamo usare  `pattern:\d+`.

Infatti, la regexp è artificiosa; l'abbiamo ottenuta semplificando il precedente esempio. Ma la ragione per cui risulta lenta è la stessa. Perciò comprendiamola e il precedente esempio diverrà ovvio.

Cosa succede nella ricerca di `pattern:^(\d+)*$` nella riga `subject:123456789z` (abbreviata leggermente per chiarezza, notare un carattere non numerico `subject:z` alla fine, è importante), perché ci vuole così tanto?

Ecco cosa fa il motore regexp:

1. Dapprima, il motore regexp prova a cercare il contenuto delle parentesi: il numero `pattern:\d+`. Il segno "più" `pattern:+` è greedy per default, così vengono vagliate tutte le cifre.

    ```
    \d+.......
    (123456789)z
    ```

    Dopo aver vagliato tutte le cifre, `pattern:\d+` si considera individuato (come `match:123456789`).

    Dopodiché si applica il quantificatore *stella* `pattern:(\d+)*`. Ma non ci sono più cifre nel testo, per cui la stella non restituisce nulla.

    Il carattere successivo nel pattern è il fine stringa `pattern:$`. Invece nel testo abbiamo `subject:z`, perciò non c'è alcuna corrispondenza:

    ```
               X
    \d+........$
    (123456789)z
    ```

2. Siccome non vi è alcuna corrispondenza, il quantificatore greedy `pattern:+` riduce il conteggio delle ripetizioni, limitandosi di un carattere all'indietro. 
        
    Ora `pattern:\d+` comprende tutte le cifre eccetto l'ultima (`match:12345678`):
    ```
    \d+.......
    (12345678)9z
    ```

3. Allora il motore tenta di proseguire la ricerca dalla posizione successiva (giusto dopo `match:12345678`). 

    La stella `pattern:(\d+)*` può essere applicata -- restituisce un'altra corrispondenza di `pattern:\d+`, il numero `match:9`:

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    Il motore tenta nuovamente la corrispondenza con `pattern:$`, ma fallisce perché, invece, incontra `subject:z`:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```

4. Non c'è corrispondenza, così il motore continuerà il backtracking, riducendo il numero di ripetizioni. Il backtracking generalmente funziona così: l'ultimo quantificatore greedy riduce il numero di ripetizioni fino a raggiungere il minimo. Dopodiché si opera la riduzione sul precedente quantificatore greedy, e così via.

    Si tentano tutte le possibili combinazioni. Eccone gli esempi. 

    Il primo numero `pattern:\d+` ha 7 cifre, poi un numero di 2 cifre:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    Il primo numero ha 7 cifre, poi due numeri di 1 cifra ciascuno:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    Il primo numero ha 6 cifre, poi un numero di 3 cifre:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    Il primo numero ha 6 cifre, poi 2 numeri:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...E così via.


Ci sono molti modi di suddividere una sequenza di cifre  `123456789` in numeri. Precisamente, ve ne sono sono <code>2<sup>n</sup>-1</code>, dove `n` è la lunghezza della sequenza.

- Per `123456789` abbiamo `n=9`, che dà 511 combinazioni.
- Per una sequenza più lunga con `n=20` ci sono circa un milione di combinazioni (1048575). 
- Per `n=30` - mille volte tanto (1073741823 combinazioni).

Provare ciascuna di queste è esattamente la ragione per cui la ricerca impiega così tanto tempo.

## Torniamo a parole e stringhe

Una cosa simile accade nel nostro primo esempio, quando cerchiamo parole tramite il pattern `pattern:^(\w+\s?)*$` nella stringa `subject:An input that hangs!`.

Il motivo è che una parola può essere rappresentata come uno o più  `pattern:\w+`: 

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

Per un essere umano è ovvio che possano mancare corrispondenze perché la stringa termina con un punto esclamativo `!`, ma per l'espressione regolare è atteso un carattere di una parola `pattern:\w` oppure uno spazio `pattern:\s` alla fine. Ma questo il motore non lo sa. 

Tenta tutte le combinazioni in cui la regexp `pattern:(\w+\s?)*` possa "consumare" la stringa, incluse le varianti con gli spazi `pattern:(\w+\s)*` e senza `pattern:(\w+)*` (perché gli spazi `pattern:\s?` sono opzionali). Poiché tali combinazioni sono molte (l'abbiamo visto con le cifre), la ricerca impiega un sacco di tempo. 

Cosa fare?

Dovremmo attivare la modalità lazy?

Sfortunatamente ciò non servirà: se sostituiamo `pattern:\w+` con `pattern:\w+?`, la regexp resterà ancora appesa. L'ordine delle combinazioni cambierà, ma non il loro numero totale.

Alcuni motori per espressioni regolari hanno test complicati e automazioni finite che permettono di evitare di considerare tutte le combinazioni o di velocizzare, ma la maggior parte dei motori non le ha e ciò non sempre aiuta.

## Come risolvere?

Ci sono due approcci principali per risolvere il problema.

Il primo è ridurre il numero delle combinazioni possibili.

Rendiamo lo spazio non-opzionale riscrivendo l'espressione regolare come `pattern:^(\w+\s)*\w*$` - cercheremo qualunque numero di parole seguite da uno spazio `pattern:(\w+\s)*`, e poi (opzionalmente) una parola finale `pattern:\w*`.

Questa regexp è equivalente alla precedente (dà le stesse corrispondenze) e funziona bene:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // falso
```

Perché il problema è sparito?

Perché ora lo spazio è obbligatorio.

La precedente regexp, se omettiamo lo spazio, diviene `pattern:(\w+)*`, che porta a molte combinazioni di `\w+` con una singola parola.

Perciò `subject:input` può corrispondere a due ripetizioni di `pattern:\w+`, così: 

```
\w+  \w+
(inp)(ut)
```

Il nuovo pattern è differente: `pattern:(\w+\s)*` specifica ripetizioni di parole seguite da uno spazio! La stringa  `subject:input` non può corrispondere a due ripetizioni di `pattern:\w+\s`, perché lo spazio è obbligatorio. 

Il tempo necessario per provare molte (di fatto la maggior parte) combinazioni è ora risparmiato.

## Prevenire il backtracking

Non è sempre conveniente riscrivere una regexp, tuttavia. Nell'esempio sopra è stato facile, ma non è sempre ovvio come farlo.

Inoltre, una regexp riscritta è solitamente più complessa e questo non va bene. Le regexp sono abbastanza complesse senza ulteriori sforzi.

Fortunatamente c'è un approccio alternativo. Possiamo proibire il backtracking per il quantificatore.

La radice del problema è che il motore regexp prova molte combinazioni che sono ovviamente sbagliate per un umano.

Ad es. nella regexp `pattern:(\d+)*$` è ovvio, per un umano, che `pattern:+` non dovrebbe operare alcun backtracking. Se rimpiazziamo un `pattern:\d+` con due `pattern:\d+\d+` separati non cambia nulla:

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

E nell'esempio originale `pattern:^(\w+\s?)*$` potremmo voler proibire il backtracking in `pattern:\w+`. Ovvero: `pattern:\w+` dovrebbe trovare una corrispondenza con una parola intera, con la massima lunghezza possibile. Non c'è alcun bisogno di ridurre il conteggio delle ripetizioni in  `pattern:\w+` o spezzarlo in due parole `pattern:\w+\w+` e così via.

I motori di espressioni regolari moderni supportano i quantificatori possessivi per questo. I quantificatori regolari divengono possessivi se aggiungiamo `pattern:+` dopo di essi. Cioè, usiamo `pattern:\d++` invece di `pattern:\d+` per evitare il backtracking di `pattern:+`.

Difatti, i quantificatori possessivi sono più semplici di quelli "regolari". Essi trovano quante più corrispondenze è possibile, senza alcun backtrack.

Ci sono anche i cosiddetti "atomic capturing groups" - un modo di disabilitare il backtracking all'interno delle parentesi.

...Ma la cattiva notizia è che, sfortunatamente, in JavaScript non sono supportati.

Possiamo emularli usando una "trasformazione lookahead".

### Lookahead in soccorso!

Così siamo giunti ai veri argomenti avanzati. Vorremmo che un quantificatore come `pattern:+` non operasse backtracking, perché delle volte il backtracking non ha senso.

Il pattern per prendere quante più ripetizioni di `pattern:\w` possibili senza backtracking è: `pattern:(?=(\w+))\1`. Naturalmente, possiamo prendere un altro pattern al posto di `pattern:\w`. 

Questo può sembrare strano, ma in realtà è una trasformazione molto semplice.

Decifriamo:

- Lookahead `pattern:?=` cerca in avanti la parola più lunga `pattern:\w+` che inizia dalla posizione corrente.
- Il contenuto delle parentesi con `pattern:?=...` non è memorizzato dal motore, quindi si racchiude `pattern:\w+` tra le parentesi. In seguito il motore memorizzerà il loro contenuto.
- ...E ci permetterà di riferirlo nel pattern come `pattern:\1`. 

Cioè: noi guardiamo in avanti - e se c'è una parola `pattern:\w+`, la si fa corrispondere a `pattern:\1`.

Perché? Perché la trasformazione lookahead trova una parola per intero `pattern:\w+` e noi la catturiamo nel pattern con `pattern:\1`. Quindi, essenzialmente, implementiamo un quantificatore (con segno più) possessivo `pattern:+`. Esso cattura solo la parola intera `pattern:\w+`, non una sua parte.

Per esempio, nella parola `subject:JavaScript` potrebbe non soltanto trovare la corrispondenza `match:Java`, ma lasciare fuori `match:Script` per trovare corrispondenze col resto del pattern.

Ecco i due pattern a confronto:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. Nella prima variante `pattern:\w+` inizialmente cattura la parola intera `subject:JavaScript` ma poi `pattern:+` usa il backtrack carattere dopo carattere nel tentativo di trovare il resto del pattern, finché alla fine riesce (quando `pattern:\w+` trova `match:Java`).
2. Nella seconda variante `pattern:(?=(\w+))` guarda in avanti e trova la parola `subject:JavaScript`, che è inclusa nel pattern, per intero, da `pattern:\1`, così non resta alcun modo per trovare `subject:Script` dopo di essa. 

Possiamo porre un'espressione regolare più complicata in `pattern:(?=(\w+))\1` al posto di `pattern:\w`, quando abbiamo bisogno di impedire il backtracking per `pattern:\+` dopo di questa.

<<<<<<< HEAD
---
=======
```smart
There's more about the relation between possessive quantifiers and lookahead in articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](https://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) and [Mimicking Atomic Groups](https://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

C'è altro materiale sulla relazione tra quantificatori possessivi e lookahead negli articoli [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) e [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups).

---

Riscriviamo il primo esempio usando un'espressione lookahead per prevenire il backtracking

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // vero

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // falso, funziona ed è veloce!
```

Qui `pattern:\2` è usato al posto di `pattern:\1`, perché ci sono parentesi esterne addizionali. Per evitare problemi con i numeri, possiamo dare un nome alle parentesi, ad esempio `pattern:(?<word>\w+)`.

```js run
// le parentesi sono denominate ?<word>, riferite come \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // falso

alert( regexp.test("A correct string") ); // vero
```

Il problema descritto in questo articolo è detto "backtracking catastrofico".

Abbiamo trattato due modi per risolverlo:
- Riscrivere la regexp per ridurre il numero di combinazioni possibili.
- Prevenire il backtracking.

