function shareS(){
	window.plugins.socialsharing.share(TITULO, 'Site Imobiliária: <br>', null, '<a url="'+URL+'">'+URL+'"</a>');
}
function shareI(){
	var id = window.name; //id storaged
	window.plugins.socialsharing.share(TITULO, 'Site Imobiliária: <br>', null, '<a url="'+URL+"/index.php?pagina=ver&id="+id+'">'+URL+"/index.php?pagina=ver&id="+id+'"</a>');
}