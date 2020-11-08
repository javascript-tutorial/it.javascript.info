L'esercizio dimostrava come le forme prefissa/postfissa possono portare a risultati differenti.

1. **Da 1 a 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    Il primo valore è `i = 1`, perchè `++i` incrementa prima `i` e poi ritorna il nuovo valore. Quindi il primo confronto è `1 < 5` e `alert` mostra `1`.

    Poi seguono `2, 3, 4…` -- i valori vengono mostrati uno dopo l'altro. Il confroto utilizza sempre il valose incrementato, perchè `++` è posto prima della variabile.

    Ultima iterazione, `i = 4` viene incrementato a `5`, il confronto `while(5 < 5)` fallisce, e il ciclo termina. Quindi `5` non viene mostrato.

2. **Da 1 a 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    Il primo valore è ancora `i = 1`. La forma postfissa `i++` incrementa `i` e ritorna il *vecchio* valore, quindi il confronto `i++ < 5` utilizza `i = 0` (a differenza di `++i < 5`).

    La chiamata ad `alert` è separata. E' un istruzione che viene eseguita dopo l'incremento e il confronto. Quindi avra il valore `i = 1`.

    Seguono `2, 3, 4…`

    Fermiamoci a `i = 4`. La forma prefissa `++i` incrementerebbe ed utilizzerebbe `5` nel confronto. Qui però stiamo usando la forma postfissa `i++`. Quindi incrementa `i`a `5`, ma ritorna il vecchio valore. Il confronto è `while(4 < 5)` -- vero, il controllo passa alla chiamata `alert`.

    Il valore `i = 5` è l'ultimo, perchè nello step successivo avremmo `while(5 < 5)` che è falso.
