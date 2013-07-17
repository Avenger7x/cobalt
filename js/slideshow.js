function Slideshow(root, offset){
	this.root = root;
	this.pages = root.children;
	this.current = 0;
	this.offset = offset || 1;
	this.refresh();
};

Slideshow.prototype.refresh = function(){
	var index, page;

	for(index = 0; index < this.pages.length; index++){
		page = this.pages[index];
		page.classList.remove('prev', 'current', 'next');

		if(index < this.current && index >= this.current - this.offset){
			page.classList.add('prev');
		}else if(index > this.current && index <= this.current + this.offset){
			page.classList.add('next');
		}

	}

	this.pages[this.current].classList.add('current');
};

Slideshow.prototype.prev = function(){
	if(this.current > 0){
		this.current--;
		this.refresh();
	}
};

Slideshow.prototype.next = function(){
	if(this.current < this.pages.length - 1){
		this.current++;
		this.refresh();
	}
};

Slideshow.prototype.goto = function(index){
	if(typeof index !== 'number'){
		index = this.pages.indexOf(index);
	}

	if(this.current !== index){
		this.current = index;
		this.refresh();
	}
};

module.exports = Slideshow;