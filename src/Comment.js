import CommentInput from "./CommentInput";
import React, { useState } from 'react';
export default function Comment({comment,user,onClickDelete,handleEdit,isReply}){
    const [show,setShow] = useState(false);
    const [commentText,setCommentText] = useState(comment.content)
    const [editMode,setEditMode] = useState(false);
    // console.log(comment);
    function handleCommentDelte(){
        console.log("Deleting main comment");
        onClickDelete(comment,false);
    }
    function handleReplyDelte(id){
        let newRepliesList = comment.replies.filter((reply)=> reply.id !== id);
        
        let newComment = {
            id:comment.id,
            content:comment.content,
            createdAt:comment.createdAt,
            score:comment.score,
            user:comment.user,
            replies:newRepliesList
        }
        console.log("Delting The Reply");
        onClickDelete(newComment,true);
    }
    function handleReply(reply,currentUser){
        if(isReply){
            handleEdit(reply,currentUser);
        }else{
            let splitedArray = reply.split(" ");
            let replyTo = splitedArray[0].slice(1);

            reply = splitedArray.slice(1).join(" ");
            console.log("Reply to : ",replyTo,typeof replyTo);
            console.log(reply);
            let newReply = {
                "id":crypto.randomUUID(),
                "content":reply,
                "createdAt":"1 min ago",
                "score":0,
                "replyingTo":replyTo,
                user:currentUser,
            }
            let newReplies = [...comment.replies,newReply];
            console.log(newReplies)
            comment = {
                id:comment.id,
                content:comment.content,
                createdAt:comment.createdAt,
                score:comment.score,
                user:comment.user,
                replies:newReplies
            }
            console.log(comment);
            handleEdit(comment);
        }
        setShow(false);
    }

    return(
        <div className="comment-container">
            <div className="box comment-box">
                <Votes counter={comment.score}/>
                <div className="avatar">
                    <div className="avatar-image">
                        <img src={comment.user.image.png} alt='avatar' />
                    </div>
                    <b className="avatar-name">{comment.user.username}</b>
                    {comment.user.username === user.username && <div className="user-badge">you</div>}
                    <div className="creation-date">{comment.createdAt}</div>
                </div>
                {
                    !editMode ?  
                    <div className="comment-text">
                        {comment.replyingTo !== undefined && <span className="reply-to">@{comment.replyingTo} </span>}{commentText}
                    </div>
                    :
                    <div className="comment-text edit-form">
                        <form>
                           <textarea value={commentText} onChange={(e)=>setCommentText(e.target.value)}/>
                           <button onClick={()=>setEditMode(false)}>Update</button>
                        </form>
                    </div>
                }
                {
                    comment.user.username === user.username ? 
                    <div className="buttons">
                        <button className="delete-button" onClick={()=>isReply?onClickDelete(comment.id):handleCommentDelte()}><img src="./images/icon-delete.svg" alt="delete-icon"/> Delete</button>
                        <button className="edit-button" onClick={()=>setEditMode(true)}><img src="./images/icon-edit.svg" alt="edit-icon"/> Edit</button>
                        <button className="reply-button"  onClick={()=>setShow(!show)}>
                            <img src="./images/icon-reply.svg" alt="reply-icon"/> Reply
                        </button>
                    </div>
                    : 
                    <button className="reply-button"  onClick={()=>setShow(!show)}>
                        <img src="./images/icon-reply.svg" alt="reply-icon"/> Reply
                    </button>
                }            
            </div>
            {show && <CommentInput user={user} replyTo={comment.user} handleClick={handleReply}>REPLY</CommentInput>}
            {comment.replies?.length > 0 && 
                <div className="replies-container">
                    {comment.replies?.map((reply) => <Comment key={reply.id} comment={reply} user={user} onClickDelete={handleReplyDelte} handleEdit={handleReply} isReply={true}/>)}
                </div>
            }
        </div>
    );
}
function Votes({counter}){
    return(
        <div className="vote">
            <button>+</button>
            <div className="counter">{counter}</div>
            <button>-</button>
        </div>
    )
}
// function ReplyList({replies,user}){
//     return(
        
//     )
// }
// function Reply({reply,user}){
//     const [show,setShow] = useState(false);
//     return(
//         <>
//             <div className="box reply-box">
//                 <Votes counter={reply.score}/>
//                 <div className="avatar">
//                     <div className="avatar-image">
//                         <img src={reply.user.image.png} alt='avatar' />
//                     </div>
//                     <b className="avatar-name">{reply.user.username}</b>
//                     {reply.user.username === user.username && <div className="user-badge">you</div>}
//                     <div className="creation-date">{reply.createdAt}</div>
//                 </div>
//                 <div className="comment-text">
//                     <b className="reply-to">@{reply.replyingTo} </b>{reply.content}
//                 </div>
//                 {
//                     reply.user.username === user.username ? 
//                     <div className="buttons">
//                         <button className="delete-button"><img src="./images/icon-delete.svg" alt="delete-icon"/> Delete</button>
//                         <button className="edit-button"><img src="./images/icon-edit.svg" alt="edit-icon"/> Edit</button>
//                     </div>: 
//                     <button className="reply-button"  onClick={()=>setShow(!show)}>
//                         <img src="./images/icon-reply.svg" alt="reply-icon"/> Reply
//                     </button>
//                 }
//             </div>
//             {show && <CommentInput user={user}>REPLY</CommentInput>}
//         </>
//     )
// }