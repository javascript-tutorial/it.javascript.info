

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

1. Ovviamente è true.
2. Confronto lessicografico, quindi false.
3. Nuovamente, confronto lessicografico, il primo carattere di `"2"` è maggiore del primo carattere `"1"`.
4. I valori `null` e `undefined` sono uguali solo tra di loro.
5. L'uguaglianza stretta è stretta. I tipi differenti dei due operandi portano ad un risultato false.
6. Vedi `(4)`, `null` equivale solamente a `undefined`..
7. Uguaglianza stretta di tipi differenti.
