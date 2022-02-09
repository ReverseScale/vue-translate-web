/**
 * 过滤特殊字符
 */
export function stripscript(str)  {
    var  pattern  =  new  RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var  rs  =  "";
    for  (var  i  =  0;  i  <  str.length;  i++)  {
        rs  =  rs  +  str.substr(i,  1).replace(pattern,  '');
    }
    return  rs;
}