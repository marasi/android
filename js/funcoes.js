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


 

