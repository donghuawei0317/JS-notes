export const add = (state, obj)=> {
  state.count += obj;
};
//修改banner数据
export const changeBannerData = (state, obj)=> {
  state.bannerData = obj;
};
//修改列表数据
export const changeHomeList = (state, obj)=> {
  state.homeList = obj;
};
//修改列表页数据
export const changeListData = (state, obj)=> {
  state.dataList = state.dataList.concat(obj);
};
//删除列表页数据中的某一项
export const removeListOne = (state, obj)=> {
  //目标是把state.listData中的obj这一项删除
  state.dataList = state.dataList.filter((item)=> {
    return item !== obj;
  })
};
//添加列表页数据中的一项
export const addListOne = (state, obj)=> {
  state.dataList.unshift(obj);
};
//给收藏列表添加一项
export const addCollect = (state, obj)=> {
  state.collectList.indexOf(obj) == -1 ? state.collectList.unshift(obj) : null;
};
//给收藏列表删除一项
export const removeCollect = (state, obj)=> {
  state.collectList = state.collectList.filter((item)=> {
    return item !== obj;
  })
};
