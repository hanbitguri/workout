export function barChart(target: string, id: string, data: any) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const $target = document.querySelector(`${target}`);
  canvas.id = id;
  if ($target) {
    $target.appendChild(canvas);
  }
  const $data = { ...data }; // 데이터 가공 로직
  if (context) {
    context.fillStyle = "black";
    context.fillText("Sound", 0, 40);
    context.fillText("Words", 0, 80);
    context.fillText("Sentences", 0, 120);

    for (let i = 0; i < 6; i++) {
      context.fillText(`${0 + 20 * i}%`, 40 + 45 * i, 150);
    }
    for (let i = 1; i <= 6; i++) {
      context.fillStyle = "#bfbfbf";
      context.fillRect(45 * i, 0, 0.5, 200);
    }
    context.fillStyle = "blue";
    for (let i = 0; i < Object.keys($data.avg).length; i++) {
      context.fillRect(
        46,
        25 + 40 * i,
        (Object.values($data.avg)[i] as number) * 2.25, // 1% === 2.25
        20
      );
    }
    context.fillStyle = "yellow";
    const key = Object.keys($data.myData);
    const value = Object.values($data.myData) as number[];
    for (let i = 0; i < key.length; i++) {
      context.fillRect(46 + value[i] * 2.25, 25 + i * 40, 20, 20);
    }
  }
}
export function lineChart(target: string, id: string, lineData: any) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const $target = document.querySelector(`${target}`);
  canvas.id = id;
  if (context && canvas) {
    context.fillStyle = "black";
    context.lineWidth = 1;
    context.font = "10px Arial";
    for (let i = 0; i < 6; i++) {
      context.fillText(`${100 - 20 * i}`, 10, 14 + 20 * i);
      context.beginPath();
      context.moveTo(32, 10 + 20 * i);
      context.lineTo(canvas.width, 10 + 20 * i);
      context.stroke();
    }
    context.font = "7px Arial";
    for (let i = 0; i < 8; i++) {
      context.fillText(`Chapter${1 + i}`, 30 + i * 34, 130);
    }
    const drawLine = (data: any, color: string) => {
      context.strokeStyle = color;

      for (let j = 0; j < data.length - 1; j++) {
        context.beginPath();
        context.moveTo(42 + 34 * j, 110 - data[j]);
        context.lineTo(76 + 34 * j, 110 - data[j + 1]);
        context.stroke();
      }
    };

    drawLine(lineData.words, "red");
    drawLine(lineData.sounds, "blue");
    drawLine(lineData.sentences, "green");

    $target?.appendChild(canvas);
  }
}
export function radarChart(target: string, id: string, radarData: any) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const $target = document.querySelector(`${target}`);
  canvas.id = id;
  $target?.appendChild(canvas);
  const liner = (x1: number, x2: number, y1: number, y2: number) => {
    if (context) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }
  };
  liner(160, 240, 10, 70); //160,10 , 240, 70
  liner(240, 160, 70, 130);
  liner(160, 80, 130, 70);
  liner(80, 160, 70, 10);

  liner(160, 200, 40, 70);
  liner(200, 160, 70, 100);
  liner(160, 120, 100, 70);
  liner(120, 160, 70, 40);
  if (context) {
    context.fillText("Pronunciation", 130, 10);
    context.fillText("Intonation", 240, 75);
    context.fillText("Loudness", 140, 140);
    context.fillText("Timing Score", 10, 75);

    context.fillText("0%", 105, 75);
    context.fillText("50%", 105, 45);
    context.fillText("100%", 105, 15);

    context.strokeStyle = "red";

    liner(160, 160 + radarData.avg[1] * 0.8, 70 - radarData.avg[0] * 0.6, 70);
    liner(160, 160 - radarData.avg[3] * 0.8, 70 - radarData.avg[0] * 0.6, 70);
    liner(160 - radarData.avg[3] * 0.8, 160, 70, 70 + radarData.avg[2] * 0.6);
    liner(160, 160 + radarData.avg[1] * 0.8, 70 + radarData.avg[2] * 0.6, 70);

    context.strokeStyle = "blue";

    liner(
      160,
      160 - radarData.gplum[3] * 0.8,
      70 - radarData.gplum[0] * 0.6,
      70
    );
    liner(
      160 - radarData.gplum[3] * 0.8,
      160,
      70,
      70 + radarData.gplum[2] * 0.6
    );
    liner(
      160,
      160 + radarData.gplum[1] * 0.8,
      70 + radarData.gplum[2] * 0.6,
      70
    );
    liner(
      160,
      160 + radarData.gplum[1] * 0.8,
      70 - radarData.gplum[0] * 0.6,
      70
    );
  }
}
export function radar5Chart(target: string, id: string, grade: any) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const $target = document.querySelector(`${target}`);
  canvas.id = id;

  const drawAngle = (x: number) => {
    if (context) {
      const centerX = 150; // 중심 X 좌표
      const centerY = 80; // 중심 Y 좌표
      const radius = x; // 반지름

      context.beginPath();

      for (let i = 0; i < 5; i++) {
        const angle = ((2 * Math.PI) / 5) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        context.lineTo(x, y);
      }

      context.closePath();
      context.stroke();
    }
  };
  const liner = (x1: number, x2: number, y1: number, y2: number) => {
    if (context) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }
  };

  drawAngle(12);
  drawAngle(24);
  drawAngle(36);
  drawAngle(48);
  drawAngle(60);
  if (context) {
    context.fillText("Responseability", 120, 20);
    context.fillText("Organization", 210, 60);
    context.fillText("Pacing", 190, 130);
    context.fillText("Independent Work", 50, 130);
    context.fillText("Homework", 40, 60);
    context.fillText("0", 130, 80);
    context.fillText("1", 130, 70);
    context.fillText("2", 130, 60);
    context.fillText("3", 130, 50);
    context.fillText("4", 130, 40);
    context.fillText("5", 130, 30);

    context.strokeStyle = "blue";
    liner(149, 149 + grade[1] * 12, 77.8 - grade[0] * 11, 77.8 - grade[1] * 3);
    liner(
      149 + grade[1] * 12,
      149 + grade[2] * 7,
      77.8 - grade[1] * 3,
      77.8 + grade[2] * 10
    );
    liner(
      149 + grade[2] * 7,
      149 - grade[3] * 7,
      77.8 + grade[2] * 10,
      77.8 + grade[3] * 10
    );
    liner(
      149 - grade[3] * 7,
      149 - grade[4] * 11,
      77.8 + grade[3] * 10,
      77.8 - grade[4] * 3
    );
    liner(149 - grade[4] * 11, 149, 77.8 - grade[4] * 3, 77.8 - grade[0] * 11);
  }
  $target?.appendChild(canvas);
}
