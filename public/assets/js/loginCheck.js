function checkLogin(){
    let token=localStorage.getItem('covid')
    if(!token){
window.location.href="/"
    }
}
checkLogin()