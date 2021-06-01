# Alternanza (OR) |

Alternanza è un termine usato nelle espressioni regolari che, in realtà, consiste in un semplice "OR".

È indicata con un carattere di linea verticale `pattern:|`.

Supponiamo di aver bisogno di trovare il nome di un linguaggio di programmazione: HTML, PHP, Java o JavaScript.

Ecco la regexp corrispondente: `pattern:html|php|java(script)?`.

Ed ora un esempio d'uso:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

Abbiamo già incontrato una funzionalità simile: le parentesi quadre. Essi permettono di scegliere tra più caratteri, ad esempio `pattern:gr[ae]y` trova corrispondenza con `match:gray` o `match:grey`.

Le parentesi quadre consentono solo caratteri o classi di caratteri. L'alternanza consente qualsiasi espressione. Una regexp `pattern:A|B|C` significa una delle espressioni `A`, `B` o `C`.

Per esempio:

- `pattern:gr(a|e)y` ha lo stesso identico significato di `pattern:gr[ae]y`.
- `pattern:gra|ey` significa `match:gra` o `match:ey`.

Per applicare l'alternanza ad una determinata parte di un pattern, dobbiamo racchiuderla tra parentesi:
- `pattern:I love HTML|CSS` trova `match:I love HTML` o `match:CSS`.
- `pattern:I love (HTML|CSS)` corrisponde a `match:I love HTML` o `match:I love CSS`.

## Esempio: regexp per un orario

Negli articoli precedenti abbiamo effettuato un'esercitazione per realizzare una regexp e trovare un orario nel formato `hh:mm`, ad esempio `12:00`. Un semplice `pattern:\d\d:\d\d`, tuttavia, è troppo impreciso. Accetta un orario come `25:99` (poiché 99 minuti trova corrispondenza nel pattern, ma non è un orario valido).

Come possiamo migliorare questo pattern?

Possiamo cercare una corrispondenza più accurata. Per prima cosa, le ore:

- Se la prima cifra è `0` o `1`, allora la cifra successiva può essere una qualsiasi: `pattern:[01]\d`.
- Diversamente, se la prima cifra è `2`, la successiva deve essere `pattern:[0-3]`.
- Non può esserci un altro carattere come prima cifra.

Possiamo scrivere entrambe le varianti in una regexp usando l'alternanza: `pattern:[01]\d|2[0-3]`.

I minuti a seguire, essi devono essere compresi in un intervallo tra `00` e `59`. In un'espressione regolare ciò può essere reso come `pattern:[0-5]\d`: la prima cifra `0-5`, quindi un numero qualsiasi.

Unendo le ore con i minuti otteniamo il pattern seguente: `pattern:[01]\d|2[0-3]:[0-5]\d`.

Abbiamo quasi finito, ma c'è ancora un problema. L'alternanza `pattern:|` al momento sembra avvenire tra `pattern:[01]\d` e `pattern:2[0-3]:[0-5]\d`.

In altre parole: i minuti sono aggiunti al secondo termine dell'alternanza, ecco una rappresentazione più chiara:

```
[01]\d  |  2[0-3]:[0-5]\d
```

Questo pattern cerca `pattern:[01]\d` o `pattern:2[0-3]:[0-5]\d`.

Non è quello che vogliamo, l'alternanza dovrebbe riguardare solo le ore e consentire `pattern:[01]\d` o `pattern:2[0-3]`. Correggiamo racchiudendo le ore tra parentesi: `pattern:([01]\d|2[0-3]):[0-5]\d`.

Ed ecco la soluzione definitiva:

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
```
