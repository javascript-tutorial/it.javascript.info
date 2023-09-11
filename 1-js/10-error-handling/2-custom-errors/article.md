# Errori personalizzati, estendere la classe Error

Quando sviluppiamo qualcosa, spesso nasce la necessità di avere delle classi di errore che riflettano eventi specifici che possono accadere nei nostri tasks. Per errori durante le operazioni di rete abbiamo bisogno di `HttpError`, per operazioni sul database `DbError`, per operazioni di ricerca `NotFoundError` e così via.

Le classi di errore dovrebbero supportare delle proprietà di base come `message`, `name` e, preferibilimente, `stack`. Ma possono anche avere altre proprietà, a.e. l'oggeto `HttpError` può avere una proprietà `statusCode` con valori tipo `404` o `403` o `500`.

JavaScript permette di usare `throw` con un argomento, quindi tecnicamente non è necessario che le nostre classi personalizzate ereditino da `Error`. Ma se ereditiamo, diventa possibile utilizzare `obj instanceof Error` per identificare gli oggetti di tipo errore. Quindi è meglio ereditare da esso.

Man mano che l'applicazione cresce, i nostri errori formeranno naturalmente una gerarchia. Per esempio, `HttpTimeoutError` può ereditare da `HttpError`, e così via.

## Estendere "Error"

Come esempio, consideriamo una funzione `readUser(json)` che dovrebbe leggere un JSON con i dati dell'utente.

Questo è un esempio di come dovrebbe apparire un `json` valido:
```js
let json = `{ "name": "John", "age": 30 }`;
```

Internamente, useremo `JSON.parse` che, se riceve un `json` malformato, lancia `SyntaxError`. Ma anche se il `json` è sintatticamente corretto, questo non significa che sia un utente valido, ok? Potrebbero mancare i dati necessari. Ad esempio, potrebbe non avere le proprietà `name` e `age` che sono essenziali per i nostri utenti.

La nostra funzione `readUser(json)` non solo leggerà il JSON, ma validerà i dati. Se non ci sono i campi richiesti, o il formato è errato, allora c'è un errore. E non è un `SyntaxError`, dato che è sintatticamente corretto, ma un altro tipo di errore. Lo chiameremo `ValidationError` e creeremo una classe per esso. Un errore di questo tipo dovrebbe contenere le informazioni riguardo il campo incriminato.

La nostra classe `ValidationError` dovrebbe ereditare dalla built-in class `Error`.

Questa classe è incorporata, ma ecco il suo codice approssimativo per capire meglio come la andremo ad estendere:

```js
// Il "pseudocodice" per la built-in class Error definita da JavaScript
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (differenti nomi per differenti classi di errori incorporate)
    this.stack = <call stack>; // non-standard, ma la maggior parte degli ambienti lo supporta
  }
}
```

Ora ereditiamo `ValidationError` da esso e proviamolo in azione:

```js run
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // a list of nested calls with line numbers for each
}
```

Poniamo attenzione: alla linea `(1)` richiamiamo il construtto genitore. JavaScript ci richiede di richiamare `super` nel construtto figlio, quindi è obbligatorio. Il construtto genitore imposta la proprietà `message`.

Il genitore imposta anche la proprietà `name` in `"Error"`, quindi nella linea `(2)` re-impostiamo il corretto valore.

Proviamo ad usarlo in `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Utilizzo
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("Manca un campo: age");
  }
  if (!user.name) {
    throw new ValidationError("Manca un campo: name");
  }

  return user;
}

// Esempio funzionante con try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Dati non Validi: Manca un campo: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // errore sconosciuto, lo rilancio (**)
  }
}
```

Il blocco `try..catch` nel codice qui sopra gestisce sia il nostro `ValidationError` che l'errore `SyntaxError` lanciato da `JSON.parse`.

Poniamo particolare attenzione a come usiamo `instanceof` per verificare errori specifici nella linea `(*)`.

Potremmo anche verificare tramite `err.name`, nel seguente modo:

