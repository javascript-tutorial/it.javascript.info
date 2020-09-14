

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

I motivi:

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/1-comparison-questions/solution.md
1. Ovviamente vale true.
2. Confronto lessico-grafico, quindi false.
3. Nuovamente, confronto lessico-grafico, il primo carattere di `"2"` è maggiore del primo carattere `"1"`.
4. I valori `null` e `undefined` sono uguali solo tra di loro.
5. L'uguaglianza stretta è stretta. I tipi differenti dei due operandi portano ad un risultato false.
6. Vedi `(4)`.
7. Uguaglianza stretta di tipi differenti.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/09-comparison/1-comparison-questions/solution.md
