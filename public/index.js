
window.onload = async ()=>{
    var checkAuthFetch = await fetch("/api/checkAuth",{

    }) 
    var checkAuthFetchResult = await checkAuthFetch.json();

    // console.log(checkAuthFetchResult);
}

