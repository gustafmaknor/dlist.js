list.js
=======
Linear list with insert sort.

  Usage
---------
list.js contains one instantiable type: ```List([comparer/filter])``` that represent a linear list. 

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
>Since the function also enables filtering, every object will pass through the function in order to be inserted.
Therefore, always check if ```obj !== undefined``` if sorting,

_Returns_
The comparer/filter shall return a number to tell the list where to add the new item in relation to the one being compared against.

* ```-1``` = new item shall be placed before current item
* ```1``` = new item shall be placed after current item
* ```0``` (or anything but 1 or -1) = do not add item

Example (no filter):
```
var list=new List(function(obj){
		if(obj!==undefined){
			if(this.getDate()>obj.getDate()){
					return -1;
				}
				else if(this.getDate()<obj.getDate()){
					return 1;
				}
				else{
					return 0;
				}
		}
	});
```
Filters can be used to wrap the comparer such as:
```
var list=new List(function(obj){
    if(this.valueToFilter==="includeInList"){
  	  if(obj!==undefined){
			  if(this.getDate()>obj.getDate()){
				  	return -1;
				  }
			  	else if(this.getDate()<obj.getDate()){
				  	return 1;
				  }
			  	else{
				  	return 0;
				  }
		  }
    }
	});
```
>To use sorting either must the function be passed as a parameter to the ```constructor``` or the objects added to the list must contain a function named ```comparer()```.
Remember that all the objects in the list must be comparable to each other in order to enable sorting.

###functions###
list.js add some helper functions to work with the data in the list.

**add(data)**

Adds an object to the list

**getItems()**

Returns an Array of all the objects in the list. The array will be sorted as the list.

**shallowCopy([comparer])**

Performes a shallow copy of the array.
Takes one _optional_ parameter which is a comprarer/filter function.

Returns a new ```List()``` containg referenses to the objects in the original. If a comparer/filter function is applied, the new ```List()```
will be sorted/filtered accordingly.

**grep(fn)**

Returns an ```Array```of objects matching the grep function command.

Example:
```
var list=new List();
//Code to dd bunch of objects to the list


//grep objects where the property 'age' is less than 32
var resultArray=list.grep(function(obj){
  return obj.age<32;
});
```

**forEach(fn, ctx)**

Iterate trough the ```List()``` anf perform a callback for each object.

Parameters:
* ```fn```= the callback function.
* ```ctx``` = the context of ```this``` in the callback.

The callback will recieve three parameters:
* _The object_ att current position
* _The index_ of the object in tje list
* _The list_ in where the object resides

**remove(fn)**

Removes objects from the ```List()```where the objects matches the filter function sent to ```remove(fn)```
The _parameter_ follows the same syntax and function as ```grep()```.

**removeAt(index)**

Removes an object at the specified _index_.

**indexOf(fn)**

Finds the first occurance of an object matching the ```fn``` filter.
The _parameter_ follows the same syntax and function as ```grep()```.







