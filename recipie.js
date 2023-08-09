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


searchBut.addEventListener('click',(e)=>{
    // recepieSection.innerHTML=``
    e.preventDefault();
    fetchAPI(inpBox.value.trim())
    // inpBox.value=""
    recepieHead.style.display="none"
    // recepieHead.innerHTML=``
})
// console.log(mealsInfo)


const fetchAPI=async(param)=>{    
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`)
    const response= await data.json()
    // console.log(response.meals[0])
    response.meals.forEach(meal => {

        let mealsInfo= document.createElement('div')
        mealsInfo.classList='mealsInfo'
        recepieSection.appendChild(mealsInfo)
        mealsInfo.innerHTML=`
        <img class="mealImage" src="${meal.strMealThumb}">
        <p></p><span class="mealName">${meal.strMeal}</span>
        <span class="mealArea">${meal.strArea}</span>
        <span class="mealCategory">${meal.strCategory}</span>
        `
        // console.log(meals.strMealThumb)
        mealsInfo.addEventListener('click',function addinstructions(){
            if(instructions.innerHTML=``){
                recepie_details.style.display='block'
                // console.log(meal.strInstructions)
                instructions.append(meal.strInstructions)   
            }
            else{
                instructions.innerHTML=``
                recepie_details.style.display='block'
                instructions.append(meal.strInstructions)
            }
        })
        closeBtn.addEventListener('click',()=>{
            recepie_details.style.display='none'
            instructions.innerHTML=``
        })
        ingredients.addEventListener('click',()=>{
            if(ingredients.textContent="Ingredients"){
                // fetchIngList(meal);
                ingredients.textContent="Back to instructions"
                dispIngredients(meal)
            }else{
                ingredients.innerHTML=`
                <span>Ingredients</span>
                `
            }
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