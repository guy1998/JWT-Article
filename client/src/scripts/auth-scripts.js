export const get_authorization = (success_action, failure_action)=>{
    fetch("http://localhost:5443/permission/authorize", {
    method: "GET",
    credentials: "include"
  })
  .then(response=>{
        if(response.status === 200)
            success_action()
        else if (response.status === 401)
            failure_action()
  })
  .catch(err=>{
    console.log(err);
  })
}