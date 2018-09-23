import axios from 'axios'
// export const addFn=({commit},obj)=>{};
export const addFn=(context,obj)=>{
  context.commit('ass',obj);
};
export const getBannerData=({commit},obj)=>{
  axios.get('/bannerlist').then((data)=> {
    console.log(data);
    this.arr=data.data.data;
    commit("changeBannerData",data.data.data)
  })
};
