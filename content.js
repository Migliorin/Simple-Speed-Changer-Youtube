function waitForElement(selector) {
    return new Promise(function(resolve, reject) {
        var element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
 
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var nodes = Array.from(mutation.addedNodes);
                for (var node of nodes) {
                    if (node.matches && node.matches(selector)) {
                        observer.disconnect();
                        resolve(node);
                        return;
                    }
 
                    if (node.querySelector) {
                        var element = node.querySelector(selector);
                        if (element) {
                            resolve(element);
                            return;
                        }
                    }
                };
            });
        });
 
        observer.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true,
            }
        );
    });
}
  

var verf = false // Variavel para impedir a criacao de mais botoes

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    waitForElement('#movie_player')
    .then(function(usernameField) {
        if(!verf){
            const header = document.querySelector("#movie_player")
        
            if(header){
            
                const div = document.createElement("div")
                div.classList.add("twoTimesButton")

                const velo_visor = document.createElement('p')
                velo_visor.innerHTML = "1.00x"
                

                const button_aumentar = document.createElement('button')
                button_aumentar.innerHTML = "+"
                button_aumentar.addEventListener("click",()=>{
                    const video = document.querySelectorAll("video");
                    video.forEach((vid)=>{
                        vid.playbackRate = vid.playbackRate + 0.1
                        velo_visor.innerHTML = String(vid.playbackRate.toFixed(2)+"x")
                    })
                    
                })

                const button_diminuir = document.createElement('button')
                button_diminuir.innerHTML = "-"
                button_diminuir.addEventListener("click",()=>{
                    const video = document.querySelectorAll("video");
                    video.forEach((vid)=>{
                        if(vid.playbackRate > 0){
                            vid.playbackRate = vid.playbackRate - 0.1
                            velo_visor.innerHTML = String(vid.playbackRate.toFixed(2)+"x")
                        }
                    })
                    
                })

                div.appendChild(velo_visor)
                div.appendChild(button_aumentar)
                div.appendChild(button_diminuir)
                header.appendChild(div)
                verf = true
            }
        }
    });
});