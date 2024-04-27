//= require axios/dist/axios.min
addEventListener('direct-upload:before-blob-request', function(event){
  var xhr = event.detail.xhr;
  var file_size = event.detail.file.size;
  console.log(event.detail)
  console.log(xhr)
  console.log(event.detail.file)
  xhr.addEventListener('load', function(event) {
    var _headers = this.response.direct_upload.headers;
    var key = this.response.key;
    _headers['Content-Type'] = 'text/plain';
    var url = 'http://up.qiniu.com/mkfile/' + file_size + '/key/' + btoa(key);
    window.storage_options = {
      url: url,
      headers: _headers
    };
  });
});

addEventListener('direct-upload:before-storage-request', function(event){
  var xhr = event.detail.xhr;
  console.log(event.detail)
  console.log(xhr)
  xhr.addEventListener('load', function(event) {
    var options = window.storage_options;
    var res = JSON.parse(this.response);
    options.method = 'post';
    options.data = res.ctx;

    axios(options).then(function(response) {
      console.log(response);
    }).catch(function(ex) {
      console.log(ex);
    })
  });
});
