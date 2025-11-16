export interface RowData {
  branchId: string;
  branchCode: string;
  branchName: string;

  customerUid: string;
  customerName: string;

  accountNumber: string;

  creditCode: string;
  creditSegment: string;

  assetClassification: string;
  twoFlag: string;
  fraudMark: string;
  willfulDefaulter: string;

  dateSarfaesai13_2: string;
  dateSarfaesai13_4: string;
  npaDate: string;

  sanctionLimit: number;
  openingBalance2025: number;
  increaseOpBalance: number;
  interestCumulative: number;
  recoveryCumulative: number;
  recoveryCurrentDate: number;
  upgradationTotal: number;
  writeOffTotal: number;
  closingBalance: number;

  // allow future fields
  [key: string]: string | number;
}
