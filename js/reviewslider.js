$(document).ready(function(){

	var offset = 0;
	var $clients;
	var $clients_width;
	var $wrap_width;
	var $list;
	var i;
	var $list_data;
	var	$cl_percent = 0;
	var $list_width;
	var $curr_trans;
	var client_trans = 0;

	function getsize(){
		
			browserWidth = $(window).width();
			$clients = $(".clients");
			$clients_width;	
	 		$wrap_width= $(".wrap").width();
			$wrap_height= $(".wrap").height();
			$list = $(".wrap").find("ul");
			i = $($list).children(".clients").length;

		//Set amount of images on the page	
		if(browserWidth>=1200){
			$($clients).css("width",$wrap_width/3);	
			$($list).data("width",3);
		}

		if(browserWidth<1200 && browserWidth>=992){
			$($clients).css("width",$wrap_width/2);
			$($list).data("width",2);
		}

		if(browserWidth<992 && browserWidth>=480){
			$($clients).css("width",$wrap_width);
			$($list).data("width",1);
		}

		if(browserWidth<480){
			$($clients).css("width",$wrap_width);
			$($list).data("width",1);
		}
		//Getting a parameters of slider
		$list_data = $list.data("width");
		$clients_width = $(".clients").width();	
		$($list).css("width",i*$clients_width)+5;		
		$list_width = $($list).width();
		$cl_percent = $clients_width/$list_width;

		if(browserWidth>=1200&&i>=$($list).data("width")){
			offset = 0;
			$list.css("margin-left",0);
			$(".review>a").css("display","none");
		}else{
			$(".review>a").css("display","block");
		}

		adaptive($list_data,$cl_percent);		
	}

	getsize();

	$(window).resize(getsize);

	/*-------ADAPTATION START-------*/
		function adaptive(data,$cl_percent){

			i-=data;
			$($list).css("transform","translateX("+(-$list_width*offset)+"px)");

			if(data==2&&offset>($cl_percent*i)){
				offset-=$cl_percent;
			}
		}

	/*-------ANIMATION START-------*/

		$(".next_cl").on("click",function(){

			if(offset<$cl_percent*i){
				offset+=$cl_percent;
				client_trans -=$clients_width;
				$($list).css("transform","translateX("+client_trans+"px)");			
			}
			return false;
		});

		$(".prev_cl").on("click",function(){

			if(offset>0){
				offset-=$cl_percent;
				client_trans +=$clients_width;
				$($list).css("transform","translateX("+client_trans+"px)");
			}
			return false;
		});
	/*-------ANIMATION END-------*/
});