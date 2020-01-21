/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
	Slider,
	Typography,
	IconButton,
	CircularProgress
} from "@material-ui/core";
import { PlayArrow, VolumeUp, Pause } from "@material-ui/icons";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";
import { red } from "@material-ui/core/colors";
const Player: React.FC<{
	src: any;
	uploadModal: any;
	data: any;
	name: any;
}> = ({ src, uploadModal, data, name }) => {
	const [audio] = useState(new Audio(src));
	const [duration, setDuration] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(100);
	const [audio_position, setAudioPosition] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	audio.onloadeddata = function () {
		setDuration(audio.duration);
		setCurrentTime(audio.currentTime);
		audio.volume = volume / 100;
		setLoading(false);
		setError(false);
	};

	audio.onerror = function () {
		setError(true);
	};

	audio.onplaying = function () {
		setCurrentTime(audio.currentTime);
	};

	audio.onplay = function () {
		setInterval(() => {
			setCurrentTime(audio.currentTime);
		}, 500);
	};

	audio.onended = function () {
		setPlaying(false);
	};

	function format(time: any) {
		time = Math.floor(time);
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	function playAudio() {
		audio.play();
		setPlaying(true);
	}

	function pauseAudio() {
		audio.pause();
		setPlaying(false);
	}

	useEffect(() => {
		setAudioPosition(
			Math.floor((Math.floor(currentTime) / Math.floor(duration)) * 100)
		)
	});

	function volumeHandler(e: any) {
		try {
			audio.volume = e.target.attributes[8].value / 100;
			setVolume(e.target.attributes[8].value);
		} catch (e) {
			console.log(e);
		}
	}

	function seekHandler(e: any) {
		let newTime =
			((e.clientX - e.target.offsetLeft) / e.target.offsetWidth) *
			audio.duration;
		if (newTime <= audio.duration) {
			setCurrentTime(newTime);
			audio.currentTime = newTime;
		}
	}

	async function downloadAudio() {
		let data = fetch(`https://cors-anywhere.herokuapp.com/${src}`);
		data
			.then((image) => image.blob())
			.then((img) => {
				let reader = new FileReader();
				reader.readAsDataURL(img);
				reader.onload = (result: any) => {
					var element = document.createElement("a");
					element.setAttribute("href", result.target.result);
					element.setAttribute(
						"download",
						`${name}-audio-resource.${
						src.split(".")[src.split(".").length - 1].split("?")[0]
						}`
					);
					element.style.display = "none";
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
				};
			});
	}

	function audioComponent() {
		return (
			<>
				<IconButton
					disabled={error}
					onClick={() => (playing ? pauseAudio() : playAudio())}
					style={{
						color: "#444851"
					}}
				>
					{!playing ? <PlayArrow /> : <Pause />}
				</IconButton>
				<Typography
					style={{
						width: "76px",
						margin: 0,
						padding: 0,
						fontSize: "14px",
						color: "#777777"
					}}
				>
					{format(currentTime)} / {format(duration)}
				</Typography>

				<Slider
					name="audio-slider"
					onChange={seekHandler}
					style={{
						color: "#1194f6",
						width: "50px",
						marginRight: "16px",
						marginLeft: "11px"
					}}
					aria-label="custom thumb label"
					value={audio_position}
					defaultValue={audio_position}
				/>

				<VolumeUp
					style={{
						marginRight: "10px"
					}}
				/>

				<Slider
					onChange={volumeHandler}
					style={{
						color: "#1194f6",
						width: "25px",
						marginRight: "10px"
					}}
					aria-label="custom thumb label"
					defaultValue={volume}
				/>

				<IconButton disabled={error} onClick={() => downloadAudio()}>
					<Icon path={mdiDownload} title="Copy" size={1} rotate={360} />
				</IconButton>
			</>
		);
	}

	function loadingAudio() {
		return <>No audio found!</>;
	}

	let errorStyle = {
		zIndex: 1299,
		position: "absolute",
		opacity: 1,
		color: red[600],
		margin: "auto"
	} as React.CSSProperties;

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				{loading && !error && (
					<CircularProgress
						style={{
							position: "absolute",
							color: "#1194f6"
						}}
					/>
				)}

				{error && (
					<Typography style={errorStyle}>
						No audio file.{" "}
						<a
							style={{
								color: "#1194f6",
								cursor: "pointer",
								fontWeight: "bold"
							}}
							onClick={() => uploadModal(data, name)}
						>
							Upload ?
            </a>
					</Typography>
				)}

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						opacity: `${error ? 0.2 : loading ? 0.6 : 1}`
					}}
				>
					{audioComponent()}
				</div>
			</div>
		</>
	);
};

export default Player;
