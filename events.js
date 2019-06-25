(function(window,document){
    window.onload = function(){
        'use strict';
        function createEntry(data){
            return '<h2>'+data.name+'</h2>'+ '<img alt="'+data.name+'" src="'+data.bild+'">'+ '<p>'+data.ort+'</p>'+ '<p>'+data.datum+'</p>';
        }

        function showData(e){
            e.preventDefault();
            var ausgabe = document.getElementById('ausgabe')
            ausgabe.innerHTML = '';
            var event = e.target.textContent.trim();
            var xhr = new XMLHttpRequest();
            xhr.open('GET','events.json',true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    var entry;
                    
                    for(var i = 0, len = data.length; i < len; i++) {
                        entry = data[i];
                        
                        if(entry.name === event || event === 'Alle anzeigen') {
                            ausgabe.innerHTML += createEntry(entry);
                        }
                    }
                }
            };
            xhr.send();

        }

        
        var links = document.getElementById('liste').getElementsByTagName('a');
        for(var i = 0, len = links.length; i < len; i++) {
            links[i].onclick = showData;
        }
    };
}(window, document));
