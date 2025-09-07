
const loadLessons = ()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
.then((res)=> res.json())
.then((json)=>lessonArray(json.data))

}

const loadLevelId = (id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((json)=> singleLessonData(json.data))
}

const singleLessonData = (words)=>{
    const cardContainer = document.getElementById("card_container")
    cardContainer.innerHTML = ""
    words.forEach((word)=>{
        console.log(word)
        const card = document.createElement('div')
        card.innerHTML = `
            <div class="space-y-6 rounded-xl bg-slate-300 text-center py-10 px-5">
          <h1 class="font-bold text-2xl">${word.word}</h1>
          <p class="font-semibold">Meaning / ${word.pronunciation}</p>
          <div class="hind-siliguri-light text-2xl">
            ${word.meaning}
          </div>
          <div class="icon flex justify-between items-center">
            <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        cardContainer.append(card)
    })
}

const lessonArray = (lesson)=>{
    const levelContainer = document.getElementById("button_container");
    levelContainer.innerHTML = ""

    for(let item of lesson){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
            <button onclick = "loadLevelId(${item.level_no})" class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-circle-question"></i>Lesson-${item.level_no}
            </button>
        `
        levelContainer.append(btnDiv)
    }
}
loadLessons()

