import React, {useEffect,useState} from 'react'

const Pagination = ({totalPosts, postsPerPage, setCurrentPage, setLastPage}) => {
  //   console.log(postsPerPage);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let pageNumbers = [];
    for(let i = 1 ; i <= Math.ceil(totalPosts/postsPerPage) ; i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
    setPages(prev => [...prev, setLastPage]);
    // console.log(pages)
  }, [totalPosts, postsPerPage, setLastPage])

  const elementPagination = pages.map((page, index) => {
    return (
      <button className='border  text-sm font-semibold border-slate-600 rounded px-2 hover:bg-gray-200' key={index} onClick={() => setCurrentPage(page)} >{page}</button>
    )
  })

  return (
    <div className='flex gap-1 mt-4 mb-8 '>
      {elementPagination}
    </div>
  )
}

export default Pagination