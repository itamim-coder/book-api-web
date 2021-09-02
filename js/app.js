const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle; 
}
const toggleSearchResult = displayStyle => {
  document.getElementById('search-result').style.display = displayStyle; 
}
const toggleSearchNumber = displayStyle => {
  document.getElementById('search-number').style.display = displayStyle; 
}
const errorDiv =  document.getElementById('error-message');

//click search button
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    //spinner show and hide others 
    toggleSpinner('block')   
    toggleSearchResult('none');
    toggleSearchNumber('none');

    //error handle for blank input
    if(searchText.length <= 0 ){
     errorDiv.innerText = "Search Field Cannot Be Empty.";
     errorDiv.classList.remove('d-none')
     toggleSpinner('none');
    }
    //input something and fetch
    else {     
      errorDiv.innerText ='';
      errorDiv.classList.add('d-none')
      const url = `https://openlibrary.org/search.json?q=${searchText}`;
      fetch(url)
      .then(res => res.json())
      .then(data =>   displaySearchResult(data.docs))
   
    }  
}
//display search item call

 const displaySearchResult = books => {
  
//error handle for invalid input
   if(books.length === 0 ) {
    errorDiv.innerText = "Input A valid Name";
    errorDiv.classList.remove('d-none')
   
  }
  //clean error content
  else{
    errorDiv.innerText = "";
    
  }  
  
      //how many found
const resultFound = document.getElementById('search-number') 
resultFound.textContent=''; 
const resultDiv = document.createElement('p')
resultDiv.innerHTML = `<h3 class="text-center"> Result Found : ${books.length} </h3>`
resultFound.appendChild(resultDiv);

  //display item and clear
const searchResult = document.getElementById('search-result')
searchResult.textContent='';

  
books.forEach(book => {
        const div = document.createElement('div')     
        div.classList.add('col');
        div.innerHTML = `        
        <div class="card box h-100 ">
        <img src="http://covers.openlibrary.org/b/oclc/${book.oclc}-M.jpg"  class="card-img-top h-50 p-2" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Author : <br>${book.author_name}</p>
          <p class="card-text">Publisher : <br>${book.publisher}</p>
          <p class="card-text">First Publish Year : <br>${book.first_publish_year}</p>
        </div>
      </div>
        `
        searchResult.appendChild(div);
        toggleSearchResult('flex');
        toggleSearchNumber('block');
  
    });
    // spinner off
    toggleSpinner('none');
  }
