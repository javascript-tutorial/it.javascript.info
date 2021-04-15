# Confine di parola: \b

Il confine di parola `pattern:\b` è un test, proprio come `pattern:^` e `pattern:$`.

Quando l'interprete delle regexp (il modulo software che cerca all'interno delle espressioni regolari) incontra `pattern:\b`, verifica se la posizione nella stringa sia un confine di parola.

Ci sono tre differenti posizioni che qualificano il confine di parola:

- Ad inizio stringa, se il primo carattere di essa è un carattere di parola `pattern:\w`.
- Tra due caratteri di una stringa, laddove il primo sia un carattere di parola `pattern:\w` e l'altro no.
- A fine stringa, se l'ultimo carattere è un carattere di parola `pattern:\w`.

Ad esempio, la regexp `pattern:\bJava\b` troverà corrispondenza in `subject:Hello, Java!`, dove `subject:Java` è una parola a sé, ma non troverà alcuna corrispondenza in `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

Nella stringa `subject:Hello, Java!` trovano riscontro in `pattern:\b` le seguenti posizioni:

![](hello-java-boundaries.svg)

Pertanto la corrispondenza con il pattern `pattern:\bHello\b` viene trovata perché:

1. All'inizio della stringa trova riscontro con il primo test `pattern:\b`.
2. Successivamente identifica la parola `pattern:Hello`.
3. Infine trova ancora corrispondenza con il test `pattern:\b`, dal momento che la posizione corrente è tra una `subject:o` e una virgola.

Viene quindi individuato il pattern `pattern:\bHello\b`, ma non `pattern:\bHell\b` (perché non c'è un confine di parola dopo la `l`) e non `Java!\b` (perché il punto esclamativo non è un carattere di parola `pattern:\w`, quindi non c'è confine di parola dopo di esso).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (nessuna corrispondenza)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (nessuna corrispondenza)
```

Possiamo usare `pattern:\b` anche con i numeri non solo con le parole.

Il pattern `pattern:\b\d\d\b`, ad esempio, cerca due caratteri numerici a sé stanti. In altre parole, cerca un numero di due cifre delimitato da caratteri differenti da `pattern:\w`, come spazi o punteggiatura (o l'inizio/la fine della stringa).

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="Il confine di parola `pattern:\b` funziona solo con l'alfabeto latino"
Il test di confine parola `pattern:\b` controlla che ci sia `pattern:\w` da un lato della posizione e che non ci sia `pattern:\w` dall'altro lato.

Ma `pattern:\w` significa una lettera dell'alfabeto latino `a-z` (o un numero o un underscore), pertanto il test non è efficace per altri caratteri, es. caratteri cirillici o simboli grafici.
```
