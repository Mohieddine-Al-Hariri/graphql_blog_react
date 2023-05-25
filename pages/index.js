import { FeaturedPosts } from '../sections/index';
import { NoResults, PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import { Fade } from 'react-awesome-reveal';
import { useState } from 'react';

export default function Home({ posts }) {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(posts);
  
  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.node.author.name) ||
        regex.test(item.node.excerpt) ||
        regex.test(item.node.title) /* || regex.test(item.content...)*/
    );
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        if(searchText.length>0){
          if(searchResult.length>0){
            setSearchedResults(searchResult);
          }
          else{
            setSearchedResults("");
          }
        }else{
          setSearchedResults(posts)
        }
        
      }, 500)
    );
  };
  // const handleTagClick = (tagName) => {
  //   setSearchText(tagName);

  //   const searchResult = filterPosts(tagName);
  //   setSearchedResults(searchResult);
  // };

  return (
    <div className="container mx-auto px-10 mb-8 ">
      <form className='relative w-full flex justify-center items-center mb-10' onSubmit={(e)=>e.preventDefault()}>
        <div className='relative '> 
          <svg className="absolute left-2 top-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
          <input
            type='text'
            placeholder='Search...'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='rounded-full pl-8 pr-5 py-2'
            />
          </div>
      </form>
      <Fade triggerOnce right distance="10%" duration={1500}><FeaturedPosts /></Fade>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
          <Fade triggerOnce top distance="10%" duration={1500}><PostWidget />
            <Categories /></Fade>
          </div>
        </div>
        <div className="lg:col-span-8 col-span-1">
            { searchedResults.length>0?
            searchedResults.reverse().map((post, index) => 
            (<Fade triggerOnce bottom key={index} distance="10%" duration={1500}>
              <PostCard className="transition duration-500 ease-in-out"  post={post.node} />
            </Fade>
            )):<NoResults/>}
        </div>
        
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

