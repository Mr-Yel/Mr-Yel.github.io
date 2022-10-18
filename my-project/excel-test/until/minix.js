function filesVerification (files) {
  if (!files) return false
  if (files.length == 0) return true
  for (let file of files) {

    if(!file.size){
      console.log('can not fond "file.size"');
      return false;
    }

    if (file.size > 1024 * 1024) {
      alert(
        "当前文件大小:" +
        Math.floor(file.size / 1024) +
        "KB,上传文件不能大于1024KB"
      );
      return false;
    }

    if(!file.name){
      console.log('can not fond "file.name"');
      return false;
    }

    let type = file.name.split(".");
    if (
      type[type.length - 1] !== "xlsx" &&
      type[type.length - 1] !== "xls"
    ) {
      alert("只能选择excel文件导入");
      return false;
    }
  }
  return true
}