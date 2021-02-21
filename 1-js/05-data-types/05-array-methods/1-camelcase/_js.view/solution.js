function camelize(str) {
  return str
    .split('-') // divide 'my-long-word' in un array ['my', 'long', 'word']
    .map(
      // rende maiuscole le prime lettere di tutti gli elementi dell'array eccetto il primo
      // trasforma ['my', 'long', 'word'] in ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // unisce ['my', 'Long', 'Word'] in 'myLongWord'
}
