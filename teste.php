<script>

	var contador=0;
	var isOnline = 0;
	function toggleCon(e) {
	  
	  if(e == "offline") {
		  //if($.mobile.activePage.attr("id") != "conn"){
			  	  isOnline = setInterval(function () {				
				  //$.mobile.changePage($('#conn'), 'pop');
				  document.getElementById('debug').innerHTML = '<img src="images/offline.png" id="offlineIcon"/>Sem conexão com a Internet';
				  contador++;
				  console.log(isOnline);
				  //alert(contador);
			  
			  }, 1000);
		  //}
	  }else{
		  if(isOnline){
			  clearInterval(isOnline);
			  alert('clearInterval: '+isOnline+' - contador: '+contador);
		  }else{alert('Erro clear interval: '+isOnline+', cont: '+contador);}
		  //$.mobile.changePage($('#menu'), 'pop');
	  }		
	}

</script>
<input onClick="toggleCon('online')" type="button" value="online"/>
<input onClick="toggleCon('offline')" type="button" value="offline"/>
<div id="debug"></div>