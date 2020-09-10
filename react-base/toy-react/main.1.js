// 1.测试打包
for(let i of [1,2,4]){
  console.log(i)
}
function createElement(tagName, attributes, ...children) {
  let e = document.createElement(tagName)
  for(let p in attributes) {
    e.setAttribute(p, attributes[p])
  }
  for(let child of children) {
    if(child) {
      if(typeof child === "string") {
        child = document.createTextNode(child)
      }
      e.appendChild(child)
    }
  }
  return e
}
window.a = <div id='a' class='v'><div>sdsd</div><div></div><div></div></div>