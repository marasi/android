function shareS(){
	window.plugins.socialsharing.share(TITULO, 'Site Imobiliária', null, URL);
}
function shareI(){
	window.plugins.socialsharing.share(TITULO, 'Site Imobiliária', null, URL+"/index.php?pagina=ver&id="+id);
}