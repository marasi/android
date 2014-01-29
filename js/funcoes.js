/*check internet connection *****************************************************************/
// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	checkConn();
}

function checkConn() {
	if($.mobile.activePage.attr("id") != "conn"){
		var isOnline = setInterval(function () {
			if(navigator.connection.type == Connection.NONE){
				<!--alert(states[networkState]);-->
				$.mobile.changePage($('#conn'), 'pop');
				$("#connResult").html(
				'<img src="images/offline.png" id="offlineIcon"/>Sem conexão com a Internet'
				);
			}
		}, 1000);
	}else{
		if(navigator.connection.type != Connection.NONE){
			<!--alert(states[networkState]);-->
			history.back();
		}		
	}
}
/******************************************************************/

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

function ver(id,ci){
	$.mobile.loading('show');
	$("#verHead").html("Código: " + ci);
    $.ajax({
        url:URL+"/app/PHP/ver.php",
		data:{'id':id},
        type:"GET",
        success:function(result){			
        $("#verResult").html(result);
		$(document).ready(function(e) {
            startSlide();
        });
		/*startSlide();*/	
		$.mobile.loading('hide');
        $(document).listview().trigger("create");
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
        url:URL+"/app/PHP/contato.php",
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
	var id = window.name; /*id storage*/
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

function pContato(){
	window.name = "contato"; /*set storage to page Email*/	
}

/*E-mail*/
function enviar(){
	/*$.mobile.changePage($('#result'), 'pop');*/	
	$.mobile.loading('show');
	
	var a = $("#nome").val();
	var b = $("#email").val();
	var c = $("#tel").val();
	var d = $("input[name=assunto]:checked").val();
	var e = $("#mensagem").val();
	var f = window.name;

	if(a == ""){
		alert("Digite seu nome!");
		$("#nome").focus();
		$.mobile.loading('hide');
		return false;
	}
	if(b == ""){
		alert("Digite seu e-mail!");
		$("#email").focus();
		$.mobile.loading('hide');
		return false;
	}
		parte1 = $("#email").val().indexOf('@');
		parte2 = $("#email").val().indexOf(".");
		parte3 = $("#email").val().length;
		if (!(parte1 >= 3 && parte2 >= 6 && parte3 >= 9)) {
			alert ("Digite um e-mail válido!");
			$("#email").focus();
			$.mobile.loading('hide');
			return false;
		}	
	if(c == ""){
		alert("Digite seu Telefone!");
		$("#tel").focus();
		$.mobile.loading('hide');
		return false;
	}
		var tel = c.valueOf().replace(/[_\W]+/g, "");
		var len = tel.substring(6,10);//verifica se são números os últimos 4
		if (len == 0 || isNaN(tel) || tel.length != 10){ 
			alert(tel+"Digite um número de telefone válido!");
			$("#tel").focus();
			$.mobile.loading('hide');
			return false;
		}	
	if(e == ""){
		alert("Digite sua mensagem!");
		$("#mensagem").focus();
		$.mobile.loading('hide');
		return false;
	}
	
	history.back();

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

/*Anunciar*/
function enviarA(){
	/*$.mobile.changePage($('#result'), 'pop');*/	
	$.mobile.loading('show');
	
	var a = $("#nomeA").val();
	var b = $("#emailA").val();
	var c = $("#telA").val();
	var d = 'Pedido de Cadastro';
	var e = $("#tipoA").val();
	var f = $("#enderecoA").val();
	var g = $("#valorA").val();
	var h = $("#mensagemA").val();

	if(a == ""){
		alert("Digite seu nome!");
		$("#nomeA").focus();
		$.mobile.loading('hide');
		return false;
	}
	if(b == ""){
		alert("Digite seu e-mail!");
		$("#emailA").focus();
		$.mobile.loading('hide');
		return false;
	}
		parte1 = $("#emailA").val().indexOf('@');
		parte2 = $("#emailA").val().indexOf(".");
		parte3 = $("#emailA").val().length;
		if (!(parte1 >= 3 && parte2 >= 6 && parte3 >= 9)) {
			alert ("Digite um e-mail válido!");
			$("#emailA").focus();
			$.mobile.loading('hide');
			return false;
		}	
	if(c == ""){
		alert("Digite seu Telefone!");
		$("#telA").focus();
		$.mobile.loading('hide');
		return false;
	}
		var tel = c.valueOf().replace(/[_\W]+/g, "");
		var len = tel.substring(6,10);//verifica se são números os últimos 4
		if (len == 0 || isNaN(tel) || tel.length != 10){ 
			alert(tel+"Digite um número de telefone válido!");
			$("#telA").focus();
			$.mobile.loading('hide');
			return false;
		}	
	if(h == ""){
		alert("Digite sua mensagem!");
		$("#mensagemA").focus();
		$.mobile.loading('hide');
		return false;
	}
	
	history.back();

 	$.ajax({
		  url:URL+"/app/PHP/sendAnuncio.php",
		  data: {'a':a, 'b':b, 'c':c, 'd':d, 'e':e, 'f':f, 'g':g, 'h':h},
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
