let a1_15 = {
    name: 'a1_15',
    render: () => { return [b1_15, b2_15] }
};
let b1_15 = {
    name: 'b1_15',
    render: () => { return [{ name: 'c1_15' }, { name: 'c2_15' }] }
};
let b2_15 = {
    name: 'b2_15',
    render: () => { return '' }
};

walk(a1_15);

function walk(instance) {
    doWork(instance);
    if (instance.render) {
        const children = instance.render();
        children && children.forEach(walk);
    }
}

function doWork(o) {
    console.log('V15Loop', o.name);
}



let a1 = { name: 'a1_16', child: null, sibling: null, return: null };
let b1 = { name: 'b1_16', child: null, sibling: null, return: null };
let b2 = { name: 'b2_16', child: null, sibling: null, return: null };
let c1 = { name: 'c1_16', child: null, sibling: null, return: null };
let c2 = { name: 'c2_16', child: null, sibling: null, return: null };
a1.child = b1;
b1.sibling = b2;
b1.child = c1;
c1.sibling = c2;

b1.return = b2.return = a1;
c1.return = c2.return = b1;

let nextUnitOfWork = a1;
workLoop();

function workLoop() {
    while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
}

function performUnitOfWork(workInProgress) {
    let next = beginWork(workInProgress);
    if (next === null) {
        next = completeUnitOfWork(workInProgress);
    }
    return next;
}

function beginWork(workInProgress) {
    log('work performed for ' + workInProgress.name);
    return workInProgress.child;
}

function completeUnitOfWork(workInProgress) {
    while (true) {
        let returnFiber = workInProgress.return;
        let siblingFiber = workInProgress.sibling;

        nextUnitOfWork = completeWork(workInProgress);

        if (siblingFiber !== null) {
            return siblingFiber;
        } else if (returnFiber !== null) {
            workInProgress = returnFiber;
            continue;
        } else {
            // We've reached the root.
            return null;
        }
    }
}

function completeWork(workInProgress) {
    return null;
}

function log(message) {
    console.log('V16Loop', message);
}