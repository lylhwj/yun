<template>
  <div class="w-upload">
    <el-alert title="警告：严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息。并积极配合展开“扫黄打非”净网行动。" type="warning"></el-alert>
    <div style='padding:20px;'>
      <form>
        <div id="uploadForm" class="border fct upload_box" @click="submit">
          <span class="ico_upload"></span>
          <p class="f16 gray">{{fielName}}</p>
        </div>
        <div id="progress" class="progress">
          <div class="progress-bar progress-bar-success"></div>
          <div class="progress-number"></div>
        </div>
        <span class="fileinput-button"  style="margin-left:147px;">
          <el-button type="primary" plain><span class="pad30_lr f16">选择文件</span></el-button>
          <input id="fileInput" type="file" name="file" @change="fileChange"  :accept="uploadType=='image'?'image/*':''" />
        </span>
        <span class="cancel-button"  style="margin-left:163px;display:none;">
          <el-button type="primary" plain @click="cancel"><span class="pad30_lr f16">取消</span></el-button>
        </span>
      </form>
    </div>

  </div>
</template>
<script>
import upload from "@/libs/upload.js";
import crypto from "crypto";
export default {
  name: "Upload",
  data() {
    return {
      s3upload: null,
      uploadBreak: false,
      fielName: "拖拽文件上传",
      hash: ""
    };
  },
  props: ["topid","data","uploadType"],
  methods: {
    submit() {
      $("#fileInput").trigger("change");
    },
    fileChange() {
      this.upload($("#fileInput")[0].files[0]);
    },
    upload(file) {
      this.fielName = file.name;
      this.data.forEach(element => {
        if(this.fielName==element.title){
           layer.msg('已存在相同文件名文件，<br/>请先删除后继续上传~',{
             icon:2,
             time:3000
           })
           this.uploadBreak=true;
        }
      });
      if(this.uploadBreak){
        this.uploadBreak=false;
        return false;
      }
      let md5Sign = function(data) {
        let md5 = crypto
          .createHash("md5")
          .update(data, "hex")
          .digest("hex");
        return md5;
      };
      this.process(file, () => {
        file.hash=md5Sign(this.hash);
        file.folderId=this.topid||0;  
        file.alum=this.uploadType=='image'?1:'';
        let S3MultiUpload = upload.S3MultiUpload;
        if (
          !(
            window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob &&
            window.Blob.prototype.slice
          )
        ) {
          layer.alert(
            "You are using an unsupported browser. Please update your browser."
          );
          return;
        }
        $(".fileinput-button").toggle();
        $(".cancel-button").toggle(); 
        $("#result").text("");
        $("#progress .progress-bar").css("width", "0px");
        $("#progress .progress-number").text("");

        this.s3upload = new S3MultiUpload(file);
        this.s3upload.onServerError = function(
          command,
          jqXHR,
          textStatus,
          errorThrown
        ) {
          layer.msg({
            message: "上传服务失败",
            icon: 1
          });
        };
        this.s3upload.S3UploadError = function(xhr) {
          layer.msg({
            message: "上传失败",
            icon: 1
          });
        };
        this.s3upload.onProgressChanged = function(
          uploadedSize,
          totalSize,
          speed
        ) {
          let progress = parseInt(uploadedSize / totalSize * 100, 10);
          $("#progress .progress-bar").css("width", progress + "%");
          $(".progress-number")
            .html(
              getReadableFileSizeString(uploadedSize) +
                " / " +
                getReadableFileSizeString(totalSize) +
                " <span style='font-size:smaller;color:#fff;'>(" +
                uploadedSize +
                " / " +
                totalSize +
                " at " +
                getReadableFileSizeString(speed) +
                "ps" +
                ")</span>"
            )
            .css({
              "margin-left": -$(".progress-number").width() / 2
            });

          function getReadableFileSizeString(fileSizeInBytes) {
            let i = -1;
            let byteUnits = [
              " KB",
              " MB",
              " GB",
              " TB",
              "PB",
              "EB",
              "ZB",
              "YB"
            ];
            do {
              fileSizeInBytes = fileSizeInBytes / 1024;
              i++;
            } while (fileSizeInBytes > 1024);

            return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
          }
        };
        this.s3upload.onPrepareCompleted = function() {
          $("#result").text("Uploading...");
        };
        this.s3upload.onUploadCompleted = function() {
          layer.msg("上传成功"); 
          $(".fileinput-button").toggle();
          $(".cancel-button").toggle(); 
        };
        this.s3upload.onHitCompleted=function(){
          layer.msg("上传成功"); 
          $(".fileinput-button").toggle();
          $(".cancel-button").toggle(); 
        }
        this.s3upload.start();
      });
    },
    cancel() {
      this.s3upload.cancel();
      $(".fileinput-button").toggle();
      $(".cancel-button").toggle(); 
    },
    process(file, callback) {
      this.getMD5(file, prog => console.log("Progress: " + prog)).then(
        res => {
          // console.log(res);
          callback();
        },
        err => console.error(err)
      );
    },
    getMD5(blob, cbProgress) {
      let that = this;
      return new Promise((resolve, reject) => {
        that.hash = "";
        this.readChunked(
          blob,
          (chunk, offs, total) => {
            var md5 = CryptoJS.algo.MD5.create();
            md5.update(CryptoJS.enc.Latin1.parse(chunk));
            var hash = md5.finalize();
            that.hash = that.hash + hash.toString(CryptoJS.enc.Hex);
            if (cbProgress) {
              cbProgress(offs / total);
            }
          },
          err => {
            if (err) {
              reject(err);
            } else {
              // TODO: Handle errors
              var md5 = CryptoJS.algo.MD5.create();
              var hash = md5.finalize();
              var hashHex = hash.toString(CryptoJS.enc.Hex);
              resolve(hashHex);
            }
          }
        );
      });
    },
    readChunked(file, chunkCallback, endCallback) {
      var fileSize = file.size;
      var chunkSize = 5 * 1024 * 1024; // 5MB
      var offset = 0;

      var reader = new FileReader();
      reader.onload = function() {
        if (reader.error) {
          endCallback(reader.error || {});
          return;
        }
        offset += reader.result.length;
        // callback for handling read chunk
        // TODO: handle errors
        chunkCallback(reader.result, offset, fileSize);
        if (offset >= fileSize) {
          endCallback(null);
          return;
        }
        readNext();
      };

      reader.onerror = function(err) {
        endCallback(err || {});
      };

      function readNext() {
        var fileSlice = file.slice(offset, offset + chunkSize);
        reader.readAsBinaryString(fileSlice);
      }
      readNext();
    }
  },
  mounted() {  
    // Drag & drop support.
    let that = this;
    $("#uploadForm")
      .on("drag dragstart dragend dragover dragenter dragleave drop", function(
        e
      ) {
        e.preventDefault();
        e.stopPropagation();
      })
      .on("dragover dragenter", function() {
        $(this).addClass("is-dragover");
      })
      .on("dragleave dragend drop", function() {
        $(this).removeClass("is-dragover");
      })
      .on("drop", function(e) {
        let droppedFiles = e.originalEvent.dataTransfer.files;
        that.upload(droppedFiles[0]);
      });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.w-upload .fileinput-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.w-upload .fileinput-button input {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  opacity: 0;
  -ms-filter: "alpha(opacity=0)";
  font-size: 200px !important;
  direction: ltr;
  cursor: pointer;
}

.w-upload .progress {
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.w-upload .progress-number {
  color: #fff;
  position: absolute;
  left: 50%;
  z-index: 5;
}

.w-upload .progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background-color: #409eff;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}

#uploadForm.is-dragover {
  background-color: #f7f7f7;
}

.w-upload #result {
  border: 1px solid gray;
  margin: 5px;
  padding: 10px;
}

.upload_box {
  width: 400px;
  padding-top: 15px;
  height: 160px;
  margin: 20px auto;
  cursor: pointer;
  border-style: dashed;
}

.upload_box:hover {
  border-color: #409eff;
}
</style>
