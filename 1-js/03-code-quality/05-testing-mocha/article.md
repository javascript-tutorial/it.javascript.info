# Test automatici con Mocha

Il test automatico sarà utilizzato per molte attività.

Fa parte della "preparazione minima" di uno sviluppatore.

## Perché sono necessari i test?

Quando scriviamo una funzione, spesso possiamo immaginare quello che deve fare: i parametri necessari e i risultati restituiti.

Durante lo sviluppo, possiamo controllare le funzioni eseguendole e controllando se i risultati sono quelli aspettati. Ad esempio possiamo farlo tramite la console.

Se qualcosa non funziona -- allora possiamo sistemare il codice, rieseguirlo e controllare nuovamente il risultato -- e continuare a ripetere questa procedura fino a risolvere il bug.

Ma alcuni test manuali non sono sempre perfetti.

**Quando testiamo il codice manualmente rieseguendolo, è facile dimenticare qualcosa.**

Ad esempio, stiamo creando una funzione `f`. Scriviamo del codice, lo testiamo con: `f(1)` e funziona, ma con `f(2)` non funziona. Sistemiamo il codice e ora `f(2)` funziona. Il test sembra completo? Invece ci siamo dimenticati di ri-testare `f(1)`. Questo infatti potrebbe contenere un errore.

Questo è un errore tipico. Quando sviluppiamo qualcosa, cerchiamo di tenere a mente molti possibili casi di utilizzo. Ma è difficile aspettarsi che un programmatore controlli a mano il risultato dopo ogni cambiamento. Diventa quindi facile sistemare una bug e crearne uno di nuovo.

**Test automatici significa che i test vengono scritti separati, e sono complementari al codice. Possono essere facilmente eseguiti ed utilizzati per controllare i principali casi di utilizzo.**

## Behavior Driven Development (BDD)

Utilizziamo una tecnica chiamata [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) o, in breve, BDD. Questo approccio viene utilizzato in moltissimi progetti. BDD non offre solo testing, ha molte altre funzionalità.

**BDD contiene tre cose in una: test, documentazione ed esempi.**

Abbiamo parlato abbastanza. Vediamo degli esempi.

## Sviluppo di "pow": le specifiche

Vogliamo creare una funzione `pow(x, n)` che calcola la potenza di `x` per un intero `n`. Assumiamo che `n≥0`.

Questo è solo un esempio: infatti l'operatore `**` svolge quest'azione, ma concentriamoci sul flusso di sviluppo, che potremmo poi applicare a funzioni più complesse.

Prima di scrivere il codice di `pow`, possiamo immaginare cosa vogliamo che la funzione faccia e descriverlo.

Questa descrizione viene chiamata *specifica* o, in breve, spec, ed appare cosi:

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Una spec ha tre principali blocchi:

`describe("title", function() { ... })`
<<<<<<< HEAD
: Viene descritta la funzionalità. Utilizzata per raggruppare le "attività" -- i blocchi `it`. Nel nostro caso descriviamo la funzione `pow`.
=======
: What functionality we're describing? In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`it("title", function() { ... })`
: Nel titolo di `it` descriviamo il particolare caso d'uso *leggibile per gli umani*, come secondo argomento una funzione che lo testa.

`assert.equal(value1, value2)`
: Il codice all'interno del blocco `it`, se l'implementazione è corretta, dovrebbe eseguire senza errori.

    Le funzioni `assert.*` vengono utilizzate per controllare che `pow` funzioni come dovrebbe. Proprio qui ne utilizziamo una -- `assert.equal`, che confronta gli argomenti e ritorna un errore se questi non sono uguali. Qui verifichiamo che il risultato di `pow(2, 3)` sia uguale `8`.

    Ci sono molti altri tipi di confronto e controllo che vederemo più avanti.

## Il flusso di sviluppo

