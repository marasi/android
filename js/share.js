function shareS(){
	window.plugins.socialsharing.share(TITULO, 'Site Imobili�ria', null, URL);
}
function shareM(){
	var id = window.name; //id storaged
	window.plugins.socialsharing.share(TITULO, 'Site Imobili�ria', null, URL+"/index.php?pagina=ver&id="+id);
}