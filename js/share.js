function shareS(){
	window.plugins.socialsharing.share(TITULO, 'Site Imobili�ria', null, URL);
}
function shareI(){
	//var id = window.name; //id storaged
	alert(id);
	window.plugins.socialsharing.share(TITULO, 'Site Imobili�ria', null, URL+"/index.php?pagina=ver&id="+id);
}