# Date e time

Ora analizziamo un nuovo oggetto integrato: [Date](mdn:js/Date). Esso memorizza la data e l'ora e fornisce dei metodi utili per il trattamento di queste.

Ad esempio, possiamo utilizzarlo per memorizzare modifiche su orari, o per misurare il tempo, o solamente per ottenere l'informazione della data corrente.

## Creazione

Per creare un nuovo oggetto `Date`, chiamiamo `new Date()` con uno dei seguenti argomenti:

`new Date()`
: Senza argomenti -- crea un oggetto `Date` con la data e l'ora corrente:

    ```js run
    let now = new Date();
    alert( now ); // mostra l'attuale data/tempo
    ```

`new Date(milliseconds)`
: Crea un oggetto `Date` con l'ora impostata al numero di millisecondi trascorsi dal 1 Gennaio 1970 UTC+0.

    ```js run
    // 0 significa 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // ora vengono aggiunte 24 ore, si ha 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Il numero di millisecondi passati da questa data vengono detti *timestamp*.

    E' un modo semplice di rappresentare una data. Possiamo sempre creare una data a partire da un timestamp utilizzando `new Date(timestamp)`, o possiamo convertire un oggetto `Date` esistente utilizzando il metodo `date.getTime()` (vedi sotto).

    Le date prima del 01.01.1970 hanno timestamps negativi, ad esempio:
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Se viene fornito un solo argomento, ed è una stringa, allora viene analizzato tramite l'algoritmo `Date.parse` (che vedremo tra poco).


    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Il tempo non è specificato, quindi si da per scontato che sia mezzanotte GMT e viene
    // corretto a seconda della timezone dove il codice viene eseguito
    // Quindi il risultato potrebbe essere
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // o
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Crea la data con le informazioni fornite. Solo i primi due argomenti sono obbligatori.

    Nota:

<<<<<<< HEAD
    - Il campo `year` deve essere composto da 4 cifre: `2013` va bene, `98` non è corretto.
    - Il numero `month` inizia da `0` (Gennaio), fino a `11` (Dicembre).
    - Il parametro `date` rappresenta il giorno del mese, se non viene fornito il valore di default è `1`.
    - Se non vengono forniti `hours/minutes/seconds/ms`, il valore di default è `0`.
=======
    - The `year` should have 4 digits. For compatibility, 2 digits are also accepted and considered `19xx`, e.g. `98` is the same as `1998` here, but always using 4 digits is strongly encouraged.
    - The `month` count starts with `0` (Jan), up to `11` (Dec).
    - The `date` parameter is actually the day of month, if absent then `1` is assumed.
    - If `hours/minutes/seconds/ms` is absent, they are assumed to be equal `0`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Ad esempio:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Gennaio 2011, 00:00:00
    new Date(2011, 0, 1); //  // lo stesso, le ore ecc sono 0 di default
    ```

    La precisione minima è 1 ms (1/1000 sec):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Accedere ai componenti di date

Ci sono diversi metodi per poter accedere a 'year', 'month' e agli altri parametri dell'oggetto `Date`. Per ricordarli meglio li divideremo in categorie.

[getFullYear()](mdn:js/Date/getFullYear)
: Fornisce il valore di 'year' (anno), (4 cifre).

[getMonth()](mdn:js/Date/getMonth)
: Fornisce il valore di 'month' (mese), **da 0 a 11**.

[getDate()](mdn:js/Date/getDate)
: Fornisce il giorno del mese, da 1 a 31, il nome del metodo potrebbe confondere.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Fornisce il valore del corrispettivo parametro.

```warn header="Not `getYear()`, but `getFullYear()`"
Molti motori JavaScript implementano una versione non standard del metodo `getYear()`, che in alcuni casi ritorna un valore a 2 cifre. Per questo è un metodo deprecato ed è sconsigliato utilizzarlo. In sostituzione esiste un metodo più completo, `getFullYear()`.
```

In più potremmo anche prelevare il giorno della settimana:

[getDay()](mdn:js/Date/getDay)
: Restituisce il giorno della settimana, da `0` (Domenica) a `6` (Sabato). Il primo giorno è sempre Domenica; in alcuni stati non è cosi, ma non può essere modificato.

**Tutti i metodi sopra ritornano componenti relativi all'orario locale.**

Esistono anche le controparti UTC, che ritornano giorno, mese, anno e molto altro per la zona temporale UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). E' sufficiente inserire `"UTC"` appena dopo `"get"`.

Se il vostro orario locale è scostato dal UTC, allora il codice sotto potrebbe mostrare orari differenti:

```js run
// data corrente 
let date = new Date();

// l'ora nella tua time zone corrente
alert( date.getHours() );

// L'ora in UTC+0 time zone (l'orario di Londra senza l'ora legale)
alert( date.getUTCHours() );
```


