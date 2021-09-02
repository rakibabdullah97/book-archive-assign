// spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// spinner function 

// Input Search Section
const searchBooks = () => {
    const searchInput = document.getElementById("input-bookinfo");
    const searchInputText = searchInput.value;
    if (searchInput.value === '') {
        document.getElementById("total-result").innerText = 'Please Search Some Books'
        document.getElementById("search-result").textContent = '';
    }
    else {
        toggleSpinner('block')
        document.getElementById("total-result").innerText = '';
        document.getElementById("search-result").textContent = '';
        searchInput.value = '';
        const url = `https://openlibrary.org/search.json?q=${searchInputText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs));
    }

}

// result display section 
const displayResult = bookinfo => {
    document.getElementById("total-result").innerText = `${bookinfo.length} Books found`
    const container = document.getElementById("search-result");
    container.textContent = '';
    if (bookinfo.length === 0) {
        document.getElementById("total-result").innerText = 'Invalid Keywords';
        toggleSpinner('none')
    }
    else {
        bookinfo.forEach(info => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card p-2 m-2  ">
                    <img style="height:16rem;" class="img-fluid" src="https://covers.openlibrary.org/b/id/${info.cover_i}-M.jpg" 
                           <h5 class="card-title"><span class='fw-bold'>Book Title:</span>${info.title}</h5>
                            <p class="card-text"><span class='fw-bold'>Author:</span>
                            ${info.author_name}
                            <p class="card-text"><span class='fw-bold'>Publisher:</span>
                            ${info.publisher}
                            <p class="card-text"><span class='fw-bold'>First Published:</span>
                            ${info.first_publish_year}
                            </p>
                </div> `
            container.appendChild(div)
        });
        toggleSpinner('none');
    };

};