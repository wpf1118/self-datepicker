(function(){
		var datepicker = function(year,month){
			this.year = (year == undefined)? new Date().getFullYear():year;
			this.month = (month == undefined)?  new Date().getMonth() + 1:month;
		}
		//获取数据
		datepicker.prototype.getData = function(){
			//年份 默认值本年
			year = this.year;
			month= this.month;

			//本月第一天
			var firstDayOFthisMonth = new Date(year,month-1,1).getDate();
			//本月第一天是周几
			var weekOFthisFirstDay = new Date(year,month-1,1).getDay();
			if(weekOFthisFirstDay === 0 ) weekOFthisFirstDay = 7;
			//上月最后一天
			var lastDayOFlastMonth = new Date(year,month-1,0).getDate();
			//本月最后一天
			var lastDayOFthisMonth = new Date(year,month,0).getDate();

			var data = [];

			for(var i=0;i<7*6;i++){
				var date = i - weekOFthisFirstDay + 2;
				var thisMonth = month;//初始化变量
				var showDate = date;//初始化变量
				var thisYear = year;
				if(date <= 0){//上个月
					thisMonth = month - 1;
					showDate = lastDayOFlastMonth + date;
				}else if(date > lastDayOFthisMonth){//下个月
					thisMonth = month + 1;
					showDate = date - lastDayOFthisMonth;
				}
				if(thisMonth === 13){
					thisMonth = 1;
					thisYear = year + 1;
				}
				if(thisMonth === 0){
					thisMonth = 12;
					thisYear = year - 1;
				}
				data.push({
					year:thisYear,
					date:date,
					month:thisMonth,
					showDate:showDate
				});
			}
			return {
				data:data,
				year:year,
				month:month
			};
		}

		datepicker.prototype.generateHtml = function(){
			var res = this.getData(this.year,this.month);
			var data = res.data;
			var year = res.year;
			var month = res.month;
			console.log(month)
			if(month<10) month = '0' + month;
			var html = '';
			html += 	'<div class="ui_datepicker_header">' +
							'<a id="ui_datepicker_btn_prev" href="" class="ui_datepicker_btn ui_datepicker_btn_prev">&lt</a>' +
							'<a id="ui_datepicker_btn_next" href="" class="ui_datepicker_btn ui_datepicker_btn_next">&gt</a>' +
							'<span>'+ year + '-' + month +'</span>' +
						'</div>' +
						'<div class="ui_datepicker_body">' +
							'<table>' +
								'<thead>' +
									'<tr>' +
										'<th>一</th>' +
										'<th>二</th>' +
										'<th>三</th>' +
										'<th>四</th>' +
										'<th>五</th>' +
										'<th>六</th>' +
										'<th>日</th>' +
									'</tr>' +
								'</thead>' +
								'<tbody>';

						for(var i=0;i<data.length;i++){

							if(i%7 === 0)
							html +=	'<tr>';

							html +=    '<td>'+ data[i].showDate +'</td>';

							if(i%7 ===6)				
							html +=	'</tr>';
						}

			html +=				'</tbody>' +
							'</table>' +
						'</div>' ;
			var ui_datepicker_wrapper = document.querySelector('.ui_datepicker_wrapper') || document.createElement('div');
			ui_datepicker_wrapper.className = 'ui_datepicker_wrapper';
			ui_datepicker_wrapper.innerHTML = html;

			document.body.appendChild(ui_datepicker_wrapper);

			//添加点击事件
			var btn_prev = document.querySelector("#ui_datepicker_btn_prev");
			var btn_next = document.querySelector("#ui_datepicker_btn_next");
			btn_prev.addEventListener('click',function(){
				
			});
			btn_next.addEventListener('click',function(){
				
			});
			
		}
		window.datepicker =  datepicker;
	})()

	var datepick = new datepicker(2017,6);
	console.log(datepick)

	var btn_prev = document.querySelector("#ui_datepicker_btn_prev");
			var btn_next = document.querySelector("#ui_datepicker_btn_next");
			btn_prev.addEventListener('click',function(){
				
			});
			btn_next.addEventListener('click',function(){
				
			});

	