

let itemList = document.getElementsByClassName('selectItem');
let listHeight = [];
let vec=document.getElementsByTagName('object');

window.addEventListener('load',function setHeight() {
    itemList = document.getElementsByClassName('selectItem');
    listHeight = [];
    vec=document.getElementsByTagName('object');
    let width = 600;
    for (let i = 0; i < 5; i++) {
        listHeight[i]=width;
        itemList[i].style.height = width.toString() + 'px';
        itemList[i].addEventListener('mouseover', itemHeight);
        itemList[i].addEventListener('mouseout', resetHeight);
        width -= 110;
    }
})


function itemHeight(e) {
    let num;
    let gap=0;
    let targeted=false;
    


    for (let i = 0; i < 5; i++) {
        vec[i].style.visibility='hidden';
        if(i>0&&targeted==false){
            gap=40;
        }
        num = listHeight[i]+gap;
        if (itemList[i] == e.target) {
            vec[i].style.visibility='visible';
            vec[i].style.opacity = 1;
            if(i==0){
                gap=-60;
                targeted=true;
            }
            else{
                num = listHeight[i] + 50;
                gap=-40;
                targeted=true;
            }
        } 
        itemList[i].style.height = num.toString() + 'px';
    }
}

function resetHeight(e) {
    for (let i = 0; i < 5; i++) {
        vec[i].style.visibility='hidden';
        vec[i].style.opacity = 0;
        itemList[i].style.height = listHeight[i].toString() + 'px';
    }
}

