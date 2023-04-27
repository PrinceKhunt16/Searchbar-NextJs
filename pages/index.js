import { useEffect, useState } from "react"
import JSON from '../postman.json'

export default function Home() {
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  function getYellowSuggestion([name, str]) {
    const num = str.toLowerCase().indexOf(search.toLowerCase())
    const isIncluded = str.toLowerCase().includes(search.toLowerCase())

    return str.split("").map((letter, index) => {
      return (
        <span className={(isIncluded && search.length >= 1 && (num === index || (index >= num && index <= search.length + num - 1))) ? "yellow letter" : "letter"}>{letter}</span>
      )
    })
  }

  useEffect(() => {
    function searchFromJSON(query) {
      return JSON.filter((post) => {
        return Object.entries(post).splice(1).map((arr) => {
          if (arr[1].toString().toLowerCase().includes(query.toLowerCase())) {
            return true
          }
          return false
        }).some((arr) => arr === true)
      })
    }

    setFilteredData(searchFromJSON(search))
  }, [search])

  return (
    <>
      <div>
        <div className="searchbar-body">
          <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
        </div>
        <h1>{filteredData.length} Documents</h1>
        {
          filteredData.map((post) => {
            return (
              <div key={post._id.$oid} className="post-card">
                {
                  Object.entries(post).splice(1).map((arr, index) => {
                    return (
                      <div className="field" key={index}>
                        <div className="fieldname letter">{arr[0]}</div>
                        <div>{getYellowSuggestion(arr)}</div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}
