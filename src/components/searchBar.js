import react from 'react'

// allow users to input artist name then get ids
const SearchBar = ({keyword,setKeyword}) => {
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
      <input 
       style={BarStyling}
       key="random1"
       value={keyword}
       placeholder={"search for an artist"}
       onChange={(e) => setKeyword(e.target.value)}
      />
    );
}
  
export default SearchBar