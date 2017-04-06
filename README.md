A very simple data cache

Usage (sync):

```
const Cache = require('simple-cache').Sync;

function create(id) {
    return { id:id, value:"New Element " + id } 
}

// only use the required functions here
const { get, getAll, clear, remove } = Cache.Sync(create);
 
var el = get(2);
remove(3)
clear();
```


Usage (async):

```
const Cache = require('simple-cache').Async;

function create(id) {
    return Promise.resolve({ id:id, value:"New Element " + id }) 
}

// only use the required functions here
const { get, getAll, clear, remove } = Cache.Sync(create);
 
get(2).then(el => { ... })  // only get is an async-func
remove(3)                   // this don't create data so it's sync 
clear();                    // as well as this
```




