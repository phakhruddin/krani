var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.enterjobdetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
};

function closeWin(e) {
	console.log("e is: "+JSON.stringify(e));
}

function UploadPhotoToServer(e){
	console.log("Upload photo to the server.");
}

function uploadFile(e){
	console.log("JSON stringify e" +JSON.stringify(e));
       Titanium.Media.openPhotoGallery({
           success:function(event)
           {             
               Ti.API.debug('Our type was: '+event.mediaType);
               if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
               {
                   UploadPhotoToServer(event.media);
               }
           },
           cancel:function()
           {   
           },
           error:function(err)
           {
               Ti.API.error(err);
           },
           mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
       });
   }
   
   var win = Titanium.UI.createWindow({
					title:"Media",
					backgroundColor: "black"
				});

function takePic(e){ 
	console.log("JSON stringify e" +JSON.stringify(e));
	Titanium.Media.showCamera({
		success:function(e){
			if(e.mediaType === Titanium.Media.MEDIA_TYPE_PHOTO){
				var ImageView = Titanium.UI.createImageView({
					image:e.media,
					width:288,
					height:215,
					top:12,
					zIndex:1
				});
				win.add(ImageView);
			} else if (e.mediaType === Titanium.Media.MEDIA_TYPE_VIDEO){
				var w = Titanium.UI.createWindow({
					title:"Job Video",
					backgroundColor: "black"
				});
				
				var videoPlayer = Titanium.Media.createVideoPlayer({
					media: e.media				
				});
				w.add(videoPlayer);
				videoPlayer.addEventListener("complete",function(e){
					w.remove(videoPlayer);
					videoPlayer = null ;
					w.close();
				});		
				
			}
			
		}, error:function(e){
			console.log("error taking Pic: ");
		}, cancel:function(e){
			console.log("cancel taking Pic: ");
		},
		allowEditing:true,
		saveToPhotoGallery:true,
		mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO,Titanium.Media.MEDIA_TYPE_VIDEO],
		videoQuality:Titanium.Media.QUALITY_HIGH
	});
	}