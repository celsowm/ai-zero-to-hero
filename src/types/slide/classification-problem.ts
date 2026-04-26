export interface ClassificationProblemDatasetRowCopy {
  label: string;
  values: string[];
  target: number;
}

export interface ClassificationProblemCopy {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableCaption: string;
  columns: string[];
  rows: ClassificationProblemDatasetRowCopy[];
  class0Label: string;
  class1Label: string;
  class0Color: string;
  class1Color: string;
  scatterTitle: string;
  scatterXLabel: string;
  scatterYLabel: string;
  scatterTooltip0: string;
  scatterTooltip1: string;
  footerNote: string;
}
