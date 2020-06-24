// 观察者模式又称为发布订阅模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生改变时就会通知所有观察者对象。
// 它由两类对象组成，主题和观察者，主题负责发布事件，同时观察者通过订阅这些事件来观察主题，发布者和订阅者是完全解藕的，彼此不知道对方的存在，两者仅仅共享一个自定义事件的名称。
// 在javascript中事件监听机制可以理解未一种观察者模式。通过onclick进行事件绑定，然后通过交互行为进行粗发或者事件主动触发。

// 定义观察者类
function Pubsub(){
    this.handles = {};
}

Pubsub.prototype = {
    on: function(type, handle){
        if(!this.handles[type]){
            this.handles[type] = [];
        }
        this.handles[type].push(handle);
        console.log(this.handles);
    },
    emit: function(){
        var type = Array.prototype.shift.call(arguments);
        if(!this.handles[type]){
            return false;
        }
        for(var i=0;i<this.handles[type].length;i++){
            var handle = this.handles[type][i];
            handle.apply(this, arguments);
        }
    },
    off: function(type, handle){
        handles = this.handles[type];
        if(handles){
            if(!handle){
                this.handles.length = 0;
            }else{
                for(var i = 0;i < this.handles.length; i++){
                    var _handle = this.handles[i];
                    if(_handle === handle){
                        this.handles.splice(i, 1);
                    }
                }
            }
        }
    }
}

// var p1 = new Pubsub();
// p1.on('mm', function(name){
//     console.log('mm: ' + name);
// })
// p1.emit('mm', '哈哈哈');
// console.log('====================');

var p2 = new Pubsub();
var fn = function(name){
    console.log('mm2: ' + name);
}
var fn2 = function(name){
    console.log('mm222: ' + name);
}
p2.on('mm2', fn);
p2.on('mm222', fn2);
p2.emit('mm2', '哈哈哈2');
// console.log('====================');

// p2.off('mm2', fn);
// p2.emit('mm2', '哈哈哈哈222')