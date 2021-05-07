class Notice {
	constructor() {
		this.ele = document.querySelector(".Notice");
		this.eleTerms = document.querySelectorAll(".notice_term");
		this.eleTermMinHeight = 32;
		/*this.ele.onclick = this.setHeight.bind(this);*/
		this.bindClickEvent();
	}
	// 给每个公告项绑定点击事件
	bindClickEvent() {
		let eleTermMaxHeight = 0;
		this.eleTerms.forEach(
		term => {
			eleTermMaxHeight = term.scrollHeight;
			term.onclick = this.setHeight.bind(term, this.eleTermMinHeight, eleTermMaxHeight);
		})
	}

	// 根据条件设置公告项的高
	setHeight(minH, maxH) {
		let cHeight = 0;
		if (this.offsetHeight > minH) {
			cHeight = (minH/16);
		} else {
			cHeight = (maxH/16);
		}
		this.style.height = cHeight + "rem";
	}
}

let notice = new Notice();
