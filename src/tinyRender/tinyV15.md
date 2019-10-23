``` javascript
class A {
    ...
    render() {
        return [
            React.createElement(
                'div', {
                    key: 'B1'
                },
                'C1',
                'C2'
            ),
            React.createElement(
                'div', {
                    key: 'B2'
                }
            )
        ]
    }
}
```

``` javascript
[

    {
        $typeof: Symbol(react.element),
        type: A,
        props: {
            children: [{
                    $typeof: ...
                },
                {
                    $typeof: ...
                }
            ]
        }
    },
    {
        $typeof: Symbol(react.element),
        type: 'div',
        key: "B1",
        props: {
            children: ['C1', 'C2']
        }
    }
]

``` 


``` javascript

class Node {

    constructor(instance) {
        this.instance = instance;
        this.child = null;
        this.sibling = null;
        this.return = null;
    }

}

``` 

``` javascript

requestIdleCallback((deadline)=>{

    //timeRemaining当前帧剩余的时间，也可理解为留给任务的时间还有多少
    //表示任务是否超时
    console.log(deadline.timeRemaining(), deadline.didTimeout)

}); 

function workLoop() {

    while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

}

requestIdleCallback((deadline) => {

    // while we have time, perform work for a part of the components tree
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

}); 

``` 

``` javascript

function workLoop() {

    while (nextUnitOfWork !== null&& !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

}

```




