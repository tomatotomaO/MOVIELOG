document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("canvasContainer")) {
    new p5((p) => {
      p.Mlist = [];
      p.s0 = p.s1 = p.s2 = p.s3 = p.s4 = null;
      p.sult = null;
      p.star = "";
      p.xyMovie = [0, 0];
      p.cap = "";
      p.fontLoaded = false;

      p.preloadAssets = function () {
        p.star = p.loadImage(
          "./icon/star.svg",
          () => console.log("Star icon loaded"),
          () => console.error("Failed to load star icon")
        );
        p.sult = p.loadFont(
          "./style/SUIT-Variable-ttf/SUIT-Variable.ttf",
          () => {
            console.log("Font loaded");
            p.fontLoaded = true;
          },
          () => console.error("Failed to load font")
        );
        p.s0=p.loadImage("./style/MOVIELOG1.png");
        p.s1=p.loadImage("./style/MOVIELOG2.png");
        p.s2=p.loadImage("./style/MOVIELOG3.png");
        p.s3=p.loadImage("./style/MOVIELOG4.png");
        p.s4=p.loadImage("./style/MOVIELOG5.png");
      };

      p.preload = function () {
        p.preloadAssets();
      };


      p.setup = function () {
        let canvas = p.createCanvas(353, 515);
        canvas.parent("canvasContainer");
        p.currentMenu = localStorage.getItem("currentMenu");
        p.currentStep = parseInt(localStorage.getItem("currentStep"), 10) || 0;
        p.currentColor = localStorage.getItem("currentColor");

        if (!p.currentColor) {
          if (p.currentMenu && colorDic[p.currentMenu]) {
            p.currentColor = colorDic[p.currentMenu];
          } else {
            p.currentColor = 220;
          }
        }

        p.background(p.currentColor);
        p.backgroundSvgDrawing();

        if (p.currentStep == 4) {
          let sBtn = document.getElementById("savePNG");
          sBtn.addEventListener("click", p.saveIMG);
        }
      };

      p.draw = function () {
        p.currentColor = localStorage.getItem("currentColor");
        p.background(p.currentColor);
        p.backgroundSvgDrawing();
        p.fill(0);
        if (p.currentStep>1) {
          p.writeMovie();
        }
        if (p.currentStep>2){
          p.writeReview();
        }
          
      };

      p.backgroundSvgDrawing = function () {
        p.xyMovie[0] = 27;
        p.backStyle=document.getElementById("backgroundStyle");
        
        switch (p.currentColor) {
          case c[0]:
            p.xyMovie[1] = 20;
            p.style1();
            break;
          case c[1]:
            p.xyMovie[1] = 20;
            p.style2();
            break;
          case c[2]:
            p.xyMovie[1] = 70;
            p.style3();
            break;
          case c[3]:
            p.xyMovie[1] = 91;
            p.style4();
            break;
          case c[4]:
            p.xyMovie[1] = 64;
            p.style5();
            break;
          default:
            p.xyMovie[1] = 20;
            p.style1();
            break;
        }
        
      };

      p.writeMovie = function () {
        p.n = localStorage.getItem("Mtitle");
        p.d = localStorage.getItem("Mdirector");
        p.s = localStorage.getItem("Mscore");
        p.textMovie(p.n, p.d, p.s);
      };

      p.textMovie = function (st1, st2, st3) {
        if (!p.sult) return; 
        console.log(st1 + st2 + st3);
        let x = p.xyMovie[0];
        let y = p.xyMovie[1] + 45;
        p.textFont(p.sult);
        p.textStyle(p.BOLD);
        p.stroke(0);
        p.strokeWeight(3);
        p.textSize(40);
        p.text(st1, x, y);

        p.textSize(16);
        p.strokeWeight(1);
        p.text("감독", x, y + 35);

        p.textStyle(p.NORMAL);
        p.strokeWeight(0.5);
        p.text(st2, x + 36, y + 35);

        p.image(p.star, x, y + 47);
        p.text(st3, x + 20, y + 60);
      };

      p.saveIMG = function () {
        p.cap = p.get(0, 0, 353, 515);
        p.save(p.cap, "movielog.png");
      };

      p.writeReview = function () {
        p.reviewAarray = JSON.parse(localStorage.getItem("reviewAarray"));
        p.reviewTitle = JSON.parse(localStorage.getItem("reviewQarrayString"));
        let x = 27;
        let y = 0;
        let xgap = 158;
        let ygap = 82;
    
        if (p.reviewAarray && p.reviewTitle) {
            switch (p.currentColor) {
                case c[0]:
                    y = 216;
                    ygap = 113+25;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
    
                case c[1]:
                    y = 166.5+25;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
                case c[2]:
                    y = 313+25;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
                case c[3]:
                    y = 220+25;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x + xgap, y + ygap);
                    break;
                case c[4]:
                    y = 196+25;
                    ygap = 69;
                    if (p.reviewAarray[0] && p.reviewTitle[0]) p.textReview(p.reviewTitle[0], p.reviewAarray[0], x, y);
                    if (p.reviewAarray[1] && p.reviewTitle[1]) p.textReview(p.reviewTitle[1], p.reviewAarray[1], x + xgap, y);
                    if (p.reviewAarray[2] && p.reviewTitle[2]) p.textReview(p.reviewTitle[2], p.reviewAarray[2], x, y + ygap);
                    if (p.reviewAarray[3] && p.reviewTitle[3]) p.textReview(p.reviewTitle[3], p.reviewAarray[3], x, y + ygap + 125);
                    break;
            }
        }
    };
    
    

    p.textReview = function (title, content, x, y) {
      let boxWidth = 140, boxHeight = 40;
        if (p.sult && title && content) {
            p.textFont(p.sult);
            p.fill('#1F1F1F');
            p.textStyle(p.NORMAL);
            p.stroke('#1F1F1F');
            p.strokeWeight(1);
            p.textSize(14);
            p.text(title, x, y);
            p.textSize(12);
            p.strokeWeight(0.5);
            p.textRegion(x, y+6, boxWidth, boxHeight, content, 10);
        }
    };
    
    p.textRegion = function (x, y, width, height, text, textSize) {

      
      p.fill(0);
      p.textSize(textSize);

      let words = text.split(' ');
      let line = '';
      let yOffset = 0;
      
      for (let n = 0; n < words.length; n++) {
          let testLine = line + words[n] + ' ';
          let testWidth = p.textWidth(testLine);
          
          if (testWidth > width - 10) {
              if (p.textWidth(words[n]) > width - 10) {
                  let chars = words[n].split('');
                  for (let m = 0; m < chars.length; m++) {
                      let testLine = line + chars[m];
                      if (p.textWidth(testLine) > width - 10) {
                          p.text(line, x + 5, y + yOffset + textSize);
                          line = chars[m];
                          yOffset += textSize;
                          if (yOffset + textSize > height) {
                              return;
                          }
                      } else {
                          line = testLine;
                      }
                  }
                  line += ' ';
              } else {
                  p.text(line, x, y + yOffset + textSize);
                  line = words[n] + ' ';
                  yOffset += textSize;
                  if (yOffset + textSize > height) {
                      return;
                  }
              }
          } else {
              line = testLine;
          }
      }
      p.text(line.trim(), x, y + yOffset + textSize);
  };
    
    

      p.style1=function(){
      p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.beginShape();
      p.vertex(0,0);
      p.vertex(353,0);
      p.quadraticVertex(353,0,353,0);
      p.vertex(353,530);
      p.quadraticVertex(353,530,353,530);
      p.vertex(0,530);
      p.quadraticVertex(0,530,0,530);
      p.vertex(0,0);
      p.quadraticVertex(0,0,0,0);
      p.endShape();
      p.fill("#ccff00")
      p.beginShape();
      p.vertex(0.000164032,530);
      p.vertex(266.589,530);
      p.vertex(304.279,530);
      p.vertex(353,530);
      p.vertex(353,454.764);
      p.bezierVertex(353,445.455,348.678,436.672,341.301,430.993);
      p.vertex(266.589,373.471);
      p.vertex(323,373.471);
      p.bezierVertex(339.569,373.471,353,360.04,353,343.471);
      p.vertex(353,216.943);
      p.vertex(353,183.99);
      p.vertex(353,168.199);
      p.vertex(353,129.152);
      p.bezierVertex(353,111.127,337.218,97.172,319.329,99.3779);
      p.vertex(156.5,119.456);
      p.vertex(329.973,78.0027);
      p.bezierVertex(343.475,74.7761,353,62.7068,353,48.8242);
      p.vertex(353,0);
      p.vertex(0,0);
      p.vertex(0.000164032,119.456);
      p.vertex(0.000116396,139.112);
      p.vertex(116,168.199);
      p.vertex(22.1846,193.514);
      p.bezierVertex(9.09417,197.046,0.00000584705,208.919,0.0000142635,222.478);
      p.vertex(0.000164032,463.75);
      p.vertex(0.000164032,530);
      p.endShape();
      //p.image(p.s0,219,116.61);
      p.textFont(p.sult);
    p.fill(c[3]);
    p.textStyle(p.NORMAL);
    p.stroke(c[3]);
    p.strokeWeight(1);
    p.textSize(14);
    p.push(); 
    p.translate(219, 116.61); 
    p.rotate(p.radians(-6.961));
    p.text('MOVIE LOG.', 0, 20); 
    p.pop(); 
      }
      p.style2=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,-14.5);
      p.vertex(353,-14.5);
      p.vertex(353,367.654);
      p.vertex(71,397);
      p.vertex(71,367.654);
      p.vertex(0,367.654);
      p.vertex(0,-14.5);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,397);
      p.vertex(353,397);
      p.vertex(353,426.729);
      p.vertex(100.5,456);
      p.vertex(100.5,426.729);
      p.vertex(0,426.729);
      p.vertex(0,397);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,455);
      p.vertex(353,455);
      p.vertex(353,467.976);
      p.vertex(143.5,493);
      p.vertex(143.5,467.976);
      p.vertex(0,467.976);
      p.vertex(0,455);
      p.endShape();
      p.fill("#f3493e")
      p.beginShape();
      p.vertex(0,493);
      p.vertex(353,493);
      p.vertex(353,496.143);
      p.vertex(188,515);
      p.vertex(188,496.143);
      p.vertex(0,496.143);
      p.vertex(0,493);
      p.endShape();
      //p.image(p.s1,240,407);
      p.textFont(p.sult);
      p.fill(c[4]);
      p.textStyle(p.NORMAL);
      p.stroke(c[4]);
      p.strokeWeight(1);
      p.textSize(14);
      p.text('MOVIE LOG.', 240,417); 
          
      }
      p.style3=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#e5e6e7")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(113.256,1.21229);
      p.bezierVertex(155.256,6.4124,170.423,42.0456,172.756,59.2123);
      p.vertex(124.756,59.2123);
      p.vertex(124.756,39.7123);
      p.vertex(23.2563,39.7123);
      p.bezierVertex(33.7563,23.7123,51.7563,-6.40215,113.256,1.21229);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(240.256,1.21229);
      p.bezierVertex(198.256,6.4124,183.09,42.0456,180.756,59.2123);
      p.vertex(228.756,59.2123);
      p.vertex(228.756,39.7123);
      p.vertex(330.256,39.7123);
      p.bezierVertex(319.756,23.7123,301.756,-6.40215,240.256,1.21229);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(29.7564,220.734);
      p.vertex(29.7564,252.234);
      p.bezierVertex(3.7564,221.834,13.6123,213.734,22.2564,214.234);
      p.bezierVertex(23.61,214.312,27.6122,215.234,29.7564,220.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(29.7564,294.734);
      p.vertex(29.7564,263.234);
      p.bezierVertex(3.7564,293.634,13.6123,301.734,22.2564,301.234);
      p.bezierVertex(23.61,301.156,27.6122,300.234,29.7564,294.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(124.756,214.212);
      p.quadraticVertex(132.756,214.212,132.756,222.212);
      p.vertex(132.756,293.212);
      p.quadraticVertex(132.756,301.212,124.756,301.212);
      p.vertex(124.756,301.212);
      p.quadraticVertex(116.756,301.212,116.756,293.212);
      p.vertex(116.756,222.212);
      p.quadraticVertex(116.756,214.212,124.756,214.212);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(228.756,214.212);
      p.quadraticVertex(236.756,214.212,236.756,222.212);
      p.vertex(236.756,293.212);
      p.quadraticVertex(236.756,301.212,228.756,301.212);
      p.vertex(228.756,301.212);
      p.quadraticVertex(220.756,301.212,220.756,293.212);
      p.vertex(220.756,222.212);
      p.quadraticVertex(220.756,214.212,228.756,214.212);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(323.756,220.734);
      p.vertex(323.756,252.234);
      p.bezierVertex(349.756,221.834,339.9,213.734,331.256,214.234);
      p.bezierVertex(329.903,214.312,325.9,215.234,323.756,220.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(323.756,294.734);
      p.vertex(323.756,263.234);
      p.bezierVertex(349.756,293.634,339.9,301.734,331.256,301.234);
      p.bezierVertex(329.903,301.156,325.9,300.234,323.756,294.734);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(113.256,514.255);
      p.bezierVertex(155.256,509.055,170.423,473.422,172.756,456.255);
      p.vertex(124.756,456.255);
      p.vertex(124.756,475.755);
      p.vertex(23.2563,475.755);
      p.bezierVertex(33.7563,491.755,51.7563,521.87,113.256,514.255);
      p.endShape();
      p.fill("#4c4d55")
      p.beginShape();
      p.vertex(240.256,514.255);
      p.bezierVertex(198.256,509.055,183.09,473.422,180.756,456.255);
      p.vertex(228.756,456.255);
      p.vertex(228.756,475.755);
      p.vertex(330.256,475.755);
      p.bezierVertex(319.756,491.755,301.756,521.87,240.256,514.255);
      p.endShape();
      //p.image(p.s2,244,50);
      p.textFont(p.sult);
      p.fill('#4C4D55');
      p.textStyle(p.NORMAL);
      p.stroke('#4C4D55');
      p.strokeWeight(1);
      p.textSize(14);
      p.text('MOVIE LOG.',247,60); 
      }
      p.style4=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.fill("#000000")
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(0,65);
      p.vertex(224,65);
      p.vertex(224,396);
      p.vertex(0,396);
      p.vertex(0,65);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(53,34);
      p.vertex(207,34);
      p.vertex(207,359);
      p.vertex(53,359);
      p.vertex(53,34);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(155,86);
      p.vertex(309,86);
      p.vertex(309,440);
      p.vertex(155,440);
      p.vertex(155,86);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(18,86);
      p.vertex(353,86);
      p.vertex(353,416);
      p.vertex(18,416);
      p.vertex(18,86);
      p.endShape();
      p.fill("#3947ee")
      p.beginShape();
      p.vertex(51,185);
      p.vertex(207,185);
      p.vertex(207,515);
      p.vertex(51,515);
      p.vertex(51,185);
      p.endShape();
      //p.image(p.s3,58,449);
      p.textFont(p.sult);
      p.fill(0);
      p.textStyle(p.NORMAL);
      p.stroke(0);
      p.strokeWeight(1);
      p.textSize(14);
      p.text('MOVIE LOG.',58,483); 
      
      }
      p.style5=function(){
        p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#f3493e")
      p.translate(-1,0,0,1,353,0);
      p.beginShape();
      p.vertex(28,0);
      p.vertex(325,0);
      p.quadraticVertex(353,0,353,28);
      p.vertex(353,487);
      p.quadraticVertex(353,515,325,515);
      p.vertex(28,515);
      p.quadraticVertex(0,515,0,487);
      p.vertex(0,28);
      p.quadraticVertex(0,0,28,0);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(353,28);
      p.bezierVertex(353,12.536,340.464,0,325,0);
      p.vertex(325,377);
      p.bezierVertex(340.464,377,353,364.464,353,349);
      p.vertex(353,28);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(325,67);
      p.bezierVertex(325,29.9969,295.003,0,258,0);
      p.vertex(258,377);
      p.bezierVertex(295.003,377,325,347.003,325,310);
      p.vertex(325,67);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(353,377);
      p.vertex(325,377);
      p.vertex(325,421);
      p.bezierVertex(340.464,421,353,408.464,353,393);
      p.vertex(353,377);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(353,421);
      p.vertex(325,421);
      p.vertex(325,515);
      p.bezierVertex(340.464,515,353,502.464,353,487);
      p.vertex(353,421);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(325,377);
      p.vertex(258,377);
      p.vertex(258,421);
      p.vertex(281,421);
      p.bezierVertex(305.301,421,325,401.301,325,377);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(325,421);
      p.vertex(258,421);
      p.vertex(258,515);
      p.bezierVertex(295.003,515,325,485.003,325,448);
      p.vertex(325,421);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(258,421);
      p.vertex(0,421);
      p.vertex(0,515);
      p.vertex(164,515);
      p.bezierVertex(215.915,515,258,472.915,258,421);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(258,377);
      p.vertex(0,377);
      p.vertex(0,421);
      p.vertex(214,421);
      p.bezierVertex(238.301,421,258,401.301,258,377);
      p.endShape();
      p.fill("#fec3d9")
      p.beginShape();
      p.vertex(258,129);
      p.bezierVertex(258,57.7553,200.245,0,129,0);
      p.bezierVertex(57.7553,0,0,57.7553,0,129);
      p.vertex(0,248);
      p.bezierVertex(0,319.245,57.7553,377,129,377);
      p.bezierVertex(200.245,377,258,319.245,258,248);
      p.vertex(258,129);
      p.endShape();
      //p.image(p.s4,313,75);

      p.textFont(p.sult);
      p.fill(c[1]);
      p.textStyle(p.NORMAL);
      p.stroke(c[1]);
      p.strokeWeight(1);
      p.textSize(14);
      p.push(); 
      p.translate(313,75); 
      p.rotate(-PI/2);
      p.text('MOVIE LOG.', -80, 7); 
      p.pop(); 

      
      }
      p.drawStar=function(){
      p.fill("rgba(0, 0, 0, 0)")
      p.stroke('rgba(0,0,0,0)')
      p.strokeCap(p.PROJECT);
      p.strokeJoin(p.MITER);
      p.fill("#000000")
      p.beginShape();
      p.vertex(7.36842,11.2516);
      p.vertex(11.9221,14);
      p.vertex(10.7137,8.82);
      p.vertex(14.7368,5.33474);
      p.vertex(9.43895,4.88526);
      p.vertex(7.36842,0);
      p.vertex(5.29789,4.88526);
      p.vertex(0,5.33474);
      p.vertex(4.02316,8.82);
      p.vertex(2.81474,14);
      p.vertex(7.36842,11.2516);
      p.endShape();
      
      }




    });
  }
});
