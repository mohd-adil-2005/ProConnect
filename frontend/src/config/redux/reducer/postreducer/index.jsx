import { createSlice } from "@reduxjs/toolkit";
import { allPosts,createPost, deletePost } from "../../action/postaction";
import { getCommentsByPost } from "../../action/postaction";

const initialState={
posts:[],
isError:false,
isCreated:false,
ispostdelete:false,
isSuccess:false,
isloading:false,
postFetched:false,
message:" ",
comments:[],
postId:""

}
export const postreducer= createSlice({
    name:"posts",
    initialState,
    reducers:{
        reset:(state)=>initialState,
        resetpostId:(state)=>{
            state.postId= "";
        }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(allPosts.pending,(state)=>{
            state.isloading= true;
            state.message="posts is loading !"
        })
        .addCase(allPosts.fulfilled,(state, action)=>{
            state.isError= false;
            state.isloading= false;
            state.isSuccess=true;
            console.log("xxxxxxxxxxxxxxxxxxxxx", action.payload);
            state.posts= action.payload.posts.reverse();
            console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyy ", state.posts);
         
            state.message="Posts fetched successfully";
        })
        .addCase(allPosts.rejected,(state, action)=>{
            state.isloading= false;
            state.isSuccess= false;
             console.log("❌ Reducer error:", action.payload);
            state.isError= true;
            state.message= action.payload
        })

        .addCase(getCommentsByPost.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getCommentsByPost.fulfilled,(state,action)=>{
            state.isloading=false
            state.isError=false
            state.isSuccess=true
            state.comments=action.payload.comments
            console.log("comments in reducer checkkkkkkk ",state.comments);
            state.postId= action.payload.post_id
            state.message="Comments fetched successfully"
        })
        .addCase(getCommentsByPost.rejected,(state,action)=>{
            state.isloading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.payload
        })
        .addCase(createPost.pending,(state)=>{
            state.isloading=true
            state.message="Creating post..."
            state.isCreated=false
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.isloading=false
            state.isError=false
            state.isSuccess=true
            state.isCreated=true
            state.posts.unshift(action.payload)
            state.message="Post created successfully"
        })
        .addCase(createPost.rejected,(state,action)=>{
            state.isloading=false
            state.isError=true
            state.isSuccess=false
            state.isCreated=false
            state.message=action.payload
        })
        .addCase(deletePost.pending, (state,action)=>{
            state.isloading=true
            state.message="Deleting post..."
              state.ispostdelete = false;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.ispostdelete = true;
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
            state.message = "Post deleted successfully";
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
              state.ispostdelete = false;
            state.message = action.payload;
        });
    }
} 
)

export const{ reset, resetpostId } = postreducer.actions;
export default postreducer.reducer;