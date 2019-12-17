import sort from '../../code/sort/selectSort'

test('选择排序', () => {
  expect(sort([1, 12, 68, 4, 23])).toEqual([1, 4, 12, 23, 68])
})
