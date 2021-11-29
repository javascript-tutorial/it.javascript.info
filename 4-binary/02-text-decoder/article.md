# TextDecoder e TextEncoder

E se il dato binario in realtà fosse una stringa? Ad esempio, se ricevessimo un file contente dati testuali.

<<<<<<< HEAD
L'oggetto integrato [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder), dato il buffer e l'encoding, ci consente di leggere il valore come se fosse una stringa JavaScript.
=======
The built-in [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) object allows one to read the value into an actual JavaScript string, given the buffer and the encoding.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Come prima cosa dobbiamo crearlo:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`**, l'encoding di default è `utf-8`, ma sono supportati anche `big5`, `windows-1251` e molti altri.
- **`options`**, oggetto opzionale:
  - **`fatal`**, boolean, se vale `true` allora verrà generata un'eccezione per i caratteri invalidi (non-decodificabili), altrimenti (default) verranno rimpiazzati con il carattere `\uFFFD`.
  - **`ignoreBOM`**, boolean, se vale `true` allora ignora BOM (un marcatore opzionale di byte-order Unicode), raramente utilizzato.

...E successivamente decodificare:

```js
let str = decoder.decode([input], [options]);
```

- **`input`**, il `BufferSource` da decodificare.
- **`options`**, oggetto opzionale:
  - **`stream`**, `true` per la decodifica di stream, quando `decoder` viene invocato ripetutamente con blocchi di dati in arrivo. In questo caso un carattere multi-byte potrebbe venir diviso in blocchi. Questa opzione dice al `TextDecoder` di memorizzare i caratteri "incompleti" e di decodificarli all'arrivo del prossimo blocco.

Ad esempio:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Possiamo decodificare una parte del buffer creando un visualizzatore su un suo sotto-array:


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// la stringa sta al centro
// ne crea un nuovo visualizzatore, senza copiare nulla
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) fa esattamente l'operazione inversa, converte stringe in byte.

La sintassi è:

```js
let encoder = new TextEncoder();
```

L'unica codifica che supporta è "utf-8".

Mette a disposizione due metodi:
- **`encode(str)`**, ritorna `Uint8Array` partendo da una stringa.
- **`encodeInto(str, destination)`**, esegue l'encode di `str` in `destination` il quale deve essere un `Uint8Array`.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