Oltre ai metodi forniti, ce ne sono altri due speciali, che non possiedono la variante UTC:

[getTime()](mdn:js/Date/getTime)
: Ritorna il timestamp della data -- il numero di millisecondi trascorsi dal 1 Gennaio 1970 in UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Ritorna la differenza tra UTC e l'orario locale, in minuti:

    ```js run
    // se sei in una timezone UTC-1, ritorna 60
    // se sei in una timezone UTC+3, ritorna -180
    alert( new Date().getTimezoneOffset() );

    ```

## Impostare i componenti di date 

I seguenti metodi consentono di impostare i componenti data/tempo:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (imposta la data in millisecondi dal 01.01.1970 UTC)

Ognuno dei metodi sopra, ad eccezione di `setTime()` possiedono la variante UTC, ad esempio: `setUTCHours()`.

Come possiamo vedere, alcuni metodi possono impostare più componenti in una volta sola, ad esempio `setHours`. I componenti che non vengono menzionati non verranno modificati.

Ad esempio:

```js run
let today = new Date();

today.setHours(0);
alert(today); // ancora oggi, ma l'ora è cambiata a 0

today.setHours(0, 0, 0, 0);
alert(today); // ancora oggi, ma ora è 00:00:00 preciso.
```

## Autocorrezione

L' *autocorrezione* è un caratteristica molto utile degli oggetti `Date`. Potremmo inserire valori fuori dagli intervalli, e questi verranno automaticamente aggiustati.

Ad esempio:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Gen 2013 ?!?
alert(date); // ...è il primo Feb 2013!
```

I componenti fuori dall'intervallo vengono distribuiti automaticamente.

Ipotizziamo di voler incrementare la data "28 Feb 2016" di 2 giorni. Potrebbe essere "2 Mar" o "1 Mar" nel caso di anno bisestile. Non abbiamo bisogno di pensarci. Semplicemente aggiungiamo 2 giorni. L'oggetto `Date` farà il resto:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Questa caratteristica viene utilizzata spesso per ottenere la data dopo un certo periodo di tempo. Ad esempio, proviamo ad ottenere la data di "70 secondi da adesso":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // mostra la data corretta
```

Possiamo anche impostare zero o un valore negativo. Ad esempio:

```js run
let date = new Date(2016, 0, 2); // 2 Gen 2016

date.setDate(1); // imposta il primo giorno del mese
alert( date );

date.setDate(0); // il primo giorno del mese è 1, quindi viene impostato l'ultimo giorno del mese precedente
alert( date ); // 31 Dec 2015
```

## Da date a number, differenza di date 

Quando un oggetto `Date` viene convertito a numero, diventa un the timestamp come `date.getTime()`:

```js run
let date = new Date();
alert(+date); // il numero di millisecondi, uguale a date.getTime()
```

Un importante effetto collaterale: le date possono essere sottratte; il risultato è la loro differenza in millisecondi.

Questa caratteristica può essere utilizzata per effettuare misurazioni:

```js run
let start = new Date(); // inizia a misurare il tempo

// esegui le tue operazioni
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // misura il tempo

alert( `The loop took ${end - start} ms` );
```

## Date.now()

Se vogliamo solo misurare una differenza, non abbiamo bisogno di un oggetto `Date`.

Esiste uno speciale metodo `Date.now()` che ritorna il timestamp corrente.

E' equivalente a `new Date().getTime()`, ma evita di creare un oggetto `Date`. Quindi risulta più veloce e non produce spazzatura in memoria.

Viene spesso utilizzato per comodità o quando le prestazioni diventano fondamentali, come nei giochi o altre particolari applicazioni.

Quindi è meglio fare:

```js run
*!*
let start = Date.now(); // il conto dei millisecondi dal 1 Gen 1970
*/!*

// esegui le tue operazioni
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // sottrai numeri, non date
```

## Benchmarking

Se volessimo un benchmark affidabile del consumo di CPU di una funzione, dovremmo prestare attenzione.

Ad esempio, proviamo a misurare due funzioni che calcolano la differenza tra due date: quale sarebbe più veloce?

Queste misurazioni di performance vengono spesso chiamate "benchmarks".

