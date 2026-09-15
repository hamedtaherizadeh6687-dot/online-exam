// اتصال به Firebase

import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// اطلاعات دانش آموز

let student = {};


// شماره سوال فعلی

let currentQuestion = 0;


// پاسخ های داده شده

let answers = [];



// سوالات آزمون

const questions = [


{
    question:"کدام گزینه بیانگر پلی مر نیست؟",

    options:[
        "کربوهیدرات",
        "پروتئین",
        "لیپید",
        "نوکلئیک اسید"
    ],

    correct:"لیپید"
},


{
    question:"در پیوند فسفودی استر در دنا چه اتفاقی رخ می‌دهد؟",

    options:[
        "پیوند بین قند نوکلئوتید مقابل با فسفات",
        "پیوند بین دو قند مجاور در یک رشته از مولکول دنا",
        "پیوند بین دو قند مقابل در یک رشته از مولکول دنا",
        "پیوند بین قند و باز آلی نیتروژن دار"
    ],

    correct:"پیوند بین دو قند مجاور در یک رشته از مولکول دنا"
},


{
    question:"هورمونی که سبب کاهش قند خون می شود کدام گزینه است؟",

    options:[
        "تستسترون",
        "گلوکاگون",
        "انسولین",
        "سکرتین"
    ],

    correct:"انسولین"
},


{
    question:"پیوند بین دو آمینو اسید را چه می نامند؟",

    options:[
        "پیوند پپتیدی",
        "پیوند کووالانسی",
        "پیوند سنتزآبدهی",
        "پیوند فسفودی استر"
    ],

    correct:"پیوند پپتیدی"
}
];



// شروع آزمون

window.startExam = function(){


    student.name =
    document.getElementById("name").value;


    student.className =
    document.getElementById("className").value;


    student.examCode =
    document.getElementById("examCode").value;



    if(student.name===""){

        alert("نام را وارد کنید");

        return;

    }



    document.getElementById("loginBox").style.display="none";


    document.getElementById("examBox").style.display="block";


    showQuestion();


    startTimer();


};





// نمایش سوال

function showQuestion(){


    let q = questions[currentQuestion];


    document.getElementById("question").innerHTML =

    `${currentQuestion+1}) ${q.question}`;



    let html="";


    q.options.forEach(option=>{


        html += `

        <div class="option" onclick="selectAnswer('${option}')">

        ${option}

        </div>

        `;


    });



    document.getElementById("options").innerHTML = html;


}






// انتخاب پاسخ

window.selectAnswer = function(answer){


    answers[currentQuestion]=answer;


    let items =
    document.querySelectorAll(".option");


    items.forEach(item=>{


        item.classList.remove("selected");


        if(item.innerText===answer){

            item.classList.add("selected");

        }


    });


};





// رفتن به سوال بعد

window.nextQuestion = function(){



    if(!answers[currentQuestion]){


        alert("یک گزینه انتخاب کنید");

        return;

    }



    currentQuestion++;



    if(currentQuestion < questions.length){


        showQuestion();


    }

    else{


        finishExam();


    }


};






// پایان آزمون

async function finishExam(){


    let score=0;



    questions.forEach((q,index)=>{


        if(q.correct === answers[index]){

            score++;

        }


    });




    await saveResult(score);



}






// ذخیره در Firebase

async function saveResult(score){


try{


await addDoc(

collection(db,"answers"),

{


name:student.name,


className:student.className,


examCode:student.examCode,


answers:answers,


score:score,


date:new Date()


}


);



alert(

"آزمون ارسال شد\nنمره شما: "+
score+
" از "+
questions.length

);



}


catch(error){


console.error(error);


alert(
"خطا در ذخیره اطلاعات"
);


}


}






// تایمر

let time = 900;


function startTimer(){



let timer = setInterval(()=>{


time--;


let min =
Math.floor(time/60);


let sec =
time%60;



if(sec<10){

sec="0"+sec;

}



document.getElementById("timer").innerHTML =
min+":"+sec;



if(time<=0){


clearInterval(timer);


finishExam();


}



},1000);


}
