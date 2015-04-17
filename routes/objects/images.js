/**
 * Image file uploads from post forms
 */
var fs = require('fs');
var AWS = require('aws-sdk'); 
AWS.config.loadFromPath('/opt/aws/aws.json');
	
function nameMerge (title) {
  title = title.replace(/[/\.../]/gi, '');
  var merged = title.split(' ').join('_');
  return merged;
}

function imgExtention(type) {
  var extention;
  if (type == 'image/jpeg') {
    extention='jpg';
  } else if (type == 'image/png') {
    extention='png';
  } else if (type == 'image/gif') {
    extention='gif';
  } else {
    // default image
    extention = 'png';
  }
  return extention;
}

function fileNameGen( prefix, name, image ) {
  var img = prefix + '-' + nameMerge(name) + '.' + imgExtention(image.type);
  return img;
};

module.exports.generateFileName = function( prefix, name, image ) {
  return fileNameGen(prefix, name, image);
};
	
module.exports.mergeStringSpace = function( name ) {
  return nameMerge(name);
};
	
module.exports.saveAWS = function(req){
	var image = fileNameGen(req.session.user.id, req.body.name, req.files.header);
	var s3 = new AWS.S3({params: {Bucket: '789234rbsdcbs8fwiwfwiuygc', Key: image}}); 
	s3.upload({
		Body: fs.createReadStream(req.files.header.path), 
		ACL:'public-read'})
		.on('httpUploadProgress', 
			function(evt) { 
				console.log(evt); })
				.send(function(err, data) { 
					console.log(err, data) });
};
