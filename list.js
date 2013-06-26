(function(g_ctx, undefined){
	"use strict";

var List=function(comparer){
	this.first=null;
	this.last=null;
	this.comparer=comparer;
}
List.prototype.add=function(obj){

		var ret=null;
		var comp;
		if(this.first===null){
			comp=(this.comparer!==undefined)?
					this.comparer.call(obj.data, undefined):
					1;
			if(comp===1 || comp===-1){
				this.first=obj;
			}
			ret=this.first;
		}
		else{
			var walk=true;
			var current=this.first;
			while(walk && current!==null){
				comp=(this.comparer!==undefined)?
					this.comparer.call(obj.data, current.data):
					obj.compare(current);
				if(comp===0){ // Item exists, return current
					walk=false;
					ret=current;
				}
				else if(comp===1){
					if(current.next!==null){ //Continue
						current=current.next;
					}
					else{ //Att the end, add item last
						walk=false;
						current.next=obj;
						obj.prev=current;
						this.last=obj;
						ret=obj;
					}
				}
				else{
					if(current.prev===null){ //New item before first
						current.prev=obj;
						obj.next=current;
						this.first=obj;
					}
					else{ //New item before current
						obj.prev=current.prev;
						obj.prev.next=obj;
						
						current.prev=obj
						obj.next=current;
						
					}
					ret=obj;
					walk=false;
				}
			}

		}
		return ret;
	}
List.prototype.getItems=function(){
	var current=this.first;
	var items=[];
	while(current!==null){
		items.push(current.get());
		current=current.next;
	}
	return items;
}
List.prototype.shallowCopy=function(comparer){
	var cp=new List(comparer);
	var current=this.first;
	while(current!==null){
		var listItem=new ListItem();
		listItem.data=current.get();
		cp.add(listItem);
		current=current.next;
	}
	return cp;
}

List.prototype.grep=function(fn){
	var ret=[];
	var current=this.first;
	while(current!==null){
		if(fn(current.get())){
			ret.push(current);
		}
		current=current.next;
	}
	return ret;
}
var ListItem=function(){
	this.next=null;
	this.prev=null;
	this.data=null;
}
ListItem.prototype={
	get:function(){
		return this.data;
	},
	compare:function(obj){
		return (this.data.compare)?this.data.compare(obj.data):1;
	}
};
g_ctx.List=List;
g_ctx.ListItem=ListItem;
})(this);