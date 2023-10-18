interface NavProp {
  isDark: boolean;
}

const Nav: React.FC<NavProp> = ({ isDark }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]); // Your products state

  // Define a function to handle the search
  const handleSearch = (searchTerm: string) => {
    // Use the searchTerm to filter the products and set the filteredProducts state
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className={`border-b pb-5 bg-white fixed md:w-full w-full shadow-md md:shadow-none p-2 ${isDark ? 'nav' : ''}`}>
      <div className='md:hidden flex mt-14 w-10/12 items-center gap-2 m-auto'>
        <Search onSearch={handleSearch} />
        <Filters />
      </div>

      <div className='relative m-auto w-full hidden items-center justify-center gap-2 md:mt-0 mt-2 md:gap-5 p-2 md:p-3  md:flex'>
        <CurrentLocation />
        <Language />
        <Profile />
      </div>
    </div>
  );
};

export default Nav;
