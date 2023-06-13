import { DropDown } from "./component/dropdownobj";
import modal from "./component/modal";
import {
  barChart,
  lineChart,
  radar5Chart,
  radarChart,
} from "./component/chartfunc";
type DropDownData = {
  [label: string]: string;
}[];
type Data = {
  dropdownData: DropDownData;
};
const data: Data = {
  dropdownData: [
    {
      "1": "Phonics is Fun 1",
    },
    {
      "2": "Phonics is Fun 2",
    },
    {
      "3": "Phonics is Fun 3",
    },
    {
      "4": "Phonics is Fun 4",
    },
    {
      "5": "Phonics is Fun 5",
    },
  ],
};
//   chartBarData: {
//     myData: {
//       sound: 52,
//       words: 86,
//       sentences: 40,
//     },
//     avg: {
//       sound: 90, // 1% === 2.25
//       words: 81,
//       sentences: 90,
//     },
//   },
//   lineData: {
//     sounds: [60, 50, 40, 30, 20, 19, 60, 70],
//     words: [60, 59, 68, 29, 49, 10, 40, 69],
//     sentences: [67, 56, 85, 36, 86, 34, 23, 23],
//   },
//   radarChartData: {
//     avg: [53, 60, 67, 48],
//     gplum: [40, 50, 60, 50],
//   },
//   grade: [3, 1, 2, 3, 4],
// };

// radar5Chart("#root", "1", data.grade);

// const first = new DropDown("#root", "first", data.dropdownData);
// const second = new DropDown("#root", "second", data.dropdownData);

const showAlert = () => {
  alert("hi");
};
const dropdown = new DropDown("#root", "first", data.dropdownData, showAlert);
