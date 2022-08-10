import React, { createContext, useState } from "react";

type prefectureType = {
  npatients: number;
  setNpatients: React.Dispatch<React.SetStateAction<number>>;
  nexits: number;
  setNexits: React.Dispatch<React.SetStateAction<number>>;
  ndeaths: number;
  setNdeaths: React.Dispatch<React.SetStateAction<number>>;
  ncurrentpatients: number;
  setNcurrentpatients: React.Dispatch<React.SetStateAction<number>>;
  sickBedNum: number;
  setSickBedNum: React.Dispatch<React.SetStateAction<number>>;
  isShow: string;
  setIsShow: React.Dispatch<React.SetStateAction<string>>;
};

export const prefectureContext = createContext<prefectureType | null>(null);

export function PrefectureProvider(props: { children: any }) {
  const { children } = props;
  //累積陽性者数
  const [npatients, setNpatients] = useState(0);
  //累積退院者数
  const [nexits, setNexits] = useState(0);
  //累積死者数
  const [ndeaths, setNdeaths] = useState(0);
  //都道府県の現在の患者数
  const [ncurrentpatients, setNcurrentpatients] = useState(0);
  //都道府県の対策病床数
  const [sickBedNum, setSickBedNum] = useState(0);
  //表示するかのcss
  const [isShow, setIsShow] = useState("none");

  return (
    <prefectureContext.Provider
      value={{
        npatients,
        setNpatients,
        nexits,
        setNexits,
        ndeaths,
        setNdeaths,
        ncurrentpatients,
        setNcurrentpatients,
        sickBedNum,
        setSickBedNum,
        isShow,
        setIsShow,
      }}
    >
      {children}
    </prefectureContext.Provider>
  );
}
