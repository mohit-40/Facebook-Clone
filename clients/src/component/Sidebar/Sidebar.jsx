import React, { useContext, useEffect, useState } from 'react'
import {Link } from "react-router-dom"
import "./Sidebar.css"
import { RssFeed, Chat ,PersonAdd } from "@material-ui/icons";
import CloseFriend from "../CloseFriend/CloseFriend"
import {AuthContext} from "../../Context/AuthContext"
import axios from 'axios';

function Sidebar() {
	const {user:currentUser} = useContext(AuthContext);
	const [followings,setFollowings]=useState([])
	const [loaded,setLoaded] =useState(false)
	useEffect(() => {
		const fetchFollowing=async ()=>{
			const res = await axios.get("/users/followings/"+currentUser._id)
			setFollowings(res.data) 
			setLoaded(true)
		}
		fetchFollowing()
	}, [currentUser]);


	return loaded && (
		<div className="sidebar">
			<div className="sidebar-wrapper">

				<ul className="menu-list">
					<li className="menu-list-item">
						<Link className='text-link' to="/">
							<RssFeed className="menu-list-icon" />
							<span className="menu-list-text">Feed</span>
						</Link>
					</li>
					<li className="menu-list-item">
						<Link className='text-link' to="/chat">
							<Chat className="menu-list-icon" />
							<span className="menu-list-text">Chats</span>
						</Link>
					</li>
					<li className="menu-list-item">
						<Link className='text-link' to="/find-friend">
							<PersonAdd className="menu-list-icon" />
							<span className="menu-list-text">Find Friend</span>
						</Link>
					</li>
				</ul>


				{/* <button className="sidebar-btn">Show More</button> */}
				<hr />


				

				<div className="friend-list">
					<h1 className="heading">My Friend</h1>
					{followings  ?  
						followings.map((user)=> <CloseFriend key={user._id} user={user} className="friend-list-item" />)
						:'you currently have no friend'
					}
				</div>


			</div>
		</div>
	)
}

export default Sidebar
