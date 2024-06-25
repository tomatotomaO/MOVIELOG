let c = ['#CCFF00', '#FC3F56', '#E5E6E7', '#3947EE', '#FEC3D9'];
let almostblack = '#1F1F1F';
let darkgray = "#4C4D55";
let colorDic = {
    'sound': c[0],
    'analysis': c[1],
    'storyline': c[2],
    'acting': c[3],
    'visual': c[4]
};

let htmlLink = ['index.html', 'step1.html', 'step2.html', 'step2r.html', 'step5.html'];
let currentMenu = localStorage.getItem('currentMenu') || '';
let currentColor = localStorage.getItem('currentColor') || '';
let currentStep = parseInt(localStorage.getItem('currentStep')) || 0;
let reviewQarray = JSON.parse(localStorage.getItem('reviewQarray')) || new Array(4);
let reviewQarrayString = JSON.parse(localStorage.getItem('reviewQarrayString')) || new Array(4);
let reviewAarray = JSON.parse(localStorage.getItem('reviewAarray')) || new Array(4);

document.addEventListener("DOMContentLoaded", function() {
    setup();
    pageBtn();
    const selectItems = document.querySelectorAll("#selectMenu .selectItem");
    selectItems.forEach(item => {
        item.addEventListener("click", function() {
            currentMenu = item.id;
            localStorage.setItem('currentMenu', currentMenu);
            currentStep = 1;
            localStorage.setItem('currentStep', currentStep);
            localStorage.setItem('currentColor', currentColor);
            window.location.href = htmlLink[currentStep];
        });
    });
});

function setup() {
    let items = document.getElementsByClassName("selectItem");
    for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = c[i];
        items[i].style.zIndex = i + 10;
    }
}

function init(step) {
    currentStep = step;
    if (currentStep > 0) {
        let Mname = document.querySelector('.cMenu');
        if (Mname) {
            Mname.innerHTML = currentMenu;
        }
    }
    else{
        localStorage.setItem('Mtitle', '');
        localStorage.setItem('Mdirector', '');
        localStorage.setItem('Mscore', '');
        localStorage.setItem('reviewAarray', JSON.stringify(new Array(4)));
        localStorage.setItem('reviewQarray', JSON.stringify(new Array(4)));
    }

    if (currentStep == 2 || currentStep == 3) {
        let box = document.getElementById('qBox');
        switch (currentStep) {
            case 2:
                box.innerHTML = '';
                qMovie();
                break;
            case 3:
                box.innerHTML = '';
                qReview();
                break;
        }
    }

    switch (currentStep) {
        case 1:
            colorSelect();
    }
}

function pageBtn() {
    let Lbtn = document.querySelectorAll('.leftBtn');
    let Rbtn = document.querySelectorAll('.rightBtn');
    Lbtn.forEach(btn => {
        btn.addEventListener('click', function() {
            saveCurrentData();  
            currentStep--;
            if (currentStep < 0) currentStep = 0;
            localStorage.setItem('currentStep', currentStep);
            window.location.href = htmlLink[currentStep];
        });
    });

    Rbtn.forEach(btn => {
        btn.addEventListener('click', function() {
            saveCurrentData();  
            currentStep++;
            if (currentStep > 4) currentStep = 0;
            localStorage.setItem('currentStep', currentStep);
            window.location.href = htmlLink[currentStep];
        });
    });
}

function colorSelect() {
    let colBtns = document.getElementsByClassName('colorSel');
    let checkedIcons = document.getElementsByClassName('checked');
    for (let i = 0; i < colBtns.length; i++) {
        colBtns[i].style.backgroundColor = c[i]; 
        colBtns[i].addEventListener('click', function(e) {
            for (let btn of colBtns) {
                btn.style.border = 'none';
                btn.style.backgroundColor = c[btn.value];
            }
            for (let icon of checkedIcons) {
                icon.style.visibility = 'hidden';
            }

            let clickedButton = e.currentTarget;
            clickedButton.querySelector('.checked').style.visibility = 'visible';
            currentColor = c[clickedButton.value];
            localStorage.setItem('currentColor', currentColor);
            clickedButton.style.backgroundColor = almostblack;
            clickedButton.style.border = `4px solid ${currentColor}`;

            let canvasContainer = document.getElementById('canvasContainer');
            if (canvasContainer) {
                canvasContainer.style.backgroundColor = currentColor;
            }
        });
    }
}

function qMovie() {
    createQ('영화 제목', '을 적어주세요');
    createInputBox('Mtitle', '이름을 입력하세요', 'text');
    createQ('감독 이름', '을 적어주세요');
    createInputBox('Mdirector', '이름을 입력하세요', 'text');
    createQ('10점 만점', '중 총점을 매겨주세요');
    createInputBox('Mscore', '숫자를 입력하세요', 'number');
    MovieEvent();
}

