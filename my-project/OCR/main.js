console.log(Tesseract);
// Tesseract.recognize(
//   'https://tesseract.projectnaptha.com/img/eng_bw.png',
//   'eng',
//   { logger: m => console.log(m) }
// ).then(({ data: { text } }) => {
//   console.log(1111111111);
//   console.log('data', data);
//   console.log('text', text);
// }).catch(err=>{
//   console.log(1111111111);
//   console.log(err);
// })

const { createWorker } = Tesseract

// const worker = createWorker({
// logger: m => console.log(m),
// });

// (async () => {
// await worker.load();
// await worker.loadLanguage("eng");
// await worker.initialize("eng");
// const {
//   data: { text },
// } = await worker.recognize(
//   "https://tesseract.projectnaptha.com/img/eng_bw.png"
// );
// console.log(text);
// await worker.terminate();
// })();



function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  console.log('源对象开始被拖动,DragStart...');
  ev.dataTransfer.setData("Text", ev.target.id);
  ev.dataTransfer.dropEffect = 'copy';
}
// 源对象在目标对象范围内释放
function drop(ev) {
  console.log(ev);
  console.log(ev.dataTransfer.files);
  console.log(ev.dataTransfer.files[0]);
  var file = ev.dataTransfer.files[0];//得到文件
  var fileReader = new FileReader();
  fileReader.readAsDataURL(file);//将file读为url
  fileReader.onload = function (e) {//为div添加一个图片，图片路径为拖拽的文件路径
    console.log(e);
    console.log(fileReader);
      // var img = document.createElement("img");
      // img.src = fileReader.result;
      // box.appendChild(img);
  }
  fileReader.onerror = function (e) {//为div添加一个图片，图片路径为拖拽的文件路径
    console.log(e);
    console.log(22);
      // var img = document.createElement("img");
      // img.src = fileReader.result;
      // box.appendChild(img);
  }
  fileReader.onloadend = function (e) {//为div添加一个图片，图片路径为拖拽的文件路径
    console.log(e);
    console.log(11);
      // var img = document.createElement("img");
      // img.src = fileReader.result;
      // box.appendChild(img);
  } 
  fileReader.onloadstart = function (e) {//为div添加一个图片，图片路径为拖拽的文件路径
    console.log(e);
    console.log(33);
      // var img = document.createElement("img");
      // img.src = fileReader.result;
      // box.appendChild(img);
  }
  fileReader.onprogress = function (e) {//为div添加一个图片，图片路径为拖拽的文件路径
    console.log(e);
    console.log(44);
      // var img = document.createElement("img");
      // img.src = fileReader.result;
      // box.appendChild(img);
  }
  // console.log('源对象在目标对象范围内释放,Drop...');
  // ev.preventDefault();
  // var data = ev.dataTransfer.getData("Text");
  // let node = document.createElement('img')
  // console.log( document.getElementById(data));
  // node.src = document.getElementById(data).src
  // node.width = 100
  // node.height = 100
  // ev.target.appendChild(node);
}