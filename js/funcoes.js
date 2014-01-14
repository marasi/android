function ajaxBairros() {
    $("#cidade").change(function() {
	  
	  var id = $(this).children(":selected").attr("id");
		
	  $.ajax({
		  url:URL+"/app/PHP/inBairros.php?idCidade="+id,
		  async:"true", 
		  type:"GET", 
		  success: function(result){
			  $("#bairros").html(result);
			  $(document).listview().trigger("create"); /*refresh css*/
		  }, 
		  error: function (xhr, status, error) {
				alert("ERRO: ajax!");
    	  }
	  });
	});
}

function loadResult(){ 
	/*autoload */ 
	var track_load = 1;                      
	var loading  = false;                    
	var total_groups = 91; 

	$(window).scroll(function() { 
		if($(window).scrollTop() + $(window).height() == $(document).height()){ 
			if(track_load <= total_groups && loading==false){        
				loading = true;                    
				$('.loading_image').show();               
				$.post(URL+"/app/PHP/result.php",{'groupNo': track_load}, function(data){
					$("#buscaResult").append(data).trigger("create");    
					$('.loading_image').hide();                    
					track_load++;  
					                                  
					loading = false; 
				}).fail(function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);                          
					  $('.loading_image').hide();
					loading = false;
				});
			 }
		 }
    });
}

function pesquisar(){
	
	var bT = $("#tipo").val();
	var bM = $("#modalidade").val();
	var bL = $("#cidade").val();
	if($("#bairro"))var bB = $("#bairro").val();
	var bV = $("#busca_valor").val();
	var bC = $("#busca_ci").val();
	
 	$.ajax({
		  url:URL+"/app/PHP/result.php",
		  data: {'bT':bT, 'bM':bM, 'bL':bL, 'bB':bB, 'bV':bV, 'bC':bC, 'groupNo': 0},
		  type:"POST", 
		  success: function(result){
			  $("#buscaResult").html(result);
			  loadResult();
			  $(document).listview().trigger("create"); /*refresh css*/
		  }, 
		  error: function (xhr, status, error) {
				alert("ERRO: ajax!");
    	  }
	  });
	  return false;
	  event.preventDefault();	
}


 

