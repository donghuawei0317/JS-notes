let vm = new Vue({
    el: '#app',
    data: {
        hash: '',
        todo: '',
        ary: [{title: '标题', isSelect: false, isShow: false}],
    },
    computed: {
        count: {
            get(){
                let arr = this.ary.filter((item)=> {
                    return !item.isSelect
                });
                return arr.length;
            },
            set(){
            },
        },
        todoAry: {
            get(){
                localStorage.setItem('data', JSON.stringify(this.ary));
                switch (this.hash) {
                    case 'all':
                        return this.ary;
                    case 'finished':
                        return this.ary.filter((item)=> {
                            return item.isSelect;
                        });
                    case 'unfinished':
                        return this.ary.filter((item)=> {
                            return !item.isSelect;
                        });
                }
            },
            set(){
            }
        }
    },
    methods: {
        add(){
            let obj = {};
            this.todo = this.todo.trim();
            if (!this.todo)return;
            obj.title = this.todo;
            obj.isSelect = false;
            obj.isShow = false;
            this.ary.push(obj);
            this.todo = '';
        },
        remove(el){
            this.ary = this.ary.filter((item)=> {
                return el !== item;
            })
        },
        show(el){
            el.isShow = true;
        }
    },
    directives: {
        focus(el, obj){
            if (el.value) {
                el.focus();
            }
        }
    },
    created(){
        this.hash = location.hash.slice(2) || 'all';
        let arr = JSON.parse(localStorage.getItem('data'));
        this.ary = arr;
        window.onhashchange = ()=> {
            this.hash = location.hash.slice(2);
        }
    }
});
