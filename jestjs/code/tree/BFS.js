// 依次遍历根节点，然后是左孩子和右孩子,先进先出
// 3.广度优先遍历的递归写法
function wideTraversal (node) {
  let nodes = []; let i = 0
  if (node != null) {
    nodes.push(node)
    wideTraversal(node.nextElementSibling)
    node = nodes[i++]
    wideTraversal(node.firstElementChild)
  }
  return nodes
}

// 4.广度优先遍历的非递归写法
function wideTraversal1 (node) {
  let nodes = []; let i = 0
  while (node != null) {
    nodes.push(node)
    node = nodes[i++]
    let childrens = node.children
    for (let i = 0; i < childrens.length; i++) {
      nodes.push(childrens[i])
    }
  }
  return nodes
}
