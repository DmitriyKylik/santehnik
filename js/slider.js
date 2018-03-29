
$(function(){

 	$(".sd1").data("counter",0);
 	$(".sd2").data("counter",0); 
	var height_gall;
	var gall_width;
	var slide_count;
	var list_width;
	var count1 = 0;
	var count2 = 0;
	var counter=0;
	var data_width = 0;
	var browserWidth;
	var $sd1 = $(".sd1");   //Additional class to lists
	var $sd2 = $(".sd2");
	var $imgWrap = $("#imgWrap>img");

	function size(){

		browserWidth = $(window).width();
		//Set amount of images on the page	
		if(browserWidth>=1200){
			$(".list>li").css("width",browserWidth/4);	
			$(".list").data("width",4);
		}

		if(browserWidth<1200 && browserWidth>=992){
			$(".list>li").css("width",browserWidth/3);
			$(".list").data("width",3);
		}

		if(browserWidth<992 && browserWidth>=480){
			$(".list>li").css("width",browserWidth/2);
			$(".list").data("width",2);
		}

		if(browserWidth<480){
			$(".list>li").css("width",browserWidth);
			$(".list").data("width",1);
		}

		data_width = $(".list").data("width");
		var height_gall = $(".list>li:last-child").height();
		$(".gall").css("height",(height_gall-5));//This is a bug fix feature that preveting images from dissapearing when window is resized
		gall_width = $(".gall").width();
		slide_count = $(".list>li").length;
		slide_width = Math.floor($("#lust").width());
		list_width = (slide_width * 4)+5; //The same bug feature from image dissapearing
		$(".list").css("width",list_width);
		var $windHeight = $(window).height();
		$imgWrap.css({"max-height":$windHeight});	

		adapt(count1,$sd1);
		adapt(count2,$sd2);

		if(browserWidth>=1200){
			$(".list").css("margin-left",0);
		}

			diss(count1,$sd1);
			diss(count2,$sd2);
	}

	size();

	$(window).resize(size);
	//-------Conditions for reposive view------//	
	function adapt(count,check_list){

		if(data_width==1){
			check_list.css("margin-left",(-browserWidth*count));
		}

		if(data_width==2){
			if(count>2){count=2; check_list.data("counter",2);}			
			check_list.css("margin-left",((-browserWidth/data_width)*count));
		}

		if(data_width==3){
			if(count>1){count=1;  check_list.data("counter",1);}
			check_list.css("margin-left",((-browserWidth/data_width)*count));
		}
	}

		//-------Setting the condition for buttons display------//	
	function diss(count,check_list){	

		if(data_width==1){
			if(count==3){
				check_list.parent().children(".rt").fadeOut();
			}else{ check_list.parent().children(".rt").fadeIn();}
		}

		if(data_width==2){
			if(count>=2){
				check_list.parent().children(".rt").fadeOut();
			}else{ check_list.parent().children(".rt").fadeIn();}
		}

		if(data_width==3){
			if(count>=1){
				check_list.parent().children(".rt").fadeOut();
			}else{check_list.parent().children(".rt").fadeIn();}
		}

		if(data_width==4){
			$(".gall>a").fadeOut();
		}

		if(count==0){
			if(check_list.siblings(".lt").data("side")=="lt"){
				check_list.siblings(".lt").fadeOut();
			}
		}

		if(count>0){
			if(data_width==4) {return false;}
			check_list.parent().children(".lt").fadeIn();
		}
	}

	//-------Setting click events on the buttons------//

	$(".ltup,.ltdn").on("click", function(){
		$(this).prevAll(".list").animate({"margin-left":"+="+slide_width},200).data().counter--;
		count1 = $(".sd1").data("counter");
		count2 = $(".sd2").data("counter");
		diss(count1,$sd1);
		diss(count2,$sd2);

		return false;
	});

	$(".rtup,.rtdn").on("click", function(){
		$(this).prev().animate({"margin-left":"-="+slide_width},200).data().counter++;
		count1 = $(".sd1").data("counter");
		count2 = $(".sd2").data("counter");
		diss(count1,$sd1);
		diss(count2,$sd2);

		return false;
	});


	function fadeSearch(){
		var $search;
		var $clone = $(".search");	
		$(".slider").on({mouseenter: function(){

			 $search = $clone.clone(true)[0];
			 $(this).append($search).find(".search")
			 	.css({left:(($($search).parent().width() - $($search).outerWidth())/2),
						top:(($($search).parent().height() - $($search).outerHeight())/2)
					}).fadeToggle("fast");

						}, mouseleave: function(){
							$(this).children(":last").fadeToggle("fast",function(){
								$(this).remove();
							});
							}
						});

	}

	fadeSearch();
});














