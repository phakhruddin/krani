var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.enterjobdetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
  $.labor_table.search = $.search_history;
  	Alloy.Collections.joblog.fetch();
};

function transformFunction(model) {
	var currentaddr;
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = transform.col2+"  "+transform.col3;
	transform.phone = "Phone: "+transform.col5;
	transform.email = "Email: "+transform.col6;
	
	lat1=transform.col8;
	lon1=transform.col9;
	transform.address = "Lat: "+transform.col8+" , Lon:"+transform.col9;
	return transform;
}

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
			alert("unable to load the camera");
		}, cancel:function(e){
			alert("unable to load the camera");
		},
		allowEditing:true,
		saveToPhotoGallery:true,
		mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO,Titanium.Media.MEDIA_TYPE_VIDEO],
		videoQuality:Titanium.Media.QUALITY_HIGH
	});
	}