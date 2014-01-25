function buscaCi() {
var Ci = document.getElementById("busca_ci").value;
	if(!Ci){
	alert("Digite o C\u00f3digo do Im\u00f3vel");
	return false;
	}
}

function ajaxBairros() {
    $("#cidade").change(function() {	  
		var id = $(this).children(":selected").attr("id");		
		$.ajax({
			url:URL+"/app/PHP/inBairros.php",
			data: {'idCidade':id},
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

function loadResult(a,b,c,d,e,f,g){ 
	/*autoload */ 
	var track_load = 1;                      
	var loading  = false;                    
	var total_groups = Math.round($('#total').val() / g); 

	$(document).scroll(function() { 
	
/*	    $('#debug').html(
		'scroll wH>>'+$(window).height()+'<br>'+
		'scroll dH>>'+$(document).height()+'<br>'+
		'scroll top>>'+$(window).scrollTop()+'<br>'+
		'no scroll = bT:'+a+'bM:'+b+'bL:'+c+'bB:'+d+'bV:'+e+'bC:'+f+'groupNo:'+ track_load
		);	*/	

		if($(window).scrollTop() + $(window).height() >= $(document).height()){ 
			//$('#debug').html('autoScroll...');
			if(track_load <= total_groups && loading==false){      
				loading = true;                    
				$.mobile.loading('show');             
				$.ajax({
					url: URL+"/app/PHP/result.php",
					data: {'bT':a, 'bM':b, 'bL':c, 'bB':d, 'bV':e, 'bC':f,'itemsPerGroup':g, 'groupNo': track_load}, 
					type:"POST",
					success: function(data){
						$("#showResult").append(data).trigger("create");    
						$.mobile.loading('hide');                    
						track_load++;  								  
						loading = false; 
					},
					error:function(xhr, status, error) {
						alert('ERRO:'+error);                          
						$.mobile.loading('hide');
						loading = false;
					}
				});
				return false;
	 			event.preventDefault();
		 	}
		}
	});
}

function pesquisar(m){
	$.mobile.changePage($('#result'), 'pop');
	$.mobile.loading('show');
	
	var a = $("#tipo").val();
	var b = $("#modalidade").val();
	var c = $("#cidade").val();
	var d = $("#bairro").val();
	var e = $("#valor").val();
	var f = $("#ci").val();
	var g = 10; //itemsPerGroup
	
	if(m) b = m;
	
 	$.ajax({
		  url:URL+"/app/PHP/result.php",
		  data: {'bT':a, 'bM':b, 'bL':c, 'bB':d, 'bV':e, 'bC':f,'itemsPerGroup':g, 'groupNo': 0},
		  type:"POST", 
		  success: function(result){
			  $("#showResult").html(result);
			  loadResult(a,b,c,d,e,f,g);			  
			  $(document).listview().trigger("create"); /*refresh css*/
			  $.mobile.loading('hide');
		  }, 
		  error: function (xhr, status, error) {
				alert('ERRO:'+error); 
    	  }
	  });
	  return false;
	  event.preventDefault();	
}

function startSlide() {
  $('.flexslider').flexslider({
    animation: "slide",            
	directionNav: false
  });
}

function ver(e){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/ver.php",
		data:{'id':e},
        type:"GET",
        success:function(result){
        $("#verResult").html(result);
		startSlide();	
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
}

$(document).on("pageshow","#venda",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/result.php",
        type:"GET",
        success:function(result){
        $("#vendasResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

$(document).on("pageshow","#aluguel",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/result.php",
        type:"GET",
        success:function(result){
        $("#aluguelResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

$(document).on("pageshow","#busca",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/busca.php",
        type:"GET",
        success:function(result){
        $("#buscaResult").html(result);
        ajaxBairros();
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

$(document).on("pageshow","#anuncie",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/anunciar.php",
        type:"GET",
        success:function(result){
        $("#anuncieResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

$(document).on("pageshow","#empresa",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/empresa.php",
        type:"GET",
        success:function(result){
        $("#empresaResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

$(document).on("pageshow","#mapa",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/mapa.php",
        type:"GET",
        success:function(result){
        $("#mapaResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

$(document).on("pageshow","#contato",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/email.php",
        type:"GET",
        success:function(result){
        $("#contatoResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});
$(document).on("pageshow","#pFone",function(){
	$.mobile.loading('show');
    $.ajax({
        url:URL+"/app/PHP/fone.php",
        type:"GET",
        success:function(result){
        $("#foneResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

function sendId(e){
	/*seta variável name com o ID*/
	window.name = e;
}

$(document).on("pageshow","#pMail",function(){
	$.mobile.loading('show');
	/*var id = sessionStorage.getItem("id");*/
	var id = "11111";
    $.ajax({
        url:URL+"/app/PHP/email.php",
		data:{'id':id},
        type:"POST",
        success:function(result){
        $("#mailResult").html(result);
		$.mobile.loading('hide');
        $(document).listview().trigger("create"); /*refresh css*/
        }
    });
});

function enviar(){
	/*$.mobile.changePage($('#result'), 'pop');*/
	history.back();
	$.mobile.loading('show');
	
	var a = $("#nome").val();
	var b = $("#email").val();
	var c = $("#tel").val();
	var d = $("input[name=assunto]:checked").val();
	var e = $("#mensagem").val();
	var f = window.name;

 	$.ajax({
		  url:URL+"/app/PHP/sendEmail.php",
		  data: {'a':a, 'b':b, 'c':c, 'd':d, 'e':e, 'f':f},
		  type:"POST", 
		  success: function(result){			  
			  alert(result); 	  			 
			  $.mobile.loading('hide');
		  }, 
		  error: function (xhr, status, error) {
				alert('ERRO:'+error); 
    	  }
	  });
	  return false;
	  event.preventDefault();	
}