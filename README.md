A very simple data cache

Usage (sync):

```
const Cache = require('simple-cache').Sync;

function create(id) {
    return { id:id, value:"New Element " + id } 
}

// only use the required functions here
const { get, getAll, clear, remove, check } = Cache.Sync(create);
 
var el = get(2);
if (check(2)) ...           // only check if 2 is cached, don't create it
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
const { get, getAll, clear, remove, check } = Cache.Sync(create);
 
get(2).then(el => { ... })  // only get is an async-func
if (check(2)) ...           // only check if 2 is cached
remove(3)                   // this don't create data so it's sync 
clear();                    // as well as this
```




