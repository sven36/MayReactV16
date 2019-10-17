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
            children: [
                {$typeof: ...},
                {$typeof: ...}
            ]
        }
    },
    {
        $typeof: Symbol(react.element),
        type: 'div',
        key: "B1",
        props: {
            children: ['C1','C2']
        }
    },
    {
        $typeof: Symbol(react.element),
        type: 'div',
        key: "B2",
        props: null
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