function qReview() {
    console.log(currentMenu);
    switch (currentMenu) {
        case 'sound':
            reviewQarray[0] = '<span class="mark">사운드트랙</span>이 영화의 분위기에 어떻게 기여했나요?';
            reviewQarray[1] = '<span class="mark">음향 효과</span>가 특정 장면에서 어떤 역할을 했나요?';
            reviewQarray[2] = '<span class="mark">다이얼로그와 배경음악</span>의 균형은 어땠나요?';
            reviewQarray[3] = '<span class="mark">사운드 디자인</span>이 이야기 전개에 어떤 영향을 미쳤나요?';
            reviewQarrayString[0] = "사운드트랙";
            reviewQarrayString[1] = "음향효과";
            reviewQarrayString[2] = "다이얼로그와 배경음악";
            reviewQarrayString[3] = "사운드 디자인";
            break;
        case 'analysis':
            reviewQarray[0] = '영화의 <span class="mark">주제와 메시지</span>는 무엇인가요?';
            reviewQarray[1] = '<span class="mark">편집과 구조</span>가 이야기 전개에 어떻게 영향을 미쳤나요?';
            reviewQarray[2] = '<span class="mark">인물의 변화 과정</span>은 어떻게 그려졌나요?';
            reviewQarray[3] = '<span class="mark">시각적 스타일</span>이 이야기 전달에 어떤 역할을 했나요?';
            reviewQarrayString[0] = "주제와 메세지";
            reviewQarrayString[1] = "편집과 구조";
            reviewQarrayString[2] = "인물의 변화 과정";
            reviewQarrayString[3] = "시각적 스타일";
            break;
        case 'storyline':
            reviewQarray[0] = '<span class="mark">스토리</span>가 독창적이거나 인상적이었나요?';
            reviewQarray[1] = '<span class="mark">플롯 전개</span>가 일관되고 논리적이었나요?';
            reviewQarray[2] = '<span class="mark">클라이맥스와 결말</span>이 효과적이었나요?';
            reviewQarray[3] = '<span class="mark">서브플롯</span>이 메인 스토리와 어떻게 조화를 이루었나요?';
            reviewQarrayString[0] = "스토리";
            reviewQarrayString[1] = "플롯 전개";
            reviewQarrayString[2] = "클라이막스와 결말";
            reviewQarrayString[3] = "서브플롯";
            break;
        case 'acting':
            reviewQarray[0] = '<span class="mark">주연 배우들</span>의 연기가 어땠나요?';
            reviewQarray[1] = '<span class="mark">조연 배우들</span>의 연기는 이야기 전개에 어떻게 기여했나요?';
            reviewQarray[2] = '배우들의 <span class="mark">연기</span>와 감독의 <span class="mark">연출</span>이 잘 조화를 이루었나요?';
            reviewQarray[3] = '인물 간 <span class="mark">관계의 개연성</span>이 자연스러웠나요?';
            reviewQarrayString[0] = "주연배우 연기";
            reviewQarrayString[1] = "조연배우 연기";
            reviewQarrayString[2] = "연기와 연출의 조화";
            reviewQarrayString[3] = "인물 간 관계의 개연성";
            break;
        case 'visual':
            reviewQarray[0] = '<span class="mark">촬영 기법</span>이 이야기에 어떻게 사용되었나요?';
            reviewQarray[1] = '<span class="mark">미장센과 세트 디자인</span>이 주제와 어떻게 연결되었나요?';
            reviewQarray[2] = '<span class="mark">색감과 조명</span>이 감정선에 어떻게 기여했나요?';
            reviewQarray[3] = '<span class="mark">특수 효과</span>가 현실감을 잘 표현했나요?';
            reviewQarrayString[0] = "촬영 기법";
            reviewQarrayString[1] = "미장센과 세트 디자인";
            reviewQarrayString[2] = "색감과 조명";
            reviewQarrayString[3] = "특수 효과";
            break;
    };

    localStorage.setItem('reviewQarray', JSON.stringify(reviewQarray));
    localStorage.setItem('reviewQarrayString', JSON.stringify(reviewQarrayString));

    for (let i = 0; i < 4; i++) {
        let name = 'r' + String(i);
        createRQ(reviewQarray[i]);
        console.log(reviewQarray[i]);
        console.log(i);
        createInputBox(name, '텍스트를 입력하세요', 'textarea');
    }
}


