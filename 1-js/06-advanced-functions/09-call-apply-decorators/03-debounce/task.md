importance: 5

---

# Debounce decorator

Il risultato del decorator `debounce(f, ms)` è un wrapper che sospende le chiamate a `f` finché non ci sono `ms` millisecondi di inattività (nessuna chiamata, "periodo di *cooldown*"), quindi invoca `f` una volta, con gli ultimi argomenti.

In altre parole, `debounce` è come una segretaria che riceve "telefonate" e aspetta finché non ci sono `ms` di silenzio. Solo allora trasferisce le informazioni sull'ultima chiamata al "capo" (chiama effettivamente `f`).

Ad esempio, avevamo una funzione `f` e l'abbiamo sostituita con `f = debounce(f, 1000)`.

Se la funzione incapsulata viene chiamata a 0 ms, 200 ms e 500 ms, e quindi non ci sono chiamate, la `f` effettiva verrà chiamata solo una volta, a 1500 ms. Cioè dopo il periodo di *cooldown* di 1000 ms dall'ultima chiamata.

![](debounce.svg)

... E riceverà gli argomenti dell'ultima chiamata, tutte le altre chiamate vengono ignorate.

Ecco il codice, (usa il *debounce decorator* dalla [Libreria Lodash](https://lodash.com/docs/4.17.15#debounce)):

```js
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// la funzione di debounced attende 1000ms dopo l'ultima chiamata, quini esegue: alert("c")
```

Ora un esempio pratico. Diciamo che l'utente digita qualcosa, e vorremmo inviare una richiesta al server quando l'input è finito.

Non ha senso inviare la richiesta per ogni carattere digitato. Vorremmo invece aspettare, e poi elaborare l'intero risultato.

In un browser web, possiamo impostare un gestore di eventi -- una funzione che viene chiamata ad ogni modifica di un campo di input. Normalmente, un gestore di eventi viene chiamato molto spesso, per ogni tasto digitato. Ma se utilizziamo un `debounce` di 1000 ms, verrà chiamato solo una volta, dopo 1000 ms dopo l'ultimo input.

```online

In questo esempio dal vivo, il gestore inserisce il risultato in una box sottostante, provalo:

[iframe border=1 src="debounce" height=200]

Come vedi, il secondo input chiama la funzione, quindi il suo contenuto viene elaborato dopo 1000 ms dall'ultimo inserimento.
```

Quindi, `debounce` è un ottimo modo per elaborare una sequenza di eventi: che si tratti di una sequenza di pressioni di tasti, movimenti del mouse o qualsiasi altra cosa.

Aspetta il tempo specificato dopo l'ultima chiamata, quindi esegue la sua funzione, che può elaborare il risultato.

Il compito è implementare il decorator `debounce`.

Suggerimento: sono solo poche righe se ci pensi :)
