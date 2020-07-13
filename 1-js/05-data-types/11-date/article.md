# Date e time

Ora analizziamo un nuovo oggetto integrato: [Date](mdn:js/Date). Che memorizza la data, l'ora e fornisce dei metodi utili per il trattamento della data/ora.

Ad esempio, possiamo utilizzarlo per memorizzare modifiche su orari, o per misurare il tempo, o solamente per ottenere l'informazione della data corrente.

## Creazione

Per creare un nuovo oggetto `Date`, chiamiamo `new Date()` con uno dei seguenti argomenti:

`new Date()`
: Senza argomenti -- crea un oggetto `Date` con la data e l'ora corrente:

    ```js run
    let now = new Date();
    alert( now ); // mostra l'attuale date/time
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

    E' un modo semplice di rappresentare una data. Possiamo sempre creare una data a partire da un timestamp utilizando `new Date(timestamp)`, o possiamo convertire un oggetto `Date` esistente utilizzando il metodo `date.getTime()` (che studieremo sotto).

    Dates before 01.01.1970 have negative timestamps, e.g.:
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
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Crea la data con le informazioni fornite. Solo i primi due argomenti sono obbligatori.

    Nota:

    - Il campo `year` deve essere composto da 4 cifre: `2013` va bene, `98` non è corretto.
    - Il numero `month` inizia da `0` (Gennaio), fino a `11` (Dicembre).
    - Il parametro `date` rappresenta il giorno del mese, se non viene fornito il valore di default è `1`.
    - Se non vengono forniti `hours/minutes/seconds/ms`, il valore di default è `0`.

    Ad esempio:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
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
Molti motori JavaScript implementano una versione non standard del metodo `getYear()`. Per questo è un metodo deprecato. In alcuni casi potrebbe ritornare 2 cifre. E' sconsigliato utilizzarlo. Viene fornito un metodo più completo `getFullYear()` con lo stesso scopo.
```

In più potremmo anche prelevare il giorno della settimana:

[getDay()](mdn:js/Date/getDay)
: Fornisce il giorno della settimana, da `0` (Domenica) a `6` (Sabato). Il primo giorno è sempre Domenica, in alcuni stati non è cosi, ma non può essere modificato.

**Tutti i metodi sopra ritornano componenti relative all'orario locale.**

Esistono anche le controparti UTC, che ritornano giorno, mese, anno e moltp altro per la zona temporale UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). E' sufficiente inserire `"UTC"` appena dopo `"get"`.

Se il vostro orario locale è scostato dal UTC, allora il codice sotto potrebbe mostrare orari differenti:

```js run
// current date
let date = new Date();

// the hour in your current time zone
alert( date.getHours() );

// the hour in UTC+0 time zone (London time without daylight savings)
alert( date.getUTCHours() );
```


Oltre ai metodi forniti, ce ne sono altri due di speciali, che non possiedono la variante UTC:

[getTime()](mdn:js/Date/getTime)
: Ritorna il timestamp della data -- il numero di millisecondi trascorsi dal 1 Gennaio 1970 in UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
<<<<<<< HEAD
: Ritorna la differenza tra UTC e l'orario locale, in minuti:
=======
: Returns the difference between UTC and the local time zone, in minutes:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

    ```js run
    // if you are in timezone UTC-1, outputs 60
    // if you are in timezone UTC+3, outputs -180
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
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.
```

## Autocorrezione

L' *autocorrezione* è un caratteristica molto utile degli oggetti `Date`. Potremmo inserire valori fuori dagli intervalli, e questi verranno automaticamente aggiustati.

Ad esempio:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
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

alert( date ); // shows the correct date
```

Possiamo anche impostare zero o un valore negativo. Ad esempio:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```

## Da date a number, differenza di date 

Quando un oggetto `Date` viene convertito a numero, diventa un the timestamp come `date.getTime()`:

```js run
let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
```

Un importante effetto collaterale, le date possono essere sottratte, il risultato è la loro differenza in millisecondi.

Questa caratteristica può essere utilizzata per effettuare misurazioni:

```js run
let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

alert( `The loop took ${end - start} ms` );
```

## Date.now()

Se vogliamo solo misurare una differenza, non abbiamo bisogno di un oggetto `Date`.

Esiste uno speciale metodo `Date.now()` che ritorna il timestamp corrente.

E' equivalente a `new Date().getTime()`, ma evita di creare un oggetto `Date`. Quindi risulta più veloce e non produce spazzatura in memoria.

Viene spesso utilizzata per comodità o quando le prestazioni diventano fondamentali, come nei giochi o altre particolari applicazioni.

Quindi questo è meglio fare:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## Benchmarking

Se volessimo un benchmark affidabile del consumo di CPU di una funzione, dovremmo prestare attenzione.

Ad esempio, proviamo a misurare due funzioni che calcolano la differenza tra due date: quale sarebbe più veloce?

Such performance measurements are often called "benchmarks".

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
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

Wow! L'utilizzo di `getTime()` è molto più veloce! Questo accade perché non c'è alcuna conversione di tipo, il che risulta un operazione più semplice da ottimizzare.

Okay, abbiamo qualcosa. Ma non è sufficiente.

Immaginiamo che al momento dell'esecuzione di `bench(diffSubtract)` la CPU sia stata occupata da qualcosa che occupava risorse. E allo stesso tempo `bench(diffGetTime)` avesse finito di eseguire.

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
// run bench(upperSlice) and bench(upperLoop) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

I motori JavaScript moderni iniziano ad applicare ottimizzazioni solamente a "pezzi" di codice eseguiti molte volte (non è necessario ottimizzare codice eseguito di rado). Quindi, nell'esempio sopra, la prima esecuzione non è ben ottimizzata. Vorremmo quindi poter forzare l'ottimizzazione:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Prestate attenzione con i microbenchmarking"
I moderni motori JavaScript applicano molte ottimizzazioni. Potrebbero quindi "truccare" i risultati di un "test artificiale" a differenza del "normale utilizzo", specialmente se stiamo eseguendo bemchmark molto piccoli. 
Quindi se l'intenzione è quella di studiare le prestazioni, vale la pena studiare come funziona il motore JavaScript. Probabilmente non avrete più bisogno dei microbenchmark.

Un buona libreria di articoli può essere trovata: <http://mrale.ph>.
```

## Date.parse da una stringa

Il metodo [Date.parse(str)](mdn:js/Date/parse) può leggere una data da una stringa.

Il formato della stringa dovrebbe essere: `YYYY-MM-DDTHH:mm:ss.sssZ`, dove:

- `YYYY-MM-DD` -- è la data: year-month-day.
- Il carattere `"T"` viene utilizzato come delimitatore.
- `HH:mm:ss.sss` -- è l'orario: hours, minutes, seconds e milliseconds.
- Un parte opzionale `'Z'` che indica la zona oraria nel formato `+-hh:mm`. La singola lettera `Z` rappresenta UTC+0.

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
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, but only the first 3 are correct
```

Node.js possiede un modulo `microtime` e altri metodi. Tecnicamente, la maggior parte degli ambienti forniscono un modo per gestire precisioni più elevate, questo non è pero previsto dall'oggetto `Date`.
