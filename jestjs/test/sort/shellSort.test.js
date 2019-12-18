import sort from '../../code/sort/shellSort'

test('希尔排序', () => {
  expect(sort([1, 12, 68, 4, 23, 6, 2])).toEqual([1, 2, 4, 6, 12, 23, 68])
})