```js
// ...
// al posto di (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

La versione con `instanceof` è sicuramente migliore, perchè in futuro andremo a estendere `ValidationError`, creando sottotipi di esso, come `PropertyRequiredError`. E il controllo `instanceof` continuerà a funzionare per le nuove classi ereditate. Quindi è a prova di futuro.

È anche importante che se `catch` incontra un errore sconosciuto, lo rilanci alla linea `(**)`. Il blocco `catch` sa solamente come gestire la validazione e gli errori di sintassi, altri tipi (ad esempio un errore di battitura nel codice o altri sconosciuti) dovrebbero fallire.

## Ulteriori Eredità

La classe `ValidationError` è veramente generica. Molte cose possono andare storte. Una proprietà può essere assente o può essere in un formato sbagliato (come una stringa per `age`). Quindi creiamo una classe più concreta `PropertyRequiredError`, esattamente per le proprietà assenti. Essa conterrà le informazioni addizionali riguardo le proprietà che mancano.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Manca la proprietà: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Uso
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Esempio funzionante con try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Dati non validi: " + err.message); // Dati non validi: Manca una proprietà: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

La nuova classe `PropertyRequiredError` è facile da usare: dobbiamo solamente fornire il nome della proprietà: `new PropertyRequiredError(property)`. Il messaggio `message` è generato dal construttore.

Poniamo particolare attenzione al fatto che `this.name` nel construttore `PropertyRequiredError` è di nuovo assegnato manualmente. Questa cosa potrebbe risultare un po' noiosa -- assegnare `this.name = <class name>` in ogni errore personalizzato. Possiamo evitarlo creando la nostra classe "basic error" che assegna `this.name = this.constructor.name`, quindi ereditare da questa  tutti i nostri errori personalizzati.

Quindi chiamiamola `MyError`.

Qui il codice con `MyError` e altre classi personalizzate, semplificate:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Ora il codice degli errori personalizzati sarà più corto, specialmente `ValidationError`, dato che ci siamo sbarazzati della linea con `"this.name = ..."` nel construttore.

## Wrapping exceptions

Lo scopo della funzione `readUser` nel codice precedente è di "leggere i dati dell'utente". Possono accadere diverse cose durante questo processo. Per adesso abbiamo `SyntaxError` e `ValidationError`, ma in futuro la funzione `readUser` potrebbe crescere e probabilmente generare altri tipi di errore.

Il codice che richiama `readUser` dovrebbe gestire questi errori. Per ora utilizziamo diversi `if` nel blocco `catch`, che verificano la classe, ne gestiscono gli errori e rilanciano quelli sconosciuti.

Lo schema è simile al seguente:

```js
try {
  ...
  readUser()  // La potenziale fonte di errore
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // gestisco gli errori di validazione
  } else if (err instanceof SyntaxError) {
    // gestisco gli errori di sintassi
  } else {
    throw err; // errore sconosciuto, lo rilancio
  }
}
```

Nel codice qui sopra possiamo notare due tipi di errore, ma ce ne possono essere molti di più.

Se la funzione `readUser` genera diversi tipi di errore, allora dovremmo chiederci: vogliamo veramente controllare tutti i tipi di errore un alla volta ogni volta?

Spesso la risposta è "No": vorremo stare tutto sommato "un livello sopra tutto questo". A noi interessa sapere se c'è un "errore nella lettura dei dati" -- perchè esattamente questo accada è spesso irrilevante (il messaggio di errore già lo descrive). O, ancora meglio, vorremo avere un modo per ottenere i dettagli dell'errore, ma solo quando ne abbiamo bisogno.

La tecnica che andiamo qui a descrivere è chiamata "wrapping exceptions".

1. Creeremo una nuova classe `ReadError` che rappresenta un errore generico di "lettura dei dati".
2. La funzione `readUser` catturerà gli errori di lettura che avvengono al suo interno, come `ValidationError` e `SyntaxError`, e genererà un `ReadError`.
3. L'oggetto `ReadError` terrà i riferimenti all'errore originale nella sua proprietà `cause`.

Quindi il codice che richiama `readUser` dovrà solamente controllare se si verifica un `ReadError`, e non ogni tipo di errore nella lettura dei dati. E se abbiamo la necessità di approfondire i dettagli dell'errore, lo potremo fare controllando la proprietà `cause`.

Questo è il codice che definisce `ReadError` e la dimostrazione di come usarlo in `readUser` e nel `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // L'errore originale: SyntaxError: token inaspettato nel JSON alla posizione 1
    alert("Errore originale: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

Nel codice qui sopra, `readUser` funziona esattamente come descritto -- Intercetta gli errori di sintassi e di validazione e lancia l'errore `ReadError` (gli errori sconosciuti saranno rilanciati come prima).

Quindi il codice più esterno controllerà per `instanceof ReadError` e basta. Non è necessario controllare tutti i tipi di errore.

Questo approccio è chiamato "wrapping exceptions", perchè controlliamo le eccezioni di "basso livello" e le "inglobiamo" in `ReadError` che è più astratto. Questo approccio è largamente utilizzato nella programmazione ad oggetti.

## Sommario

- Possiamo ereditare da `Error` e altri classi di errore incorporate. Dobbiamo fare attenzione alla proprietà `name` e non dimenticare di richiamare `super`.
- Possiamo utilizzare `instanceof` per controllare un errore particolare. Questo funziona anche con l'ereditarietà. Ma a volte abbiamo un oggetto di tipo errore che proviene da librerie di terze parti e non c'è un modo semplice per verificare queste classi. Possiamo quindi usare la proprietà `name` per fare un minimo di verifica.
- "Wrapping exceptions" è una tecnica molto usata: una funzione gestisce le eccezioni di basso livello e crea errori di alto livello anziché singoli errori di basso livello. Le eccezioni di basso livello diventano proprietà dell'oggeto, come `err.cause` nell'esempio visto, ma non è strettamente richiesto.
