$(function(){

		var $modal_wind = $(".modal-wind");
		var $slider = $(".slider");
 		var $index = 0;
 		var $formBack = $(".formBack");
 		var $formWrap = $("#formWrap");
 		var $substrate = $(".substrate");
 		var list_arr = $(".gallery").find("img");
 		var $body =  $("body");
 		var $revForm = $(".revForm");
 		var $customerCall = $("#customerCall"); 	
 		var $customerReview = $("#customerReview");
		var $scrollTo = $(".scrollTo");

		function BodyJumpFix(scroll){

			var bodyWidthPre = $($body).width();
			var bodyWidthAfter;
			$($body).css({overflow: 'hidden'});
			bodyWidthAfter = $($body).width();

			$($body).css({
				paddingRight:(bodyWidthAfter-bodyWidthPre)
			});
				scroll.css({
					marginRight:(bodyWidthAfter-bodyWidthPre)-1
				});
		}

	function modalSlider(scroll){
		BodyJumpFix(scroll);
		$($substrate).fadeToggle();
		$($modal_wind).css({"display":"block"});
		$(".buttons").css({"display":"block"});	
	}

	function sleder_count (current){
		$("#curr_count").html(current+1);
	}

	function src_attr(index){
		var indexSrc;
		indexSrc = list_arr.eq(index).attr("src");
		$("#imgWrap").find("img").attr("src",indexSrc);
	}
	//Finding the image wich was clicked
	$($slider).on("click",function(){
		var $slider_src = $(this).find("img").attr("src");
		$modal_wind.find("img")
		.removeClass("img-responsive")
		.attr("src",$slider_src);
		// Index of clicked image in array 
		for(var i = 0; i<=list_arr.length; i++){
			if(list_arr.eq(i).attr("src")==$slider_src){
				$index = i;
			}
		}
		//View count of images under the picture
		sleder_count($index);
		$("#total_count").html(list_arr.length);
		modalSlider($scrollTo);	

	});


	$(".buttons,#imgWrap,#modal-X,a,.falseCall").on("click",function(e){

		e.stopPropagation();

	});

	$("#imgWrap,#next").on("click", function(){

		if($index==(list_arr.length-1)){
			$index = -1;
		}

		$index++;
		src_attr($index);
		sleder_count($index);

	});

	$("#prev").on("click",function(){

		if($index==0){
			$index=list_arr.length;
		}

		$index--;
		src_attr($index);
		sleder_count($index);

	});	

	$(".substrate,#modal-X").on("click",function(e){

		$($substrate).css({display:"none"});
			$($body).css({
    			overflow: 'auto',
    			paddingRight:"0"
			});

			$($scrollTo).css({
				marginRight:'0'
			});	

	});	

	/*-------------------ModalForm-----------------*/

	function formOpen(formType){

		BodyJumpFix($scrollTo);

		$(formType).css({display:"block"});

		$($formBack).fadeToggle(function(){
			$($formWrap).show("slow");	
		});


	}

	function formClose (close,label,scroll){

		$($formWrap).hide("slow");

		$(close).fadeToggle(function(){
			$($body).css({
    			overflow: 'auto',
    			paddingRight:"0"
			});
			scroll.css({
				marginRight:'0'
			});
			$(close).css({
    			width:"auto",
    		});

    		$($formWrap).find("input").text(" ");	

		});	

		$($formWrap).find("form")

			.css({display:"none"});
			$($formWrap).find("form>input,textarea")
			.not(":input[type=submit]")
			.each(function(){
				$(this).val("");
			});

		label.css({visibility:"hidden"});

		return false;
	}

	$(".formCall,.revForm").on("click",function(e){

		scroll = $(window).scrollTop();

		if($(this).hasClass("formCall")){
			formOpen($customerCall);
		}else{
			formOpen($customerReview);
		}

		$(window).scrollTop(scroll);

		return false;

	});

	$($formWrap).on("click",function(e){

		return false;	
	});


	$($formBack).on("click",function(e){ 

		e.stopPropagation();
		var label = $(this).find('label'); 
		formClose ($(this),label,$scrollTo);

		return false;	
	});


	/*-------------------CheckForm-----------------*/


	$(".formButton").on("click",function(){

		var parentForm = $(this).parent()
			.find("input:not([type=submit]),textarea");

		label = $(this).parent().find("label");

		for(var i = 0; i<parentForm.length; i++){
			if(parentForm.eq(i).val() == ""){
				label.eq(i).css({visibility:"visible"});	
			}	
		}
	});

	/*-------------------ScrollTop-----------------*/

	$(window).on( "scroll",function(){

		scroll = $(window).scrollTop();

		if(scroll > 700){
			$($scrollTo).fadeIn();
		}else{
			$($scrollTo).fadeOut();
		}

	});

	$($scrollTo).on("click", function(){
		$("html,body").animate({scrollTop:0}, 500, 'swing');
	});

});

