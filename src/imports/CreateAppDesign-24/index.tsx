import svgPaths from "./svg-xrmwsplmgx";

function TextInput() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by job #, plate, vehicle…</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[448_0_0] h-[37.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
      <div className="absolute h-[60.483px] left-[-59.09px] top-[-12.14px] w-[348.855px]">
        <div className="absolute inset-[-1.65%_-0.29%]">
          <svg className="block size-full" fill="none" height="62.4834" preserveAspectRatio="none" viewBox="0 0 350.857 62.4834" width="350.857">
            <path d={svgPaths.p205094c0} id="Vector 92" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">5 open jobs</p>
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <ContainerAlign />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[145.025px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Job Order</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[145.03px] top-0 w-[132.688px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Date</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[277.71px] top-0 w-[154.213px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[431.93px] top-0 w-[94.625px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Plate</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[683.53px] top-0 w-[139.925px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Parts Issued</p>
    </div>
  );
}

function HeaderCell5() {
  return <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[823.45px] top-0 w-[97.35px]" data-name="Header Cell" />;
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 top-[36.39px] w-[145.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[145.03px] top-[36.39px] w-[132.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">12 Aug 2026</p>
      <div className="absolute h-[41.059px] left-[-4.35px] top-[-32.47px] w-[73.458px]">
        <div className="absolute inset-[-2.44%_-1.36%]">
          <svg className="block size-full" fill="none" height="43.0593" preserveAspectRatio="none" viewBox="0 0 75.458 43.0593" width="75.458">
            <path d={svgPaths.p64a20c0} id="Vector 94" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[277.71px] not-italic top-[36.39px] w-[154.213px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Silver · 2018</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[431.93px] top-[36.39px] w-[94.625px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[19.2px] left-[16px] rounded-[4px] top-[21.59px] w-[56.362px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[8px] not-italic text-[#4a5565] text-[12px] top-[2px] whitespace-nowrap">3 parts</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[683.53px] top-[36.39px] w-[139.925px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#0f2340] content-stretch flex items-center justify-center left-[16px] px-[12px] py-[6px] rounded-[4px] top-[16.4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[823.45px] top-[36.39px] w-[97.35px]" data-name="Table Cell">
      <Button />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 top-[97.17px] w-[145.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">JO-2026-00124</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[145.03px] top-[97.17px] w-[132.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">11 Aug 2026</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[277.71px] not-italic top-[97.17px] w-[154.213px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Gray · 2021</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[431.93px] top-[97.17px] w-[94.625px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">GHI 012</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[19.2px] left-[16px] rounded-[4px] top-[21.59px] w-[28px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[8px] not-italic text-[#4a5565] text-[12px] top-[2px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[683.53px] top-[97.17px] w-[139.925px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#0f2340] content-stretch flex items-center justify-center left-[16px] px-[12px] py-[6px] rounded-[4px] top-[16.4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[823.45px] top-[97.17px] w-[97.35px]" data-name="Table Cell">
      <Button1 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 top-[157.96px] w-[145.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">JO-2026-00123</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[145.03px] top-[157.96px] w-[132.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">10 Aug 2026</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[277.71px] not-italic top-[157.96px] w-[154.213px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Kia Sportage</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Blue · 2022</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[431.93px] top-[157.96px] w-[94.625px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">JKL 345</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[19.2px] left-[16px] rounded-[4px] top-[21.59px] w-[28px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[8px] not-italic text-[#4a5565] text-[12px] top-[2px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[683.53px] top-[157.96px] w-[139.925px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#0f2340] content-stretch flex items-center justify-center left-[16px] px-[12px] py-[6px] rounded-[4px] top-[16.4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[823.45px] top-[157.96px] w-[97.35px]" data-name="Table Cell">
      <Button2 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 top-[218.75px] w-[145.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">JO-2026-00121</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[145.03px] top-[218.75px] w-[132.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">08 Aug 2026</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[277.71px] not-italic top-[218.75px] w-[154.213px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Toyota Camry</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Pearl White · 2020</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[431.93px] top-[218.75px] w-[94.625px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">PQR 901</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[19.2px] left-[16px] rounded-[4px] top-[21.59px] w-[28px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[8px] not-italic text-[#4a5565] text-[12px] top-[2px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[683.53px] top-[218.75px] w-[139.925px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#0f2340] content-stretch flex items-center justify-center left-[16px] px-[12px] py-[6px] rounded-[4px] top-[16.4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[823.45px] top-[218.75px] w-[97.35px]" data-name="Table Cell">
      <Button3 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 top-[279.54px] w-[145.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">JO-2026-00120</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[145.03px] top-[279.54px] w-[132.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">08 Aug 2026</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[277.71px] not-italic top-[279.54px] w-[154.213px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Silver · 2018</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[431.93px] top-[279.54px] w-[94.625px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.59px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[19.2px] left-[16px] rounded-[4px] top-[21.59px] w-[28px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[8px] not-italic text-[#4a5565] text-[12px] top-[2px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[683.53px] top-[279.54px] w-[139.925px]" data-name="Table Cell">
      <Text4 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#0f2340] content-stretch flex items-center justify-center left-[16px] px-[12px] py-[6px] rounded-[4px] top-[16.4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[823.45px] top-[279.54px] w-[97.35px]" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[340.725px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <Table />
    </div>
  );
}

function CardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card />
    </div>
  );
}

function WarehouseOpenJobOrders() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] p-[24px] relative shrink-0 w-[970.4px]" data-name="WarehouseOpenJobOrders">
      <Container />
      <CardMargin />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[688px] items-start pl-[224px] pt-[56px] relative shrink-0 w-[1194.4px]" data-name="App">
      <WarehouseOpenJobOrders />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◫</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Container7() {
  return <div className="bg-[rgba(255,255,255,0.6)] h-[16px] relative rounded-[26843500px] shrink-0 w-[4px]" data-name="Container" />;
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
      <ContainerAlign1 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">▤</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Parts</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊟</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Stock Update</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↕</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Movements</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button5 />
      <Container6 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container9 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
    </div>
  );
}

function Container8() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container12 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container3 />
      <Navigation />
      <Container8 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[131px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text16() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button10() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">warehouse</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[74.1px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button10 />
      <Container14 />
    </div>
  );
}

function ContainerAlign2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container13 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <ContainerAlign2 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <App />
      <Sidebar />
      <Header />
    </div>
  );
}