/*
* JS盒子模型：
*     - client:
*     clientWidth=width+padding-right+padding-left
*     clientHeight=height+padding-top+padding-bottom
*     clientLeft=border-left
*     clientTop=border-top
*     - offset:
*     offsetWidth=clientWidth+border-left+border-right
*     offsetHeight=clientHeight+border-left+border-right
*     offsetLeft=盒子的外边框到上级参照物内边框的距离
*     offsetTop=盒子外边框到上级参照物内边框的距离
*     offsetParent：上级参照物（有定位的父级盒子，注意table！）
*     - scroll:
*     scrollWidth=内容没有溢出时，等于clientWidth；
*                 内容有溢出时，等于内容宽度+padding-left，
*                 此时若设置了overflow:hidden，等于内容宽度+padding-left+padding-right
*     scrollHeight=
*
* 获取一屏的高度
* */
