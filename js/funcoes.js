function ajaxBairros() {
    $("#cidade").change(function() {
	  
	  var id = $(this).children(":selected").attr("id");
		
	  $.ajax({
		  url:"PHP/inBairros.php?idCidade="+id,
		  async:"true", 
		  type:"GET", 
		  success: function(result){
			  $("#bairros").html(result);
		  }
	  });
	});
}


 

