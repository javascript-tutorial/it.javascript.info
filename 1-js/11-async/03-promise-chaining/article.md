
# Concatenamento di promise (promise chaining)

Ritorniamo al problema di cui abbiamo parlato in <info:callbacks>: abbiamo una sequenza di task asincroni da essere completati uno dopo l'altro. Per esempio caricare script. Cosa possiamo fare per programmarla bene?

Le promise ci danno un po' di ricette per farlo.

In questo capitolo copriremo il concatenamento di promise (promise chaining).

Il concatenamento di promise ha questo aspetto:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

L'idea è che il risultato viene passato attraverso la catena di gestori (handler) `.then`.

Il flusso dell'esempio è:
1. La promise iniziale è risolta (resolves) in 1 secondo `(*)`,
2. Poi (then) il `.then` viene chiamato `(**)`.
3. Il valore che ritorna è passato al prossimo gestore (handler) `.then` `(***)`
4. ...e così via.

Mano a mano che il risultato viene passato attraverso la catena di gestori (handler), possiamo vedere una sequenza di chiamate `alert`: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

Tutto questo funziona, perché una chiamata a `promise.then` ritorna una promise, in questo modo possiamo chiamare il `.then` sula promise ritornata.

Quando un gestore (handler) ritorna un valore, questo diventa il risultato della promise con il quale sarà chiamato il prossimo `.then`.

**Un classico errore da newbie: tecnicamente possiamo anche aggiungere diversi `.then` ad una sola promise. Questo non è il concatenamento(chaining).**

Per esempio:
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

<<<<<<< HEAD
Quello che abbiamo fatto è giusto aggiungere diversi gestori (handler) ad una promise. I gestori (handler) si passano il risultato tra loro, al contrario lo processano indipendentemente.
=======
What we did here is just adding several handlers to one promise. They don't pass the result to each other; instead they process it independently.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco una figura (da paragonare con il concatenamento di sopra):

![](promise-then-many.svg)

Tutti i `.then` sulla stessa promise ricevono lo stesso risultato -- il risultato della promise. Così nel codice sopra tutti gli `alert` mostrano lo stesso: `1`.

Nella pratica raramente avremo bisogno di molti gestori (handler) per la stessa promise. Il concatenamento (chaining) è usato molto più spesso.

## Ritornare promise

Normalmente, il valore ritornato da un gestore (handler) `.then(handler)` è passato immediatamente a quello successivo. Ma esiste un'eccezione.

Se il valore ritornato è una promise, allora l'esecuzione è sospesa fino a quando la promise è ferma (settled). Dopo di ciò, il risultato della promise viene passato al prossimo gestore (handler) `.then`.

Per esempio:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

<<<<<<< HEAD
Qui il primo `.then` mostra `1` e ritorna `new Promise(…)` nella linea `(*)`. Dopo un secondo la promise ritorata risolve (resolves), ed il risultato (l'argomento di `resolve`, che è `result*2`) viene passato al secondo gestore (handler) `.then` nella linea `(**)`. Infine mostra `2` e fa la stessa cosa.
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to the handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi l'output è ancora 1 -> 2 -> 4, ma ora con un secondo di ritardo tra le chiamate `alert`.

Ritornare le promise ci permette di creare una catena di azioni asincrone.

## Esempio: loadScript

Usiamo questa feature con `loadScript`, definita nel [capitolo precedente](/promise-basics#loadscript), per caricare gli script uno ad uno, in sequenza:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // usiamo le funzioni dichiarate negli gli script
    // per mostrare che hanno effettivamente caricato
    one();
    two();
    three();
  });
```

Questo codice può essere reso un po' più corto con le funzioni a freccia:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // scripts are loaded, we can use functions declared there
    one();
    two();
    three();
  });
```


Qui ogni chiamata `loadScript` ritorna una promise, ed il prossimo `.then` viene eseguito quando la promise risolve (resolves). Poi inizia il caricamento del prossimo script. Così gli script vengono caricati uno dopo l'altro.

Possiamo aggiungere più azioni asincrone alla catena. È da notare che il codice rimane "piatto", cresce verso il basso, non verso destra. Non ci sono segni di "pyramid of doom".

È da notare che tecnicamente possiamo aggiungere`.then` direttamente ad ogni `loadScript`, come qui:

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // this function has access to variables script1, script2 and script3
      one();
      two();
      three();
    });
  });
});
```

Questo codice fa lo stesso: carica 3 script in sequenza. Ma "cresce verso destra". Così abbiamo lo stesso problema che con le callback.

Le persone che iniziano ad usare le promise spesso non sono a conoscenza del concatenamento (chaining), così le scrivono in questo modo. In generale, è preferito il concatenamento (chaining).

A volte va bene scrivere `.then` direttamente, perché la funzione annidata abbia accesso allo scope esterno. Nell'esempio sopra la callback più annidata ha accesso a tutte le variabili `script1`, `script2`, `script3`. Ma è un'eccezione più che una regola.


````smart header="Thenables"
Per essere precisi, `.then` può ritornare un qualsiasi oggetto "thenable", che verrà trattato nella stessa maniera di una promise.

Un oggetto "thenable" è un qualsiasi oggetto con un metodo `.then`.

L'idea è che librerie di terze parti possano implementare oggetti "promise compatibili" per conto loro. Possono avere un insieme esteso di metodi, ma anche essere compatibili con le promise native, poiché implementano `.then`.

Ecco un esempio di un oggetto "thenable":

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // shows 2 after 1000ms
```

