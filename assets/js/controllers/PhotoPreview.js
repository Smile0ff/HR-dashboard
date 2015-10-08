"use strict";

const isFileReader = window.File && window.FileReader && window.FileList && window.Blob;

class PhotoPreview{
	constructor(){
		if(!isFileReader) return;
		this.el = $(".file-holder");
		this._events();
	}
	_events(){
		this.el.on("change", $.proxy(this.handleFile, this));
	}
	handleFile(e){
		e.stopPropagation();
		e.preventDefault();
		let 	file = e.target.files[0],
			sizeInMB = 0;

		if(!file.type || !file.type.match(/image.*/)) return;
		this.el.find(".error-holder").empty();
		sizeInMB = this.convertToMBytes(file.size);
		this.readFile(file, sizeInMB);
	}
	convertToMBytes(bytes, mb){
		if(bytes <= 0) return;
		return Math.max(bytes / 1024 / 1024, 0.1).toFixed(2) + " MB";
	}
	readFile(file, size){
		let 	self = this,
			reader = new FileReader();

		reader.onload = function(e){
			self.showFile(e.target.result, size);
		}
		reader.readAsDataURL(file);
	}
	showFile(src, size){
		this.el.find(".photo-holder").html(`
			<img src="${ src }" alt="preview">
			<span class="size">${ size }</span>
		`).andSelf().addClass("active");
	}
}

export default PhotoPreview;