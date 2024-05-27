"use client";
import { v4 } from "@/utils/uuid";
import { useState } from "react";

export default function ShowImage({ selectedActivity }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [zoom, setZoom] = useState(100);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [initialMousePosition, setInitialMousePosition] = useState({
		x: 0,
		y: 0,
	});

	console.log(selectedActivity);

	const handleIncreaseWidth = () => {
		setIsModalOpen(true);
		setZoom(50);
		setPosition({ x: 0, y: 0 });
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setPosition({ x: 0, y: 0 });
		setZoom(100);
	};
	const handleWheel = (e) => {
		e.preventDefault();
		const scale = e.deltaY < 0 ? 1.1 : 0.9;
		setZoom((prevZoom) => prevZoom * scale);
	};
	const handleMouseDown = (e) => {
		e.stopPropagation();
		setIsDragging(true);
		setInitialMousePosition({ x: e.clientX, y: e.clientY });
	};
	const handleMouseMove = (e) => {
		if (isDragging) {
			setPosition((prevPosition) => ({
				x: prevPosition.x + e.clientX - initialMousePosition.x,
				y: prevPosition.y + e.clientY - initialMousePosition.y,
			}));
			setInitialMousePosition({ x: e.clientX, y: e.clientY });
		}
	};
	const handleMouseUp = () => {
		setIsDragging(false);
	};

	return (
		<div className="flex flex-col w-3/4  gap-2">
			{selectedActivity?.files?.map((file) => (
				<button
					type="button"
					className=""
					onClick={handleIncreaseWidth}
					key={v4()}
				>
					<img src={file.url} alt="imgs" className="aspect-[16:9] w-96" />
				</button>
			))}
			{isModalOpen && (
				<button
					type="button"
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
					onClick={handleCloseModal}
				>
					<div className="bg-white p-4">
						<img
							src={selectedActivity?.files[0]?.url}
							alt="imagen de actividad"
							style={{
								transform: `scale(${zoom / 100}) translate(${position.x}px, ${
									position.y
								}px)`,
							}}
							onWheel={handleWheel}
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={handleMouseUp}
						/>{" "}
						<button type="button" onClick={handleCloseModal}>
							-
						</button>
					</div>
				</button>
			)}
		</div>
	);
}
