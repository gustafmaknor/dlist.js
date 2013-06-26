list.js
=======
Linear list with insert sort.

  Usage
---------
list.js contains two instantiable types: ```List()``` and ```ListItem()```.

Each instance of ```List()``` can containt any amount of ```ListItem()```'s.

###List()###
List is the linear list that functions as the base of list.js.

####constructor####
The constructor takes one _optional_ parameter that functions as a comparer/filter for the list.
````
var list=new List();
````
Creates a new list with default or no sorting.
```
var list=new List(fn)
```
Creates a new list with supplied sorting function.

####Comparer/Filter####
The sorting function is applied to the inserted object, hence ```this``` will refer to the inserted object. 
The object to compare with is sent as a parameter to the function.

The sort function takes one argument wich is the object to compare to.
>Since the function also enables filtering, every object will pass through the function in order to be inserted. If, however, the object is the first t

Example:
````
var list=new List(function(obj){
  
});
