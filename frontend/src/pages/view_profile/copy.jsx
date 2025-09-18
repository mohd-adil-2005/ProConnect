 useEffect(()=>{
    setuserProfile(authState.user);


    if(authState.user){
         let post = postreducer.posts?.filter((post) => {
            console.log("kkkkkkkkkk", authState.user);
      return post.userId.username === authState.user?.username;
    });
    setUserPosts(post);
    }
    
 },[authState.user, postreducer.posts])



  useEffect(() => {
     let post = postreducer.posts?.filter((post) => {
       return post.userId.username === authState.user.userId.username;
     });
     setUserPosts(post);
   }, [postreducer.posts]);