function SearchBar({ searchQuery, setSearchQuery }) {
	return (
		<div className="mb-8">
			<input
				type="text"
				placeholder="Search for products..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="w-full max-w-md px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
			/>
		</div>
	);
}

export default SearchBar;
