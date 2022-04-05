<template>
  <div class="gcweb">

    <div class="loveBox">
      <ul class="loveLine">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {

}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-weight: 700;
}
#threed {
  text-transform: uppercase; /* 转成大写 */
  width: 1000px;
  margin: 200px auto;
  font-size: 100px;
  color: pink;
  letter-spacing: 5px; /* 设置字间距 */
  transition: all 1s;
  -webkit-text-stroke: 2px gold; /* 设置字体边框 ie浏览器不支持*/
  /* transform: rotate(-5deg); 旋转一定角度 */
}
#threed::before {
  content: "坠入爱河"; /* 阿童木 */
  position: absolute;
  top: 210px;
  left: 330px;
  color: white;
  clip-path: inset(0 0 50% 0);
  transform: rotate(0deg) skew(0deg);
  transition: all 0.8s;
}
#threed:hover::before {
  transform: rotateX(-30deg) skew(-30deg);
  color: white;
  text-shadow: 0 0 2px black;
}
#threed::after {
  content: "坠入爱河";
  position: absolute;
  top: 210px;
  left: 330px;
  color: white;
  clip-path: inset(50% 0 0 0); /* 裁剪半个矩形区域 */
  transform: rotate(0deg) skew(0deg);
  transition: all 1s;
}
#threed:hover::after {
  transform: rotateX(40deg) skew(20deg);
  color: white;
  text-shadow: 0 0 2px black;
}
/* 心跳特效 */
.loveBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(36, 40, 66，0.5);
}

.loveLine {
  height: 200px;
}

.loveLine li {
  float: left;
  list-style: none;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 10px;
}

.loveLine li:nth-child(1) {
  background-color: red;
  animation: jump1 3s infinite;
}

.loveLine li:nth-child(2) {
  background-color: rgb(238, 118, 5);
  animation: jump2 3s 0.2s infinite;
}

.loveLine li:nth-child(3) {
  background-color: rgb(106, 10, 233);
  animation: jump3 3s 0.4s infinite;
}

.loveLine li:nth-child(4) {
  background-color: darkmagenta;
  animation: jump4 3s 0.6s infinite;
}

.loveLine li:nth-child(5) {
  background-color: rgb(245, 11, 147);
  animation: jump5 3s 0.8s infinite;
}

.loveLine li:nth-child(6) {
  background-color: rgb(32, 9, 231);
  animation: jump4 3s 1s infinite;
}

.loveLine li:nth-child(7) {
  background-color: rgb(36, 170, 81);
  animation: jump3 3s 1.2s infinite;
}

.loveLine li:nth-child(8) {
  background-color: #f62e74;
  animation: jump2 3s 1.4s infinite;
}

.loveLine li:nth-child(9) {
  background-color: red;
  animation: jump1 3s 1.6s infinite;
}

@keyframes jump1 {
  30%,
  50% {
    height: 60px;
    transform: translateY(-30px);
  }

  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}

@keyframes jump2 {
  30%,
  50% {
    height: 120px;
    transform: translateY(-60px);
  }

  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}

@keyframes jump3 {
  30%,
  50% {
    height: 160px;
    transform: translateY(-75px);
  }

  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}

@keyframes jump4 {
  30%,
  50% {
    height: 180px;
    transform: translateY(-60px);
  }

  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}

@keyframes jump5 {
  30%,
  50% {
    height: 200px;
    transform: translateY(-45px);
  }

  70%,
  100% {
    height: 20px;
    transform: translateY(0px);
  }
}
</style>