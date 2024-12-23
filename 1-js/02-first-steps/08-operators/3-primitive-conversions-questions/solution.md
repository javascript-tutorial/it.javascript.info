
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. L'addizione con una stringa `"" + 1` converte `1` a stringa: `"" + 1 = "1"`, applichiamo la stessa regola a `"1" + 0`.
2. La sottrazione `-` (come molte altre operazioni matematiche) funziona solamente con i numeri, quindi una stringa vuota come: `""` viene convertita in `0`.
3. La somma con una stringa appende in coda alla stringa il numero `5`.
4. La sottrazione converte sempre in numero, quindi `"  -9  "` diventa `-9` (gli spazi vuoti vengono ignorati).
5. `null` diventa `0` dopo la conversione numerica.
6. `undefined` diventa `NaN` dopo la conversione numerica.
7. Gli spazi all'inizio e alla fine di una stringa vengono rimossi quando questa viene convertita ad numero. In questo caso l'intera stringa è composta da spazi, come `\t`, `\n` ed uno "spazio" normale tra di essi. Quindi allo stesso modo di una stringa vuota, diventa `0`.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
