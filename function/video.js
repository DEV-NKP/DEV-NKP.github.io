

function playvideo(imgid, videoid){
    
    document.getElementById(videoid).style.display="block";
    document.getElementById(imgid).style.display="none";
 
    document.getElementById(videoid).contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');

}
    
    
    function pausevideo(imgid, videoid){
      
    document.getElementById(videoid).style.display="none";
    document.getElementById(imgid).style.display="block";
    
        document.getElementById(videoid).contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      
    }

