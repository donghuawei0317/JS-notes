function fn(){
    i=2;
    return function(n){
        console.log(n*i++);
    }
}
var f=fn();
f(3);
fn()(4);
fn()(2);
f(2);
//

var obj = {name:'中国',age:5000};
(function(name,obj){
    arguments[0]='珠峰培训';
    obj.age=obj.age && 10;
    console.log(name,obj.age);
})(obj.name,obj);
console.log(obj.name,obj.age);

//




//-------------------------------------this

var name = "zhufengpeixun.com";
var person = {
    name: "zhufeng",
    pro: {
        name: "peixun",
        getName: function() {
            return this.name;
        },
        getName2: function () {
            return function () {
                return this.name
            }
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
person.pro.getName2()();
console.log(pepole());



//2
var num = 2;
var obj = {
    num: 2,
    fn: (function (num) {
        num *= 2;
        this.num +=1;
        return function () {
            this.num *=3;
            ++num;
            console.log(num);
        }
    })(num)
};
var fn = obj.fn;
fn(2);
obj.fn();
console.log(num, obj.num);


//3、
function a(n){
    this.x=n;
    return this
};
var x=a(5);
// a(5) --- > window.x = 5;  --->return window
// x = window;
// window.x -->window
// x = 6 ;; window.x = 6;
//obj.obj
// console.log(x,x.x);// window.x ---> window ==== window['x'] --> window
var y=a(6);// window.x = 6; -->return window
// y = window;
// x = 6;
// 6.x  undefined
// console.log(x.x);// undefined
console.log(y.x);// window.x  -->  6

var a = 12;
a.a=10;
console.log(a.a);//undefined

//4、
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        // console.log(this.name);
        return function () {
            console.log(this.name)
        }
    }
};
var fn =a.fn();
fn();
a.fn()();