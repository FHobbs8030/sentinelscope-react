const data = [
  { label: "Critical", value: 14 },
  { label: "High", value: 10 },
  { label: "Medium", value: 6 },
  { label: "Low", value: 3 },
];

const max = Math.max(...data.map((d) => d.value));

width: `${(value / max) * 100}%`;

