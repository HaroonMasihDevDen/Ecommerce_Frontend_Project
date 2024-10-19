import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Temp = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleSearch = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="flex items-center">
			<div className="relative">
				<button
					className="text-gray-600 hover:text-gray-800 focus:outline-none"
					onClick={toggleSearch}
				>
					<FaSearch className="text-xl" />
				</button>
				<div
					className={`absolute top-0 left-0 flex transition-all duration-300 ${
						isExpanded ? "w-64 px-2 opacity-100" : "w-0 opacity-0"
					} overflow-hidden bg-white border border-gray-300 rounded-full items-center`}
				>
					<input
						type="text"
						className="w-full py-1 pl-4 pr-2 outline-none transition-width duration-300"
						placeholder="Search..."
					/>
					<button className="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-full">
						Search
					</button>
				</div>
			</div>
		</div>
	);
};

export default Temp;
