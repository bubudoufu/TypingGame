const questions = [
  "custard-apple",
  "grapefruit",
  "pineapple",
  "cranberry",
  "peach",
  "strawberry",
  "banana",
  "kiwi",
  "coconut",
  "avocado",
];
const questionsNum = questions.length; // 問題の総数
let num = 0;
let question;
const result = document.querySelector(".result");
const word = document.querySelector(".word");

// 問題をランダムで出題させる関数
function setQuestion() {
  question = questions.splice(
    Math.floor(Math.random() * questions.length),
    1
  )[0];
  word.textContent = question;
  num = 0;
}

// キーが押された時の処理
document.addEventListener("keydown", keyDown);
function keyDown(e) {
  // エンターキーが押された時
  if (e.key === "Enter") {
    if (result.textContent == "[Enter] Game Start") {
      result.textContent = `${questionsNum}/${questionsNum}`;
      setQuestion();
      move.play();
      return;
    }
  }
  // タイプ時の処理
  if (e.key !== question[num]) {
    return;
  }
  // タイプ文字が合っていた時の処理
  num++;
  word.textContent = "".repeat(num) + question.substring(num);
  // 問題の単語をクリアした時
  if (num === question.length) {
    result.textContent = `${questions.length}/${questionsNum}`;
    move.currentTime = move.currentTime - 2000;
    if (move.currentTime < 0) {
      move.currentTime = 0;
    }
    // 全ての問題をクリアした時の処理
    if (questions.length === 0) {
      result.innerHTML = "Finish!! <span>[Enter]Restart Game</span>";
      move.pause();
      gameEnd();
      return;
    }
    setQuestion();
  }
}

// 文字を動かすアニメーション
const move = word.animate(
  [{ transform: "translateX(100%)" }, { transform: "translateX(0%)" }],
  { duration: 15000, fill: "forwards" }
);
move.pause();

// ゲームオーバー処理
move.onfinish = () => {
  result.innerHTML = `${
    questions.length + 1
  }/${questionsNum} <span>[Enter]Restart Game</span>`;
  gameEnd();
};

// ゲーム終了時の処理
function gameEnd() {
  document.removeEventListener("keydown", keyDown);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      location.reload();
    }
  });
}
