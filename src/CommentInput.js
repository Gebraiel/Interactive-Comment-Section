import { useState } from "react";
export default function CommentInput({user,replyTo,handleClick,children}){
    const [comment,setComment] = useState(replyTo !==undefined ? `@${replyTo.username} `:"");
    function handleButton(){
        console.log(comment);
        handleClick(comment,user);
        setComment("");
    }

    return(
        <div className="box comment-input">
            <div className="avatar-image">
                <img src={user.image.png} alt="current-user" />
            </div>
            <textarea name="comment" id="comment-input" placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value)}/>
            <button className="send-button" onClick={()=>handleButton()}>{children}</button>
        </div>
    );
}