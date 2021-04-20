Risposte: **no, sì**.

- Nello script `subject:Java` non corrisponde nulla, dato che per `pattern:[^script]` si intende "qualunque carattere eccetto quelli dati". Quindi la regexp cerca per `"Java"` seguito da uno di questi simboli, ma c'è una stringa alla fine, non ci sono symboli dopo di esso.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
- Sì, poiché la parte `pattern:[^script]` al carattere `"S"`. Non è uno di `pattern:script`. Poiché la regexp fa distinzione tra maiuscole e minuscole (non c'è il flag `pattern:i`), tratta `"S"` come un carattere differente da `"s"`.

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
