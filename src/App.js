import Comment from "./Comment";
import CommentInput from "./CommentInput";
import {useState} from "react"
let currentUser =  {
  "image": { 
    "png": "./images/avatars/image-juliusomo.png",
    "webp": "./images/avatars/image-juliusomo.webp"
  },
  "username": "juliusomo"
};
let initialComments = [
    {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/image-amyrobson.png",
          "webp": "./images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      "replies": []
    },
    {
      "id": 2,
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2 weeks ago",
      "score": 5,
      "user": {
        "image": { 
          "png": "./images/avatars/image-maxblagun.png",
          "webp": "./images/avatars/image-maxblagun.webp"
        },
        "username": "maxblagun"
      },
      "replies": [
        {
          "id": 3,
          "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          "createdAt": "1 week ago",
          "score": 4,
          "replyingTo": "maxblagun",
          "user": {
            "image": { 
              "png": "./images/avatars/image-ramsesmiron.png",
              "webp": "./images/avatars/image-ramsesmiron.webp"
            },
            "username": "ramsesmiron"
          }
        },
        {
          "id": 4,
          "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          "createdAt": "2 days ago",
          "score": 2,
          "replyingTo": "ramsesmiron",
          "user": {
            "image": { 
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
        }
      ]
    }
  ]
export default function App(){
  const[showWarning,setShowWarning] = useState(false);
  const[comments,setComments] = useState(initialComments);
  const[deletedComment,setDeletedComment] = useState(null);
  const[isReply,setIsReply] = useState(false);
  console.log("App is Rendering");
  console.log(comments);
  function handleClickDelete(comment,isReply){
    console.log("Show Warning Message");
    setIsReply(isReply);
    setShowWarning(true);
    setDeletedComment(comment);
  }
  function handleWarning(action){
    if(action ==="DELETE"){
      if(isReply){
        
        console.log("Edit Comment with deleted Reply");
        editComment(deletedComment);
      }else{
        let newCommentsList = comments.filter((comment)=>comment.id !== deletedComment.id)
        setComments(newCommentsList);
      }
    }
    setDeletedComment(null);
    setShowWarning(false);  
  }
  function editComment(comment,isDeletingItem){
    let newCommentsList = comments.map((c)=>c.id === comment.id?comment:c);
    console.log(newCommentsList);
    setComments(newCommentsList);
  }
  function addComment(comment,user){
      let newComment ={
        "id":crypto.randomUUID(),
        "content":comment,
        "createdAt":"1 min ago",
        "score":0,
        user,
        "replies":[]
    };

    setComments(Array.from([...comments,newComment]));
  }
  return(
      <>
        <div className="container">
            <CommentList comments={comments} user={currentUser} onClickDelete={handleClickDelete} editComment={editComment}/>
            <CommentInput user={currentUser} handleClick={addComment}>SEND</CommentInput>
        </div>
        {showWarning && <WarningMessage handleClick={handleWarning}/>}
      </>

  );
}
function WarningMessage({handleClick}){
  return(
    <div className="warning-popup">
      <div className="message-container">
        <div className="warning-message">
          <b>Delete Comment</b>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="warning-buttons">
            <button className="cancel" onClick={()=>handleClick("CANCEL")}>No,Cancel</button>
            <button className="delete" onClick={()=>handleClick("DELETE")}>Yes,Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
function CommentList({comments,user,onClickDelete,editComment}){
  return(
        comments.map((comment) =><Comment key={comment.id} comment={comment} user={user} onClickDelete={onClickDelete} handleEdit={editComment} isReply={false}/> )
    )  
}