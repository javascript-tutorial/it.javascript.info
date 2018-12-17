
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
7 / 0 = Infinity
" -9\n" + 5 = " -9\n5"
" -9\n" - 5 = -14
null + 1 = 1 // (3)
undefined + 1 = NaN // (4)
```

1. L'addizione con una stringa di `"" + 1` converte `1` a stringa: `"" + 1 = "1"`, successivamente in `"1" + 0`, viene applicatala stessa regola.
2. La sottrazione `-` (come la maggior parte delle operazioni matematiche) funzionano solo con i numeri, converte quindi una stringa vuota `""` in `0`.
3. `null` diventa `0` dopo la conversione numerica.
4. `undefined` diventa `NaN` dopo la conversione numerica.
