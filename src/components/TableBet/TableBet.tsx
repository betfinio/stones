import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import arrowDown from '../../assets/BetTable/arrow-down.svg';
import cashBlue from '../../assets/BetTable/cash-blue.svg';
import showIcon from '../../assets/BetTable/eye.svg';
import searchIcon from '../../assets/BetTable/search.svg';
import sortIcon from '../../assets/BetTable/sort.svg';
import cash from '../../assets/Roulette/cash.svg';
import crystal1 from '../../assets/Roulette/crystal1.svg';
import crystal2 from '../../assets/Roulette/crystal2.svg';
import crystal3 from '../../assets/Roulette/crystal3.svg';
import crystal4 from '../../assets/Roulette/crystal4.svg';
import crystal5 from '../../assets/Roulette/crystal5.svg';
import mockTableData from '../../mocks/mockTableData.json';

interface TableRow {
	date: string;
	round: string;
	sum: string;
	stone: string;
	winning: string;
	bonus: string;
	transactionId: string;
}

interface MockTableData {
	myBets: TableRow[];
	allRounds: TableRow[];
}

const images: { [key: string]: string } = {
	crystal1,
	crystal2,
	crystal3,
	crystal4,
	crystal5,
};

const TableBet = () => {
	const [activeTab, setActiveTab] = useState<keyof MockTableData>('myBets');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const [resultsPerPage, setResultsPerPage] = useState(10);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const data = mockTableData[activeTab as keyof MockTableData];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		const handleScroll = () => {
			setIsDropdownOpen(false);
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleSort = () => {
		setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleResultsPerPageChange = (limit: number) => {
		setResultsPerPage(limit);
		setCurrentPage(1); // Reset to first page on limit change
		setIsDropdownOpen(false);
	};

	// Sort data based on sortOrder
	const sortedData = [...data].sort((a, b) => {
		const valueA = sortOrder === 'asc' ? a.date : b.date;
		const valueB = sortOrder === 'asc' ? b.date : a.date;
		return valueA.localeCompare(valueB);
	});

	// Paginate data
	const indexOfLastResult = currentPage * resultsPerPage;
	const indexOfFirstResult = indexOfLastResult - resultsPerPage;
	const currentData = sortedData.slice(indexOfFirstResult, indexOfLastResult);

	// Calculate total pages
	const totalPages = Math.ceil(data.length / resultsPerPage);

	// Helper function to render pagination buttons intelligently
	const renderPageNumbers = () => {
		const pageNumbers = [];
		const maxButtons = 5; // Maximum number of page buttons to display

		if (totalPages <= maxButtons) {
			// Show all pages if total pages is less than or equal to max buttons
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			if (currentPage <= 3) {
				// Show first few pages and last page with ellipses
				pageNumbers.push(1, 2, 3, 4, '...', totalPages);
			} else if (currentPage > totalPages - 3) {
				// Show first page with ellipses and last few pages
				pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				// Show first page, ellipses, current page, ellipses, and last page
				pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
			}
		}

		return pageNumbers.map((page, index) => (
			<motion.button
				key={index}
				onClick={() => handlePageChange(page as number)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className={`px-2 py-2 w-[32px] rounded-md text-[12px] font-semibold ${
					currentPage === page ? 'bg-[#282c46] text-white' : 'bg-[#131624] text-gray-400'
				} ${typeof page === 'string' ? 'cursor-default' : 'cursor-pointer'}`}
				disabled={typeof page === 'string'}
			>
				{page}
			</motion.button>
		));
	};

	return (
		<div className="w-full mt-6 overflow-hidden">
			{/* Tabs */}
			<div className="flex space-x-4 mb-4">
				<button
					type="button"
					className={`px-4 py-2 rounded-lg font-semibold text-[12px] ${activeTab === 'myBets' ? 'bg-yellow-500 text-black' : 'bg-[#131624] text-white'}`}
					onClick={() => setActiveTab('myBets')}
				>
					My bets
				</button>
				<button
					type="button"
					className={`px-4 py-2 rounded-lg font-semibold text-[12px] ${activeTab === 'allRounds' ? 'bg-yellow-500 text-black' : 'bg-[#131624] text-white'}`}
					onClick={() => setActiveTab('allRounds')}
				>
					All rounds
				</button>
			</div>

			{/* Table Controls */}
			<div className="flex flex-wrap justify-between items-center mb-4 space-y-2 md:space-y-0">
				<h3 className="text-white font-semibold text-[18px]">History</h3>
				<div className="flex flex-wrap justify-end items-center space-x-4 space-y-2 md:space-y-0">
					<div className="flex items-center space-x-2">
						<span className="text-gray-400 text-sm">Sort by:</span>
						<motion.img
							src={sortIcon}
							alt="sort"
							className="h-[16px] w-[16px] cursor-pointer hover:scale-150 transition-all"
							onClick={handleSort}
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						/>
					</div>

					<div className="flex items-center space-x-2 bg-[#131624] p-2 rounded-lg">
						<img src={searchIcon} alt="search" className="h-[16px] w-[16px]" />
						<input type="text" placeholder="Search bet" className="bg-transparent text-white text-sm outline-none" />
					</div>
				</div>
			</div>

			{/* Pagination and Results Per Page */}
			<div className="flex flex-wrap justify-between items-center space-y-2 md:space-y-0 mt-4">
				<div className="flex items-center space-x-2">
					<span className="text-gray-400 text-sm">Pages:</span>
					{renderPageNumbers()}
				</div>
				<div
					ref={dropdownRef}
					className="relative flex items-center justify-between space-x-2 border-[#131624] border-[2px] p-2 rounded-lg cursor-pointer w-[113px]"
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<img src={showIcon} alt="show" className="h-[16px] w-[16px]" />
					<span className="text-[#6A6F84] font-semibold text-[12px]">Show</span>
					<span className="text-[#6A6F84] font-semibold text-[12px]">{resultsPerPage}</span>
					<img src={arrowDown} alt="arrow-down" className="h-[16px] w-[16px]" />
					<AnimatePresence>
						{isDropdownOpen && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute top-[100%] left-0 mt-1 bg-[#0e1122] border border-[#171c35] rounded-lg z-50 font-semibold text-[12px]" // Alterado para #0e1122
							>
								{[10, 20, 50].map((limit) => (
									<div key={limit} className="px-4 py-2 cursor-pointer hover:bg-[#282c46] text-white" onClick={() => handleResultsPerPageChange(limit)}>
										Show {limit}
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Table Content */}
			<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-lg">
				<div className="overflow-x-auto">
					<table className="w-full text-white table-auto" style={{ minWidth: '700px' }}>
						<thead>
							<tr className="text-[#6A6F84] text-[12px]">
								<th className="text-left py-4 w-[15%]">Date</th>
								<th className="text-left py-4 w-[15%]">Round Nº</th>
								<th className="text-left py-4 w-[10%]">Sum</th>
								<th className="text-left py-4 w-[10%]">Stone</th>
								<th className="text-left text-[#FFC800] w-[15%]">Winning</th>
								<th className="text-left text-[#00ACE7] w-[15%]">Bonus</th>
								<th className="text-left py-4 w-[20%]">ID of transaction</th>
							</tr>
						</thead>
						<motion.tbody
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.1,
									},
								},
							}}
						>
							{currentData.map((row, index) => (
								<motion.tr
									key={index}
									className={`${index % 2 === 0 ? 'bg-[#131624]' : ''} hover:bg-[#282c46] transition-all duration-300`}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
								>
									<td className="py-4 pl-4 rounded-tl-xl rounded-bl-xl text-[12px] font-medium">{row.date}</td>
									<td className="py-4 text-[12px] font-medium underline underline-offset-2">
										{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
										<a href="#">{row.round}</a>
									</td>
									<td className="py-4">
										<div className="flex items-center space-x-1 text-[#FFC800] font-semibold">
											<span>{row.sum}</span>
											<img src={cash} alt="cash" className="h-[16px]" />
										</div>
									</td>
									<td className="py-4 px-2">
										<img src={images[row.stone]} alt="stone" className="h-[25px]" />
									</td>
									<td className="py-4">
										<div className="flex items-center space-x-1 text-[#FFC800] font-semibold">
											{row.winning === '' ? (
												<span className="pl-4">-</span>
											) : (
												<>
													<span>${row.winning}</span>
													<img src={cash} alt="cash" className="h-[16px]" />
												</>
											)}
										</div>
									</td>
									<td className="py-4">
										<div className="flex items-center space-x-1 text-[#00ACE7] font-semibold">
											{row.bonus === '' ? (
												<span className="pl-4">-</span>
											) : (
												<>
													<span>${row.bonus}</span>
													<img src={cashBlue} alt="cash" className="h-[16px]" />
												</>
											)}
										</div>
									</td>
									<td className="py-4 rounded-tr-xl rounded-br-xl text-[12px] font-medium underline underline-offset-2">
										{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
										<a href="#">{row.transactionId}</a>
									</td>
								</motion.tr>
							))}
						</motion.tbody>
					</table>
				</div>
			</motion.div>
		</div>
	);
};

export default TableBet;