JavaScript controlla l'oggetto ritornato dall'handler `.then` nella linea `(*)`: Se ha un metodo chiamabile chiamato `then`, quindi chiama quel metodo passandogli come argomenti le funzioni native `resolve`, `reject` (in modo simile all'esecutore) ed aspetta fino a quando una delle due viene chiamata. Nell'esempio sopra `resolve(2)` è chiamata dopo un secondo `(**)`. Poi il risultato viene passato giù nella catena.

Questa feature permette di integrare oggetti custom con le catene di promise senza dover estendere `Promise`.
````


## Esempio più grande: fetch

<<<<<<< HEAD
Nella programmazione frontend le promise sono spesso usate per le richieste di rete. Vediamone un esempio esteso.
=======
In frontend programming, promises are often used for network requests. So let's see an extended example of that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Useremo il metodo [fetch](info:fetch) per caricare le informazioni sull'utente dal server remoto. Il metodo è abbastanza complesso, ha diversi parametri opzionali che studieremo in [separate chapters](info:fetch), ma l'utilizzo base è semplice:

```js
let promise = fetch(url);
```

Questo fa una richiesta di rete all'`url`  e ritorna una promise. La promise risolve (resolves) con un oggetto `response` appen il server remoto risponde con gli header, ma *prima che la risposta completa sia scaricata*.

Per leggere la risposta completa, dovremo chiamare un metodo `response.text()`: questo metodo ritorna una promise che risolve (resolves) quando tutto il testo è scaricato dal server remoto, con questo come risultato.

Il codice sotto fa una richiesta ad `user.json` e carica il suo testo dal server:

```js run
fetch('/article/promise-chaining/user.json')
  // il then sotto viene eseguito quando il server remoto risponde
  .then(function(response) {
    // response.text() ritorna una nuova promise che risolve il testo completo della risposta
    // quando abbiamo finito di scaricarlo
    return response.text();
  })
  .then(function(text) {
    // ...ed ecco il contenuto del file remoto
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

C'è anche un metodo `response.json()` che legge i dati remoti e li parsa come JSON. Nel nostro caso è ancora più conveniente, quindi usiamolo.

Useremo anche le funzioni a freccia per brevità:

```js run
// come sopra, ma response.json() parsa il contenuto remoto come JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name
```

Ora facciamo qualcosa con l'utente caricato.

Per esempio possiamo fare un'altra richiesta a GitHub, caricare il profilo utente e mostrare l'avatar:

```js run
// Fa una richiesta per user.json
fetch('/article/promise-chaining/user.json')
  // Carica la risposta come json
  .then(response => response.json())
  // Fa una richiesta a GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Carica la risposta come json
  .then(response => response.json())
  // Mostra l'immagine dell'avatar (githubUser.avatar_url) per tre secondi (magari la2)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

Il codice funziona, possiamo vedere i dettagli nei commenti, ma dovrebbe essere abbastanza autodescrittivo. Tuttavia, c'è un potenziale errore, un errore tipico di chi inizia ad utilizzare le promise.

Guardiamo la linea `(*)`: come possiamo fare qualcosa *dopo* che l'avatar ha finito di essere mostrato e viene rimosso? Per esempio, ci piacerebbe mostrare un form per editare quell'utente o fare qualcos'altro. Allo stato attuale, non c'è modo.

Per mantenere la catena estensibile, dobbiamo ritornare una promise che si risolve (resolves) dopo che l'avatar finisce di mostrare.

Come qui:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser); // (**)
*/!*
    }, 3000);
  }))
  // viene eseguito dopo 3 secondi
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

Ora subito dopo che `setTimeout` esegue `img.remove()`, chiama `resolve(githubUser)`, passando il controllo al prossimo `.then` nella catena e passando avanti i dati dell'utente.

Come regola, un'azione asincrona dovrebbe sempre ritornare una promise.

Questo rende possibile pianificare azioni successive. Anche se non abbiamo in piano di estendere la catena adesso, potremmo averne bisogno in seguito.

In fine, possiamo dividere il codice in funzioni riutilizzabili:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Usiamole:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

## Riassunto

Se un handler `.then` (o `catch/finally`, non importa) ritorna una promise, il resto della catena aspetta fino a quando la promise si ferma (settles). Quando lo fa, il suo risultato (o errore) è passato avanti.

Ecco un disegno esteso:

![](promise-handler-variants.svg)
