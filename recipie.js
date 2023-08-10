const inpBox=document.querySelector('.inpBox')
const searchBut=document.querySelector('.searchBut')
const recepieSection=document.querySelector('.recepieSection')
const recepieHead=document.querySelector('.recepieHead')
const recepie_details=document.querySelector('.recepie-details')
const instructions=document.querySelector('.instructions')
const closeBtn=document.querySelector('.closeBtn')
const ingredients=document.querySelector('.ingredients')
const measures=document.querySelector('.measures')
const recepie_instructions=document.querySelector('.recepie-instructions')

console.log(instructions)

searchBut.addEventListener('click',(e)=>{
    // recepieSection.innerHTML={}
    e.preventDefault();
    fetchAPI(inpBox.value.trim())
    // inpBox.value=""
    recepieHead.style.display="none"
    // recepieHead.innerHTML=``
})

const fetchAPI=async(param)=>{ 
    // recepieSection.innerHTML="<h2>Fetching recepies...</h2>"
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`)
    // recepieSection.innerHTML=null
    const response= await data.json()
    // console.log(response.meals)
    response.meals.forEach(meal => {
        let mealsInfo= document.createElement('div')
        mealsInfo.classList='mealsInfo'
        mealsInfo.innerHTML=`
        <img class="mealImage" src="${meal.strMealThumb}"> 
        <span class="mealName">${meal.strMeal}</span>
        <span class="mealArea">${meal.strArea}</span>
        <span class="mealCategory">${meal.strCategory}</span>
        `
        recepieSection.appendChild(mealsInfo)
        // console.log(meals.strMealThumb)
        mealsInfo.addEventListener('click',()=>{
            // append meal.strInstructions only if the " instructions " area is `empty` else empty it first and then add meal.strIngredientsp
            recepie_details.style.display='inline-block'
            if(instructions.innerHTML=""){
                // console.log(meal.strInstructions)
                instructions.append(meal.strInstructions)   
                // instructions.textContent=`
                // <p>${meal.strInstructions}</p>
                // `
            }
            else{
                instructions.innerHTML=""
                instructions.append(meal.strInstructions)
                console.log(instructions)
            }
        })
        closeBtn.addEventListener('click',()=>{
            recepie_details.style.display='none'
            instructions.innerHTML=``
            ingredients.innerHTML="Ingredients"
        })
        ingredients.addEventListener('click',()=>{
            // if(ingredients.innerHTML="Ingredients"){
            //     // fetchIngList(meal);
            //     dispIngredients(meal)
            //     ingredients.innerHTML="Back to instructions"

            // }else if(ingredients.innerHTML.includes="to"){
            //     // ingredients.innerHTML=`
            //     // <span>Ingredients</span>
            //     // `
            //     ingredients.innerHTML="Ingredients"
            // }
            dispIngredients(meal)
            ingredients.innerHTML="Back to instructions"
        })
    }); 
}

// instruction, ingredients

const fetchIngList=(meal)=>{
    let ingredient_list="";
    console.log(meal);
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`]

// *** You can access the properties of an object in JavaScript in 3 ways:
//     Dot property accessor: object.property
//     Square brackets property accessor: object['property']
//     Object destructuring: const { property } = object

        if(ingredient){
            const measures= meal[`strMeasure${i}`]
            ingredient_list += `<li>${measures}  -  ${ingredient}</li>`
        }
        else{
            continue;
        }
    }
    return ingredient_list
}
const dispIngredients=(meal)=>{
    instructions.innerHTML=`
    <ul class="ingredient_list">${fetchIngList(meal)}</ul>
    `
}