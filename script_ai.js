
//関数定義

// 頻度の計算
const freqCalc = function(arr) {
    let sum = 0;
    arr.forEach(function(elm) {
        sum += elm;
    });
    let val = [0,0,0];
    for(let i=0;i<=2;i++){
        val[i] = arr[i]/sum;
    }
    return val
};

let cpMove = ''; //相手の動き
let myMove = ''; //自分の一つ前の動き


const lose = function(){
    $('#message').html('負け');
}

const win = function(){
    $('#message').html('勝ち');
}

const draw = function(){
    $('#message').html('あいこ');
}


// AIの設定

if(localStorage.getItem('freq')){
    // 初期値
    var freq = JSON.parse(localStorage.getItem('freq'));

    // 事前確率
    var preProb = JSON.parse(localStorage.getItem('preProb'));

}else{
    // 初期値
    var freq = [
        [5,5,5],
        [5,5,5],
        [5,5,5]
    ];

    // 事前確率
    var preProb = [
        [1/3, 1/3, 1/3],
        [1/3, 1/3, 1/3],
        [1/3, 1/3, 1/3]
    ];
}


//相手の動き
const cpMoveRes = function(){
    const random = Math.random();
    if(myMove === ''){
        cpMove = Math.floor(Math.random()*3);
    }else if(random < preProb[myMove][0]){
        cpMove = 2
    }else if(random >= preProb[myMove][0] && random < preProb[myMove][0]+preProb[myMove][1]){
        cpMove = 0;
    }else{
        cpMove = 1;
    }
    
    if(cpMove === 0){
        $('#computer').html('グー');
    }else if(cpMove === 1){
        $('#computer').html('チョキ');
    }else{
        $('#computer').html('パー');
    }
}


// 表示および計算

//グー
$('#btn1').on('click', function(){
    //相手
    cpMoveRes();

    //自分
    if(cpMove === 2){
        lose();
    }else if(cpMove === 1){
        win();
    }else{
        draw();
    }

    // 確率の更新
    if(myMove === ''){
        myMove = 0;
    }else{
        freq[myMove][0] += 1;
        let freq_calc = freqCalc(freq[myMove]);
        for(let i=0;i<=2;i++){
            preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
        }
        preProb[myMove] = freqCalc(preProb[myMove]);
        myMove = 0;
        localStorage.setItem('freq', JSON.stringify(freq));
        localStorage.setItem('preProb', JSON.stringify(preProb));
        console.log(preProb[0]);
    }
});

//チョキ
$('#btn2').on('click', function(){
    //相手
    cpMoveRes();

    //自分
    if(cpMove === 0){
        lose();
    }else if(cpMove === 2){
        win();
    }else{
        draw();
    }

    // 確率の更新
    if(myMove === ''){
        myMove = 1;
    }else{
        freq[myMove][1] += 1;
        let freq_calc = freqCalc(freq[myMove]);
        for(let i=0;i<=2;i++){
            preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
        }
        preProb[myMove] = freqCalc(preProb[myMove]);
        myMove = 1;
        localStorage.setItem('freq', JSON.stringify(freq));
        localStorage.setItem('preProb', JSON.stringify(preProb));
    }
});

//パー
$('#btn3').on('click', function(){
    //相手
    cpMoveRes();

    //自分
    if(cpMove === 1){
        lose();
    }else if(cpMove === 0){
        win();
    }else{
        draw();
    }

    // 確率の更新
    if(myMove === ''){
        myMove = 2;
    }else{
        freq[myMove][2] += 1;
        let freq_calc = freqCalc(freq[myMove]);
        for(let i=0;i<=2;i++){
            preProb[myMove][i] = freq_calc[i]*preProb[myMove][i];
        }
        preProb[myMove] = freqCalc(preProb[myMove]);
        myMove = 2;
        localStorage.setItem('freq', JSON.stringify(freq));
        localStorage.setItem('preProb', JSON.stringify(preProb));
    }
});


$('#btn7').on('click', function(){
    localStorage.removeItem('freq');
    localStorage.removeItem('preProb');
    location.reload();
});