export function timeStamp(time, type) {
  var date = new Date(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if (type == 1) {
    return y + '年' + m + '月' + d + '日';
  }else if(type == 2) {
    return y + '-' + m + '-' + d;
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
}
export function formatBytes(bytes,decimals) {
  // if(bytes == 0) return '0 Bytes';
  if(bytes == 0||!bytes) return ''; 
  var k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];
}
