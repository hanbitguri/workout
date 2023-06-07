const data = {
  myData: {
    sound: 52,
    words: 86,
    sentences: 40,
  },
  avg: {
    sound: 90, // 1% === 2.25
    words: 81,
    sentences: 90,
  },
};
type AnyObject = {
  [key: string]: any;
};

class Chart {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  data: AnyObject;

  constructor(data: AnyObject) {
    this.canvas = document.createElement("canvas");
    const root = document.querySelector("#root");
    if (root) {
      root.appendChild(this.canvas);
    }

    this.canvas.id = "chart";
    this.context = this.canvas.getContext("2d");
    this.data = { ...data };
  }

  private liner(x1: number, x2: number, y1: number, y2: number) {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
    }
  }
  barChart() {
    //background render
    const drawBackground = () => {
      if (this.context) {
        this.context.fillStyle = "black";
        this.context.fillText("Sound", 0, 40);
        this.context.fillText("Words", 0, 80);
        this.context.fillText("Sentences", 0, 120);

        for (let i = 0; i < 6; i++) {
          this.context.fillText(`${0 + 20 * i}%`, 40 + 45 * i, 150);
        }
        for (let i = 1; i <= 6; i++) {
          this.context.fillStyle = "#bfbfbf";
          this.context.fillRect(45 * i, 0, 0.5, 200);
        }
      }
    };
    const drawAvg = (
      context: CanvasRenderingContext2D | null,
      data: AnyObject,
      color: string
    ) => {
      if (context) {
        context.fillStyle = color;
        for (let i = 0; i < Object.keys(data.avg).length; i++) {
          context.fillRect(
            46,
            25 + 40 * i,
            (Object.values(data.avg)[i] as number) * 2.25, // 1% === 2.25
            20
          );
        }
      }
    };
    const drawMydata = (
      context: CanvasRenderingContext2D | null,
      data: AnyObject,
      color: string
    ) => {
      if (context) {
        context.fillStyle = color;
        const key = Object.keys(data.myData);
        const value = Object.values(data.myData) as number[];
        for (let i = 0; i < key.length; i++) {
          if (this.context) {
            this.context.fillRect(46 + value[i] * 2.25, 25 + i * 40, 20, 20);
          }
        }
      }
    };
    drawBackground();
    drawAvg(this.context, this.data, "blue");
    drawMydata(this.context, this.data, "yellow");
  }
  lineChart() {
    const lineData = {
      sounds: [60, 50, 40, 30, 20, 19, 60, 70],
      words: [60, 59, 68, 29, 49, 10, 40, 69],
      sentences: [67, 56, 85, 36, 86, 34, 23, 23],
    };
    //background render
    const drawBackground = () => {
      if (this.context && this.canvas) {
        this.context.fillStyle = "black";
        this.context.lineWidth = 1;
        this.context.font = "10px Arial";
        for (let i = 0; i < 6; i++) {
          this.context.fillText(`${100 - 20 * i}`, 10, 14 + 20 * i);
          this.context.beginPath();
          this.context.moveTo(32, 10 + 20 * i);
          this.context.lineTo(this.canvas.width, 10 + 20 * i);
          this.context.stroke();
        }
        this.context.font = "7px Arial";
        for (let i = 0; i < 8; i++) {
          this.context.fillText(`Chapter${1 + i}`, 30 + i * 34, 130);
        }
      }
    };

    const drawLine = (
      context: CanvasRenderingContext2D | null,
      data: AnyObject,
      color: string
    ) => {
      if (context) {
        context.strokeStyle = color;
        for (let i = 0; i < data.length - 1; i++) {
          context.beginPath();
          context.moveTo(42 + 34 * i, 110 - data[i]);
          context.lineTo(76 + 34 * i, 110 - data[i + 1]);
          context.stroke();
        }
      }
    };

    drawBackground();
    drawLine(this.context, lineData.words, "red");
    drawLine(this.context, lineData.sounds, "blue");
    drawLine(this.context, lineData.sentences, "green");
  }
  radarChart() {
    const data = [40, 90, 30, 40];
    const data2 = [50, 29, 59, 90];
    const drawBackground = () => {
      this.liner(160, 240, 10, 70); //160,10 , 240, 70
      this.liner(240, 160, 70, 130);
      this.liner(160, 80, 130, 70);
      this.liner(80, 160, 70, 10);

      this.liner(160, 200, 40, 70);
      this.liner(200, 160, 70, 100);
      this.liner(160, 120, 100, 70);
      this.liner(120, 160, 70, 40);
      if (this.context) {
        this.context.fillText("Pronunciation", 130, 10);
        this.context.fillText("Intonation", 240, 75);
        this.context.fillText("Loudness", 140, 140);
        this.context.fillText("Timing Score", 20, 75);

        this.context.fillText("0%", 105, 75);
        this.context.fillText("50%", 105, 45);
        this.context.fillText("100%", 105, 15);
      }
    };

    const drawLine = () => {
      // 마름모 원점 (160,70) // ticks : 40 1퍼 = 8 가로 80 세로 60
      if (this.context) {
        this.context.strokeStyle = "red";
      }
      this.liner(160, 160 + data[1] * 0.8, 70 - data[0] * 0.6, 70);
      this.liner(160, 160 - data[3] * 0.8, 70 - data[0] * 0.6, 70);
      this.liner(160 - data[3] * 0.8, 160, 70, 70 + data[2] * 0.6);
      this.liner(160, 160 + data[1] * 0.8, 70 + data[2] * 0.6, 70);
      if (this.context) {
        this.context.strokeStyle = "blue";
      }
      this.liner(160, 160 - data2[3] * 0.8, 70 - data2[0] * 0.6, 70);
      this.liner(160 - data2[3] * 0.8, 160, 70, 70 + data2[2] * 0.6);
      this.liner(160, 160 + data2[1] * 0.8, 70 + data2[2] * 0.6, 70);
      this.liner(160, 160 + data2[1] * 0.8, 70 - data2[0] * 0.6, 70);
    };

    drawBackground();
    drawLine();
  }
  radar5Chart() {
    const drawAngle = (x: number) => {
      if (this.context) {
        const centerX = 150; // 중심 X 좌표
        const centerY = 80; // 중심 Y 좌표
        const radius = x; // 반지름

        this.context.beginPath();

        for (let i = 0; i < 5; i++) {
          const angle = ((2 * Math.PI) / 5) * i - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          this.context.lineTo(x, y);
        }

        this.context.closePath();
        this.context.stroke();
      }
    };
    const drawBackground = () => {
      drawAngle(12);
      drawAngle(24);
      drawAngle(36);
      drawAngle(48);
      drawAngle(60);
      if (this.context) {
        this.context.fillText("Responseability", 120, 20);
        this.context.fillText("Organization", 210, 60);
        this.context.fillText("Pacing", 190, 130);
        this.context.fillText("Independent Work", 50, 130);
        this.context.fillText("Homework", 40, 60);
        this.context.fillText("0", 130, 80);
        this.context.fillText("1", 130, 70);
        this.context.fillText("2", 130, 60);
        this.context.fillText("3", 130, 50);
        this.context.fillText("4", 130, 40);
        this.context.fillText("5", 130, 30);
      }
    };
    const drawLine = () => {
      // 원점 149,79
      const grade = [1, 2, 3, 4, 5];
      if (this.context) {
        this.context.strokeStyle = "blue";
      }

      this.liner(
        149,
        149 + grade[1] * 11,
        79 - grade[0] * 11,
        79 - grade[1] * 4
      );
      this.liner(
        149 + grade[1] * 11,
        149 + grade[2] * 7,
        79 - grade[1] * 4,
        79 + grade[2] * 9
      );
      this.liner(
        149 + grade[2] * 7,
        149 - grade[3] * 7,
        79 + grade[2] * 9,
        79 + grade[3] * 9
      );
      this.liner(
        149 - grade[3] * 7,
        149 - grade[4] * 11,
        79 + grade[3] * 9,
        79 - grade[4] * 4
      );
      this.liner(
        149 - grade[4] * 11,
        149,
        79 - grade[4] * 4,
        79 - grade[0] * 11
      );

      // this.context.fillRect(149, 79 - grade[0] * 11, 2, 2);
      // this.context.fillRect(149 + grade[1] * 11, 79 - grade[1] * 4, 2, 2);
      // this.context.fillRect(149 + grade[2] * 7, 79 + grade[2] * 9, 2, 2);
      // this.context.fillRect(149 - grade[3] * 7, 79 + grade[3] * 9, 2, 2);
      // this.context.fillRect(149 - grade[4] * 11, 79 - grade[4] * 4, 2, 2);
    };
    drawBackground();
    drawLine();
  }
}
