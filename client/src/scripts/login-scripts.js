export const login = (username, password, success_action, failure_action) => {
  fetch("http://localhost:5443/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  })
  .then(response=>{
        if(response.status === 200)
            success_action()
        else
            failure_action()
  })
  .catch(err=>{
    console.log(err);
  })
};
