function Button() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">← Back</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[46px] items-start pt-[16px] relative shrink-0 w-[923.2px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">Ahmed Mohamed</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[23px] items-start pt-[2px] relative shrink-0 w-[923.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">3 Vehicles</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">PHONE</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[25px] items-start pt-[4px] relative shrink-0 w-[283.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Medium',sans-serif] font-medium leading-[21px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">EMAIL</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[25px] items-start pt-[4px] relative shrink-0 w-[283.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">ahmed@email.com</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">ADDRESS</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[25px] items-start pt-[4px] relative shrink-0 w-[283.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">12 Tahrir St, Cairo</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[___283.20px_283.20px_283.20px] grid-rows-[_41.50px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Container:margin">
      <Container />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">VEHICLES</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#eef3fb] border-[#0f2340] border-[0.8px] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#0f2340] text-[14px] text-center whitespace-nowrap">+ New Car</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph7 />
      <Button1 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">BMW 320i</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pb-[8px] relative shrink-0 w-[412px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">2018</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-0 rounded-[4px] top-[4.4px] w-[68.5px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#364153] text-[12px] top-px tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Text />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Last visit: 08 Aug 2026</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">7 visits</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[30px] items-center justify-between pt-[12px] relative shrink-0 w-[412px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-center justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Button">
      <Paragraph8 />
      <Paragraph9 />
      <Container8 />
      <Container9 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Mercedes-Benz C200</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pb-[8px] relative shrink-0 w-[412px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">2020</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-0 rounded-[4px] top-[4.4px] w-[68.5px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#364153] text-[12px] top-px tracking-[0.3px] whitespace-nowrap">XYZ 456</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Text1 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Last visit: 02 Jul 2026</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">3 visits</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[30px] items-center justify-between pt-[12px] relative shrink-0 w-[412px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Button">
      <Paragraph12 />
      <Paragraph13 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Toyota Corolla</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pb-[8px] relative shrink-0 w-[412px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">2019</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-0 rounded-[4px] top-[4.4px] w-[68.5px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[8px] text-[#364153] text-[12px] top-px tracking-[0.3px] whitespace-nowrap">DEF 789</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Last visit: 15 Jun 2026</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">5 visits</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[30px] items-center justify-between pt-[12px] relative shrink-0 w-[412px]" data-name="Container">
      <Paragraph18 />
      <Paragraph19 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-center justify-self-stretch p-[20px] relative rounded-[12px] row-2 self-stretch shrink-0" data-name="Button">
      <Paragraph16 />
      <Paragraph17 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container7() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__453.60px_453.60px] grid-rows-[__145.60px_145.60px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[377.8px] items-start pt-[20px] relative shrink-0 w-[923.2px]" data-name="Container">
      <Container6 />
      <ContainerMargin1 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">JOB ORDERS</p>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-0 top-0 w-[223.525px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">JOB ORDER</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[223.53px] top-0 w-[195.088px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">DATE</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[418.61px] top-0 w-[172.725px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">VEHICLE</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[591.34px] top-0 w-[183.488px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">TYPE</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[774.83px] top-0 w-[146.775px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">STATUS</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[40.9px] left-0 top-0 w-[921.6px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-[418.61px] top-0 w-[172.725px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">BMW 320i</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">ABC 123</p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[794.83px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[71.4px] left-0 top-[40.9px] w-[921.6px]" data-name="Table Body">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#101828] text-[13px] top-[25.95px] whitespace-nowrap">JO-2026-00125</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[243.53px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">12 Aug 2026</p>
      <TableCell />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[611.34px] not-italic text-[#6a7282] text-[14px] top-[25px] whitespace-nowrap">Full Service</p>
      <StatusBadge />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[112.3px] relative shrink-0 w-full" data-name="Table">
      <TableRow />
      <TableBody />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[113.9px] items-start overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Table />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container15 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col h-[170.9px] items-start pt-[24px] relative shrink-0 w-[923.2px]" data-name="Container">
      <Paragraph20 />
      <ContainerMargin2 />
    </div>
  );
}

function CustomerDetailsScreen() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start min-h-[606.4000244140625px] pb-[40px] pt-[24px] px-[24px] relative shrink-0 w-full" data-name="CustomerDetailsScreen">
      <Button />
      <Heading />
      <Paragraph />
      <ContainerMargin />
      <Container5 />
      <Container14 />
    </div>
  );
}

function CustomerDetailsScreenMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[224px] relative shrink-0 w-full" data-name="CustomerDetailsScreen:margin">
      <CustomerDetailsScreen />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[606.4px] items-start relative shrink-0 w-[1195.2px]" data-name="App">
      <CustomerDetailsScreenMargin />
    </div>
  );
}

function BodyMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[56px] relative shrink-0" data-name="Body:margin">
      <App />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[12px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-[97.45px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◉</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[435.8_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-[146px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pb-[12px] relative shrink-0 w-[184px]" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[18px] left-0 top-[5.6px] w-[61.538px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[31px] not-italic text-[12px] text-[rgba(255,255,255,0.35)] text-center top-[-0.2px] whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
    </div>
  );
}

function Container19() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container23 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[859px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container16 />
      <Navigation />
      <Container19 />
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Customer Details</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[34.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(153,161,175,0.5)] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[448_0_0] h-[34.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.3px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">🔔</p>
    </div>
  );
}

function Container27() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Container" />;
}

function Container26() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Container">
      <Text18 />
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end not-italic relative shrink-0 whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#101828] text-[12px]">Karim Samir</p>
      <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#99a1af] text-[10px]">engineer</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container26 />
      <Container28 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container25 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[971.2px]" data-name="Header">
      <Text17 />
      <Container24 />
      <ContainerAlign />
    </div>
  );
}

export default function EngineerJobOrderPrototypeFlow() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Engineer Job Order Prototype Flow">
      <BodyMargin />
      <Sidebar />
      <Header />
    </div>
  );
}