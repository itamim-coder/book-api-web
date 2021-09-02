const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))
   
}
 const displaySearchResult = books => {
    // console.log(books.length);
    const searchResult = document.getElementById('search-result')
const resultFound = document.getElementById('search-number')  
const resultDiv = document.createElement('p')
resultDiv.innerHTML = `<h3 class="text-center"> Result Found : ${books.length}</h3>`
resultFound.appendChild(resultDiv);

   
    books.forEach(book => {
        // console.log(book)
        const div = document.createElement('div')     
        div.classList.add('col');
        div.innerHTML = `        
        <div class="card h-100 ">
        <img src="http://covers.openlibrary.org/b/oclc/${book.oclc}-M.jpg"  class="card-img-top h-50 p-2" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Author : <br>${book.author_name}</p>
          <p class="card-text">Publisher : <br>${book.publisher[0]}</p>
          <p class="card-text">First Publish Year : <br>${book.first_publish_year}</p>
        </div>
      </div>
        `
        searchResult.appendChild(div);
   
        
    });
   

}



