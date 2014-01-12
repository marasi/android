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

function pesquisar(){
	
	var bT = $("#tipo").val();
	var bM = $("#modalidade").val();
	var bL = $("#cidade").val();
	if($("#bairro"))var bB = $("#bairro").val();
	var bV = $("#busca_valor").val();
	var bC = $("#busca_ci").val();
	
 	$.ajax({
		  url:URL+"/app/PHP/result.php",
		  data: "{'bT':'" + bT+ "', 'bM':'" + bM+ "', 'bL':'" + bL+ "', 'bB':'" + bB+ "', 'bV':'" + bV+ "', 'bC':'" + bC+ "'}",
		  async:"true", 
		  type:"POST", 
		  success: function(result){
			  $("#buscaResult").html(result);
			  $(document).listview().trigger("create"); /*refresh css*/
		  }, 
		  error: function (xhr, status, error) {
				alert("ERRO: ajax!");
    	  }
	  });
	  return false;
	  event.preventDefault();	
}


 

