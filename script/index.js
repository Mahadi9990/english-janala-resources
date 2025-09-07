const loadLessons = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=> res.json())
    .then((json)=>lessonArray(json.data))
}
const spiner = (status)=>{
  if(status === true){
    document.getElementById("card_container").classList.add('hidden')
    document.getElementById("loader").classList.remove('hidden')
  }else{
     document.getElementById("loader").classList.add('hidden')
     document.getElementById("card_container").classList.remove('hidden')
  }
}
const createSpan =(synonyms)=>{
    const htmlElement = synonyms.map((el)=>`<span class="btn" >${el}</span>`)
    return htmlElement.join(" ")
}
const loadSingleCardDetails=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const detials = await res.json()
    const data = detials.data
    const modelText = document.getElementById("model_box")
    modelText.innerHTML = `
        <div class="modal-box space-y-3">
          <h1 class="text-3xl">${data.word} ( : ) ${data.pronunciation} </h1>
          <h3 class="text3xl">Meanig</h3>
          <p class="text-xl">${data.meaning}</p>
          <h1 class="text-3xl">Examples</h1>
          <p class="text-xl">${data.sentence}</p>
          <h1 class="text-3xl">সমার্থক শব্দ গুলো</h1>
          <div>
            ${createSpan(data.synonyms)}
          </div>
        </div>
        <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
    `
    document.getElementById("my_modal_5").showModal()
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const remove = ()=>{
        const allBtn = document.querySelectorAll('.lesson-btn')

        allBtn.forEach((item)=>{
            item.classList.remove("active")
        })

}
const loadLevelId = (id)=>{
    spiner(true)
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((json)=> {
        remove()
        const singleBtn = document.getElementById(`btn-id-${id}`)
        singleBtn.classList.add("active")
        singleLessonData(json.data)
    })
}
const singleLessonData = (words)=>{
    const cardContainer = document.getElementById("card_container")
    cardContainer.innerHTML = ""

    if(words.length === 0 ){
      cardContainer.innerHTML = `
      <div  class="col-span-full text-center space-y-3 h-50">
      <img class="mx-auto" src="assets/alert-error.png"/>
      <p class="text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="text-4xl font-extrabold">নেক্সট Lesson এ যান</h1>
      </div>
      ` 
      spiner(false)
    }

    words.forEach((word)=>{
        const card = document.createElement('div')
        card.innerHTML = `

        <div class="space-y-6 h-70 rounded-xl bg-slate-300 text-center py-10 px-5">
          <h1 class="font-bold text-2xl">${word.word ? word.word : "not found word"}</h1>
          <p class="font-semibold">Meaning / ${word.pronunciation ? word.pronunciation : "not-found-pronunciation"}</p>
          <div class="hind-siliguri-light text-2xl">
            ${word.meaning ? word.meaning :"meaning-not-found"}
          </div>
          <div class="icon flex justify-between items-center">
            <button onclick="loadSingleCardDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        cardContainer.append(card)
        spiner(false)
    })
}
const lessonArray = (lesson)=>{
    const levelContainer = document.getElementById("button_container");
    levelContainer.innerHTML = ""

    for(let item of lesson){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
            <button id="btn-id-${item.level_no}" onclick = "loadLevelId(${item.level_no})" class="lesson-btn btn btn-outline btn-primary"
                ><i class="fa-solid fa-circle-question"></i>Lesson-${item.level_no}
            </button>
        `
        levelContainer.append(btnDiv)
    }
}
loadLessons()
document.getElementById("input_btn").addEventListener('click',()=>{
  const input = document.getElementById("input_text")
  const searchBtn = input.value.trim().toLowerCase()

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((res)=> res.json())
  .then((details) => {
    const allData = details.data
    const filterData = allData.filter((item)=>item.word.toLowerCase().includes(searchBtn))
    remove()
    singleLessonData(filterData)
  })

})