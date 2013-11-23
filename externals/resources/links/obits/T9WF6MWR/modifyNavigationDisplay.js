function modifyNavigationDisplay(){
	if(document.createElement && document.getElementById( "navigation")) {	
		var navDiv = document.getElementById( "navigation" );
		var navList = evalChildNodes( navDiv , ["nodeName.toLowerCase() == 'ul'" , "className == 'tabs'"] );
		var selectedItem = evalChildNodes ( navList , ["className == 'selected'" , "nodeName.toLowerCase() == 'li'"] ); if (!selectedItem) return false;
		var subNavList = evalChildNodes( selectedItem , ["nodeName.toLowerCase() == 'ul'"] );
		
		if(subNavList) {
		
			subNavList.id = "sub" + selectedItem.id;

			var subNavDiv = document.createElement( "DIV" );
			subNavDiv.id = "subNavigation";
			navDiv.appendChild( subNavDiv );
			selectedItem.removeChild( subNavList );

			subNavDiv.appendChild( subNavList );
		}
	}
}



function evalChildNodes( parentObj , evalStatementArray ){
	var evalStatement = new String();

	try{
		for( iESA=0 ; iESA < evalStatementArray.length ; iESA++ ){
			if( iESA != 0 ) evalStatement += " && ";
			evalStatement += " parentObj.childNodes[iECN]." + evalStatementArray[iESA] + " ";
		}
		
		for( iECN=0 ; iECN < parentObj.childNodes.length ; iECN++ ){
			if( eval( evalStatement ) ){
				return parentObj.childNodes[iECN];
			}
		}
		return null;
	} catch( e ){
		return null;
	}
}