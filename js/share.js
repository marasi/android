function shareS(){
	window.plugins.socialsharing.share(TITULO, 'Site Imobiliária', null, URL);
}
function shareI(){
	var id = window.name; //id storaged
	window.plugins.socialsharing.share(TITULO, 'Site Imobiliária', null, URL+"/index.php?pagina=ver&id="+id);
}