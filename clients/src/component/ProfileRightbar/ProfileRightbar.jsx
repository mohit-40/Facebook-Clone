import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./ProfileRightbar.css"
import { Add, Remove } from "@material-ui/icons";
import CloseFriend from '../CloseFriend/CloseFriend';
import {useSelector , useDispatch} from "react-redux"
import { userRequest } from '../../requestMethod';
import {follow} from "../../redux/exportAllAction"
import {unfollow} from "../../redux/exportAllAction"
function ProfileRightbar({ user }) {
	//fetching reduxState
	const dispatch=useDispatch()
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const socket= useSelector(state=> state.socket.socket)
	//fetched reduxState
	const [followed, setFollowed] = useState(user.followers.includes(currentUserId));
	const [loaded, setLoaded] = useState(false)
	const [followings, setFollowings] = useState([])
	const [followers, setFollowers] = useState([])


	const handleFollow = async () => {
		try {
			if(followed){
				await userRequest.put("/users/"+ user._id +"/"+ currentUserId + "/unfollow")
				dispatch(unfollow(user._id))	
				socket?.emit("sendNotification",{
					receiverId: user?._id,
					senderId: currentUserId,
					text:"unfollow you",
					type:"unfollow"
				})
				setFollowed(!followed);
				setFollowers(followers.filter(fid=> fid !== currentUserId))
			}
			else{
				await userRequest.put("/users/"+ user._id +"/"+ currentUserId + "/follow" )
				dispatch(follow(user._id))	
				socket?.emit("sendNotification",{
					receiverId: user?._id,
					senderId: currentUserId,
					text:"started following you",
					type:"unfollow" 
				})
				setFollowed(!followed);
				setFollowers([...followers ,currentUserId])
			}
		} catch (error) {
			console.log(error.message);
		}
	}


	useEffect(() => {
		const fetchFollowings = async () => {
			const res1 = await userRequest.get("/users/followings/" + user._id)
			const res2 = await userRequest.get("/users/followers/" + user._id)
			setFollowings(res1.data)
			setFollowers(res2.data)
			setLoaded(true)
		}
		fetchFollowings() 
	}, [user]);


	return loaded && (
		<div className="profile-rightbar">
			<div className="profile-rightbar-wrapper">
				{user._id !== currentUserId ?
					<button className="follow-btn" onClick={handleFollow}>
						{followed ? <i className="fas fa-user-minus" >  UnFollow</i> :   <i className="fas fa-user-plus"> Follow</i>}
						{/* {followed ? "UnFollow " : "Follow"} */}
					</button>
					: ''}

				<div className="user-info">
					<div className="title"><i className="far fa-address-card" style={{fontSize:"25px"}} ></i> About {user.name}</div>
					{!user.work && !user.school && !user.from && !user.live && !user.relationship && <div>This User Information not available</div>}
					<div className="info">
						{user.work ? <span ><i className="fas fa-briefcase"></i> Work at <b>{user.work}</b> </span> : ''}
					</div>
					<div className="info">
						{user.school ? <span ><i className="fas fa-university"></i> Studied at <b>{user.school}</b> </span> : ''}
					</div>
					<div className="info">
						{user.from ? <span ><i className="fas fa-globe-americas"></i> From <b>{user.from}</b> </span> : ''}
					</div>
					<div className="info">
						{user.live ? <span > <i className="fas fa-building"></i> Live in <b>{user.live}</b> </span> : ''}
					</div>
					<div className="info">
						{user.relationship ? <span><i className="fas fa-heart"></i> Relationship Status <b>{user.relationship===1? "Single (😃)" : user.relationship===2 ? "In RelationShip (😞)" : "Complicated (😉)"}</b> </span> : ''}
					</div>
					<div className="info">
						{user.birthday ? <span><i className="fas fa-birthday-cake"></i> Birthday on <b>{user.birthday}</b> </span> : ''}
					</div>
				</div>
				<hr />


				<div className="title"><i className="fas fa-users" style={{fontSize:"25px"}}></i> {user.name} following <span className="follower-following-counter">({followings.length})</span></div>
				<div className="user-friend-container">
					{followings.length !== 0 ?
						followings.slice(0,3).map((followingId) => <CloseFriend key={followingId} className="user-friend-item" userId={followingId} />) :
						'No Following'
					}
				</div>
				<Link className='text-link' to={{ pathname: `/friendPage`, search:`type=followings?userName=${user?.name}` , state: { usersId: followings} }} >
					<button className="show-all">Show All</button>
				</Link>

				<hr />

				<div className="title"><i className="fas fa-users" style={{fontSize:"25px"}}></i> {user.name} follower <span className="follower-following-counter">({followers.length})</span></div>
				<div className="user-friend-container">
					{followers.length !== 0 ?
						followers.slice(0,3).map((followerId) => <CloseFriend key={followerId} className="user-friend-item" userId={followerId} />) :
						'No Follower'
					}
				</div>
				<Link className='text-link' to={{ pathname: `/friendPage`, search:`type=followers?userName=${user?.name}` ,state: { usersId: followers } }} >
					<button className="show-all">Show All</button>
				</Link>

			</div>
		</div >
	)
}

export default ProfileRightbar
