Risposte: **no, sì**.

- Nello script `subject:Java` non c'è corrispondenza, dato che per `pattern:[^script]` si intende "qualunque carattere eccetto quelli dati". Quindi la regexp cerca `"Java"` seguito da uno di tali caratteri, ma c'è la fine della stringa, non ci sono caratteri dopo di esso.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
- Sì, poiché `pattern:[^script]` trova il carattere `"S"` che non è uno di `pattern:script`. Considerato che la regexp fa distinzione tra maiuscole e minuscole (non c'è il flag `pattern:i`), tratta `"S"` come un carattere differente da `"s"`.

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
    
