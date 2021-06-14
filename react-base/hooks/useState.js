let hookState = []
// 17后，每个函数组件分配一个fiber对象，状态在fiber上进行保存
let hookIndex = 0

function useState(initialState) {
    if(!hookState[index]){
        hookState[hookIndex] = initialState
    }

    let currentIndex = hookIndex
    function setState(newState) {
        hookState[currentIndex] = newState
        // 更新函数
    }
    return [hookState[hookIndex++], setState]
}