```js
// abbiamo date1 e date2, quale funzione ritorna più velocemente la loro differenza in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// o
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Queste due fanno esattamente la stessa cosa, ma una di lore usa esplicitamente `date.getTime()` per ottenere la data in millisecondi, mentre l'altra si appoggia alla conversione data-numero. Il risultato non cambia.

Quindi, quale delle due è più veloce?

Una prima idea potrebbe essere quella di eseguirle varie volte e misurare la differenza. Nel nostro caso, le funzioni sono molto semplici, quindi dovremmo eseguirle 100000 volte.

Proviamo a misurare:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! L'utilizzo di `getTime()` è molto più veloce! Questo accade perché non c'è alcuna conversione di tipo, il che significa un'operazione più semplice da ottimizzare.

Okay, abbiamo qualcosa. Ma non è sufficiente.

Immaginiamo che al momento dell'esecuzione di `bench(diffSubtract)` le risorse della CPU siano occupate, e che allo stesso tempo `bench(diffGetTime)` sia già stato elaborato.

Uno scenario realistico per i processori moderni.

Quindi, il primo benchmark potrebbe richiedere meno risorse CPU del secondo. E ciò potrebbe portare a conclusioni errate.

**Per eseguire benchmark più affidabili, l'intero pacchetto di benchmark dovrebbe essere eseguito più volte.**

Qui un esempio:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// esegue alternativamente bench(diffSubtract) e bench(diffGetTime) per 10 volte
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

I motori JavaScript moderni iniziano ad applicare ottimizzazioni solamente a "pezzi" di codice eseguiti molte volte (non è necessario ottimizzare un codice eseguito di rado). Quindi, nell'esempio sopra, la prima esecuzione non è ben ottimizzata. Vorremmo quindi poter forzare l'ottimizzazione:

```js
// aggiunto per "riscaldare" prima del loop principale
bench(diffSubtract);
bench(diffGetTime);

// ora benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Prestate attenzione ai microbenchmarking"
I moderni motori JavaScript applicano molte ottimizzazioni. Potrebbero quindi "truccare" i risultati di un "test artificiale" a differenza del "normale utilizzo", specialmente se stiamo eseguendo bemchmark molto piccoli. 
Quindi se l'intenzione è quella di studiare le prestazioni, vale la pena studiare come funziona il motore JavaScript. Probabilmente non avrete più bisogno dei microbenchmark.

<<<<<<< HEAD
Un buona libreria di articoli può essere trovata qui: <http://mrale.ph>.
=======
The great pack of articles about V8 can be found at <https://mrale.ph>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Date.parse da una stringa

Il metodo [Date.parse(str)](mdn:js/Date/parse) può leggere una data da una stringa.

Il formato della stringa dovrebbe essere: `YYYY-MM-DDTHH:mm:ss.sssZ`, dove:

- `YYYY-MM-DD` -- è la data: anno-mese-giorno.
- Il carattere `"T"` viene utilizzato come delimitatore.
- `HH:mm:ss.sss` -- è l'orario: ore, minuti, secondi e millisecondi.
- La parte opzionale `'Z'` indica il fuso orario nel formato `+-hh:mm`. La singola lettera `Z` rappresenta UTC+0.

Sono disponibili anche varianti più brevi, come `YYYY-MM-DD` o `YYYY-MM` o anche `YYYY`.

La chiamata a `Date.parse(str)` analizza la stringa e ritorna il timestamp (numero di millisecondi trascorsi dal 1 Gennaio 1970). Se il formato non è valido, viene ritornato `NaN`.

Ad esempio:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

Possiamo utilizzare questo metodo insieme a `new Date` per creare un oggetto dal timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

## Riepilogo

- Le date e gli orari in JavaScript sono rappresentate dall'oggetto [Date](mdn:js/Date). Non possiamo creare "solo una data" o "solo un orario": l'oggetto `Date` li gestisce entrambi.
- Il conteggio dei mesi parte da zero (Gennaio viene identificato dallo zero).
- Il conteggio dei giorni della settimana in `getDay()` inizia da zero (la Domenica).
- `Date` si auto-corregge quando inseriamo valori fuori dai limiti. Questa caratteristica è fondamentale per sommare/sottrarre giorni/mesi/ore.
- Le date possono essere sottratte, fornendo la loro differenza in millisecondi. Questo è possibile perché `Date` diventa un timestamp quando lo convertiamo al tipo numerico.
- Si utilizza `Date.now()` per ottenere più rapidamente il corrente timestamp.

Da notare che a differenza di molti altri sistemi, in JavaScript il timestamp viene espresso in millisecondi, non in secondi.

Inoltre, talvolta potremmo aver bisogno di misurazioni più precise. JavaScript non permette di gestire i microsecondi (1 milionesimo di secondo), ma molti altri ambienti forniscono questa possibilità. Ad esempio, i browser possiedono [performance.now()](mdn:api/Performance/now) che fornisce il numero di millisecondi a partire dall'inizio del caricamento della pagina con precisione al microsecondo (3 cifre dopo la virgola):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Qualcosa come: "Loading started 34731.26000000001ms ago"
// .26 è microsecondi (260 microsecondi)
// dopo il punto decimale i numeri che seguono il terzo sono errori di precisione, solo i primi tre sono corretti
```

Node.js possiede un modulo `microtime` e altri metodi. Tecnicamente, la maggior parte degli ambienti forniscono un modo per gestire precisioni più elevate, questo non è pero previsto dall'oggetto `Date`.