function createInputBox(id, placeH, type) {
    let box = document.getElementById('qBox');
    let textBox = document.createElement('div');
    let inputBox;

    if (type === 'textarea') {
        inputBox = document.createElement('textarea');
        inputBox.className='boxarea';
    } else {
        inputBox = document.createElement('input');
        inputBox.type = type;
    }

    let writed1 = document.createElement('div');
    let writed2 = document.createElement('div');
    let vec1 = document.createElement('object');
    let vec2 = document.createElement('object');

    inputBox.placeholder = placeH;
    inputBox.id = id;
    inputBox.classList.add('inputBox');
    textBox.className = 'textBox';
    textBox.style.position = 'relative';
    
    writed1.className = 'writed';
    writed1.style.position = 'absolute'; 
    writed1.style.top = '0'; 
    writed1.style.right = '0'; 

    writed2.className = 'writed';
    writed2.style.position = 'absolute'; 
    writed2.style.top = '0'; 
    writed2.style.right = '0'; 
    
    vec1.className = 'vec';
    vec1.data = './icon/Write.svg';
    
    vec2.className = 'vec';
    vec2.data = './icon/Checked6.svg';

    writed1.style.backgroundColor = '#999AA0';
    writed2.style.backgroundColor = c[0];
    writed2.style.visibility = 'hidden';

    writed1.appendChild(vec1);
    writed2.appendChild(vec2);

    textBox.appendChild(inputBox);
    textBox.appendChild(writed1);
    textBox.appendChild(writed2);
    box.appendChild(textBox);

    inputBox.addEventListener('focus', function() {
        textBox.style.backgroundColor = '#FFFFFF';
    });

    inputBox.addEventListener('blur', function() {
        if (!inputBox.value) {
            textBox.style.backgroundColor = '#E5E6E7';
            writed2.style.visibility = 'hidden';
            writed1.style.visibility = 'visible';
        }
    });

    inputBox.addEventListener('input', function() {
        if (type === 'textarea' && inputBox.value.length > 50) {
            inputBox.value = inputBox.value.slice(0, 50);
        } else if (type === 'text' && inputBox.value.length > 24) {
            inputBox.value = inputBox.value.slice(0, 24);
        } else if (type === 'number') {
            let value = parseInt(inputBox.value, 10);
            if (value > 10) {
                inputBox.value = 10;
            } else if (value < 0) {
                inputBox.value = 0;
            }
        }
        
        if (inputBox.value) {
            textBox.style.backgroundColor = '#FFFFFF';
            writed1.style.visibility = 'hidden';
            writed2.style.visibility = 'visible';
        } else {
            textBox.style.backgroundColor = '#E5E6E7';
            writed2.style.visibility = 'hidden';
            writed1.style.visibility = 'visible';
        }
    });
}





function createQ(strong, text) {
    let box = document.getElementById('qBox');
    let textQ = document.createElement('div');
    textQ.className = 'question';
    textQ.innerHTML = `<span class='mark'>${strong}</span><span class='normal'>${text}</span>`;
    box.appendChild(textQ);
}

function createRQ(text) {
    let box = document.getElementById('qBox');
    let textQ = document.createElement('div');
    textQ.className='review';
    textQ.innerHTML = `<span class='normal'>${text}</span>`;
    box.appendChild(textQ);
}

function saveCurrentData() {
    localStorage.setItem('currentMenu', currentMenu);
    localStorage.setItem('currentStep', currentStep);
    localStorage.setItem('currentColor', currentColor);

    if (currentStep == 2) {
        let title = document.getElementById('Mtitle');
        let director = document.getElementById('Mdirector');
        let score = document.getElementById('Mscore');
        if (title && director && score && title.value && director.value && score.value) {
            localStorage.setItem('Mtitle', title.value.toUpperCase());
            localStorage.setItem('Mdirector', director.value);
            localStorage.setItem('Mscore', score.value + '/10');
        }
    }

    if (currentStep == 3) {
        let r0 = document.getElementById('r0');
        let r1 = document.getElementById('r1');
        let r2 = document.getElementById('r2');
        let r3 = document.getElementById('r3');

        if (r0 && r1 && r2 && r3 && r0.value && r1.value && r2.value && r3.value) {
            let list = [r0.value, r1.value, r2.value, r3.value];
            localStorage.setItem('reviewAarray', JSON.stringify(list));
        }
    }
}

function MovieEvent() {      
    let title = document.getElementById('Mtitle');
    let director = document.getElementById('Mdirector');
    let score = document.getElementById('Mscore');

    if (title && director && score && title.value && director.value && score.value) {
        title.addEventListener('input', saveCurrentData);
        director.addEventListener('input', saveCurrentData);
        score.addEventListener('input', saveCurrentData);
    }
}

