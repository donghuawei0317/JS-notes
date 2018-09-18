let vm = new Vue({
    el: '#app',
    data: {
        todo: '',//任务标题
        hash: '',
        // flag:false,
        // count:1,
        ary: [{title: '示例', isSelect: false, isShow: false}],//任务列表
    },
    created(){
        this.hash = location.hash.slice(2) || 'all';
        let arr=JSON.parse(localStorage.getItem('myTodoData'));
        this.ary=arr;
        window.onhashchange = ()=> {
            this.hash = location.hash.slice(2);
        }
    },
    computed: {
        count: {
            get(){
                //过滤出ary中未完成的项目
                let arr = this.ary.filter((item)=> {
                    return !item.isSelect;
                });
                //count是要的 未完成事务的个数
                return arr.length;
            },
            set(){
            }
        },
        todoAry:{
            //根据路由返回不同的列表
            get(){
                //只要ary发生改变，就要把数据更新到localStorage
                localStorage.setItem('myTodoData',JSON.stringify(this.ary));
                switch(this.hash){
                    case 'all':
                        return this.ary;
                    case 'finished':
                        return this.ary.filter((item)=>{
                            return item.isSelect;
                        });
                    case 'unfinished':
                        return this.ary.filter((item)=>{
                            return !item.isSelect;
                        });
                }
            },
            set(){}
        }
    },
    directives: {
        focus(el, obj){
            if (obj.value) {
                el.focus();
            }
        }
    },
    methods: {
        //———按回车键执行的函数———
        add(){
            //用来给任务列表添加任务
            let obj = {};
            // this.todo=this.todo.replace(/^ +| +$/g,'');
            this.todo = this.todo.trim();//字符串原生的方法，去除首尾空格
            if (!this.todo)return;//如果没有输入就按回车键，就不执行下面的代码
            obj.title = this.todo;//任务标题
            obj.isSelect = false;//是否选中
            obj.show = false;//是否显示input框
            this.ary.push(obj);//新增的任务添加到列表里
            this.todo = '';//把输入框清空
        },
        remove(cur){
            //删除当前任务
            this.ary = this.ary.filter((item)=> {
                return cur !== item;
            })
        },
        show(item){
            item.isShow = true;
        }
    }
});
