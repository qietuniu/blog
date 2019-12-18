import mergeSort from '../../code/sort/mergeSort'

test('归并排序', () => {
  expect(mergeSort([1, 12, 68, 4, 23, 6, 2])).toEqual([1, 2, 4, 6, 12, 23, 68])
})
