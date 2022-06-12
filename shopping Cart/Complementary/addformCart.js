// variable 
let courseList = document.querySelector('#ProductsList'),
    shoppingCart = document.querySelector('.clear1')
    shoppingCart1=document.querySelector('#shopping-cart')
    


// eventListeners
eventListener()
function eventListener() {
    courseList.addEventListener('click', addToCart)

    shoppingCart1.addEventListener('click',removeCourse)

    document.addEventListener('DOMContentLoaded' ,loadLS1)
}

//function

function addToCart(e) {
    e.preventDefault()
    if (e.target.classList.contains('add-to-cart')) {
        let courses= e.target.parentElement.parentElement
        addformObj(courses)
    }
}

function addformObj(courseKey) {
    let personCourse ={
        Image : courseKey.querySelector('img').src,
        title: courseKey.querySelector('h4').textContent,
        price : courseKey.querySelector('span').textContent,
        id: courseKey.querySelectorAll('a')[1].getAttribute('data-id')
    }
   addformListCourse(personCourse)
}

function addformListCourse(add) {
    
    let row =document.createElement('ul')

    row.innerHTML =`

    
    <th><img src='${add.Image}' width="90px"></th>
    <th> class='red'  ${add.title} </th>
    <th>  ${add.price}</th>
    <th> <a class="remove" data-id='${add.id}' > X </a></th>


    `
    shoppingCart.appendChild(row)

    addformListCourse(add)


}
function removeCourse(e) {
    let course , courseId
    if ( e.target.classList.contains('remove')) {
        e.preventDefault()
        e.target.parentElement.remove()
        course= e.target.parentElement
        courseId=course.querySelector('a').getAttribute('data-id')

    }
    removeCourseLS(courseId)

    if (e.target.classList.contains('button')) {
        e.preventDefault()
        e.target.nextElementSibling.remove()
        localStorage.clear()
    }
}


function removeCourseLS(id) {
        let courses = getCouresLS1()
        courses.forEach(function (elmt , index) {
            if (elmt.id===id) {
                courses.splice(index , 1)
            }
        });
        localStorage.setItem('coursesList' , JSON.stringify(courses))
}


function addformListCourse(course) {
    let courses = getCouresLS1()
    courses.push(course)
    localStorage.setItem('coursesList', JSON.stringify(courses))
}

function getCouresLS1() {
    let course;
    if (localStorage.getItem('coursesList')) {
        course=JSON.parse(localStorage.getItem('coursesList'))
    } else {
        course=[]
    }
    return course
}

function loadLS1() {
    let courses =getCouresLS1()
    courses.forEach(function(element) {
        let row =document.createElement('ul')

        row.innerHTML =`
    
        
        <th><img src='${element.Image}' width="100px"></th>
        <th>  ${element.title} </th>
        <th>  .. ${  element.price  } ..</th>
        <th> <a class="remove" data-id='${element.id}' > X </a></th>
    
    
        `
        shoppingCart.appendChild(row)
    });
   
}

