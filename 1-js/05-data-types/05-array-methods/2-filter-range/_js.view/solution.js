
function filterRange(arr, a, b) {
  //aggiunte parentesi attorno all'espressione per una migliore leggibilità
  return arr.filter(item => (a <= item && item <= b));
}