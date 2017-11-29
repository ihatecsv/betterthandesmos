var presetFuncText = (new URL(location)).searchParams.get("function");

if(presetFuncText != null){
	$("#functionText").val(presetFuncText);
}

$("#functionText").on('change keyup paste', function() {
	 var newURL = location.href.split("?")[0] + "?function=" + encodeURIComponent($("#functionText").val());
	 history.replaceState({}, '', newURL);
});
