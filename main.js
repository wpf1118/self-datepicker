(function(){
	var datepicker = function(params){
		/**
			{
				dom:dom,
				year:2017,
				month:7,
			}
		*/
		this.$rootDom = null;
		this.monthData = null;
		this.params = params;
		this.init(this.params);
	}

	datepicker.prototype.init = function(params){
		this.rootDom = params.dom;
		this.render(params);

		var _this = this;
		this.rootDom.addEventListener('click',function(e){
			var $target = e.target;
			if($target.classList.contains("ui_datepicker_btn_prev")){
				_this.render(params,'prev');
			}
		},false);

		this.rootDom.addEventListener('click',function(e){
			var $target = e.target;
			if($target.classList.contains("ui_datepicker_btn_next")){
				_this.render(params,'next');
			}

			if ($target.classList.contains('nice-normal')) {

                params.onClickDate($target.getAttribute('data-date'));  //此处是方法的调用

            }
		},false);
	}

	datepicker.prototype.render = function(params,direction){
		var year,month;
		if(this.monthData){
			year = this.monthData.year;
			month = this.monthData.month;
		}else{
			year = params.year;
			month = params.month;
		}

		if(direction == 'prev'){
			month --;
			if(month == 0 ){
				month = 12;
				year --;
			}
		}

		if(direction == 'next'){
			month ++;
			if(month == 13 ){
				month = 1;
				year ++;
			}
		}

		var html = this.buildUi(year,month);
		this.rootDom.innerHTML = html;
	}

	datepicker.prototype.getData = function(year,month){
		var year, month;
        var ret = [];

        if (!year || !month) {

            var today = new Date();

            year = today.getFullYear();

            month = today.getMonth() + 1;
        }
        var firstDay = new Date(year, month - 1, 1);//当月的第一天

        var firstDayWeekDay = firstDay.getDay();//当月第一天是周几

        if (firstDayWeekDay === 0) {

            firstDayWeekDay = 7;
        }

        year = firstDay.getFullYear();

        month = firstDay.getMonth() + 1;


        var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月的最后一天

        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上个月最后一天是几号

        var preMonthDayCount = firstDayWeekDay - 1;//需要显示上个月几个日期

        var lastDay = new Date(year, month, 0);//当月的最后一天

        var lastDate = lastDay.getDate()//当月最后天是几号
        var styleCls = '';
        for (var i = 0; i < 7 * 6; i++) {

            var date = i + 1 - preMonthDayCount;

            var showDate = date;

            var thisMonth = month;

            var thisYear = year;

            if (date <= 0) {
                //上个月
                thisMonth = month - 1;
                if (thisMonth === 0) {
                    thisMonth = 12;
                    thisYear -=1;
                }
                showDate = lastDateOfLastMonth + date;
                styleCls = 'nice-gray';

            } else if (date > lastDate) {
                thisMonth = month + 1;
                 if (thisMonth === 13) {
	                thisMonth = 1;
	                thisYear +=1;
	            }
                showDate = showDate - lastDate;
                styleCls = 'nice-gray';
            } else {
                var today = new Date();
                if (showDate === today.getDate() && thisMonth === today.getMonth() + 1 && thisYear == today.getFullYear()) {
                    styleCls = 'nice-normal nice-current';
                } else {
                    styleCls = 'nice-normal';
                }


            }

           
            

            ret.push({
            	year:thisYear,
                month: thisMonth,
                date: date,
                Y_m_d:thisYear+'-'+((thisMonth<10)?'0'+thisMonth:thisMonth) +'-' + ((showDate<10)?'0'+showDate:showDate),
                showDate: showDate,
                styleCls: styleCls
            });
        }
        return {
            year: year,
            month: month,
            data: ret
        };
	}
	datepicker.prototype.buildUi = function(year,month){
		this.monthData = this.getData(year,month);
		var res = this.monthData;
		console.log(res)
		var data = res.data;
		var year = res.year;
		var month = res.month;
		if(month<10) month = '0' + month;

		var html = '<div class="ui_datepicker_wrapper">';
		html += 	'<div class="ui_datepicker_header">' +
							'<a id="ui_datepicker_btn_prev" href="javascript:;" class="ui_datepicker_btn ui_datepicker_btn_prev">&lt</a>' +
							'<a id="ui_datepicker_btn_next" href="javascript:;" class="ui_datepicker_btn ui_datepicker_btn_next">&gt</a>' +
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

							html +=    '<td class="' + data[i].styleCls + ' " data-date="'+data[i].Y_m_d+'">'+ data[i].showDate +'</td>';

							if(i%7 ===6)				
							html +=	'</tr>';
						}

			html +=				'</tbody>' +
							'</table>' +
						'</div>' +
					'</div>';
		return html;
	}

	window.datepicker = datepicker;
})()

var datepicker = window.datepicker;

new datepicker({
	dom:document.querySelector('#root'),
	year:2016,
	month:12,
	onClickDate:function(date){//单击日期时的回调函数，已调用
		alert(date)
	}
});




