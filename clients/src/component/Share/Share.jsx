import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import "./Share.css"


function Share() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);

	return (
		<div className="share">
			<div className="share-wrapper">
				<div className="share-top">
					<img src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="profileimg" />
					<input type="text" placeholder={"What in Your Mind Today "+user.username +" ??"} />
				</div>
				<hr />
				<div className="share-bottom">
					<div className="option-container">
						<div className="option">
							<PermMedia  htmlColor="red" className="icon"/>
							<span className="option-text">Photo & Video</span>
						</div>
						<div className="option">
							<Label htmlColor="blue" className="icon"/>
							<span className="option-text">Label</span>
						</div>
						<div className="option">
							<Room htmlColor="green" className="icon"/>
							<span className="option-text">Location</span>
						</div>
						<div className="option">
							<EmojiEmotions htmlColor="yellow" className="icon"/>
							<span className="option-text">Feeling</span>
						</div>
						<button type="submit"> Share </button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Share