<<<<<<< HEAD
Il flusso di sviluppo solitamente segue i passi:
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](https://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. Viene scritta una spec iniziale, con dei test per le funzionalità di base.
2. Si crea un implementazione di base.
3. Per verificare che questa funzioni, utilizziamo un framework di testing come [Mocha](http://mochajs.org/) (presto maggiori dettagli) che esegue le spec. Vengono mostrati gli errori. Facciamo le correzioni e riproviamo finché tutto funziona correttamente.
4. Ora abbiamo un'implementazione iniziale che funziona bene con i test.
5. Aggiungiamo più casi d'uso alla spec, magari ancora non supportate dall'implementazione. Cosi i test inizieranno a fallire.
6. Quindi tornate al passo 3, aggiornate l'implementazione e continuate finché tutto non funziona correttamente.
7. Ripetete gli step 3-6 fino ad ottenere la funzionalità desiderata.

Quindi la fase di sviluppo è *iterativa*. Scriviamo la specifica, la implementiamo, ci accertiamo che passi i test, ci assicuriamo che faccia ciò che deve. Al termine di questa procedura avremmo un implementazione già testata e funzionante.

<<<<<<< HEAD
Nel nostro caso, il primo step è completo: abbiamo un specifica iniziale di `pow`. Quindi ora passiamo all'implementazione. Come prima cosa facciamo l'esecuzione "zero" con le specifiche scritte, per essere sicuri che tutto funzioni (ovviamente i test dovrebbero fallire tutti).
=======
The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use a few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## La spec in azione

In questo guida utilizzeremo le seguenti librerie JavaScript per fare test:

<<<<<<< HEAD
- [Mocha](http://mochajs.org/) -- un core framework: fornisce le maggiori funzioni di test come `describe` e `it` e le principali funzioni che eseguono i test.
- [Chai](http://chaijs.com) -- una libreria con molte asserzioni. Ci consente di utilizzare molte asserzioni differenti, per ora ci servirà solamente `assert.equal`.
- [Sinon](http://sinonjs.org/) -- una libreria per il controllo oltre le funzioni, emula funzioni integrate e molto altro, la utilizzeremo più avanti.
=======
- [Mocha](https://mochajs.org/) -- the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](https://www.chaijs.com/) -- the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](https://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Queste librerie sono utili sia per per il test browser, sia per il test lato server. Qui considereremo la variante browser.

La pagina HTML con questi framework e le spec di pow `pow`:

```html src="index.html"
```

La pagina può essere suddivisa in cinque parti:

1. `<head>` -- aggiunge librerie di terze parti e un po di stile utile per i test.
2. `<script>` con la funzione da testare, nel nostro caso -- con il codice di `pow`.
3. i test -- nel nostro caso uno script esterno `test.js` che contiene `describe("pow", ...)` visti sopra.
4. L'elemento HTML `<div id="mocha">` verrà utilizzato da Mocha per mostrare i risultati.
5. Il test viene iniziato dal comando `mocha.run()`.

Il risultato:

[iframe height=250 src="pow-1" border=1 edit]

Per ora, i test falliscono, ci sono quindi errori. Questo è ovvio: abbiamo una funzione `pow` vuota, quindi `pow(2,3)` ritorna `undefined` invece di `8`.

Per il futuro, vi faccio notare che ci sono dei test più avanzati, come [karma](https://karma-runner.github.io/) e altri. Quindi solitamente non ci saranno problemi a impostare differenti test.

## Implementazione iniziale

Proviamo a fornire una semplice implementazione di `pow`, per passare il test:

```js
function pow(x, n) {
  return 8; // :) abbiamo barato!
}
```

Wow, funziona!

[iframe height=250 src="pow-min" border=1 edit]

## Miglioriamo le spec

Quello che abbiamo fatto finora è barare. La funzione non "funziona": un tentativo di calcolare `pow(3,4)` fornirebbe un risultato scorretto, ma il test risulta comunque passato.

...Questa situazione è fra le più tipiche, nella pratica succede molto spesso. I test vengono passati ma le funzioni non lavorano correttamente. La nostra spec è imperfetta. Abbiamo bisogno di introdurre un numero maggiore di casi d'uso.

Aggiungiamo un altro test per verificare se `pow(3, 4) = 81`.

Possiamo selezionare uno dei due metodi per organizzare i test:

1. La prima variante -- aggiunger un ulteriore `assert` all'interno dello stesso `it`:

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. La seconda -- scrivere due test separati:

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

La principale differenza è che quando `assert` trova un errore, `it` si blocca e il test viene terminato. Quindi nella prima variante se il primo `assert` fallisce, allora non potremo vedere il risultato del secondo `assert`.

Scrivere test separati è utile per ottenere maggiori informazioni riguardo ciò che sta succedendo, quindi la seconda variante è la migliore.

Ed oltre a questo ci sono altre regole che sono utili da seguire.

**Un test controlla una sola cosa.**

Se guardiamo al codice di un test e vediamo che controlla due cose differenti, è meglio dividerlo in due test più semplici.

Quindi continuiamo con l'idea che la seconda variante risulta essere la migliore.

Il risultato:

[iframe height=250 src="pow-2" edit border="1"]

Proprio come ci aspettavamo, il secondo test è fallito. Ovvio, la nostra funzione ritorna sempre `8`, mentre l'`assert` si aspetta `81`.

## Migliorare l'implementazione

Proviamo a scrivere qualcosa di più sensato per passare i test:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Per essere sicuri che la funzione svolga il suo lavoro correttamente, vanno testati più valori. Piuttosto che scrivere i blocchi `it` manualmente, possiamo generarli con un ciclo `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Il risultato:

[iframe height=250 src="pow-3" edit border="1"]

## Describe annidati

Adesso aggiungeremo ulteriori test. Prima di tutto ci rendiamo conto che la funzione di supporto `makeTest` e il ciclo `for` dovrebbero essere raggruppati. Non abbiamo bisogno di una funzione `makeTest` negli altri test, è utile solo nel `for`: il loro scopo è solo di controllare come `pow` si comporta al crescere delle potenze.

Il raggruppamento viene effettuato con un `describe` annidato:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... altri test
});
```

Il `describe` annidato definisce un nuovo "sotto-gruppo" di test. Nell'output potremmo vedere l'indentazione:

[iframe height=250 src="pow-4" edit border="1"]

In futuro potremmo aggiungere più `it` e `describe` allo stesso livello, ognuno di questi avrà le proprie funzioni di supporto ma non potranno vedere `makeTest`.

````smart header="`before/after` and `beforeEach/afterEach`"
Possiamo impostare le funzione `before/after` (prima/dopo) che vengono eseguite prima/dopo i test, o addirittura le funzioni `beforeEach/afterEach` (prima di ogni/dopo di ogni) che verranno eseguite prima di *ogni* `it`.

Ad esempio:

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

La sequenza d'esecuzione sarà:

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Solitamente, `beforeEach/afterEach` (`before/each`) vengono utilizzati per eseguire inizializzazioni, azzerare i contatori o fare qualcosa prima di iniziare il prossimo test.
````

## Estendere le spec

La funzionalità di base di `pow` è completa. La prima iterazione di sviluppo è fatta. Dopo aver festeggiato e bevuto champagne -- andiamo avanti provando ad aggiungere funzionalità.

Come abbiamo detto, la funzione `pow(x, n)` è stata sviluppata per funzionare con interi positivi `n`.

Per indicare un errore matematico, JavaScript solitamente ritorna `NaN`. Facciamo lo stesso per valori non validi di `n`.

Come prima cosa aggiungiamo il nuovo comportamento alle spec(!):

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```
Il risultato con il nuovo test sarà:

[iframe height=530 src="pow-nan" edit border="1"]

I nuovi test aggiunti falliranno, perché la nostra implementazione non li supporta ancora. Cosi è come funziona BDD: prima si scrivono test in modo che falliscano, e successivamente si lavora sull'implementazione.

```smart header="Altre asserzioni"

<<<<<<< HEAD
Metto in evidenza l'asserzione `assert.isNaN`: che effettua controlli di tipo `NaN`.

In Chai sono presenti molte altre asserzioni, ad esempio:

- `assert.equal(value1, value2)` -- controlla l'uguaglianza  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- verifica l'uguaglianza stretta `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- controllo inverso a quello dell'uguaglianza stretta.
- `assert.isTrue(value)` -- esegue il controllo `value === true`
- `assert.isFalse(value)` -- verifica che `value === false`
- ...l'inter lista è disponibile nella [documentazione](http://chaijs.com/api/assert/)
=======
There are other assertions in [Chai](https://www.chaijs.com/) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](https://www.chaijs.com/api/assert/)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Dovremmo quindi aggiungere un paio di linee a `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Ora funziona, tutti i test vengono passati:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Riepilogo

In BDD, le specifiche (spec) vengono come primo passo, vengono seguite dall'implementazione. Alla fine avremmo sia le specifiche che il codice.

Le spec vengono utilizzate in tre modi:

1. **Tests** garantire che il codice funzioni correttamente.
2. **Docs** -- il titolo di `describe` e `it` specificano cosa la funzione faccia.
3. **Examples** -- i test sono dei veri e propri esempi su come la funzione si comporti e come può essere utilizzata.

Con le spec, possiamo migliorare, cambiare e anche riscrivere il codice da zero in totale sicurezza ed essere sicuri che tutto continui a funzionare come dovrebbe.

Questo è particolarmente importante specie nei grandi progetti, quando le funzioni vengono utilizzate più volte in posti diversi. Quando cambiamo una di queste funzioni, non c'è un modo pratico per controllare che queste continuino a funzionare ovunque.

Senza i test, le persone avrebbero due possibilità:

1. Cambiare qualcosa, non importa cosa. E successivamente gli utenti dovrebbero fare un rapporto quando incontrano un bug. Non sempre possiamo permetterci di farlo.
2. Essere impauriti dai cambiamenti, soprattutto se la punizione in caso di errori è severa. Un giorno queste funzioni diventeranno vecchie, e coperte di ragnatele, nessuno vorrà più utilizzarle, questa opzione non è quindi ottimale.

**Il codice testato automaticamente evita questi problemi!**

Se il progetto viene coperto dai test, non ci saranno problemi. Infatti possiamo eseguire i test ed eseguire molte verifiche in un paio di secondi.

**Inoltre, un codice ben testato ha un architettura più robusta.**

Ovvio, poiché è codice semplice da migliorare. Ma non è solo questo.

Per scrivere dei test, il codice dovrebbe essere organizzato in un modo tale che ogni funzione venga chiaramente descritta, con input e output ben definiti. Questo si ottiene progettano una buona architettura fin dal principio.

Nella vita reale qualche volta non è cosi semplice. Talvolta risulta difficile scrivere una spec prima del codice, perché non è ancora molto chiaro come dovrebbe comportarsi. Ma in generale scrivere i test rende lo sviluppo più rapido e stabile.

## E ora?

Più avanti nel tutorial incontrerai molte funzioni con i test integrati. Cosi imparerai con degli esempi pratici.

Scrivere dei test richiede delle buone conoscenze di JavaScript. Per ora possiamo imparare ad utilizzarli un passo per volta. Quindi, per ora non vi è richiesto di essere in grado di scrivere test, ma dovreste almeno essere in grado di leggerli, anche se risultano essere poco più complessi di quelli di questo capitolo.
