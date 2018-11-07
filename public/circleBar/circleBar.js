function makeCircleBar(panel){
	var circleTip = '';
	circleTip = '<div name ="yes" style="position:absolute;top:18px;left:50px;font-size: 22px;color:lightgreen;">平稳正常运行中';
	circleTip += '<div class="lampPanelOut"><div class="lampPanelIn"><ul class="lamp lampMove"><li></li>';
	circleTip += '<li><div></div></li><li><div style="background:rgba(102,221,0,0.1)"></div></li><li><div style="background:rgba(102,221,0,0.5)"></div></li>';
	circleTip += '<li><div style="background:rgba(102,221,0,0.9)"></div></li><li><div></div></li><li><div></div></li><li><div></div></li><li><div></div></li><li><div></div></li>';
	circleTip += '<li><div></div></li><li><div></div></li><li><div style="background:rgba(102,221,0,0.1)"></div></li>';
	circleTip += '<li><div style="background:rgba(102,221,0,0.5)"></div></li><li><div style="background:rgba(102,221,0,0.9)"></div></li><li><div></div></li>';
	circleTip += '<li><div></div></li><li><div></div></li><li><div></div></li><li><div></div></li><li><div></div></li></ul></div></div></div>';
	$(panel).html(circleTip);
}