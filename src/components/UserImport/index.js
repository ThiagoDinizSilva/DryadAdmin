import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineFileExcel } from "react-icons/ai"
import "../../assets/scss/userImport.scss";



const UsersImport = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [IsSelected, setIsSelected] = useState(null);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};
	const deleteFile = () => {
		setSelectedFile(null);
		setIsSelected(false);
		console.log(IsSelected, selectedFile)
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'http://localhost:3001/api/upload',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	const downloadExcelFile = () => {

	}
	return (
		<Fragment>
			<form className="file-upload">
				<div className="upload-wrap">
					<input className="file-upload-input" type='file' name="file" onChange={changeHandler} />
					<div className="drag-text">
						{IsSelected ? (
							<div>
								<AiOutlineFileExcel className="AiFillFileExcel" />
								<p>Filename: {selectedFile.name}</p>
								<p>bytes: {selectedFile.size}</p>

							</div>
						) : (
							<h3>DRAG AND DROP OR CLICK TO UPLOAD </h3>
						)}

					</div>
				</div>
				<button className="file-download-btn">EXCEL MODEL</button>
			</form>
			<div className="btn-upload">
				<button className="file-upload-btn" type="button" onClick={handleSubmission} >UPLOAD FILE</button>
				<button className="remove-file" type="button" onClick={deleteFile} >CANCEL</button>

			</div>

		</Fragment >);
};

export default UsersImport;


