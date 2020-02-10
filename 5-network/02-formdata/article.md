
# FormData

Questo capitolo spiega l'invio di HTML forms: con o senza files, con campi aggiuntivi e così via.

Gli oggetti [FormData](https://xhr.spec.whatwg.org/#interface-formdata) possono aiutarci per questo scopo. Come potrai immaginare, è un oggetto che rappresenta i dati di un form HTML.

Il costruttore è:
```js
let formData = new FormData([form]);
```

Se l'elemento HTML `form` è presente, esso catturerà automaticamente tutti i relativi campi.

La cosa interessante è che i metodi per le richieste di rete, come ad esempio `fetch`, possono accettare gli oggetti `FormData` come body della richiesta. Essi sono codificati ed inviati come `Content-Type: form/multipart`. 

Dal punto di vista del server, quindi risultano essere dei comuni invii di form.

## Inviare un semplice form

Inviamo, per prima cosa, un semplice form.

Come puoi vedere, è sufficiente una singola riga:

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

In questo esempio, non è indicato il codice server-side, dato che va oltre il nostro scopo. In questo caso, il server accetta la richiesta POST e risponde con "Utente salvato".

## Metodi dell'oggetto FormData

Possiamo modificare i campi in `FormData` con i seguenti metodi:

<<<<<<< HEAD
- `formData.append(name, value)` - aggiunge un campo del form fornendo `name` e `value`,
- `formData.append(name, blob, fileName)` - aggiunge un campo come se fosse `<input type="file">`, il terzo argomento `fileName` imposta il nome del file (non il nome del campo), che corrisponderebbe al nome del file nel filesystem dell'utente,
- `formData.delete(name)` - rimuove il campo fornendo il relativo `name`,
- `formData.get(name)` - recupera il valore di un campo fornendo il relativo `name`,
- `formData.has(name)` - se esiste il campo con il relativo `name` ritorna `true`, altrimenti `false`
=======
- `formData.append(name, value)` - add a form field with the given `name` and `value`,
- `formData.append(name, blob, fileName)` - add a field as if it were `<input type="file">`, the third argument `fileName` sets file name (not form field name), as it were a name of the file in user's filesystem,
- `formData.delete(name)` - remove the field with the given `name`,
- `formData.get(name)` - get the value of the field with the given `name`,
- `formData.has(name)` - if there exists a field with the given `name`, returns `true`, otherwise `false`
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Un form è tecnicamente autorizzato ad avere più campi con lo stesso attributo `name`, di conseguenza più chiamate al metodo `append` aggiungeranno più campi con lo stesso `name`.

<<<<<<< HEAD
C'è anche il metodo `set` che ha la stessa sintassi di `append`. La differenza è che `set` rimuove tutti i campi con il relativo `name` e successivamente crea un nuovo campo. Così facendo si può essere sicuri che ci sarà un solo campo con l'attributo `name` indicato. Per il resto è esattamente come il metodo `append`:
=======
There's also method `set`, with the same syntax as `append`. The difference is that `.set` removes all fields with the given `name`, and then appends a new field. So it makes sure there's only one field with such `name`, the rest is just like `append`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

È anche possibile iterare attraverso i campi di formData usando un ciclo `for..of`:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Lista di coppia chiave/valore
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1=value1, then key2=value2
}
```

## Inviare un form con un file

Il form è sempre inviato come `Content-Type: form/multipart`, che è la codifica che consente l'invio di files. Così, i campi `<input type="file">` verranno inviati in modo simile all'invio di un normale form.

Ecco un esempio con un form di questo tipo:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Foto: <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

## Inviare un form con Blob data

Come visto nel capitolo <info:fetch>, è semplice inviare dati binari generati dinamicamente come `Blob`, ad esempio l'invio di un'immagine. Possiamo difatti fornirlo direttamente come parametro `body` di `fetch`.

Tuttavia è spesso conveniente non inviare l'immagine separatamente, bensì come parte del form, utilizzando dei campi aggiuntivi come ad esempio "name" o altro.

Inoltre, i server sono in genere più adatti ad accettare moduli con codifica multipart, piuttosto che dati binari non elaborati.

Questo esempio invia un form utilizzando un immagine da `<canvas>`, insieme ad alcuni altri campi usando `FormData`:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Nota attentamente come l'immagine `blob` viene aggiunta al form:

```js
formData.append("image", imageBlob, "image.png");
```

È come se nel form ci fosse `<input type="file" name="image">` e che gli utenti inviassero un file, prendendolo dal proprio filesystem, con nome `"image.png"` (il terzo argomento) e con `imageBlob` come dati (il secondo argomento).

Il server leggerà i dati del form ed il file, come se si trattasse di un normale invio.

## Riepilogo

Gli oggetti [FormData](https://xhr.spec.whatwg.org/#interface-formdata) sono usati per catturrare i campi dei form HTML ed inviarli usando `fetch` o altri metodi per le richieste di rete.

Possiamo creare `new FormData(form)` da un form HTML esistente, o creare direttamente un oggetto senza un relativo form, aggiungendo quindi i campi con i metodi:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Nota due peculiarità:

1. Il metodo `set` rimuoverà i campi con lo stesso nome, mentre il `append` non lo farà. Questa è l'unica differenza tra i due metodi.
2. Per inviare un file è necessario utilizzare una sintassi con tre argomenti, il cui ultimo è il nome del file, che normalmente l'utente preleverebbe dal proprio filesystem per mezzo di un `<input type="file">`.

Alcuni altri metodi sono:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

Questo è tutto!
