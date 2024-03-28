var slideIndex = 1;
var totalSlides = 3;

function moveSlide(val){
    var reviewContainers = document.getElementsByClassName("reviewContainer");
    reviewContainers[slideIndex-1].classList.remove("activeReviewContainer");
    
    if(val==-1){
        if(slideIndex>1)slideIndex--;else slideIndex=totalSlides;

        //adding animation to that 
        reviewContainers[slideIndex-1].style.animation ="slideAnimationRightToLeft 2s"
    }else if(val==1){
        if(slideIndex<totalSlides)slideIndex++;else slideIndex=1; 
        reviewContainers[slideIndex-1].style.animation ="slideAnimationLeftToRight 2s"
    }
    reviewContainers[slideIndex-1].classList.add("activeReviewContainer");


}