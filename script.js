const quoteContainer = document.getElementById("quote-Container");
const quotes = document.getElementById("quote")
const author = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const category = "funny"
const apiKey = "0FNTMqEkTdiQLpeuQ/e5ZA==QAUhF7OSVCFUXVp7";


//https://api.api-ninjas.com/v1/quotes?category=funny


//Show loading 

const showLoading = () =>{
  loader.hidden = false
  quoteContainer.hidden = true

}

//Hide Loading
const hideLoading=()=>{
  if(!loader.hidden){
    quoteContainer.hidden = false
    loader.hidden = true
  }
}



async function newQuote (){
  showLoading()

  try{
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`,{
      method:"GET",
      headers:{
        "X-Api-Key": apiKey,
        "Content-Type": "application/json"
      }
    });

    if(!response.ok){
      throw new Error("Response Network was not ok" + response.statusText)
    }

    const data = await response.json();
    const quote = data[0]
    

    author.textContent = quote.author || "Unknown";
    quotes.textContent = quote.quote

    if(quote.quote > 150){
      quotes.classList.add("long-quote")
    }
    else{
      quotes.classList.remove("long-quote")
    }
    hideLoading()

  }catch(error){
    console.error("")
  }
}


//Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text = ${quotes.textContent} - ${author.textContent}`
  window.open(twitterUrl, "_blank")

}

newQuoteBtn.addEventListener("click", newQuote)
twitterButton.addEventListener("click",tweetQuote)
newQuote()
