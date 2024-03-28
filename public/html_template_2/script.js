

window.addEventListener("load",function (){
    var sliderScrollRightBtn = document.getElementById("sliderScrollRightBtn");
    var sliderScrollLeftBtn = document.getElementById("sliderScrollLeftBtn");
    
    var sliderContainer = document.getElementById("sliderContainer");
    
    sliderScrollRightBtn.addEventListener("click",function(){
        sliderContainer.scrollBy({
            left:200,
            behavior:"smooth"
        })
    })
    sliderScrollLeftBtn.addEventListener("click",function(){
        sliderContainer.scrollBy({
            left:-200,
            behavior:"smooth"
        })
    })



    
    
    
    
})
function changeSect5Content(id){
    var section5RightContainer = document.getElementsByClassName("section5RightContainer");
    
    var currentActiveSect5 = document.getElementsByClassName("activeSect5");
    if(currentActiveSect5[0]){
        currentActiveSect5[0].classList.remove("activeSect5");
    }

    for (let i = 0; i < section5RightContainer.length; i++) {
        if(section5RightContainer[i] && section5RightContainer[i].id === id){
            section5RightContainer[i].classList.add("activeSect5")
        }
    }



}