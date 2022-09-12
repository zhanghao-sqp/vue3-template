import scssVar from '@style/global/var.module.scss'

export const svgLoading = `<svg class="svg-loading" width="100" height="60" viewBox="25 20 50 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
<g transform="translate(20 50)">
    <circle cx="0" cy="0" r="7" fill="${scssVar.mainColor}" transform="scale(0.99275 0.99275)">
        <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
    </circle>
</g>
<g transform="translate(40 50)">
    <circle cx="0" cy="0" r="7" fill="${scssVar.mainColor}" transform="scale(0.773605 0.773605)">
        <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
    </circle>
</g>
<g transform="translate(60 50)">
    <circle cx="0" cy="0" r="7" fill="${scssVar.mainColor}" transform="scale(0.42525 0.42525)">
        <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
    </circle>
</g>
<g transform="translate(80 50)">
    <circle cx="0" cy="0" r="7" fill="${scssVar.mainColor}" transform="scale(0.113418 0.113418)">
        <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
    </circle>
</g>
</svg>`

export const svgFullScreenLoading = `<svg xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="-15 -10 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
<rect x="0" y="7.6416" width="4" height="14.7168" fill="${scssVar.mainColor}" opacity="0.2">
  <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
  <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
  <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
</rect>
<rect x="8" y="5.1416" width="4" height="19.7168" fill="${scssVar.mainColor}" opacity="0.2">
  <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
  <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
  <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
</rect>
<rect x="16" y="7.3584" width="4" height="15.2832" fill="${scssVar.mainColor}" opacity="0.2">
  <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
  <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
  <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
</rect>
</svg>`
